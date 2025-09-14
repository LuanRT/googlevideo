import { MAX_INT32_VALUE, base64ToU8, EnabledTrackTypes, parseRangeHeader } from '../utils/shared.js';
import { fromFormat, fromMediaHeader } from '../utils/formatKeyUtils.js';
import { Logger } from '../utils/Logger.js';

import {
  CacheManager,
  RequestMetadataManager,
  SabrAdapterError
} from '../utils/index.js';

import {
  PlaybackCookie,
  SabrContextWritePolicy,
  VideoPlaybackAbrRequest,
  type BufferedRange,
  type FormatId,
  type ReloadPlaybackContext,
  type SabrContextUpdate,
  type SnackbarMessage,
  type StreamerContext
} from '../utils/Protos.js';

import type {
  PlayerHttpRequest,
  PlayerHttpResponse, 
  SabrOptions,
  SabrPlayerAdapter
} from '../types/sabrStreamingAdapterTypes.js';

import type { SabrFormat } from '../types/shared.js';

interface InitializedFormat {
  lastSegmentMetadata: {
    formatId: FormatId;
    startSequenceNumber: number;
    endSequenceNumber: number;
    startTimeMs: string;
    durationMs: string;
    timescale: number;
  };
}

type OnSnackbarMessageCb = (snackbarMessage: SnackbarMessage) => void;
type OnReloadPlayerResponseCb = (reloadPlaybackContext: ReloadPlaybackContext) => Promise<void>;
type OnMintPoTokenCallback = () => Promise<string>;

const TAG = 'SabrStreamingAdapter';

export const SABR_CONSTANTS = {
  PROTOCOL: 'sabr:',
  KEY_PARAM: 'key',
  DEFAULT_OPTIONS: {
    enableCaching: true,
    enableVerboseRequestLogging: false,
    maxCacheSizeMB: 3,
    maxCacheAgeSeconds: 300
  }
} as const;

/**
 * Standard UMP request body bytes.
 * These bytes represent a minimal valid protobuf message for UMP.
 */
const UMP_REQUEST_BODY = new Uint8Array([ 120, 0 ]);

/**
 * Adapter class that handles YouTube SABR integration with media players (e.g., Shaka Player).
 *
 * What it does:
 * - Sets up request/response interceptors so we can send proper SABR requests (UMP response parsing must be done in the player adapter).
 * - Keeps track of initialized formats and their metadata.
 * - Handles SABR-specific things, such as redirects, context updates, and playback cookies.
 */
export class SabrStreamingAdapter {
  private readonly playerAdapter: SabrPlayerAdapter;
  private readonly requestMetadataManager: RequestMetadataManager;
  private readonly initializedFormats = new Map<string, InitializedFormat>();
  private readonly logger = Logger.getInstance();

  private options: SabrOptions;
  private ustreamerConfig?: string;
  private serverAbrStreamingUrl?: string;

  private sabrFormats: SabrFormat[] = [];
  private sabrContexts = new Map<number, SabrContextUpdate>();
  private activeSabrContextTypes = new Set<number>();
  private lastPlaybackCookie?: PlaybackCookie;
  private lastPlayerTimeSecs = 0;
  private cacheManager: CacheManager | null = null;
  private requestNumber = 0;

  private activeDelayPromise: Promise<void> | null = null;
  private onReloadPlayerResponseCallback?: OnReloadPlayerResponseCb;
  private onSnackbarMessageCallback?: OnSnackbarMessageCb;
  private onMintPoTokenCallback?: OnMintPoTokenCallback;

  public isDisposed = false;

  /**
   * Registers a callback function to handle snackbar messages.
   */
  public onSnackbarMessage(cb: OnSnackbarMessageCb) {
    this.onSnackbarMessageCallback = cb;
  }

  /**
   * Handles server requests to reload the player with new parameters.
   * @param cb
   */
  public onReloadPlayerResponse(cb: OnReloadPlayerResponseCb) {
    this.onReloadPlayerResponseCallback = cb;
  }

  /**
   * Registers a callback function to mint a new PoToken.
   * @param cb
   */
  public onMintPoToken(cb: OnMintPoTokenCallback) {
    this.onMintPoTokenCallback = cb;
  }

