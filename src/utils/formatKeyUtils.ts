import type { MediaHeader } from './Protos.js';
import type { FormatInitializationMetadata } from './Protos.js';
import type { SabrFormat } from '../types/shared.js';
import type { SabrRequestMetadata } from '../types/sabrStreamingAdapterTypes.js';

/**
 * Creates a format key based on itag and xtags.
 * @returns A string format key.
 */
export function createKey(itag: number | undefined, xtags: string | undefined): string {
  return `${itag || ''}:${xtags || ''}`;
}

/**
 * Creates a format key from a SabrFormat object.
 * @returns A string format key or undefined if format is undefined.
 */
export function fromFormat(format?: { itag?: number; xtags?: string }): string | undefined {
  if (!format) return undefined;
  return createKey(format.itag, format.xtags);
}

/**
 * Creates a format key from a MediaHeader object.
 * @returns A string format key.
 */
export function fromMediaHeader(mediaHeader: MediaHeader): string {
  return createKey(mediaHeader.itag, mediaHeader.xtags);
}

/**
 * Creates a format key from FormatInitializationMetadata.
 * @returns A string format key or undefined if formatId is undefined.
 */
export function fromFormatInitializationMetadata(
  formatInitMetadata: FormatInitializationMetadata): string {
  if (!formatInitMetadata.formatId) return '';
  return createKey(formatInitMetadata.formatId.itag, formatInitMetadata.formatId.xtags);
}

/**
 * Creates a segment cache key.
 * @param mediaHeader - The MediaHeader object.
 * @param format - Format object (needed for init segments.)
 * @returns A string key for caching segments.
 */
export function createSegmentCacheKey(
  mediaHeader: MediaHeader,
  format?: SabrFormat
): string {
  if (mediaHeader.isInitSeg && format) {
    return `${mediaHeader.itag}:${mediaHeader.xtags || ''}:${format.contentLength || ''}:${format.mimeType || ''}`;
  }
  return `${mediaHeader.startRange || '0'}-${mediaHeader.itag}-${mediaHeader.xtags || ''}`;
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

  const pseudoMediaHeader = {
    itag: requestMetadata.format.itag,
    xtags: requestMetadata.format.xtags || '',
    startRange: requestMetadata.byteRange.start.toString(),
    isInitSeg: requestMetadata.isInit
  };

  return createSegmentCacheKey(
    pseudoMediaHeader,
    requestMetadata.isInit ? requestMetadata.format : undefined
  );
}

/**
 * Generates a unique format ID based on the SabrFormat properties.
 * @param format - The SabrFormat object.
 * @returns A unique string identifier for the format.
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