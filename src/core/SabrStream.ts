import {
  FormatInitializationMetadata,
  MediaHeader,
  NextRequestPolicy,
  PlaybackCookie,
  ReloadPlaybackContext,
  SabrContextSendingPolicy,
  SabrContextUpdate,
  SabrContextWritePolicy,
  SabrError,
  SabrRedirect,
  StreamProtectionStatus,
  VideoPlaybackAbrRequest,
  UMPPartId
} from '../utils/Protos.js';

import type {
  BufferedRange,
  ClientAbrState,
  ClientInfo
} from '../utils/Protos.js';

import type {
  SabrPlaybackOptions,
  SabrStreamConfig
} from '../types/sabrStreamTypes.js';

import type { FetchFunction, Part, SabrFormat } from '../types/shared.js';

import {
  MAX_INT32_VALUE,
  EnabledTrackTypes,
  base64ToU8,
  EventEmitterLike,
  Logger,
  wait
} from '../utils/index.js';

import * as FormatKeyUtils from '../utils/formatKeyUtils.js';
import { chooseFormat, getMediaType, getTotalDownloadedDuration } from '../utils/sabrStreamUtils.js';
import { CompositeBuffer } from './CompositeBuffer.js';
import { UmpReader } from './UmpReader.js';

const TAG = 'SabrStream';
const DEFAULT_MAX_RETRIES = 10;
const MAX_BACKOFF_MS = 8000;
const BACKOFF_MULTIPLIER = 500;
const DEFAULT_STALL_DETECTION_MS = 30000;
const MAX_STALLS = 5;

type UmpPartHandler = (part: Part) => void;

export interface InitializedFormat {
  formatInitializationMetadata: FormatInitializationMetadata;
  downloadedSegments: Map<number, Segment>;
  lastMediaHeaders: MediaHeader[];
}

export interface SabrStreamState {
  durationMs: number;
  requestNumber: number;
  playerTimeMs: number;
  activeSabrContexts: number[];
  sabrContextUpdates: Array<[ number, SabrContextUpdate ]>;
  formatToDiscard?: string;
  cachedBufferedRanges: BufferedRange[];
  nextRequestPolicy?: NextRequestPolicy;
  initializedFormats: Array<{
    formatKey: string;
    formatInitializationMetadata: FormatInitializationMetadata;
    downloadedSegments: Array<[ number, Segment ]>;
    lastMediaHeaders: MediaHeader[];
  }>;
}

interface SelectedFormats {
  videoFormat: SabrFormat;
  audioFormat: SabrFormat;
}

interface Segment {
  formatIdKey: string;
  segmentNumber: number;
  durationMs?: number;
  mediaHeader: MediaHeader;
  bufferedChunks: Uint8Array[];
}

interface ProgressTracker {
  lastProgressTime: number;
  lastDownloadedDuration: number;
  stallCount: number;
}

/**
 * Manages the download and processing of YouTube's Server-Adaptive Bitrate (SABR) streams.
 *
 * This class handles the entire lifecycle of a SABR stream:
 * - Selecting appropriate video and audio formats.
 * - Making network requests to fetch media segments.
 * - Processing UMP parts in real-time.
 * - Handling server-side directives like redirects, context updates, and backoff policies.
 * - Emitting events for key stream updates, such as format initialization and errors.
 * - Providing separate `ReadableStream` instances for video and audio data.
 */
export class SabrStream extends EventEmitterLike {
  private readonly logger = Logger.getInstance();
  private readonly fetchFunction: FetchFunction;
  private readonly formatIds: SabrFormat[] = [];
  private readonly videoStream: ReadableStream<Uint8Array>;
  private readonly audioStream: ReadableStream<Uint8Array>;
  private readonly umpPartHandlers = new Map<UMPPartId, UmpPartHandler>([
    [ UMPPartId.FORMAT_INITIALIZATION_METADATA, this.handleFormatInitializationMetadata.bind(this) ],
    [ UMPPartId.NEXT_REQUEST_POLICY, this.handleNextRequestPolicy.bind(this) ],
    [ UMPPartId.SABR_ERROR, this.handleSabrError.bind(this) ],
    [ UMPPartId.SABR_REDIRECT, this.handleSabrRedirect.bind(this) ],
    [ UMPPartId.SABR_CONTEXT_UPDATE, this.handleSabrContextUpdate.bind(this) ],
    [ UMPPartId.SABR_CONTEXT_SENDING_POLICY, this.handleSabrContextSendingPolicy.bind(this) ],
    [ UMPPartId.STREAM_PROTECTION_STATUS, this.handleStreamProtectionStatus.bind(this) ],
    [ UMPPartId.RELOAD_PLAYER_RESPONSE, this.handleReloadPlayerResponse.bind(this) ],
    [ UMPPartId.MEDIA_HEADER, this.handleMediaHeader.bind(this) ],
    [ UMPPartId.MEDIA, this.handleMedia.bind(this) ],
    [ UMPPartId.MEDIA_END, this.handleMediaEnd.bind(this) ]
  ]);

  private serverAbrStreamingUrl?: string;
  private videoPlaybackUstreamerConfig?: string;
  private clientInfo?: ClientInfo;
  private poToken?: string;

  private nextRequestPolicy?: NextRequestPolicy;
  private streamProtectionStatus?: StreamProtectionStatus;
  private sabrContexts = new Map<number, SabrContextUpdate>();
  private activeSabrContextTypes = new Set<number>();
  private initializedFormatsMap = new Map<string, InitializedFormat>();
  private abortController?: AbortController;
  private partialSegmentQueue = new Map<number, Segment>();
  private requestNumber = 0;
  private durationMs = Infinity;
  private cachedBufferedRanges: BufferedRange[] | undefined;
  private formatToDiscard?: string;
  private mediaHeadersProcessed = false;
  private mainFormat?: InitializedFormat;
  private _errored = false;
  private _aborted = false;