  /**
   * @param options - Configuration options for the adapter.
   * @throws SabrAdapterError if a player adapter is not provided.
   */
  constructor(options: SabrOptions) {
    this.options = {
      ...SABR_CONSTANTS.DEFAULT_OPTIONS,
      ...options
    };

    if (options.playerAdapter) {
      this.playerAdapter = options.playerAdapter;
    } else throw new SabrAdapterError('A player adapter is required.');

    if (this.options.enableCaching) {
      this.cacheManager = new CacheManager(
        this.options.maxCacheSizeMB,
        this.options.maxCacheAgeSeconds
      );
    }

    this.requestMetadataManager = new RequestMetadataManager();
  }

  /**
   * Initializes the player adapter and sets up request/response interceptors.
   * @throws SabrAdapterError if the adapter has been disposed.
   */
  public attach(player: any): void {
    this.checkDisposed();
    this.playerAdapter.initialize(player, this.requestMetadataManager, this.cacheManager);
    this.setupInterceptors();
  }

  /**
   * Sets the initial server abr streaming URL.
   * @throws SabrAdapterError if the adapter has been disposed.
   */
  public setStreamingURL(url?: string) {
    this.checkDisposed();
    this.serverAbrStreamingUrl = url;
  }

  /**
   * Sets the ustreamer configuration for SABR requests.
   * @throws SabrAdapterError if the adapter has been disposed.
   */
  public setUstreamerConfig(ustreamerConfig?: string) {
    this.checkDisposed();
    this.ustreamerConfig = ustreamerConfig;
  }

  /**
   * Sets the available SABR formats for streaming.
   * @throws SabrAdapterError if the adapter has been disposed.
   */
  public setServerAbrFormats(sabrFormats: SabrFormat[]) {
    this.checkDisposed();
    this.sabrFormats = sabrFormats;
  }

  /**
   * Returns the cache manager instance, if caching is enabled.
   */
  public getCacheManager(): CacheManager | null {
    return this.cacheManager;
  }

  private setupInterceptors(): void {
    this.playerAdapter.registerRequestInterceptor(this.handleRequest.bind(this));
    this.playerAdapter.registerResponseInterceptor(this.handleResponse.bind(this));
  }

