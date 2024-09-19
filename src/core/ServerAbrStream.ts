import { UMP } from './UMP.js';
import { ChunkedDataBuffer } from './ChunkedDataBuffer.js';
import { EventEmitterLike, PART, QUALITY, base64ToU8, getFormatKey } from '../utils/index.js';

import { MediaInfo_MediaType } from '../../protos/generated/video_streaming/media_info.js';
import { VideoPlaybackAbrRequest } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import { MediaHeader } from '../../protos/generated/video_streaming/media_header.js';
import { NextRequestPolicy } from '../../protos/generated/video_streaming/next_request_policy.js';
import { FormatInitializationMetadata } from '../../protos/generated/video_streaming/format_initialization_metadata.js';
import { SabrRedirect } from '../../protos/generated/video_streaming/sabr_redirect.js';
import { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
import { StreamProtectionStatus } from '../../protos/generated/video_streaming/stream_protection_status.js';
import { PlaybackCookie } from '../../protos/generated/video_streaming/playback_cookie.js';

import type { FormatId } from '../../protos/generated/misc/common.js';
import type { MediaInfo } from '../../protos/generated/video_streaming/media_info.js';
import type { FetchFunction, InitializedFormat, InitOptions, MediaArgs, ServerAbrResponse, ServerAbrStreamOptions } from '../utils/types.js';

const DEFAULT_QUALITY = QUALITY.HD720;

export class ServerAbrStream extends EventEmitterLike {
  private fetchFunction: FetchFunction;
  private serverAbrStreamingUrl: string;
  private videoPlaybackUstreamerConfig: string;
  private poToken?: string;
  private playbackCookie?: PlaybackCookie;
  private totalDurationMs: number;
  private initializedFormats: InitializedFormat[] = [];
  private formatsByKey: Map<string, InitializedFormat> = new Map();
  private headerIdToFormatKeyMap: Map<number, string> = new Map();
  private previousSequences: Map<string, number[]> = new Map();

  constructor(args: ServerAbrStreamOptions) {
    super();
    this.fetchFunction = args.fetch || fetch;
    this.serverAbrStreamingUrl = args.serverAbrStreamingUrl;
    this.videoPlaybackUstreamerConfig = args.videoPlaybackUstreamerConfig;
    this.poToken = args.poToken;
    this.totalDurationMs = args.durationMs;
  }

  public on(event: 'end', listener: (streamData: ServerAbrResponse) => void): void;
  public on(event: 'data', listener: (streamData: ServerAbrResponse) => void): void;
  public on(event: 'error', listener: (error: Error) => void): void;
  public on(event: string, listener: (...data: any[]) => void): void {
    super.on(event, listener);
  }

  public once(event: 'end', listener: (streamData: ServerAbrResponse) => void): void;
  public once(event: 'data', listener: (streamData: ServerAbrResponse) => void): void;
  public once(event: 'error', listener: (error: Error) => void): void;
  public once(event: string, listener: (...args: any[]) => void): void {
    super.once(event, listener);
  }

  /**
   * Initializes the server ABR stream with the provided options.
   * @param args - The initialization options.
   */
  public async init(args: InitOptions) {
    const { audioFormats, videoFormats, mediaInfo: initialMediaInfo } = args;

    const firstVideoFormat = videoFormats ? videoFormats[0] : undefined;

    const mediaInfo: MediaInfo = {
      lastManualDirection: 0,
      timeSinceLastManualFormatSelectionMs: 0,
      quality: videoFormats.length === 1 ? firstVideoFormat?.width : DEFAULT_QUALITY,
      iea: videoFormats.length === 1 ? firstVideoFormat?.width : DEFAULT_QUALITY,
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
          this.previousSequences.set(`${fmt.formatId.itag};${fmt.formatId.lastModified};`, fmt.sequenceList.map((seq) => seq.sequenceNumber || 0));
        }

        if (
          !mainFormat ||
          mainFormat.sequenceCount ===
          mainFormat.sequenceList[mainFormat.sequenceList.length - 1]?.sequenceNumber
        ) {
          this.emit('end', data);
          break;
        }

        mediaInfo.startTimeMs += mainFormat.sequenceList.reduce((acc, seq) => acc + (seq.durationMs || 0), 0);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  private async fetchMedia(args: MediaArgs): Promise<ServerAbrResponse> {
    const { mediaInfo, audioFormatIds, videoFormatIds } = args;

    const body = VideoPlaybackAbrRequest.encode({
      mediaInfo: mediaInfo,
      formatIds: this.initializedFormats.map((fmt) => fmt.formatId),
      audioFormatIds: audioFormatIds,
      videoFormatIds: videoFormatIds,
      videoPlaybackUstreamerConfig: base64ToU8(this.videoPlaybackUstreamerConfig),
      streamerContext: {
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

    const response = await this.fetchFunction(this.serverAbrStreamingUrl, { method: 'POST', body });
    const data = await response.arrayBuffer();

    if (response.status !== 200 || !data.byteLength)
      throw new Error(`Received an invalid response from the server: ${response.status}`);

    return this.parseUMPResponse(new Uint8Array(data));
  }

  /**
   * Parses the UMP response data and updates the initialized formats.
   * @param response - The UMP response data as a byte array.
   */
  public async parseUMPResponse(response: Uint8Array): Promise<ServerAbrResponse> {
    this.headerIdToFormatKeyMap.clear();

    this.initializedFormats.forEach((format) => {
      format.sequenceList = [];
      format.mediaChunks = [];
    });

    let sabrError: SabrError | undefined;
    let sabrRedirect: SabrRedirect | undefined;
    let streamProtectionStatus: StreamProtectionStatus | undefined;

    const ump = new UMP(new ChunkedDataBuffer([ response ]));

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
    if (!mediaHeader.formatId) return;

    const formatKey = getFormatKey(mediaHeader.formatId);

    let currentFormat = this.formatsByKey.get(formatKey);
    if (!currentFormat) {
      this.initializedFormats.push({
        formatId: mediaHeader.formatId,
        formatKey,
        durationMs: mediaHeader.durationMs,
        mimeType: undefined,
        sequenceCount: undefined,
        sequenceList: [],
        mediaChunks: [],
        _state: {
          formatId: mediaHeader.formatId,
          startTimeMs: 0,
          durationMs: 0,
          field4: 1,
          sequenceNumber: 0
        }
      });

      this.formatsByKey.set(formatKey, this.initializedFormats[this.initializedFormats.length - 1]);

      currentFormat = this.formatsByKey.get(formatKey)!;
    }

    // FIXME: This is a hacky workaround to prevent duplicate sequences from being added. This should be fixed in the future (preferably by figuring out how to make the server not send duplicates).
    if (mediaHeader.sequenceNumber !== undefined && this.previousSequences.get(formatKey)?.includes(mediaHeader.sequenceNumber))
      return;

    // Save the header's ID so we can identify its stream data later.
    if (mediaHeader.headerId !== undefined) {
      if (!this.headerIdToFormatKeyMap.has(mediaHeader.headerId)) {
        this.headerIdToFormatKeyMap.set(mediaHeader.headerId, formatKey);
      }
    }

    if (!currentFormat.sequenceList.some((seq) => seq.sequenceNumber === (mediaHeader.sequenceNumber || 0))) {
      currentFormat.sequenceList.push({
        itag: mediaHeader.itag,
        formatId: mediaHeader.formatId,
        isInitSegment: mediaHeader.isInitSeg,
        durationMs: mediaHeader.durationMs,
        startMs: mediaHeader.startMs,
        startDataRange: mediaHeader.startDataRange,
        sequenceNumber: mediaHeader.sequenceNumber,
        contentLength: mediaHeader.contentLength,
        timeRange: mediaHeader.timeRange
      });

      if (typeof mediaHeader.sequenceNumber === 'number') {
        currentFormat._state.durationMs += mediaHeader.durationMs || 0;
        currentFormat._state.sequenceNumber += 1;
      }
    }
  }

  private processMediaData(data: ChunkedDataBuffer) {
    const headerId = data.getUint8(0);
    const streamData = data.split(1).remainingBuffer;

    const formatKey = this.headerIdToFormatKeyMap.get(headerId);
    if (!formatKey) return;

    const currentFormat = this.formatsByKey.get(formatKey);
    if (!currentFormat) return;

    currentFormat.mediaChunks.push(streamData.chunks[0]);
  }

  private processEndOfMedia(data: ChunkedDataBuffer) {
    const headerId = data.getUint8(0);
    this.headerIdToFormatKeyMap.delete(headerId);
  }

  private processNextRequestPolicy(data: Uint8Array) {
    const nextRequestPolicy = NextRequestPolicy.decode(data);
    this.playbackCookie = nextRequestPolicy.playbackCookie;
  }

  private processFormatInitialization(data: Uint8Array) {
    const formatInitializationMetadata = FormatInitializationMetadata.decode(data);
    if (!formatInitializationMetadata.formatId) return;

    const formatKey = getFormatKey(formatInitializationMetadata.formatId);

    if (!this.formatsByKey.has(formatKey)) {
      this.initializedFormats.push({
        formatId: formatInitializationMetadata.formatId,
        formatKey: getFormatKey(formatInitializationMetadata.formatId),
        durationMs: formatInitializationMetadata.durationMs,
        mimeType: formatInitializationMetadata.mimeType,
        sequenceCount: formatInitializationMetadata.field4,
        sequenceList: [],
        mediaChunks: [],
        _state: {
          formatId: formatInitializationMetadata.formatId,
          startTimeMs: 0,
          durationMs: 0,
          field4: 1,
          sequenceNumber: 0
        }
      });

      this.formatsByKey.set(formatKey, this.initializedFormats[this.initializedFormats.length - 1]);
    }
  }

  private processSabrRedirect(data: Uint8Array): SabrRedirect {
    const sabrRedirect = SabrRedirect.decode(data);
    if (!sabrRedirect.url) throw new Error('Invalid SABR redirect');
    this.serverAbrStreamingUrl = sabrRedirect.url;
    return sabrRedirect;
  }
}