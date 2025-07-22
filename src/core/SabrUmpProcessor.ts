import { concatenateChunks, type CacheManager } from '../utils/index.js';

import { createSegmentCacheKey, fromFormat, fromMediaHeader } from '../utils/formatKeyUtils.js';

import { CompositeBuffer } from './CompositeBuffer.js';
import { UmpReader } from './UmpReader.js';

import {
  FormatInitializationMetadata,
  MediaHeader,
  NextRequestPolicy,
  ReloadPlaybackContext,
  SabrContextSendingPolicy,
  SabrContextUpdate,
  SabrError,
  SabrRedirect,
  SnackbarMessage,
  StreamProtectionStatus,
  UMPPartId
} from '../utils/Protos.js';

import type { Part } from '../types/shared.js';
import type { SabrRequestMetadata } from '../types/sabrStreamingAdapterTypes.js';

interface Segment {
  headerId?: number;
  mediaHeader: MediaHeader;
  complete?: boolean;
  bufferedChunks: Uint8Array[];
  lastChunkSize: number;
}

export interface UmpProcessingResult {
  data?: Uint8Array;
  done: boolean;
}

type UmpPartHandler = (part: Part) => UmpProcessingResult | undefined;

/**
 * This class is responsible for reading a UMP stream, handling different part types
 * (like media headers, media data, and server directives), and populating a
 * metadata object with the extracted information. It is supposed to be used
 * in conjunction with a {@linkcode SabrPlayerAdapter} in video player
 * implementations.
 */
export class SabrUmpProcessor {
  public partialPart?: Part;
  private readonly formatInitMetadata: FormatInitializationMetadata[] = [];
  private desiredHeaderId?: number;
  private partialSegments = new Map<number, Segment>();

  private readonly umpPartHandlers = new Map<UMPPartId, UmpPartHandler>([
    [ UMPPartId.FORMAT_INITIALIZATION_METADATA, this.handleFormatInitMetadata.bind(this) ],
    [ UMPPartId.NEXT_REQUEST_POLICY, this.handleNextRequestPolicy.bind(this) ],
    [ UMPPartId.SABR_ERROR, this.handleSabrError.bind(this) ],
    [ UMPPartId.SABR_REDIRECT, this.handleSabrRedirect.bind(this) ],
    [ UMPPartId.SABR_CONTEXT_UPDATE, this.handleSabrContextUpdate.bind(this) ],
    [ UMPPartId.SABR_CONTEXT_SENDING_POLICY, this.handleSabrContextSendingPolicy.bind(this) ],
    [ UMPPartId.SNACKBAR_MESSAGE, this.handleSnackbarMessage.bind(this) ],
    [ UMPPartId.STREAM_PROTECTION_STATUS, this.handleStreamProtectionStatus.bind(this) ],
    [ UMPPartId.RELOAD_PLAYER_RESPONSE, this.handleReloadPlayerResponse.bind(this) ],
    [ UMPPartId.MEDIA_HEADER, this.handleMediaHeader.bind(this) ],
    [ UMPPartId.MEDIA, this.handleMedia.bind(this) ],
    [ UMPPartId.MEDIA_END, this.handleMediaEnd.bind(this) ]
  ]);

  constructor(
    private requestMetadata: SabrRequestMetadata,
    private cacheManager?: CacheManager
  ) { }

  /**
   * Processes a chunk of data from a UMP stream and updates the request context.
   * @returns A promise that resolves with a processing result if a terminal part is found (e.g., MediaEnd), or undefined otherwise.
   * @param value
   */
  public processChunk(value: Uint8Array): Promise<UmpProcessingResult | undefined> {
    return new Promise((resolve) => {
      let chunk;

      if (this.partialPart) {
        chunk = this.partialPart.data;
        chunk.append(value);
      } else {
        chunk = new CompositeBuffer([ value ]);
      }

      const ump = new UmpReader(chunk);

      this.partialPart = ump.read((part: Part) => {
        const handler = this.umpPartHandlers.get(part.type);
        const result = handler?.(part);
        if (result) {
          this.partialPart = undefined;
          this.desiredHeaderId = undefined;
          this.partialSegments.clear();
          resolve(result);
        }
      });

      resolve(undefined);
    });
  }

  public getSegmentInfo(): Segment | undefined {
    return this.partialSegments.get(this.desiredHeaderId || 0);
  }

  private decodePart<T>(part: Part, decoder: { decode: (data: Uint8Array) => T }): T | undefined {
    if (!part.data.chunks.length)
      return undefined;
    
    try {
      return decoder.decode(concatenateChunks(part.data.chunks));
    } catch {
      return undefined;
    }
  }

  private handleFormatInitMetadata(part: Part) {
    const formatInitMetadata = this.decodePart(part, FormatInitializationMetadata);
    if (formatInitMetadata) {
      this.formatInitMetadata.push(formatInitMetadata);
    }
    return undefined;
  }

  private handleNextRequestPolicy(part: Part) {
    const nextRequestPolicy = this.decodePart(part, NextRequestPolicy);
    if (nextRequestPolicy) {
      this.requestMetadata.streamInfo = {
        ...this.requestMetadata.streamInfo,
        nextRequestPolicy
      };
    }
    return undefined;
  }