  /**
   * Processes incoming requests and modifies them to conform to SABR protocol requirements.
   * For SABR protocol URIs, prepares a VideoPlaybackAbrRequest with current state information.
   * For regular URIs with UMP requirements, adds necessary query parameters.
   * @returns Modified request with SABR-specific changes.
   */
  private async handleRequest(request: PlayerHttpRequest) {
    const originalUri = new URL(request.url);

    if (originalUri.protocol === SABR_CONSTANTS.PROTOCOL) {
      if (this.activeDelayPromise)
        await this.activeDelayPromise;

      if (!this.serverAbrStreamingUrl) {
        throw new SabrAdapterError('Server ABR URL not set.');
      }

      if (!this.sabrFormats.length) {
        throw new SabrAdapterError('No SABR formats available.');
      }

      const requestNumber = String(this.requestNumber++);

      // Set the request number in the URL so we can identify it later (and also for the server).
      const sabrUrl = new URL(this.serverAbrStreamingUrl || '');
      sabrUrl.searchParams.set('rn', requestNumber);
      request.url = sabrUrl.toString();

      const currentFormat = this.sabrFormats.find(
        (format) => fromFormat(format) === (originalUri.searchParams.get(SABR_CONSTANTS.KEY_PARAM) || '')
      );

      if (!currentFormat)
        throw new SabrAdapterError(`Could not determine current format from URL: ${request.url}`);

      /**
       * If the player's current time is earlier than the last recorded time (e.g., the user seeks backward), we clear the initialized format metadata.
       * This prevents the adapter from using stale data, which could lead to requesting segments that are ahead of the new playback position.
       */
      if (this.playerAdapter.getPlayerTime() < this.lastPlayerTimeSecs) {
        this.initializedFormats.clear();
      }
      
      const activeFormats = this.playerAdapter.getActiveTrackFormats(currentFormat, this.sabrFormats);
      const videoPlaybackAbrRequest = await this.createVideoPlaybackAbrRequest(request, currentFormat, activeFormats);

      if (currentFormat.height) {
        videoPlaybackAbrRequest.clientAbrState!.stickyResolution = currentFormat.height;
        videoPlaybackAbrRequest.clientAbrState!.lastManualSelectedResolution = currentFormat.height;
      }

      const formatToDiscard = this.addBufferingInfoToAbrRequest(videoPlaybackAbrRequest, currentFormat, activeFormats);

      if (formatToDiscard) {
        videoPlaybackAbrRequest.selectedFormatIds.push(formatToDiscard);
      }

      if (!request.segment.isInit()) {
        videoPlaybackAbrRequest.selectedFormatIds.push(currentFormat);
      }

      if (this.options.enableVerboseRequestLogging)
        this.logger.debug(TAG, `Created VideoPlaybackAbrRequest (${requestNumber}):`, videoPlaybackAbrRequest);

      request.body = VideoPlaybackAbrRequest.encode(videoPlaybackAbrRequest).finish();

      this.requestMetadataManager.metadataMap.set(requestNumber, {
        format: currentFormat,
        isUMP: true,
        isSABR: true,
        isInit: request.segment.isInit(),
        byteRange: parseRangeHeader(request.headers.Range),
        timestamp: Date.now()
      });
    } else {
      const webPoToken = this.onMintPoTokenCallback ? await this.onMintPoTokenCallback() : undefined;

      // Handle simple UMP requests.
      if (originalUri.pathname.includes('videoplayback/expire') || originalUri.pathname.includes('source/yt_live_broadcast')) {
        originalUri.pathname += '/ump/1';
        originalUri.pathname += '/srfvp/1';
        originalUri.pathname += '/alr/yes';
        if (webPoToken)
          originalUri.pathname += `/pot/${webPoToken}`;
        if (request.headers.Range)
          originalUri.pathname += `/range/${request.headers.Range?.split('=')[1]}`;
      } else {
        originalUri.searchParams.set('ump', '1');
        originalUri.searchParams.set('srfvp', '1');
        originalUri.searchParams.set('alr', 'yes');
        if (webPoToken)
          originalUri.searchParams.set('pot', webPoToken);
        if (request.headers.Range)
          originalUri.searchParams.set('range', request.headers.Range?.split('=')[1]);
      }

      const requestNumber = String(this.requestNumber++);
      originalUri.searchParams.set('rn', requestNumber);

      request.url = originalUri.toString();
      request.body = UMP_REQUEST_BODY;

      this.requestMetadataManager.metadataMap.set(requestNumber, {
        isUMP: true,
        isSABR: false,
        timestamp: Date.now()
      });
    }

    request.method = 'POST';

    delete request.headers.Range;

    return request;
  }

  /**
   * Creates a VideoPlaybackAbrRequest object with current playback state information.
   * @param request - The original player HTTP request.
   * @param currentFormat - The format currently being fetched.
   * @param activeFormats - Object containing references to active audio and video formats.
   * @returns A populated VideoPlaybackAbrRequest object.
   * @throws SabrAdapterError if ustreamer config is not set.
   */
  private async createVideoPlaybackAbrRequest(
    request: PlayerHttpRequest,
    currentFormat: SabrFormat,
    activeFormats: {
      audioFormat?: SabrFormat;
      videoFormat?: SabrFormat;
    }
  ): Promise<VideoPlaybackAbrRequest> {
    if (!this.ustreamerConfig) {
      throw new SabrAdapterError('Ustreamer config not set');
    }

    const streamerContext: StreamerContext = {
      poToken: this.onMintPoTokenCallback ? base64ToU8(await this.onMintPoTokenCallback()) : undefined,
      playbackCookie: this.lastPlaybackCookie ? PlaybackCookie.encode(this.lastPlaybackCookie).finish() : undefined,
      clientInfo: this.options.clientInfo,
      sabrContexts: [],
      unsentSabrContexts: []
    };

    for (const ctxUpdate of this.sabrContexts.values()) {
      if (this.activeSabrContextTypes.has(<number>ctxUpdate.type)) {
        streamerContext.sabrContexts.push(ctxUpdate);
      } else {
        streamerContext.unsentSabrContexts.push(<number>ctxUpdate.type);
      }
    }
    
    this.lastPlayerTimeSecs = this.playerAdapter.getPlayerTime();

    return {
      clientAbrState: {
        playbackRate: this.playerAdapter.getPlaybackRate(),
        playerTimeMs: Math.round((request.segment.getStartTime() ?? this.lastPlayerTimeSecs) * 1000).toString(),
        clientViewportIsFlexible: false,
        bandwidthEstimate: Math.round(this.playerAdapter.getBandwidthEstimate() || 0).toString(),
        drcEnabled: currentFormat?.isDrc ?? false,
        enabledTrackTypesBitfield: currentFormat.width ? EnabledTrackTypes.VIDEO_ONLY : EnabledTrackTypes.AUDIO_ONLY,
        audioTrackId: currentFormat.audioTrackId
      },
      bufferedRanges: [],
      selectedFormatIds: [],
      preferredAudioFormatIds: [ activeFormats.audioFormat || {} ],
      preferredVideoFormatIds: [ activeFormats.videoFormat || {} ],
      preferredSubtitleFormatIds: [],
      videoPlaybackUstreamerConfig: base64ToU8(this.ustreamerConfig),
      streamerContext,
      field1000: []
    };
  }

