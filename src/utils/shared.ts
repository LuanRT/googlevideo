import type { FormatStream, SabrFormat } from '../types/shared.js';

export const MAX_INT32_VALUE = 2147483647;

export enum EnabledTrackTypes {
  VIDEO_AND_AUDIO = 0,
  AUDIO_ONLY = 1,
  VIDEO_ONLY = 2,
}

export function isGoogleVideoURL(url: string): boolean {
  if (url.startsWith('sabr://')) {
    return true;
  }

  const urlPart = url.split('?')[0];
  const queryPart = url.split('?')[1] || '';

  if (urlPart.endsWith('/videoplayback')) {
    const params = new URLSearchParams(queryPart);
    if (params.get('source') === 'youtube' || params.has('sabr') || params.has('lsig') || params.has('expire')) {
      return true;
    }
  } else if (urlPart.includes('/videoplayback/')) { // For live content, post-live, etc.
    const pathParts = urlPart.split('/');
    return [ 'videoplayback', 'sabr', 'lsig', 'expire' ].some((part) => pathParts.includes(part));
  }

  return false;
}

export function parseRangeHeader(rangeHeaderValue: string | undefined): { start: number; end: number } | undefined {
  if (!rangeHeaderValue) return undefined;

  const parts = rangeHeaderValue.split('=')[1]?.split('-');
  if (parts?.length) {
    const start = Number(parts[0]);
    const end = Number(parts[1]);
    return { start, end };
  }

  return undefined;
}

export function u8ToBase64(u8: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(u8)));
}

export function base64ToU8(base64: string): Uint8Array {
  const standard_base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const padded_base64 = standard_base64.padEnd(standard_base64.length + (4 - standard_base64.length % 4) % 4, '=');
  return new Uint8Array(atob(padded_base64).split('').map((char) => char.charCodeAt(0)));
}

export function concatenateChunks(chunks: Uint8Array[]): Uint8Array {
  const totalLength = chunks.reduce((sum, chunk) => sum + chunk.length, 0);
  const result = new Uint8Array(totalLength);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

export function buildSabrFormat(formatStream: FormatStream): SabrFormat {
  return {
    itag: formatStream.itag,
    lastModified: parseInt(formatStream.last_modified_ms || formatStream.lastModified || '0'),
    xtags: formatStream.xtags,
    width: formatStream.width,
    height: formatStream.height,
    mimeType: formatStream.mime_type || formatStream.mimeType,
    audioQuality: formatStream.audio_quality || formatStream.audioQuality,
    bitrate: formatStream.bitrate,
    averageBitrate: formatStream.average_bitrate || formatStream.averageBitrate,
    quality: formatStream.quality,
    qualityLabel: formatStream.quality_label || formatStream.qualityLabel,
    audioTrackId: formatStream.audio_track?.id || formatStream.audioTrackId,
    approxDurationMs: formatStream.approx_duration_ms || parseInt(formatStream.approxDurationMs || '0'),
    contentLength: parseInt(formatStream.contentLength || '0') || formatStream.content_length,

    // YouTube.js-specific properties.
    isDrc: formatStream.is_drc,
    isAutoDubbed: formatStream.is_auto_dubbed,
    isDescriptive: formatStream.is_descriptive,
    isDubbed: formatStream.is_dubbed,
    language: formatStream.language,
    isOriginal: formatStream.is_original,
    isSecondary: formatStream.is_secondary
  };
}

export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// See https://github.com/nodejs/node/issues/40678#issuecomment-1126944677
export class CustomEvent extends Event {
  #detail;

  constructor(type: string, options?: CustomEventInit<any[]>) {
    super(type, options);
    this.#detail = options?.detail ?? null;
  }

  get detail(): any[] | null {
    return this.#detail;
  }
}

export class SabrAdapterError extends Error {
  constructor(message: string, public code?: string) {
    super(`[SabrStreamingAdapter] ${message}`);
    this.name = 'SabrAdapterError';
  }
}