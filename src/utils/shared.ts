import type { FormatStream, SabrFormat } from '../types/shared.js';

export const MAX_INT32_VALUE = '2147483647';

export enum EnabledTrackTypes {
  VIDEO_AND_AUDIO = 0,
  AUDIO_ONLY = 1,
  VIDEO_ONLY = 2,
}

/**
 * Determines if a given URL is a Google video URL, specifically for YouTube or SABR-related content.
 *
 * @param url - The URL to check.
 *
 * The function checks the following conditions:
 * 1. If the URL starts with the `sabr://` protocol, it is considered a Google video URL.
 * 2. If the URL ends with `/videoplayback`, it parses the query parameters to check for specific keys
 *    (`source=youtube`, `sabr`, `lsig`, or `expire`) that indicate a Google video URL.
 * 3. If the URL contains `/videoplayback/` (e.g., for live or post-live content), it checks the path
 *    segments for specific keywords (`videoplayback`, `sabr`, `lsig`, or `expire`).
 */
export function isGoogleVideoURL(url: string): boolean {
  if (url.startsWith('sabr://')) {
    return true;
  }

  const urlParts = url.split('?');
  const urlPart = urlParts[0];
  const queryPart = urlParts[1] || '';

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

interface Range {
  start: number;
  end: number;
}

/**
 * Parses the Range header value to extract the start and end byte positions.
 * @param rangeHeaderValue
 */
export function parseRangeHeader(rangeHeaderValue: string | undefined): Range | undefined {
  if (!rangeHeaderValue) return undefined;

  const parts = rangeHeaderValue.split('=')[1]?.split('-');
  if (parts?.length) {
    const start = Number(parts[0]);
    const end = Number(parts[1]);
    return { start, end };
  }

  return undefined;
}

/**
 * Converts a Uint8Array to a Base64 string.
 * @param u8
 */
export function u8ToBase64(u8: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(u8)));
}

/**
 * Converts a Base64 string to a Uint8Array.
 * @param base64
 */
export function base64ToU8(base64: string): Uint8Array {
  const standard_base64 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const padded_base64 = standard_base64.padEnd(standard_base64.length + (4 - standard_base64.length % 4) % 4, '=');
  return new Uint8Array(atob(padded_base64).split('').map((char) => char.charCodeAt(0)));
}

/**
 * Concatenates multiple Uint8Array chunks into a single Uint8Array.
 * @param chunks
 */
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

/**
 * Converts a FormatStream object to a SabrFormat object.
 * @param formatStream
 */
export function buildSabrFormat(formatStream: FormatStream): SabrFormat {
  return {
    itag: formatStream.itag,
    lastModified: formatStream.last_modified_ms || formatStream.lastModified || '0',
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

/**
 * Returns a promise that resolves after a specified number of milliseconds.
 * @param ms - The number of milliseconds to wait.
 */
export function wait(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}