  /**
   * Adds buffering information to the ABR request for all active formats.
   * 
   * NOTE:
   * On the web, mobile, and TV clients, buffered ranges in combination to player time is what dictates the segments you get.
   * In our case, we are cheating a bit by abusing the player time field (in clientAbrState), setting it to the exact start 
   * time value of the segment we want, while YouTube simply uses the actual player time.
   * 
   * We don't have to fully replicate this behavior for two reasons:
   * 1. The SABR server will only send so much segments for a given player time. That means players like Shaka would
   * not be able to buffer more than what the server thinks is enough. It would behave like YouTube's.
   * 2. We don't have to know what segment a buffered range starts/ends at. It is easy to do in Shaka, but not in other players.
   * 
   * @param videoPlaybackAbrRequest - The ABR request to modify with buffering information.
   * @param currentFormat - The format currently being requested.
   * @param activeFormats - References to the currently active audio and video formats.
   * @returns The format to discard (if any) - typically formats that are active but not currently requested.
   */
  private addBufferingInfoToAbrRequest(
    videoPlaybackAbrRequest: VideoPlaybackAbrRequest,
    currentFormat: SabrFormat,
    activeFormats: { audioFormat?: SabrFormat; videoFormat?: SabrFormat }
  ) {
    let formatToDiscard: SabrFormat | undefined;

    const currentFormatKey = fromFormat(currentFormat);

    for (const activeFormat of Object.values(activeFormats)) {
      if (!activeFormat) continue;

      const activeFormatKey = fromFormat(activeFormat);
      const shouldDiscard = currentFormatKey !== activeFormatKey;
      const initializedFormat = this.initializedFormats.get(activeFormatKey || '');
      
      const bufferedRange = shouldDiscard
        ? this.createFullBufferRange(activeFormat)
        : this.createPartialBufferRange(initializedFormat);

      if (bufferedRange) {
        videoPlaybackAbrRequest.bufferedRanges.push(bufferedRange);

        if (shouldDiscard) {
          formatToDiscard = activeFormat;
        }
      }
    }

    return formatToDiscard;
  }

  /**
   * Creates a bogus buffered range for a format. Used when we want to signal to the server to not send any 
   * segments for this format.
   * @param format - The format to create a full buffer range for.
   * @returns A BufferedRange object indicating the entire format is buffered.
   */
  private createFullBufferRange(format: SabrFormat): BufferedRange {
    return {
      formatId: format,
      durationMs: MAX_INT32_VALUE,
      startTimeMs: '0',
      startSegmentIndex: Number(MAX_INT32_VALUE),
      endSegmentIndex: Number(MAX_INT32_VALUE),
      timeRange: {
        durationTicks: MAX_INT32_VALUE,
        startTicks: '0',
        timescale: 1000
      }
    };
  }