  private progressTracker: ProgressTracker = {
    lastProgressTime: Date.now(),
    lastDownloadedDuration: 0,
    stallCount: 0
  };

  private videoController?: ReadableStreamDefaultController<Uint8Array>;
  private audioController?: ReadableStreamDefaultController<Uint8Array>;

  /**
   * Fired when the server sends initialization metadata for a media format.
   * @event
   */
  public on(event: 'formatInitialization', listener: (initializedFormat: InitializedFormat) => void): void;
  /**
   * Fired when the server provides an update on the stream's content protection status.
   * @event
   */
  public on(event: 'streamProtectionStatusUpdate', listener: (data: StreamProtectionStatus) => void): void;
  /**
   * Fired when the server directs the client to reload the player, usually indicating the current session is invalid.
   * @event
   */
  public on(event: 'reloadPlayerResponse', listener: (reloadPlaybackContext: ReloadPlaybackContext) => void): void;
  /**
   * Fired when the entire stream has been successfully downloaded.
   * @event
   */
  public on(event: 'finish', listener: () => void): void;
  /**
   * Fired when the download process is manually aborted via the `abort()` method.
   * @event
   */
  public on(event: 'abort', listener: () => void): void;
  public on(event: string, listener: (...data: any[]) => void): void {
    super.on(event, listener);
  }

  public once(event: 'formatInitialization', listener: (initializedFormat: InitializedFormat) => void): void;
  public once(event: 'streamProtectionStatusUpdate', listener: (data: StreamProtectionStatus) => void): void;
  public once(event: 'reloadPlayerResponse', listener: (reloadPlaybackContext: ReloadPlaybackContext) => void): void;
  public once(event: 'finish', listener: () => void): void;
  public once(event: 'abort', listener: () => void): void;
  public once(event: string, listener: (...args: any[]) => void): void {
    super.once(event, listener);
  }

  constructor(config: SabrStreamConfig = {}) {
    super();
    this.fetchFunction = config?.fetch || fetch;
    this.serverAbrStreamingUrl = config.serverAbrStreamingUrl;
    this.videoPlaybackUstreamerConfig = config.videoPlaybackUstreamerConfig;
    this.clientInfo = config.clientInfo;
    this.poToken = config.poToken;
    this.durationMs = config.durationMs || Infinity;
    this.formatIds = config.formats || [];

    this.videoStream = new ReadableStream({
      start: (controller) => {
        this.videoController = controller;
      }
    });

    this.audioStream = new ReadableStream({
      start: (controller) => {
        this.audioController = controller;
      }
    });
  }

  /**
   * Sets Proof of Origin (PO) token.
   * @param poToken - The base64-encoded token string.
   */
  public setPoToken(poToken: string): void {
    this.poToken = poToken;
  }

  /**
   * Sets the available server ABR formats.
   * @param formats - An array of available SabrFormat objects.
   */
  public setServerAbrFormats(formats: SabrFormat[]): void {
    this.formatIds.push(...formats);
  }

  /**
   * Sets the total duration of the stream in milliseconds.
   * This is optional as duration is often determined automatically from format metadata.
   * @param durationMs - The duration in milliseconds.
   */
  public setDurationMs(durationMs: number): void {
    this.durationMs = durationMs;
  }

  /**
   * Sets the server ABR streaming URL for media requests.
   * @param url - The streaming URL.
   */
  public setStreamingURL(url: string): void {
    this.serverAbrStreamingUrl = url;
  }

  /**
   * Sets the Ustreamer configuration string.
   * @param config - The Ustreamer configuration.
   */
  public setUstreamerConfig(config: string): void {
    this.videoPlaybackUstreamerConfig = config;
  }

  /**
   * Sets the client information used in SABR requests.
   * @param clientInfo - The client information object.
   */
  public setClientInfo(clientInfo: ClientInfo): void {
    this.clientInfo = clientInfo;
  }

  /**
   * Aborts the download process, closing all streams and cleaning up resources.
   * Emits an 'abort' event.
   */
  public abort(): void {
    this.logger.debug(TAG, 'Aborting download process');

    this._aborted = true;

    this.abortController?.abort();

    this.videoController?.error(new Error('Download aborted.'));
    this.audioController?.error(new Error('Download aborted.'));

    this.resetState();

    this.emit('abort');
  }

  //#region --- Stream Initialization and Lifecycle Control ---

  /**
   * Returns a serializable state object that can be used to restore the stream later.
   * @throws {Error} If the main format is not initialized.
   * @returns The current state of the stream.
   */
  public getState(): SabrStreamState {
    if (!this.mainFormat)
      throw new Error('Main format is not initialized, cannot get state.');

    const playerTimeMs = getTotalDownloadedDuration(this.mainFormat);
    const initializedFormats: SabrStreamState['initializedFormats'] = [];

    for (const [ formatKey, format ] of this.initializedFormatsMap.entries()) {
      initializedFormats.push({
        formatKey,
        formatInitializationMetadata: format.formatInitializationMetadata,
        downloadedSegments: Array.from(format.downloadedSegments.entries()),
        lastMediaHeaders: format.lastMediaHeaders
      });
    }

    return {
      durationMs: this.durationMs,
      requestNumber: this.requestNumber,
      activeSabrContexts: Array.from(this.activeSabrContextTypes),
      sabrContextUpdates: Array.from(this.sabrContexts.entries()),
      formatToDiscard: this.formatToDiscard,
      cachedBufferedRanges: this.cachedBufferedRanges || [],
      nextRequestPolicy: this.nextRequestPolicy,
      initializedFormats,
      playerTimeMs
    };
  }

  /**
   * Initiates the streaming process for the selected formats.
   * @param options - Playback options, including format preferences and initial state.
   * @throws {Error} If no suitable formats are found or streaming fails.
   * @returns A promise that resolves with the video/audio streams and selected formats.
   */
  public async start(options: SabrPlaybackOptions): Promise<{
    videoStream: ReadableStream<Uint8Array>;
    audioStream: ReadableStream<Uint8Array>;
    selectedFormats: SelectedFormats;
  }> {
    const { videoFormat, audioFormat } = this.selectFormats(options);
    this.setupStreamingProcess(videoFormat, audioFormat, options).then();
    return {
      videoStream: this.videoStream,
      audioStream: this.audioStream,
      selectedFormats: { videoFormat, audioFormat }
    };
  }

