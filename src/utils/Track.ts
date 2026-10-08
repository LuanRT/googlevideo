import type { EmsgSegmentMetadata } from './EmsgSegmentMetadata.js';
import type { FormatId } from './Protos.js';

import type {
  BufferedRangeSummary,
  CompletedSegment,
  SegmentInfo,
  TrackOutput,
  TrackState
} from '../types/sabrStreamTypes.js';

import { ticksToMs } from './mediaTimeUtils.js';
import { assertIsDefined } from './misc.js';

const MAX_TRACKED_SEGMENTS = 64; // @NOTE: only metadata, not actual media

export class Track {
  public formatId?: FormatId;
  public mimeType?: string;
  public endSegmentNum?: number;
  public endTimeTicks?: number;
  public endTimescale?: number;
  public targetDurationSec?: number;
  public trackedSegments = new Map<number, CompletedSegment>();
  public bufferedRangeSummary?: BufferedRangeSummary;
  public emsgSegmentMetadata?: EmsgSegmentMetadata;

  private _output: TrackOutput | undefined;

  constructor(public readonly type: 'video' | 'audio') {}

  public set output(value: TrackOutput) {
    this._output = value;
  }

  public get output(): TrackOutput {
    return this._output!; // This is created at the ctor of SabrStream and can never be undefined.
  }

  public get streamLocked(): boolean {
    return this.output.stream.locked;
  }

  public get streamDesiredSize(): number {
    return this.output.controller.desiredSize ?? 0;
  }

  public get streamController(): ReadableStreamDefaultController<Uint8Array> {
    return this.output.controller;
  }

  public get streamFull(): boolean {
    return this.streamLocked && this.streamDesiredSize <= 0;
  }

  public get endTimeMs(): number {
    if (this.endTimeTicks === undefined || this.endTimescale === undefined) return 0;
    return ticksToMs(this.endTimeTicks, this.endTimescale, Math.ceil);
  }

  public get endOfStreamReached(): boolean {
    return (
      this.endSegmentNum !== undefined &&
      this.endSegmentNum > 0 &&
      this.trackedSegments.has(this.endSegmentNum)
    );
  }

  public get latencyMs(): number {
    return this.emsgSegmentMetadata?.latencyMs ?? 0;
  }

  public update(state: TrackState): void {
    if ('formatId' in state)
      this.formatId = state.formatId;

    if ('mimeType' in state)
      this.mimeType = state.mimeType;

    if ('endSegmentNum' in state)
      this.endSegmentNum = state.endSegmentNum;

    if ('endTimeTicks' in state)
      this.endTimeTicks = state.endTimeTicks;

    if ('endTimescale' in state)
      this.endTimescale = state.endTimescale;

    if ('targetDurationSec' in state)
      this.targetDurationSec = state.targetDurationSec;

    if ('trackedSegments' in state)
      this.trackedSegments = new Map(state.trackedSegments);

    if ('bufferedRangeSummary' in state)
      this.bufferedRangeSummary = state.bufferedRangeSummary;
  }

  public snapshot(): TrackState {
    return {
      formatId: this.formatId,
      mimeType: this.mimeType,
      endSegmentNum: this.endSegmentNum,
      endTimeTicks: this.endTimeTicks,
      endTimescale: this.endTimescale,
      targetDurationSec: this.targetDurationSec,
      trackedSegments: Array.from(this.trackedSegments.entries() || []),
      bufferedRangeSummary: this.bufferedRangeSummary
    };
  }

  public recordCompletedSegment(info: SegmentInfo, emsgMetadata?: EmsgSegmentMetadata) {
    let durationMs: number | undefined = info.durationMs;

    if (durationMs <= 0 && !info.mediaHeader.isInitializationSegment)
      durationMs = this.targetDurationSec ? this.targetDurationSec * 1000 : undefined;

    if (emsgMetadata) {
      this.emsgSegmentMetadata = emsgMetadata;
      if (emsgMetadata.targetDurationSec > 0)
        durationMs = emsgMetadata.targetDurationSec * 1000;
    }

    assertIsDefined(durationMs, `Track is missing durationMs: formatKey=${info.formatKey}, segmentNumber=${info.segmentNumber}`);

    const segmentNumber = info.segmentNumber;
    const mediaHeader = info.mediaHeader;
    const startTimeMs = info.startTimeMs;
    const endTimeMs = startTimeMs + durationMs;

    this.trackedSegments.set(segmentNumber, {
      segmentNumber,
      startTimeMs,
      endTimeMs,
      durationMs,
      mediaHeader
    });

    this.evictOldestTrackedSegments();
    this.refreshBufferedRanges();
  }

  private refreshBufferedRanges(): void {
    let first: CompletedSegment | undefined;
    let last: CompletedSegment | undefined;

    for (const segment of this.trackedSegments.values()) {
      if (segment.mediaHeader.isInitializationSegment) continue;
      if (!first || segment.segmentNumber < first.segmentNumber) first = segment;
      if (!last || segment.segmentNumber > last.segmentNumber) last = segment;
    }

    if (!first || !last) {
      this.bufferedRangeSummary = undefined;
      return;
    }

    this.bufferedRangeSummary = {
      startTimeMs: first.startTimeMs,
      durationMs: Math.max(0, last.endTimeMs - first.startTimeMs),
      startSegmentIndex: first.segmentNumber,
      endSegmentIndex: last.segmentNumber
    };
  }

  private evictOldestTrackedSegments(): void {
    while (this.trackedSegments.size > MAX_TRACKED_SEGMENTS) {
      const oldestKey = this.trackedSegments.keys().next().value;
      if (oldestKey === undefined) break;
      this.trackedSegments.delete(oldestKey);
    }
  }
}