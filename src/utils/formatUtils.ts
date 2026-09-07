import type { MediaHeader } from './Protos.js';
import type { CreateFormatKeyInput, FormatStream, SabrFormat } from '../types/shared.js';
import type { SabrRequestMetadata } from '../types/sabrStreamingAdapterTypes.js';

export const MAX_INT32_VALUE = '2147483647';

export enum EnabledTrackTypes {
  VIDEO_AND_AUDIO = 0,
  AUDIO_ONLY = 1,
  VIDEO_ONLY = 2,
}

export function describeMissingFormat(
  type: 'video' | 'audio',
  formatOption: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined) | undefined,
  formats: SabrFormat[]
): string {
  const available = filterFormatsByType(formats, type === 'audio').map((f) => `${f.itag}[qualityLabel=${f.qualityLabel || f.audioQuality || ''}, mimeType=${f.mimeType || ''}, isVb=${f.isVb || false}, isDrc=${f.isDrc || false}]`).join(', ') || 'none';

  if (typeof formatOption === 'number') {
    return `no ${type} format with itag ${formatOption} found (available ${type} formats: ${available})`;
  }

  if (typeof formatOption === 'function') {
    return `no ${type} format matched the provided selector function (available ${type} formats: ${available})`;
  }

  return `no ${type} format matched the given criteria (available ${type} formats: ${available})`;
}

export function chooseFormat(
  formats: SabrFormat[],
  formatOption: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined) | undefined,
  preferences: {
    quality?: string;
    language?: string;
    container?: 'webm' | 'mp4';
    preferredVideoCodec?: 'h264' | 'vp9' | 'av1';
    preferredAudioCodec?: 'aac' | 'opus';
    voiceBoost?: boolean;
    dynamicRangeCompression?: boolean;
    superResolution?: boolean;
    isAudio: boolean;
  }
): SabrFormat | undefined {
  if (!formats.length) return undefined;

  const typeFormats = filterFormatsByType(formats, preferences.isAudio);
  if (!typeFormats.length) return undefined;

  if (typeof formatOption === 'number')
    return typeFormats.find((format) => format.itag === formatOption);

  if (formatOption && typeof formatOption !== 'function')
    return formatOption;

  if (typeof formatOption === 'function')
    return formatOption(typeFormats);

  let filteredFormats = typeFormats;

  const language = preferences.language;
  if (language && preferences.isAudio) {
    filteredFormats = filteredFormats.filter((format) => format.language === language);
  }

  const quality = preferences.quality;
  if (quality !== undefined) {
    filteredFormats = filteredFormats.filter((format) =>
      preferences.isAudio
        ? !!format.audioQuality?.toLowerCase().includes(quality?.toLowerCase() || '')
        : !!format.qualityLabel?.toLowerCase().includes(quality?.toLowerCase() || '')
    );
  }

  const container = preferences.container;
  if (container !== undefined)
    filteredFormats = filteredFormats.filter((format) => format.mimeType?.includes(container));

  const voiceBoost = preferences.voiceBoost;
  if (voiceBoost !== undefined)
    filteredFormats = filteredFormats.filter((format) => format.isVb === voiceBoost);

  const dynamicRangeCompression = preferences.dynamicRangeCompression;
  if (dynamicRangeCompression !== undefined)
    filteredFormats = filteredFormats.filter((format) => format.isDrc === dynamicRangeCompression);

  const superResolution = preferences.superResolution;
  if (superResolution !== undefined)
    filteredFormats = filteredFormats.filter((format) => format.isSr === superResolution);

  return filteredFormats.sort((a, b) => {
    const preferredCodec = preferences.isAudio ? preferences.preferredAudioCodec : preferences.preferredVideoCodec;
    const preferenceDifference = Number(matchesCodec(b, preferredCodec)) - Number(matchesCodec(a, preferredCodec));
    if (preferenceDifference) return preferenceDifference;

    return preferences.isAudio
      ? (b.bitrate || 0) - (a.bitrate || 0)
      : (b.height || 0) - (a.height || 0);
  })[0];
}

function matchesCodec(format: SabrFormat, codec: 'h264' | 'vp9' | 'av1' | 'aac' | 'opus' | undefined): boolean {
  if (!codec) return false;

  const codecMimeTypePrefixes = {
    h264: [ 'avc1', 'avc3' ],
    vp9: [ 'vp9', 'vp09' ],
    av1: [ 'av01' ],
    aac: [ 'mp4a' ],
    opus: [ 'opus' ]
  };

  return codecMimeTypePrefixes[codec].some((prefix) => format.mimeType?.includes(prefix));
}

function filterFormatsByType(formats: SabrFormat[], isAudio: boolean): SabrFormat[] {
  return formats.filter((format) => {
    if (!format.mimeType) return false;
    return isAudio
      ? format.mimeType.includes('audio')
      : format.mimeType.includes('video');
  });
}

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
    targetDurationSec: formatStream.targetDurationSec || formatStream.target_duration_sec || formatStream.target_duration_dec,
    isVb: formatStream.isVb || formatStream.is_vb,
    isSr: formatStream.isSr || formatStream.is_sr,
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

export function createFormatKey(input: CreateFormatKeyInput): string {
  if ('formatId' in input && (input.formatId?.itag !== undefined || input.formatId?.xtags !== undefined)) {
    return `${input.formatId?.itag || ''}:${input.formatId?.xtags || ''}`;
  }

  if (('itag' in input || 'xtags' in input) && (input.itag !== undefined || input.xtags !== undefined)) {
    return `${input.itag || ''}:${input.xtags || ''}`;
  }

  throw new Error('Unsupported format type');
}

/**
 * Creates a segment cache key.
 * @param mediaHeader - The MediaHeader object.
 * @param format - Format object (needed for init segments.)
 */
export function createSegmentCacheKey(
  mediaHeader: MediaHeader,
  format?: SabrFormat
): string {
  if (mediaHeader.isInitializationSegment && format) {
    return `${mediaHeader.itag}:${mediaHeader.xtags || ''}:${format.contentLength || ''}:${format.mimeType || ''}`;
  }
  return `${mediaHeader.segmentByteRangeStart || '0'}-${mediaHeader.itag}-${mediaHeader.xtags || ''}`;
}

/**
 * Creates a cache key from request metadata.
 * @returns A string key for caching segments.
 */
export function createSegmentCacheKeyFromMetadata(
  requestMetadata: SabrRequestMetadata
): string {
  if (!requestMetadata.byteRange || !requestMetadata.format)
    throw new Error('Invalid metadata: byteRange or format is missing');

  const pseudoMediaHeader: MediaHeader = {
    itag: requestMetadata.format.itag,
    xtags: requestMetadata.format.xtags || '',
    segmentByteRangeStart: requestMetadata.byteRange.start.toString(),
    isInitializationSegment: requestMetadata.isInit
  };

  return createSegmentCacheKey(
    pseudoMediaHeader,
    requestMetadata.isInit ? requestMetadata.format : undefined
  );
}

/**
 * Generates a unique format ID based on the SabrFormat properties.
 * @param format - The SabrFormat object.
 */
export function getUniqueFormatId(format: SabrFormat): string {
  if (format.width)
    return format.itag.toString();

  const uidParts = [ format.itag.toString() ];

  if (format.audioTrackId) {
    uidParts.push(format.audioTrackId);
  }

  if (format.isDrc) {
    uidParts.push('drc');
  }

  return uidParts.join('-');
}