  /**
   * Sets up and manages the main streaming loop.
   * @param videoFormat - The selected video format.
   * @param audioFormat - The selected audio format.
   * @param options - Playback options.
   * @private
   */
  private async setupStreamingProcess(
    videoFormat: SabrFormat,
    audioFormat: SabrFormat,
    options: SabrPlaybackOptions
  ): Promise<void> {
    try {
      this._errored = false;
      this._aborted = false;

      let playerTimeMs = 0;

      if (options.state && this.restoreState(videoFormat, audioFormat, options.state)) {
        playerTimeMs = options.state.playerTimeMs || 0;
      }

      const maxRetries = options.maxRetries !== undefined ? options.maxRetries : DEFAULT_MAX_RETRIES;
      const enabledTrackTypesBitfield = options.enabledTrackTypes ?? EnabledTrackTypes.VIDEO_AND_AUDIO;

      const abrState = {
        playerTimeMs,
        audioTrackId: audioFormat.audioTrackId,
        playbackRate: 1,
        stickyResolution: videoFormat.height || 360,
        drcEnabled: audioFormat.isDrc,
        clientViewportIsFlexible: false,
        visibility: 1,
        enabledTrackTypesBitfield
      };

      // NOTE: 0 - video & audio, 1 - audio only, 2 - video only
      if (abrState.enabledTrackTypesBitfield === 1 || abrState.enabledTrackTypesBitfield === 2) {
        this.formatToDiscard = abrState.enabledTrackTypesBitfield === 1 ?
          FormatKeyUtils.fromFormat(videoFormat) :
          FormatKeyUtils.fromFormat(audioFormat);
      }

      while (abrState.playerTimeMs < this.durationMs) {
        if (this._aborted) {
          this.logger.debug(TAG, 'Download process aborted, exiting streaming loop.');
          break;
        }

        this.logger.debug(TAG, `Starting new segment fetch at playback position: ${abrState.playerTimeMs}ms`);

        this.mainFormat = abrState.enabledTrackTypesBitfield === 1 ?
          this.initializedFormatsMap.get(FormatKeyUtils.fromFormat(audioFormat) || '') :
          this.initializedFormatsMap.get(FormatKeyUtils.fromFormat(videoFormat) || '');

        if (this.mainFormat)
          this.validateAndCorrectDuration(this.mainFormat.formatInitializationMetadata);

        abrState.playerTimeMs = this.mainFormat ? getTotalDownloadedDuration(this.mainFormat) : 0;

        this.checkForStall({
          playerTimeMs: abrState.playerTimeMs,
          stallDetectionMs: options.stallDetectionMs
        });

        const success = await this.executeWithRetry(
          () => this.fetchAndProcessSegments(
            abrState,
            audioFormat,
            videoFormat
          ),
          maxRetries
        );

        if (!success) break;
      }
    } catch (error) {
      if (!this._aborted) {
        this.errorHandler(error as Error, true);
      }
    } finally {
      if (!this._aborted) {
        this.validateDownloadedSegments();
        if (!this._errored) {
          this.videoController?.close();
          this.audioController?.close();
        }
        this.resetState();
        this.emit('finish');
      }
    }
  }

  /**
   * Restores the stream state from a previously saved state object.
   * @param videoFormat - The selected video format.
   * @param audioFormat - The selected audio format.
   * @param state - The saved state object.
   * @returns `true` if the state was restored successfully, `false` otherwise.
   * @private
   */
  private restoreState(
    videoFormat: SabrFormat,
    audioFormat: SabrFormat,
    state: SabrStreamState
  ): boolean {
    this.resetState();

    if (!state || typeof state !== 'object' || !state.initializedFormats || !Array.isArray(state.initializedFormats) || !state.durationMs || !state.playerTimeMs) {
      this.logger.warn(TAG, 'Invalid or corrupt state object provided. Starting fresh.');
      return false;
    }

    const expectedVideoFormatKey = FormatKeyUtils.fromFormat(videoFormat) || '';
    const expectedAudioFormatKey = FormatKeyUtils.fromFormat(audioFormat) || '';

    for (const format of state.initializedFormats) {
      const { formatKey, formatInitializationMetadata, downloadedSegments, lastMediaHeaders } = format;

      if (formatKey !== expectedVideoFormatKey && formatKey !== expectedAudioFormatKey) {
        this.logger.warn(TAG, `State contains an unexpected format key "${formatKey}". It will be ignored.`);
        continue;
      }

      this.initializedFormatsMap.set(formatKey, {
        formatInitializationMetadata,
        downloadedSegments: new Map(downloadedSegments),
        lastMediaHeaders: lastMediaHeaders || []
      });
    }

    if (!this.initializedFormatsMap.has(expectedVideoFormatKey) || !this.initializedFormatsMap.has(expectedAudioFormatKey)) {
      this.logger.warn(TAG, 'State is missing required format data for the selected video/audio formats. Starting fresh.');
      this.resetState();
      return false;
    }

    this.durationMs = state.durationMs;
    this.requestNumber = state.requestNumber || 0;
    this.activeSabrContextTypes = new Set(state.activeSabrContexts || []);
    this.sabrContexts = new Map(state.sabrContextUpdates || []);
    this.formatToDiscard = state.formatToDiscard;
    this.cachedBufferedRanges = state.cachedBufferedRanges || [];
    this.nextRequestPolicy = state.nextRequestPolicy;

    return true;
  }

