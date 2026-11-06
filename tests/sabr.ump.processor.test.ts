import { describe, expect, it, vi } from 'vitest';

import { SabrUmpProcessor } from '../src/core/SabrUmpProcessor.js';
import { CompositeBuffer, UmpWriter } from '../src/exports/ump.js';
import { CacheManager, concatenateChunks } from '../src/utils/index.js';
import { MediaHeader, StreamProtectionStatus, UMPPartId } from '../src/utils/Protos.js';
import type { SabrRequestMetadata } from '../src/types/sabrStreamingAdapterTypes.js';
import type { SabrFormat } from '../src/types/shared.js';

const format: SabrFormat = { itag: 140, mimeType: 'audio/mp4', contentLength: 1000 };
const index = new Uint8Array([ 0, 0, 0, 32, 0x73, 0x69, 0x64, 0x78, ...new Uint8Array(24) ]);
const initialization = concatenateChunks([ new Uint8Array([ 0, 0, 0, 8, 0x66, 0x74, 0x79, 0x70 ]), index ]);
const firstMedia = new Uint8Array(80).fill(0xaa);
const secondMedia = new Uint8Array(80).fill(0xbb);

function makeResponse(segments: { data: Uint8Array; isInit?: boolean }[], protectionStatus?: number): Uint8Array {
  const buffer = new CompositeBuffer();
  const writer = new UmpWriter(buffer);

  if (protectionStatus !== undefined) {
    writer.write(UMPPartId.STREAM_PROTECTION_STATUS, StreamProtectionStatus.encode({ status: protectionStatus }).finish());
  }

  segments.forEach(({ data, isInit = false }, i) => {
    const headerId = i + 1;
    writer.write(UMPPartId.MEDIA_HEADER, MediaHeader.encode({
      headerId,
      itag: format.itag,
      isInitializationSegment: isInit,
      segmentNum: i,
      segmentLengthBytes: String(data.length)
    }).finish());
    writer.write(UMPPartId.MEDIA, new Uint8Array([ headerId, ...data ]));
    writer.write(UMPPartId.MEDIA_END, new Uint8Array([ headerId ]));
  });

  return concatenateChunks(buffer.chunks);
}

const combinedResponse = makeResponse([
  { data: initialization, isInit: true },
  { data: firstMedia },
  { data: secondMedia }
]);

describe('SabrUmpProcessor', () => {
  // Fetch may deliver initialization and media segments in the same chunk.
  // The requested SIDX bytes and init cache must not depend on chunk boundaries.
  it.each([ 1, 17, combinedResponse.length ])('preserves the index and init cache with %i-byte chunks', async (chunkSize) => {
    const metadata: SabrRequestMetadata = {
      isUMP: true,
      isSABR: true,
      isInit: true,
      byteRange: { start: 8, end: initialization.length - 1 },
      format,
      timestamp: 0
    };
    const cache = new CacheManager();
    const setInitSegment = vi.spyOn(cache, 'setInitSegment');
    const processor = new SabrUmpProcessor(metadata, cache);

    try {
      let result;
      for (let i = 0; i < combinedResponse.length; i += chunkSize) {
        result = await processor.processChunk(combinedResponse.subarray(i, i + chunkSize));
        if (result) break;
      }

      expect(result?.data).toEqual(index);
      expect(setInitSegment).toHaveBeenCalledOnce();
      expect(Array.from(cache.getCacheEntries().initSegmentCache.values(), (entry) => entry.data)).toEqual([ initialization ]);
      expect(metadata.streamInfo?.mediaHeader?.isInitializationSegment).toBe(true);
    } finally {
      processor.dispose();
      cache.dispose();
    }
  });

  it('returns the first requested media segment from a buffered response', async () => {
    const processor = new SabrUmpProcessor({ isUMP: true, isSABR: true, isInit: false, format, timestamp: 0 });

    try {
      const result = await processor.processChunk(makeResponse([ { data: firstMedia }, { data: secondMedia } ]));
      expect(result?.data).toEqual(firstMedia);
    } finally {
      processor.dispose();
    }
  });

  it('preserves a terminal protection result before later media parts', async () => {
    const metadata: SabrRequestMetadata = { isUMP: true, isSABR: true, isInit: false, format, timestamp: 0 };
    const processor = new SabrUmpProcessor(metadata);

    try {
      const result = await processor.processChunk(makeResponse([ { data: firstMedia } ], 3));
      expect(result).toEqual({ done: true });
      expect(metadata.streamInfo?.streamProtectionStatus?.status).toBe(3);
      expect(metadata.streamInfo?.mediaHeader).toBeUndefined();
    } finally {
      processor.dispose();
    }
  });
});
