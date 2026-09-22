export const EMSG_BOX_TYPE = 0x656d7367; // 'emsg'

const textDecoder = typeof TextDecoder !== 'undefined' ? new TextDecoder() : null;

interface BoxReader {
  data: DataView;
  offset: number;
  size: number;
  type: number;
  cursor: number;
}

function makeBoxReader(data: DataView, offset: number): BoxReader {
  const size = data.getUint32(offset);
  const type = data.getUint32(offset + 4);
  return { data, offset, size, type, cursor: 8 };
}

function readUint32Field(box: BoxReader): number {
  const value = box.data.getUint32(box.offset + box.cursor);
  box.cursor += 4;
  return value;
}

function bytesToString(bytes: Uint8Array): string {
  if (!bytes.length) return '';
  if (textDecoder) return textDecoder.decode(bytes);

  let str = '';
  for (let i = 0; i < bytes.length; i++) {
    str += String.fromCharCode(bytes[i]);
  }
  return str;
}

function readString(box: BoxReader, terminator?: number): string {
  let end: number;

  if (terminator === undefined) {
    end = box.size;
  } else {
    end = box.cursor;
    while (end < box.size && box.data.getUint8(box.offset + end) !== terminator) {
      end++;
    }
  }

  const bytes = new Uint8Array(
    box.data.buffer,
    box.data.byteOffset + box.offset + box.cursor,
    end - box.cursor
  );

  box.cursor = Math.min(end + 1, box.size);

  return bytesToString(bytes);
}

function looksLikeBox(data: DataView, offset: number): boolean {
  if (data.byteLength - offset < 8) return false;
  const size = data.getUint32(offset);
  if (size < 8 || data.byteLength - offset < size) return false;

  for (let i = 4; i < 8; i++) {
    const byte = data.getUint8(offset + i);
    if (byte < 48 || byte > 122) return false; // type bytes should look like ASCII
  }

  return true;
}

export function findBox(data: DataView, offset: number, targetType: number): BoxReader | null {
  while (looksLikeBox(data, offset)) {
    const box = makeBoxReader(data, offset);
    if (box.type === targetType) return box;
    offset += box.size;
  }
  return null;
}

interface EmsgBody {
  schemeIdUri: string;
  value: string;
  timescale: number;
  presentationTimeDelta: number;
  eventDuration: number;
  id: number;
  messageData: string;
}

export function parseEmsgBody(box: BoxReader): EmsgBody {
  box.cursor += 4; // skip version and flags (3 bytes) as welll
  return {
    schemeIdUri: readString(box, 0),
    value: readString(box, 0),
    timescale: readUint32Field(box),
    presentationTimeDelta: readUint32Field(box),
    eventDuration: readUint32Field(box),
    id: readUint32Field(box),
    messageData: readString(box)
  };
}

export function parseHeaderBlock(text: string): Record<string, string> | null {
  const lines = text.split('\r\n');
  const headers: Record<string, string> = {};

  for (const line of lines) {
    if (line.length === 0) return headers;
    const match = line.match(/([^:]+):\s+([\S\s]+)/);
    if (match) headers[match[1]] = match[2];
  }

  return null;
}

function getNumber(headers: Record<string, string>, key: string): number {
  return Number(headers[key]) || 0;
}

/**
 * @NOTE
 * This was based on minified code from yt.
 */
export class EmsgSegmentMetadata {
  private receivedAtMs: number = Date.now();

  public segmentNumber: number;
  public totalSegmentCount: number;
  public segmentDurationsMs: string;
  public ingestionTimeSec: number;
  public ingestionUncertaintySec: number;
  public safeFirstFrameTimeSec: number;
  public targetDurationSec: number;
  public cryptoPeriodIndex: number;
  public cryptoPeriodSeconds: number;
  public currentAbsoluteLoudnessLkfs: number | null;

  constructor(public data: Record<string, string>, public uri: string = 'https://youtube.com') {
    this.segmentNumber = getNumber(this.data, 'Sequence-Number');
    this.totalSegmentCount = getNumber(this.data, 'Segment-Count');
    this.segmentDurationsMs = this.data['Segment-Durations-Ms'] || '';
    this.ingestionTimeSec = getNumber(this.data, 'Ingestion-Walltime-Us') / 1e6;
    this.ingestionUncertaintySec = getNumber(this.data, 'Ingestion-Uncertainty-Us') / 1e6;
    this.safeFirstFrameTimeSec =
      (getNumber(this.data, 'First-Frame-Time-Us') +
        getNumber(this.data, 'First-Frame-Uncertainty-Us')) /
      1e6;

    this.targetDurationSec = getNumber(this.data, 'Target-Duration-Us') / 1e6;
    this.cryptoPeriodIndex = getNumber(this.data, 'Crypto-Period-Index');
    this.cryptoPeriodSeconds = getNumber(this.data, 'Crypto-Period-Seconds');
    this.currentAbsoluteLoudnessLkfs = 'Current-Absolute-Loudness-Lkfs' in this.data
      ? getNumber(this.data, 'Current-Absolute-Loudness-Lkfs') : null;
  }

  public get latencyMs(): number {
    const ingestionTimeMs = this.ingestionTimeSec * 1e3;
    const uncertaintyMs = this.ingestionUncertaintySec * 1e3;
    return Math.max(0, this.receivedAtMs - ingestionTimeMs - uncertaintyMs);
  }

  public getStitchedCPNs(): string[] {
    return this.data['Stitched-Video-Cpn']
      ? this.data['Stitched-Video-Cpn'].split(',').slice(0, -1)
      : [];
  }

  public hasStitchedAdBreakMetadata(): boolean {
    return !!(
      this.data['Stitched-Video-Id'] ||
      this.data['Stitched-Video-Cpn'] ||
      this.data['Stitched-Video-Duration-Us'] ||
      this.data['Stitched-Video-Start-Frame-Index'] ||
      this.data['Stitched-Video-Absolute-Loudness-Lkfs'] ||
      this.data['Serialized-State'] ||
      this.data['Is-Ad-Break-Finished']
    );
  }
}