  /**
   * Checks if the download has stalled by tracking progress over time.
   * @param options - Configuration for stall detection.
   * @returns `true` if a stall was detected but is within the retry limit, `false` otherwise.
   * @throws {Error} If the maximum number of consecutive stalls is reached.
   * @private
   */
  private checkForStall(options: {
    stallDetectionMs?: number,
    playerTimeMs: number
  }): boolean {
    const currentTime = Date.now();
    const currentProgress = options.playerTimeMs;
    const stallThreshold = options.stallDetectionMs || DEFAULT_STALL_DETECTION_MS;

    if (currentProgress > this.progressTracker.lastDownloadedDuration) {
      this.progressTracker.lastProgressTime = currentTime;
      this.progressTracker.lastDownloadedDuration = currentProgress;
      this.progressTracker.stallCount = 0;
      return false;
    } else if (currentTime - this.progressTracker.lastProgressTime > stallThreshold) {
      this.progressTracker.stallCount++;
      this.logger.warn(TAG, `Stream stalled for ${stallThreshold}ms (stall #${this.progressTracker.stallCount})`);

      if (this.progressTracker.stallCount >= MAX_STALLS) {
        throw new Error(`Stream stalled ${MAX_STALLS} times, aborting`);
      }

      this.progressTracker.lastProgressTime = currentTime;
      return true;
    }

    return false;
  }

  /**
   * Selects the best video and audio formats based on provided options.
   * @param options - Format selection options and quality preferences.
   * @throws {Error} If no suitable formats are found or the duration is invalid.
   * @returns The selected video and audio formats.
   * @private
   */
  private selectFormats(options: SabrPlaybackOptions): SelectedFormats {
    const videoFormat = chooseFormat(this.formatIds, options.videoFormat, {
      quality: options.videoQuality,
      preferWebM: options.preferWebM,
      preferH264: options.preferH264,
      preferMP4: options.preferMP4,
      isAudio: false
    });

    const audioFormat = chooseFormat(this.formatIds, options.audioFormat, {
      quality: options.audioQuality,
      language: options.audioLanguage,
      preferOpus: options.preferOpus,
      preferMP4: options.preferMP4,
      preferWebM: options.preferWebM,
      isAudio: true
    });

    if (this.durationMs < 0) {
      throw new Error('Invalid duration');
    }

    if (!videoFormat || !audioFormat) {
      throw new Error('No suitable formats found for download');
    }

    return { videoFormat, audioFormat };
  }
  //#endregion

  //#region --- Segment Fetching and Network Communication ---

  /**
   * Fetches and processes media segments from the server for the current ABR state.
   * @param abrState - The current client adaptive bitrate state.
   * @param selectedAudioFormat - The selected audio format.
   * @param selectedVideoFormat - The selected video format.
   * @throws {Error} If the server returns an error or no valid data.
   * @private
   */
  private async fetchAndProcessSegments(
    abrState: ClientAbrState,
    selectedAudioFormat: SabrFormat,
    selectedVideoFormat: SabrFormat
  ): Promise<void> {
    const initializedVideoFormat = this.initializedFormatsMap.get(FormatKeyUtils.fromFormat(selectedVideoFormat) || '');
    const initializedAudioFormat = this.initializedFormatsMap.get(FormatKeyUtils.fromFormat(selectedAudioFormat) || '');

    // Cache buffered ranges in case the request fails, allowing retries to use the same values.
    if (!this.cachedBufferedRanges?.length) {
      this.cachedBufferedRanges = this.buildBufferedRanges(initializedVideoFormat, initializedAudioFormat);
    }

    const requestBody = this.buildRequestBody(abrState, selectedAudioFormat, selectedVideoFormat);

    this.mediaHeadersProcessed = false;
    const response = await this.makeStreamingRequest(requestBody);
    const processedParts = await this.processStreamingResponse(response);

    if (!processedParts.length) {
      throw new Error('No valid parts received from server.');
    } else if ((this.streamProtectionStatus?.status || 0) >= 2 && !processedParts.includes(UMPPartId.MEDIA)) {
      throw new Error('No media parts or protocol updates received from server.');
    }

    if (
      processedParts.includes(UMPPartId.MEDIA_HEADER) &&
      (initializedVideoFormat?.lastMediaHeaders?.length && initializedAudioFormat?.lastMediaHeaders?.length) ||
      (abrState.enabledTrackTypesBitfield !== 0 && this.mainFormat?.lastMediaHeaders?.length)
    ) {
      this.mediaHeadersProcessed = true;
    }
  }

  /**
   * Constructs an array of `BufferedRange` objects from initialized formats.
   * @param initializedVideoFormat - The initialized video format, if available.
   * @param initializedAudioFormat - The initialized audio format, if available.
   * @returns An array of `BufferedRange` objects.
   * @private
   */
  private buildBufferedRanges(
    initializedVideoFormat?: InitializedFormat,
    initializedAudioFormat?: InitializedFormat
  ): BufferedRange[] {
    const bufferedRanges: BufferedRange[] = [];
    const formats = [ initializedVideoFormat, initializedAudioFormat ];

    for (const initializedFormat of formats) {
      if (!initializedFormat?.lastMediaHeaders.length) {
        continue;
      }

      if (
        // Skip formats marked for discarding; a dummy range will be created for them later.
        FormatKeyUtils.fromFormatInitializationMetadata(initializedFormat.formatInitializationMetadata) === this.formatToDiscard
      ) {
        continue;
      }

      const mediaHeaders = initializedFormat.lastMediaHeaders;
      const durationMs = mediaHeaders.reduce((sum, header) => sum + (header.durationMs || 0), 0);

      bufferedRanges.push({
        durationMs,
        formatId: initializedFormat.formatInitializationMetadata.formatId,
        startTimeMs: mediaHeaders[0].startMs || 0,
        startSegmentIndex: mediaHeaders[0].sequenceNumber || 1,
        endSegmentIndex: mediaHeaders[mediaHeaders.length - 1].sequenceNumber || 1,
        timeRange: {
          durationTicks: durationMs,
          startTicks: mediaHeaders[0].startMs,
          timescale: mediaHeaders[0].timeRange?.timescale
        }
      });

      initializedFormat.lastMediaHeaders = [];
    }

    return bufferedRanges;
  }