  private handleMediaHeader(part: Part) {
    const mediaHeader = this.decodePart(part, MediaHeader);

    if (!mediaHeader) {
      return undefined;
    }

    const targetFormatKey = fromFormat(this.requestMetadata.format);
    const segmentFormatKey = fromMediaHeader(mediaHeader);

    if (!this.requestMetadata.isSABR || segmentFormatKey === targetFormatKey) {
      const segmentObj = {
        headerId: mediaHeader.headerId,
        mediaHeader: mediaHeader,
        bufferedChunks: [],
        lastChunkSize: 0
      };

      if (this.desiredHeaderId === undefined) {
        this.desiredHeaderId = mediaHeader.headerId;
      }

      this.partialSegments.set(<number>mediaHeader.headerId, segmentObj);
    }

    return undefined;
  }

  private handleMedia(part: Part) {
    const headerId = part.data.getUint8(0);
    const buffer = part.data.split(1).remainingBuffer;

    const segment = this.partialSegments.get(headerId);

    if (segment) {
      segment.lastChunkSize = buffer.getLength();
      for (const chunk of buffer.chunks) {
        segment.bufferedChunks.push(chunk);
      }
    }

    return undefined;
  }

  private handleMediaEnd(part: Part): UmpProcessingResult | undefined {
    const headerId = part.data.getUint8(0);
    const segment = this.partialSegments.get(headerId);

    if (segment && segment.headerId === this.desiredHeaderId) {
      const segmentData = concatenateChunks(segment.bufferedChunks);

      this.requestMetadata.streamInfo = {
        ...this.requestMetadata.streamInfo,
        formatInitMetadata: this.formatInitMetadata,
        mediaHeader: segment.mediaHeader
      };

      /**
       * Cache initialization segments to optimize performance. SABR responses contain larger payloads,
       * and caching the init segment reduces latency when switching between different quality levels
       * or initializing new streams.
       */
      if (this.cacheManager && this.requestMetadata.isInit && this.requestMetadata.byteRange && this.requestMetadata.format) {
        this.cacheManager.setInitSegment(
          createSegmentCacheKey(segment.mediaHeader, this.requestMetadata.format),
          segmentData
        );
        return {
          data: segmentData.slice(this.requestMetadata.byteRange.start, this.requestMetadata.byteRange.end + 1),
          done: true
        };
      }

      return {
        data: segmentData,
        done: true
      };
    }
  }

  private handleSnackbarMessage(part: Part) {
    const snackbarMessage = this.decodePart(part, SnackbarMessage);
    if (snackbarMessage) {
      this.requestMetadata.streamInfo = {
        ...this.requestMetadata.streamInfo,
        snackbarMessage
      };
    }
    return undefined;
  }

  private handleSabrError(part: Part): UmpProcessingResult {
    const sabrError = this.decodePart(part, SabrError);
    this.requestMetadata.error = { sabrError };
    return { done: true };
  }

  private handleStreamProtectionStatus(part: Part): UmpProcessingResult | undefined {
    const streamProtectionStatus = this.decodePart(part, StreamProtectionStatus);

    if (!streamProtectionStatus) {
      return undefined;
    }

    this.requestMetadata.streamInfo = {
      ...this.requestMetadata.streamInfo,
      streamProtectionStatus
    };

    if (streamProtectionStatus.status === 3) {
      return {
        done: true
      };
    }

    return undefined;
  }

  private handleReloadPlayerResponse(part: Part): UmpProcessingResult | undefined {
    const reloadPlaybackContext = this.decodePart(part, ReloadPlaybackContext);

    if (!reloadPlaybackContext) {
      return undefined;
    }

    this.requestMetadata.streamInfo = {
      ...this.requestMetadata.streamInfo,
      reloadPlaybackContext
    };

    return {
      done: true
    };
  }

  private handleSabrRedirect(part: Part): UmpProcessingResult | undefined {
    const redirect = this.decodePart(part, SabrRedirect);

    if (!redirect) {
      return undefined;
    }

    this.requestMetadata.streamInfo = {
      ...this.requestMetadata.streamInfo,
      redirect
    };

    // With just UMP, redirects should be followed immediately.
    if (this.requestMetadata.isUMP && !this.requestMetadata.isSABR) {
      return { done: true };
    }

    return undefined;
  }

  private handleSabrContextUpdate(part: Part) {
    const sabrContextUpdate = this.decodePart(part, SabrContextUpdate);
    if (sabrContextUpdate) {
      this.requestMetadata.streamInfo = {
        ...this.requestMetadata.streamInfo,
        sabrContextUpdate
      };
    }
    return undefined;
  }

  private handleSabrContextSendingPolicy(part: Part): UmpProcessingResult | undefined {
    const sabrContextSendingPolicy = this.decodePart(part, SabrContextSendingPolicy);
    if (sabrContextSendingPolicy) {
      this.requestMetadata.streamInfo = {
        ...this.requestMetadata.streamInfo,
        sabrContextSendingPolicy
      };
    }
    return undefined;
  }
}