  /**
   * Creates a buffered range representing a partially buffered format.
   * @param initializedFormat - The format with initialization data.
   * @returns A BufferedRange object with segment information, or null if no metadata is available.
   */
  private createPartialBufferRange(initializedFormat?: InitializedFormat): BufferedRange | null {
    if (!initializedFormat?.lastSegmentMetadata) return null;

    const { formatId, startSequenceNumber, timescale, durationMs, endSequenceNumber } =
      initializedFormat.lastSegmentMetadata;

    return {
      formatId,
      startSegmentIndex: startSequenceNumber,
      durationMs,
      startTimeMs: '0',
      endSegmentIndex: endSequenceNumber,
      timeRange: {
        timescale,
        startTicks: '0',
        durationTicks: durationMs
      }
    };
  }
  
  /**
   * Processes HTTP responses to extract SABR-specific information.
   * @returns The response object.
   */
  private async handleResponse(response: PlayerHttpResponse) {
    const requestMetadata = this.requestMetadataManager.getRequestMetadata(response.url, true);
    if (!requestMetadata) return response;

    const { streamInfo, format, byteRange, isSABR } = requestMetadata;
    if (!streamInfo) return response;

    const retry = async () => {
      const formatType = format?.width ? 'video' : 'audio';
      const formatKey = fromFormat(format) || '';
      const url = new URL(`${SABR_CONSTANTS.PROTOCOL}//${formatType}?${SABR_CONSTANTS.KEY_PARAM}=${formatKey}`);
      return await this.makeFollowupRequest(response, url.toString(), isSABR, byteRange);
    };

    if (streamInfo.snackbarMessage) {
      this.logger.debug(TAG, 'Received snackbar message:', streamInfo.snackbarMessage);
      if (this.onSnackbarMessageCallback) {
        this.onSnackbarMessageCallback(streamInfo.snackbarMessage);
      }
    }

    if (streamInfo.redirect?.url) {
      let redirectUrl = new URL(streamInfo.redirect?.url);

      this.logger.info(TAG, `Redirecting to ${redirectUrl}`);

      if (isSABR) {
        this.serverAbrStreamingUrl = streamInfo.redirect?.url;
        const formatType = format?.width ? 'video' : 'audio';
        const formatKey = fromFormat(format) || '';
        redirectUrl = new URL(`${SABR_CONSTANTS.PROTOCOL}//${formatType}?${SABR_CONSTANTS.KEY_PARAM}=${formatKey}`);
      }

      // No media data = follow the redirect immediately.
      if (!response.data?.byteLength) {
        return await this.makeFollowupRequest(response, redirectUrl.toString(), isSABR, byteRange);
      }
    }

    if (streamInfo.nextRequestPolicy) {
      this.lastPlaybackCookie = streamInfo.nextRequestPolicy?.playbackCookie;
      const delayMs = streamInfo.nextRequestPolicy.backoffTimeMs || 0;

      if (delayMs > 0 && !this.activeDelayPromise) {
        this.logger.info(TAG, `Delaying next requests by ${delayMs / 1000} seconds.`);
        this.activeDelayPromise = new Promise((resolve) => {
          setTimeout(() => {
            this.logger.info(TAG, 'Delay completed, resuming requests.');
            this.activeDelayPromise = null;
            resolve();
          }, delayMs);
        });
      }
    }

    if (streamInfo.sabrContextSendingPolicy) {
      for (const startPolicy of streamInfo.sabrContextSendingPolicy.startPolicy) {
        if (!this.activeSabrContextTypes.has(startPolicy)) {
          this.activeSabrContextTypes.add(startPolicy);
          this.logger.debug(TAG, `Activated SABR context for type ${startPolicy}`);
        }
      }

      for (const stopPolicy of streamInfo.sabrContextSendingPolicy.stopPolicy) {
        if (this.activeSabrContextTypes.has(stopPolicy)) {
          this.activeSabrContextTypes.delete(stopPolicy);
          this.logger.debug(TAG, `Deactivated SABR context for type ${stopPolicy}`);
        }
      }

      for (const discardPolicy of streamInfo.sabrContextSendingPolicy.discardPolicy) {
        if (this.sabrContexts.has(discardPolicy)) {
          this.sabrContexts.delete(discardPolicy);
          this.logger.debug(TAG, `Discarded SABR context for type ${discardPolicy}`);
        }
      }
    }

    if (streamInfo.sabrContextUpdate && (streamInfo.sabrContextUpdate.type !== undefined && streamInfo.sabrContextUpdate.value?.length)) {
      if (!this.sabrContexts.has(streamInfo.sabrContextUpdate.type) || streamInfo.sabrContextUpdate.writePolicy === SabrContextWritePolicy.OVERWRITE) {
        this.logger.debug(TAG, `Received SABR context update (type: ${streamInfo.sabrContextUpdate.type}, writePolicy: ${SabrContextWritePolicy[<number>streamInfo.sabrContextUpdate.writePolicy]} sendByDefault: ${streamInfo.sabrContextUpdate.sendByDefault})`);
        this.sabrContexts.set(streamInfo.sabrContextUpdate.type, streamInfo.sabrContextUpdate);
      }

      if (streamInfo.sabrContextUpdate.sendByDefault) {
        this.activeSabrContextTypes.add(streamInfo.sabrContextUpdate.type);
      }

      // Retry if we got no media data.
      if (!response.data?.byteLength) {
        return retry();
      }
    }

    // Try reloading the streaming data, if possible. 
    if (streamInfo.reloadPlaybackContext && this.onReloadPlayerResponseCallback) {
      this.logger.info(TAG, 'Server requested player reload with new parameters:', streamInfo.reloadPlaybackContext);
      await this.onReloadPlayerResponseCallback(streamInfo.reloadPlaybackContext);
      return retry();
    }

    if (streamInfo.mediaHeader) {
      const formatKey = fromMediaHeader(streamInfo.mediaHeader);

      if (streamInfo.mediaHeader.isInitSeg)
        return;

      const initializedFormat = this.initializedFormats.get(formatKey) || {} as InitializedFormat;

      initializedFormat.lastSegmentMetadata = {
        formatId: streamInfo.mediaHeader.formatId!,
        startSequenceNumber: streamInfo.mediaHeader.sequenceNumber || 1,
        endSequenceNumber: streamInfo.mediaHeader.sequenceNumber || 1,
        startTimeMs: streamInfo.mediaHeader.startMs || '0',
        durationMs: streamInfo.mediaHeader.durationMs || '0',
        timescale: streamInfo.mediaHeader.timeRange?.timescale || 1000
      };

      this.initializedFormats.set(formatKey, initializedFormat);
    }

    return response;
  }