  /**
   * Builds the protobuf request body for a `VideoPlaybackAbrRequest`.
   * @param abrState - The current client adaptive bitrate state.
   * @param selectedAudioFormat - The selected audio format.
   * @param selectedVideoFormat - The selected video format.
   * @returns The encoded request body as a `Uint8Array`.
   * @throws {Error} If required configuration (ustreamer config, client info) is missing.
   * @private
   */
  private buildRequestBody(
    abrState: ClientAbrState,
    selectedAudioFormat: SabrFormat,
    selectedVideoFormat: SabrFormat
  ): Uint8Array {
    if (!this.videoPlaybackUstreamerConfig)
      throw new Error('Video playback ustreamer config must be set before starting.');
    if (!this.clientInfo)
      throw new Error('Client info must be set before starting.');

    const bufferedRanges = this.cachedBufferedRanges || [];
    const { sabrContexts, unsentSabrContexts } = this.prepareSabrContexts();

    const { selectedFormatIds, updatedBufferedRanges } = this.prepareFormatSelections(
      [ selectedVideoFormat, selectedAudioFormat ],
      bufferedRanges
    );

    return VideoPlaybackAbrRequest.encode({
      clientAbrState: abrState,
      preferredAudioFormatIds: [ selectedAudioFormat ],
      preferredVideoFormatIds: [ selectedVideoFormat ],
      preferredSubtitleFormatIds: [],
      selectedFormatIds,
      videoPlaybackUstreamerConfig: base64ToU8(this.videoPlaybackUstreamerConfig),
      streamerContext: {
        sabrContexts,
        unsentSabrContexts,
        poToken: this.poToken ? base64ToU8(this.poToken) : undefined,
        playbackCookie: this.nextRequestPolicy?.playbackCookie ? PlaybackCookie.encode(this.nextRequestPolicy.playbackCookie).finish() : undefined,
        clientInfo: this.clientInfo
      },
      bufferedRanges: updatedBufferedRanges,
      field1000: []
    }).finish();
  }

  /**
   * Prepares SABR context data for the request body.
   * @returns An object containing active and unsent SABR contexts.
   * @private
   */
  private prepareSabrContexts() {
    const sabrContexts: SabrContextUpdate[] = [];
    const unsentSabrContexts: number[] = [];

    for (const ctxUpdate of this.sabrContexts.values()) {
      if (this.activeSabrContextTypes.has(<number>ctxUpdate.type)) {
        sabrContexts.push(ctxUpdate);
      } else {
        unsentSabrContexts.push(<number>ctxUpdate.type);
      }
    }

    return { sabrContexts, unsentSabrContexts };
  }

  /**
   * Prepares format selections and buffered ranges for the request body.
   * @param formats - An array of formats to process.
   * @param currentBufferedRanges - The current buffered ranges to update.
   * @returns An object with selected format IDs and updated buffered ranges.
   * @private
   */
  private prepareFormatSelections(
    formats: SabrFormat[],
    currentBufferedRanges: BufferedRange[]
  ): { selectedFormatIds: SabrFormat[], updatedBufferedRanges: BufferedRange[] } {
    const selectedFormatIds: SabrFormat[] = [];
    const updatedBufferedRanges = [ ...currentBufferedRanges ];
    const formatsInitialized = this.initializedFormatsMap.size > 0;

    for (const format of formats) {
      const formatKey = FormatKeyUtils.fromFormat(format);
      const shouldDiscard = this.formatToDiscard && formatKey === this.formatToDiscard;

      if (shouldDiscard) {
        updatedBufferedRanges.push({
          formatId: format,
          durationMs: MAX_INT32_VALUE,
          startTimeMs: 0,
          startSegmentIndex: MAX_INT32_VALUE,
          endSegmentIndex: MAX_INT32_VALUE,
          timeRange: {
            durationTicks: MAX_INT32_VALUE,
            startTicks: 0,
            timescale: 1000
          }
        });
      }

      // Only add format to selectedFormatIds when either:
      // 1. Formats have been initialized (indicating we've received their metadata).
      // 2. This format should be discarded (we want the server to acknowledge it's fully buffered).
      if (formatsInitialized || shouldDiscard) {
        selectedFormatIds.push(format);
      }
    }

    return { selectedFormatIds, updatedBufferedRanges };
  }

  /**
   * Executes a streaming POST request to the server.
   * @param body - The request body payload.
   * @returns A `Promise` that resolves with the server `Response`.
   * @throws {Error} If the server ABR streaming URL is not configured or the request fails.
   * @private
   */
  private async makeStreamingRequest(body: Uint8Array): Promise<Response> {
    if (!this.serverAbrStreamingUrl) {
      throw new Error('Server ABR streaming URL not configured.');
    }

    const url = new URL(this.serverAbrStreamingUrl);
    url.searchParams.set('rn', this.requestNumber.toString());

    this.abortController = new AbortController();

    const timeoutId = setTimeout(() => this.abortController?.abort(), 60000);

    try {
      return await this.fetchFunction(url, {
        method: 'POST',
        headers: {
          'content-type': 'application/x-protobuf',
          'accept-encoding': 'identity',
          'accept': 'application/vnd.yt-ump'
        },
        body,
        signal: this.abortController.signal
      });
    } finally {
      clearTimeout(timeoutId);
      this.requestNumber += 1;
    }
  }

