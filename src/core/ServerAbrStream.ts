import { UMP } from './UMP.js';
import { EventEmitterLike, PART, base64ToU8 } from '../utils/index.js';

import { MediaInfo_MediaType } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import { VideoPlaybackAbrRequest } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import { MediaHeader } from '../../protos/generated/video_streaming/media_header.js';
import { NextRequestPolicy } from '../../protos/generated/video_streaming/next_request_policy.js';
import { FormatInitializationMetadata } from '../../protos/generated/video_streaming/format_initialization_metadata.js';
import { SabrRedirect } from '../../protos/generated/video_streaming/sabr_redirect.js';
import { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
import { StreamProtectionStatus } from '../../protos/generated/video_streaming/stream_protection_status.js';
import { PlaybackCookie } from '../../protos/generated/video_streaming/playback_cookie.js';

import type { FormatId } from '../../protos/generated/misc/common.js';
import type { MediaInfo } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import type { FetchFunction, InitializedFormat, InitOptions, MediaArgs, ServerAbrResponse, ServerAbrStreamOptions } from '../utils/types.js';
import { ChunkedDataBuffer } from './ChunkedDataBuffer.js';

export class ServerAbrStream extends EventEmitterLike {
  private fetchFn: FetchFunction;
  private serverAbrStreamingUrl: string;
  private videoPlaybackUstreamerConfig: string;
  private poToken?: string;
  private playbackCookie?: PlaybackCookie;
  private initializedFormats: InitializedFormat[] = [];
  private totalDurationMs: number;
  private prevSeqs: Map<string, number[]> = new Map();

  constructor(args: ServerAbrStreamOptions) {
    super();
    this.fetchFn = args.fetch || fetch;
    this.serverAbrStreamingUrl = args.serverAbrStreamingUrl;
    this.videoPlaybackUstreamerConfig = args.videoPlaybackUstreamerConfig;
    this.poToken = args.poToken;
    this.totalDurationMs = args.durationMs;
  }

  public on(event: 'data', listener: (data: ServerAbrResponse) => void): void;
  public on(event: 'error', listener: (error: Error) => void): void;
  public on(event: string, listener: (...args: any[]) => void): void {
    super.on(event, listener);
  }

  public once(event: 'data', listener: (data: ServerAbrResponse) => void): void;
  public once(event: 'error', listener: (error: Error) => void): void;
  public once(event: string, listener: (...args: any[]) => void): void {
    super.once(event, listener);
  }

  public async init(args: InitOptions) {
    const { audioFormats, videoFormats, mediaInfo: initialMediaInfo } = args;

    const firstVideoFormat = videoFormats ? videoFormats[0] : undefined;

    const mediaInfo: MediaInfo = {
      lastManualDirection: 0,
      timeSinceLastManualFormatSelectionMs: 0,
      videoWidth: videoFormats.length === 1 ? firstVideoFormat?.width : 720,
      iea: videoFormats.length === 1 ? firstVideoFormat?.width : 720,
      startTimeMs: 0,
      visibility: 0,
      mediaType: MediaInfo_MediaType.MEDIA_TYPE_DEFAULT,
      ...initialMediaInfo
    };

    const audioFormatIds = audioFormats.map<FormatId>((fmt) => ({
      itag: fmt.itag,
      lastModified: parseInt(fmt.lastModified),
      xtags: fmt.xtags
    }));

    const videoFormatIds = videoFormats.map<FormatId>((fmt) => ({
      itag: fmt.itag,
      lastModified: parseInt(fmt.lastModified),
      xtags: fmt.xtags
    }));

    if (typeof mediaInfo.startTimeMs !== 'number')
      throw new Error('Invalid media start time');

    try {
      while (mediaInfo.startTimeMs < this.totalDurationMs) {
        const data = await this.fetchMedia({ mediaInfo, audioFormatIds, videoFormatIds });

        this.emit('data', data);

        if (data.sabrError) break;

        const mainFormat =
          mediaInfo.mediaType === MediaInfo_MediaType.MEDIA_TYPE_DEFAULT
            ? data.initializedFormats.find((fmt) => fmt.mimeType?.includes('video'))
            : data.initializedFormats[0];

        for (const fmt of data.initializedFormats) {
          this.prevSeqs.set(`${fmt.formatId.itag};${fmt.formatId.lastModified};`, fmt.sequenceList.map((seq) => seq.sequenceNumber || 0));
        }

        if (!mainFormat) break;
        if (
          mainFormat?.sequenceCount ===
          mainFormat.sequenceList[mainFormat.sequenceList.length - 1].sequenceNumber
        )
          break;

        mediaInfo.startTimeMs += mainFormat.sequenceList.reduce((acc, seq) => acc + (seq.durationMs || 0), 0);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  private async fetchMedia(args: MediaArgs): Promise<ServerAbrResponse> {
    const { mediaInfo, audioFormatIds, videoFormatIds } = args;

    this.initializedFormats.forEach((format) => {
      format.sequenceList = [];
      format.mediaData = new Uint8Array(0);
    });

    const body = VideoPlaybackAbrRequest.encode({
      mediaInfo: mediaInfo,
      formatIds: this.initializedFormats.map((fmt) => fmt.formatId),
      audioFormatIds: audioFormatIds,
      videoFormatIds: videoFormatIds,
      videoPlaybackUstreamerConfig: base64ToU8(this.videoPlaybackUstreamerConfig),
      sc: {
        field5: [],
        field6: [],
        poToken: this.poToken ? base64ToU8(this.poToken) : undefined,
        playbackCookie: this.playbackCookie ? PlaybackCookie.encode(this.playbackCookie).finish() : undefined,
        clientInfo: {
          clientName: 1,
          clientVersion: '2.2040620.05.00',
          osName: 'Windows',
          osVersion: '10.0'
        }
      },
      ud: this.initializedFormats.map((fmt) => fmt._state),
      field1000: []
    }).finish();

    const response = await this.fetchFn(this.serverAbrStreamingUrl, { method: 'POST', body });
    const data = await response.arrayBuffer();

    return this.processUMPResponse(new Uint8Array(data));
  }

  public async processUMPResponse(data: Uint8Array): Promise<ServerAbrResponse> {
    let sabrError: SabrError | undefined;
    let sabrRedirect: SabrRedirect | undefined;
    let streamProtectionStatus: StreamProtectionStatus | undefined;

    const ump = new UMP(new ChunkedDataBuffer([ data ]));

    ump.parse((part) => {
      const data = part.data.chunks[0];
      switch (part.type) {
        case PART.MEDIA_HEADER:
          this.processMediaHeader(data);
          break;
        case PART.MEDIA:
          this.processMediaData(part.data);
          break;
        case PART.MEDIA_END:
          this.processEndOfMedia(part.data);
          break;
        case PART.NEXT_REQUEST_POLICY:
          this.processNextRequestPolicy(data);
          break;
        case PART.FORMAT_INITIALIZATION_METADATA:
          this.processFormatInitialization(data);
          break;
        case PART.SABR_ERROR:
          sabrError = SabrError.decode(data);
          break;
        case PART.SABR_REDIRECT:
          sabrRedirect = this.processSabrRedirect(data);
          break;
        case PART.STREAM_PROTECTION_STATUS:
          streamProtectionStatus = StreamProtectionStatus.decode(data);
          break;
        default:
          break;
      }
    });

    return {
      initializedFormats: this.initializedFormats,
      streamProtectionStatus,
      sabrRedirect,
      sabrError
    };
  }

  private processMediaHeader(data: Uint8Array) {
    const mediaHeader = MediaHeader.decode(data);
    const targetFormat = this.initializedFormats.find((fmt) => fmt.formatId.itag === mediaHeader.itag);

    if (!targetFormat) return;

    // Skip processing if this is an init segment and we've already received it.
    if (mediaHeader.isInitSeg) {
      if (!targetFormat.initSegment) {
        targetFormat._initSegmentMediaId = mediaHeader.headerId;
      } else return;
    }

    // FIXME: This is a hacky workaround to prevent duplicate sequences from being added. This should be fixed in the future (preferably by figuring out how to make the server not send duplicates).
    if (mediaHeader.sequenceNumber && this.prevSeqs.get(`${targetFormat.formatId.itag};${targetFormat.formatId.lastModified};`)?.includes(mediaHeader.sequenceNumber))
      return;

    // Save the header's ID so we can identify its media data later.
    if (!targetFormat._headerIds.has(mediaHeader.headerId || 0))
      targetFormat._headerIds.add(mediaHeader.headerId || 0);

    if (
      mediaHeader.sequenceNumber &&
      !targetFormat.sequenceList.some((seq) => seq.sequenceNumber === mediaHeader.sequenceNumber)
    ) {
      targetFormat.sequenceList.push({
        itag: mediaHeader.itag,
        formatId: mediaHeader.formatId,
        durationMs: mediaHeader.durationMs,
        startMs: mediaHeader.startMs,
        startDataRange: mediaHeader.startDataRange,
        sequenceNumber: mediaHeader.sequenceNumber,
        contentLength: mediaHeader.contentLength,
        timeRange: mediaHeader.timeRange
      });

      this.initializedFormats.forEach((item) => {
        if (item._state && item.formatId.itag === mediaHeader.itag) {
          item._state.durationMs += mediaHeader.durationMs || 0;
          item._state.field5 += 1;
        }
      });
    }
  }

  private processMediaData(data: ChunkedDataBuffer) {
    const headerId = data.getUint8(0);
    const streamData = data.split(1).remainingBuffer;

    const targetFormat = this.initializedFormats.find((fmt) => fmt._headerIds.has(headerId));
    if (!targetFormat)
      return;

    const isInitSegData = targetFormat._initSegmentMediaId === headerId;
    if (targetFormat.initSegment && isInitSegData)
      return;

    if (isInitSegData) {
      targetFormat.initSegment = streamData.chunks[0];
      delete targetFormat._initSegmentMediaId;
      return;
    }

    const combinedLength = targetFormat.mediaData.length + streamData.chunks[0].length;
    const tempMediaData = new Uint8Array(combinedLength);

    tempMediaData.set(targetFormat.mediaData);
    tempMediaData.set(streamData.chunks[0], targetFormat.mediaData.length);

    targetFormat.mediaData = tempMediaData;
  }

  private processEndOfMedia(data: ChunkedDataBuffer) {
    const headerId = data.getUint8(0);
    const targetFormat = this.initializedFormats.find((fmt) => fmt._headerIds.has(headerId));
    if (targetFormat) targetFormat._headerIds.delete(headerId);
  }

  private processNextRequestPolicy(data: Uint8Array) {
    const nextRequestPolicy = NextRequestPolicy.decode(data);
    this.playbackCookie = nextRequestPolicy.playbackCookie;
  }

  private processFormatInitialization(data: Uint8Array) {
    const formatInitializationMetadata = FormatInitializationMetadata.decode(data);
    if (
      formatInitializationMetadata.formatId &&
      !this.initializedFormats.some((item) => item.formatId.itag === formatInitializationMetadata.formatId?.itag)
    ) {
      this.initializedFormats.push({
        formatId: formatInitializationMetadata.formatId,
        durationMs: formatInitializationMetadata.durationMs,
        mimeType: formatInitializationMetadata.mimeType,
        sequenceCount: formatInitializationMetadata.field4,
        sequenceList: [],
        mediaData: new Uint8Array(),
        // Only meant to be used internally.
        _headerIds: new Set<number>(),
        _state: {
          formatId: formatInitializationMetadata.formatId,
          startTimeMs: 0,
          durationMs: 0,
          field4: 1,
          field5: 0
        }
      });
    }
  }

  private processSabrRedirect(data: Uint8Array): SabrRedirect {
    const sabrRedirect = SabrRedirect.decode(data);
    if (!sabrRedirect.url) throw new Error('Invalid SABR redirect');
    this.serverAbrStreamingUrl = sabrRedirect.url;
    return sabrRedirect;
  }
}