  /**
   * Makes a followup request and updates the original response object with the new data.
   * @param originalResponse - The original HTTP response.
   * @param url - The URL to request.
   * @param isSABR - Whether this is a SABR request.
   * @param byteRange - Optional byte range for the request.
   * @returns The updated response.
   */
  private async makeFollowupRequest(
    originalResponse: PlayerHttpResponse,
    url: string,
    isSABR?: boolean,
    byteRange?: { start: number, end: number }
  ): Promise<PlayerHttpResponse> {
    if (this.activeDelayPromise)
      await this.activeDelayPromise;

    const headers = {} as Record<string, string>;

    // Keep range so we can slice the response (only used for init segments).
    if (isSABR && byteRange) {
      headers['Range'] = `bytes=${byteRange.start}-${byteRange.end}`;
    }

    const redirectResponse = await originalResponse.makeRequest(url, headers);
    Object.assign(originalResponse, redirectResponse);

    return originalResponse;
  }

  private checkDisposed() {
    if (this.isDisposed) {
      throw new SabrAdapterError('Adapter has been disposed.');
    }
  }

  /**
   * Releases resources and cleans up the adapter instance.
   * After calling dispose, the adapter can no longer be used.
   */
  public dispose() {
    if (this.isDisposed) return;

    this.cacheManager?.dispose();
    this.cacheManager = null;

    this.initializedFormats.clear();
    this.requestMetadataManager.metadataMap.clear();
    this.sabrContexts.clear();
    this.activeSabrContextTypes.clear();

    this.lastPlaybackCookie = undefined;
    this.lastPlayerTimeSecs = 0;
    this.sabrFormats = [];
    this.serverAbrStreamingUrl = undefined;
    this.ustreamerConfig = undefined;
    this.activeDelayPromise = null;
    this.playerAdapter.dispose();
    this.requestNumber = 0;

    this.onReloadPlayerResponseCallback = undefined;
    this.onSnackbarMessageCallback = undefined;
    this.onMintPoTokenCallback = undefined;

    this.options = undefined as unknown as SabrOptions;
    this.isDisposed = true;

    this.logger.debug(TAG, 'Disposed');
  }
}