  /**
   * Reads the response body as a stream and processes each UMP part.
   * @param response - The server response to process.
   * @returns A promise that resolves to an array of processed UMP part types.
   * @throws {Error} If the response is invalid, empty, or aborted.
   * @private
   */
  private async processStreamingResponse(response: Response): Promise<number[]> {
    if (!response.ok)
      throw new Error(`Server returned ${response.status} ${response.statusText}`);

    if (response.headers.get('content-type') !== 'application/vnd.yt-ump')
      throw new Error(`Unexpected content type from server: ${response.headers.get('content-type')}`);

    const reader = response.body!.getReader();

    let dataReceived = false;
    let partialPart: Part | undefined;

    const processedParts: number[] = [];

    while (true) {
      if (this.abortController?.signal?.aborted && !this._aborted)
        throw new Error('Stream was aborted.');

      const { done, value } = await reader.read();

      if (done) {
        if (!dataReceived) {
          throw new Error('Received empty response from server.');
        }
        break;
      }

      dataReceived = true;

      let chunk;

      if (partialPart) {
        chunk = partialPart.data;
        chunk.append(value);
      } else {
        chunk = new CompositeBuffer([ value ]);
      }

      const ump = new UmpReader(chunk);

      partialPart = ump.read((part) => {
        processedParts.push(part.type);
        const handler = this.umpPartHandlers.get(part.type);
        if (handler) {
          handler(part);
        }
      });
    }

    this.partialSegmentQueue.clear();

    return processedParts;
  }

  /**
   * Executes a function with automatic retries and exponential backoff.
   * Respects server-specified backoff times from `nextRequestPolicy`.
   * @param fetchFn - The function to execute.
   * @param maxRetries - The maximum number of retry attempts.
   * @returns A promise that resolves to `true` on success, or `false` if all retries fail.
   * @private
   */
  private async executeWithRetry(
    fetchFn: () => Promise<void>,
    maxRetries: number
  ): Promise<boolean> {
    const backoffTimeMs = this.nextRequestPolicy?.backoffTimeMs || 0;

    if (backoffTimeMs > 0) {
      this.logger.debug(TAG, `Respecting server backoff policy: waiting ${backoffTimeMs}ms before request`);
      await wait(backoffTimeMs);
    }

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      try {
        await fetchFn();
        if (this.mediaHeadersProcessed) {
          this.cachedBufferedRanges = undefined;
        }
        return true;
      } catch (e) {
        const error = e as Error;
        if (this._aborted) {
          this.logger.debug(TAG, 'Download process aborted, skipping retry.');
          return false;
        }

        if (attempt > maxRetries) {
          this.logger.error(TAG, `Maximum retries (${maxRetries}) exceeded while fetching segment: ${error.message}`);
          this.errorHandler(error, true);
          break;
        }

        const retryBackoffMs = Math.min(BACKOFF_MULTIPLIER * Math.pow(2, attempt - 1), MAX_BACKOFF_MS);
        this.logger.warn(TAG, `Segment fetch attempt ${attempt}/${maxRetries + 1} failed: ${error.message} - retrying in ${retryBackoffMs}ms`);
        await wait(retryBackoffMs);
      }
    }
    return false;
  }
  //#endregion

  //#region --- UMP Part Handlers ---

  /**
   * Handles `FORMAT_INITIALIZATION_METADATA` parts.
   * Creates and stores a new `InitializedFormat` entry.
   * @private
   */
  private handleFormatInitializationMetadata(part: Part): void {
    const formatInitMetadata = FormatInitializationMetadata.decode(part.data.chunks[0]);

    const formatIdKey = FormatKeyUtils.fromFormatInitializationMetadata(formatInitMetadata);

    const initializedFormat: InitializedFormat = {
      formatInitializationMetadata: formatInitMetadata,
      downloadedSegments: new Map<number, Segment>(),
      lastMediaHeaders: []
    };

    this.initializedFormatsMap.set(formatIdKey, initializedFormat);

    this.logger.debug(TAG, `Initialized format: ${formatIdKey}`);

    this.emit('formatInitialization', initializedFormat);
  }

  /**
   * Handles `NEXT_REQUEST_POLICY` parts.
   * Stores the server's policy for backoff time and playback cookies.
   * @private
   */
  private handleNextRequestPolicy(part: Part): void {
    this.nextRequestPolicy = NextRequestPolicy.decode(part.data.chunks[0]);
  }

  /**
   * Handles `SABR_ERROR` parts.
   * Throws an error to terminate the current request attempt.
   * @throws {Error} Always throws with the SABR error details.
   * @private
   */
  private handleSabrError(part: Part): void {
    const sabrError = SabrError.decode(part.data.chunks[0]);
    throw new Error(`SABR Error: ${sabrError.type} - ${sabrError.code}`);
  }

  /**
   * Handles `SABR_REDIRECT` parts.
   * Updates the streaming URL to the new location provided by the server.
   * @private
   */
  private handleSabrRedirect(part: Part): void {
    const sabrRedirect = SabrRedirect.decode(part.data.chunks[0]);
    this.serverAbrStreamingUrl = sabrRedirect.url!;
    this.logger.debug(TAG, `Redirecting to ${this.serverAbrStreamingUrl}`);
  }

  /**
   * Handles `SABR_CONTEXT_UPDATE` parts.
   * Updates the client's context state based on server instructions.
   * @private
   */
  private handleSabrContextUpdate(part: Part): void {
    const sabrContextUpdate = SabrContextUpdate.decode(part.data.chunks[0]);
    if (sabrContextUpdate.type !== undefined && sabrContextUpdate.value?.length) {
      if (
        sabrContextUpdate.writePolicy === SabrContextWritePolicy.KEEP_EXISTING &&
        this.sabrContexts.has(sabrContextUpdate.type)
      ) {
        this.logger.debug(TAG, `Skipping SABR context update for type ${sabrContextUpdate.type}`);
        return;
      }

      this.sabrContexts.set(sabrContextUpdate.type, sabrContextUpdate);

      if (sabrContextUpdate.sendByDefault) {
        this.activeSabrContextTypes.add(sabrContextUpdate.type);
      }

      this.logger.debug(TAG, `Received SABR context update (type: ${sabrContextUpdate.type}, sendByDefault: ${sabrContextUpdate.sendByDefault})`);
    }
  }

  /**
   * Handles `SABR_CONTEXT_SENDING_POLICY` parts.
   * Updates which contexts should be sent in future requests.
   * @private
   */
  private handleSabrContextSendingPolicy(part: Part): void {
    const sabrContextSendingPolicy = SabrContextSendingPolicy.decode(part.data.chunks[0]);

    for (const startPolicy of sabrContextSendingPolicy.startPolicy) {
      if (!this.activeSabrContextTypes.has(startPolicy)) {
        this.activeSabrContextTypes.add(startPolicy);
        this.logger.debug(TAG, `Activated SABR context for type ${startPolicy}`);
      }
    }

    for (const stopPolicy of sabrContextSendingPolicy.stopPolicy) {
      if (this.activeSabrContextTypes.has(stopPolicy)) {
        this.activeSabrContextTypes.delete(stopPolicy);
        this.logger.debug(TAG, `Deactivated SABR context for type ${stopPolicy}`);
      }
    }

    for (const discardPolicy of sabrContextSendingPolicy.discardPolicy) {
      if (this.sabrContexts.has(discardPolicy)) {
        this.sabrContexts.delete(discardPolicy);
        this.logger.debug(TAG, `Discarded SABR context for type ${discardPolicy}`);
      }
    }
  }

  /**
   * Handles `STREAM_PROTECTION_STATUS` parts.
   * Emits updates and handles critical statuses like required attestation.
   * @throws {Error} If attestation is required (status 3).
   * @private
   */
  private handleStreamProtectionStatus(part: Part): void {
    this.streamProtectionStatus = StreamProtectionStatus.decode(part.data.chunks[0]);
    this.emit('streamProtectionStatusUpdate', this.streamProtectionStatus);
    if (this.streamProtectionStatus.status === 3) {
      throw new Error('Cannot proceed with stream: attestation required');
    } else if (this.streamProtectionStatus.status === 2) {
      this.logger.warn(TAG, 'Attestation pending.');
    }
  }

  /**
   * Handles `RELOAD_PLAYER_RESPONSE` parts.
   * Emits an event with reload parameters and terminates the session.
   * @throws {Error} Always throws to terminate the current streaming session.
   * @private
   */
  private handleReloadPlayerResponse(part: Part) {
    const reloadPlaybackContext = ReloadPlaybackContext.decode(part.data.chunks[0]);
    const errorMessage = 'Player response reload requested by server';
    this.logger.debug(TAG, `${errorMessage} (token: ${reloadPlaybackContext.reloadPlaybackParams?.token}`);
    this.emit('reloadPlayerResponse', reloadPlaybackContext);
    throw new Error(errorMessage);
  }

  /**
   * Handles `MEDIA_HEADER` parts.
   * Creates an entry in the `partialSegmentQueue` for the upcoming media chunks.
   * @private
   */
  private handleMediaHeader(part: Part): void {
    const mediaHeader = MediaHeader.decode(part.data.chunks[0]);

    const headerId = mediaHeader.headerId || 0;
    const formatIdKey = FormatKeyUtils.fromMediaHeader(mediaHeader);
    const segmentNumber = mediaHeader.isInitSeg ? 0 : mediaHeader.sequenceNumber!;
    const durationMs = mediaHeader.timeRange ? Math.ceil(((mediaHeader.timeRange.durationTicks || 0) / (mediaHeader.timeRange.timescale || 0)) * 1000) : mediaHeader.durationMs || 0;

    const initializedFormat = this.initializedFormatsMap.get(formatIdKey);
    if (!initializedFormat) {
      this.logger.warn(TAG, `No initialized format found for key: ${formatIdKey} (segment ${segmentNumber})`);
      return;
    }

    const mediaType = getMediaType(initializedFormat);

    if (initializedFormat.downloadedSegments.has(segmentNumber)) {
      this.logger.debug(TAG, `Segment ${formatIdKey} (segment: ${segmentNumber}) already downloaded. Ignoring.`);
      return;
    }

    this.partialSegmentQueue.set(headerId, {
      formatIdKey,
      segmentNumber,
      durationMs,
      mediaHeader,
      bufferedChunks: []
    });

    this.logger.debug(TAG, `Enqueued ${mediaType} segment ${segmentNumber} (Header ID: ${headerId}, key: ${formatIdKey}, duration: ${durationMs}ms)`);
  }

  /**
   * Handles `MEDIA` parts.
   * Buffers media data chunks associated with a specific header ID.
   * @private
   */
  private handleMedia(part: Part): void {
    const headerId = part.data.getUint8(0);
    const segment = this.partialSegmentQueue.get(headerId);

    if (!segment) {
      this.logger.debug(TAG, `Received Media part for an unknown Header ID: ${headerId}`);
      return;
    }

    const initializedFormat = this.initializedFormatsMap.get(segment.formatIdKey);

    if (!initializedFormat) {
      this.logger.warn(TAG, `No initialized format found for key ${segment.formatIdKey} (segment ${segment.segmentNumber})`);
      return;
    }

    const dataBuffer = part.data.split(1).remainingBuffer;

    for (const chunk of dataBuffer.chunks) {
      segment.bufferedChunks.push(chunk);
    }
  }

  /**
   * Handles `MEDIA_END` parts.
   * Finalizes a segment, enqueues its data to the appropriate stream, and updates tracking.
   * @private
   */
  private handleMediaEnd(part: Part): void {
    const headerId = part.data.getUint8(0);
    const segment = this.partialSegmentQueue.get(headerId);

    if (!segment) {
      this.logger.debug(TAG, `Received MediaEnd for an unknown Header ID: ${headerId}`);
      return;
    }

    const loadedBytes = segment.bufferedChunks.reduce((sum, chunk) => sum + chunk.length, 0);

    if (loadedBytes !== segment.mediaHeader.contentLength) {
      this.logger.warn(TAG, `Content length mismatch for segment ${segment.segmentNumber} (Header ID: ${headerId}, key: ${segment.formatIdKey}, expected: ${segment.mediaHeader.contentLength}, received: ${loadedBytes})`);
      this.partialSegmentQueue.delete(headerId);
      return;
    }

    const initializedFormat = this.initializedFormatsMap.get(segment.formatIdKey);

    if (initializedFormat) {
      const mediaType = getMediaType(initializedFormat);

      if (segment.bufferedChunks.length) {
        for (const chunk of segment.bufferedChunks) {
          if (mediaType === 'audio') {
            this.audioController?.enqueue(chunk);
          } else {
            this.videoController?.enqueue(chunk);
          }
        }
      }

      this.logger.debug(TAG, `Received MediaEnd for ${mediaType} segment ${segment.segmentNumber} (Header ID: ${headerId}, key: ${segment.formatIdKey})`);

      segment.bufferedChunks.length = 0; // Avoid weird mem leaks...
      segment.bufferedChunks = [];

      initializedFormat.lastMediaHeaders.push(segment.mediaHeader);
      initializedFormat.downloadedSegments.set(segment.segmentNumber, segment);
      this.partialSegmentQueue.delete(headerId);
    }
  }
  //#endregion

  //#region --- Stream Validation and Integrity Checks ---

  /**
   * Validates and corrects the stream duration based on format initialization metadata.
   * @param formatInitializationMetadata - The metadata from an initialized format.
   * @private
   */
  private validateAndCorrectDuration(formatInitializationMetadata: FormatInitializationMetadata): void {
    const durationUnits = formatInitializationMetadata.durationUnits || 0;
    const durationTimescale = formatInitializationMetadata.durationTimescale || 0;

    if (durationTimescale === 0) {
      this.logger.warn(TAG, 'Invalid timescale (0) in format initialization metadata');
      return;
    }

    const expectedDuration = Math.trunc(durationUnits / (durationTimescale / 1000));

    if (this.durationMs !== expectedDuration) {
      this.durationMs = expectedDuration;
      this.logger.debug(TAG, `Corrected stream duration to ${this.durationMs}ms based on format initialization metadata`);
    }
  }

  /**
   * Validates downloaded segments for completeness and consistency after the stream finishes.
   * Checks for duration coverage, missing segments, and duplicates.
   * @private
   */
  private validateDownloadedSegments(): void {
    for (const [ formatIdKey, initializedFormat ] of this.initializedFormatsMap.entries()) {
      if (formatIdKey === this.formatToDiscard) {
        this.logger.debug(TAG, `Skipping validation for discarded format: ${formatIdKey}`);
        continue;
      }

      const totalDuration = getTotalDownloadedDuration(initializedFormat);
      const durationUnits = initializedFormat.formatInitializationMetadata.durationUnits || 0;
      const durationTimescale = initializedFormat.formatInitializationMetadata.durationTimescale || 0;
      const expectedDuration = durationTimescale ? durationUnits / (durationTimescale / 1000) : 0;

      const durationMismatch = Math.abs(totalDuration - expectedDuration);
      if (expectedDuration > 0 && durationMismatch > expectedDuration * 0.01) {
        const durationCoverage = Math.round((totalDuration / expectedDuration) * 100);
        this.logger.warn(TAG, `Incomplete stream for format ${formatIdKey}: downloaded ${totalDuration}ms (${durationCoverage}%), expected ${expectedDuration}ms`);
      }

      const segments = Array.from(initializedFormat.downloadedSegments.entries());
      if (segments.length === 0) continue;

      segments.sort(([ numA ], [ numB ]) => numA - numB);

      const expectedSegmentCount = initializedFormat.formatInitializationMetadata.endSegmentNumber!;
      const missingSegments = [];

      // Find all missing segments in the expected range.
      for (let i = 0; i <= expectedSegmentCount; i++) {
        if (!initializedFormat.downloadedSegments.has(i)) {
          missingSegments.push(i);
        }
      }

      // Check for duplicate segments (should not happen, but good to validate).
      const uniqueSegmentCount = new Set(segments.map(([ num ]) => num)).size;
      const hasDuplicates = uniqueSegmentCount !== segments.length;

      if (missingSegments.length > 0) {
        const message = `Format ${formatIdKey}: Missing segments: ${missingSegments.join(', ')}. ` +
          `Expected range: 0-${expectedSegmentCount}. `;
        this.logger.warn(TAG, message);
        this.errorHandler(new Error(message), true);
      } else {
        this.logger.debug(TAG, `Format ${formatIdKey}: All ${expectedSegmentCount} segments present (100% coverage)`);
      }

      if (hasDuplicates) {
        const message = `Format ${formatIdKey}: Found duplicate segment numbers (${segments.length} segments but ${uniqueSegmentCount} unique numbers)`;
        this.logger.warn(TAG, message);
        this.errorHandler(new Error(message), true);
      }
    }
  }
  //#endregion

  /**
   * Resets the internal state of the stream.
   * Clears all maps, resets counters, and re-initializes the progress tracker.
   * @private
   */
  private resetState(): void {
    this.initializedFormatsMap.clear();
    this.partialSegmentQueue.clear();
    this.activeSabrContextTypes.clear();
    this.sabrContexts.clear();
    this.nextRequestPolicy = undefined;
    this.mainFormat = undefined;
    this.requestNumber = 0;
    this.cachedBufferedRanges = undefined;
    this.mediaHeadersProcessed = false;
    this.streamProtectionStatus = undefined;
    this.formatToDiscard = undefined;
    this.abortController = undefined;
    this.progressTracker = {
      lastProgressTime: Date.now(),
      lastDownloadedDuration: 0,
      stallCount: 0
    };
  }

  /**
   * Handles errors during the streaming process.
   * @param error - The error that occurred.
   * @param notifyControllers - Whether to propagate the error to the stream controllers.
   * @private
   */
  private errorHandler(error: Error, notifyControllers: boolean = true): void {
    this.resetState();
    this.logger.error(TAG, `Stream error: ${error.message}`);
    if (notifyControllers) {
      this._errored = true;
      this.videoController?.error(error);
      this.audioController?.error(error);
    }
  }
}