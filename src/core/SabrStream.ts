import { UmpReader } from './UmpReader.js';

import type { FetchFunction, SabrFormat } from '../types/shared.js';

import type {
  AbortOptions,
  HeartbeatParams,
  HeartbeatRequest,
  SabrPlaybackOptions,
  SabrSnapshot,
  SabrStreamCallbacks,
  SabrStreamConfig,
  TrackOutputs,
  TrackMetadata,
  SelectedFormats,
  StreamStartResult,
  SabrStreamEvents,
  TrackOutput
} from '../types/sabrStreamTypes.js';

import { Logger } from '../utils/Logger.js';
import { SabrBufferState } from '../utils/SabrBufferState.js';
import { EventEmitterLike } from '../utils/EventEmitterLike.js';
import { chooseFormat, createFormatKey, describeMissingFormat, EnabledTrackTypes } from '../utils/formatUtils.js';
import { assert, assertIsDefined, wait } from '../utils/misc.js';

import {
  AdState,
  CuepointEvent,
  CuepointList,
  FormatInitializationMetadata,
  MediaHeader,
  NextRequestPolicy,
  PlaybackCookie,
  ReloadPlaybackContext,
  SabrContextSendingPolicy,
  SabrContextUpdate,
  SabrContextWritePolicy,
  SabrError,
  SabrLiveMetadata,
  SabrRedirect,
  SabrSeek,
  SeekSource,
  StreamProtectionStatus,
  UMPPartId,
  VideoPlaybackAbrRequest,
  type FormatId,
  type ClientAbrState,
  type ClientInfo,
  type ServerStitchedDaiInfo
} from '../utils/Protos.js';

import { ticksToMs } from '../utils/mediaTimeUtils.js';
import { getBroadcastId } from '../utils/urlUtils.js';
import { base64ToU8, decodePart } from '../utils/uint8arrayUtils.js';
import { endOfStreamReached, getEndTimeMs, getMediaType } from '../utils/streamUtils.js';

interface ProgressTracker {
  lastProgressTime: number;
  lastBufferedTimeMs: number;
  stallCount: number;
}

const TAG = 'SabrStream';

const MAX_STALLS = 3;
const DEFAULT_MAX_RETRIES = 10;
const DEFAULT_STALL_DETECTION_MS = 30_000;
const REQUEST_TIMEOUT_MS = 30_000;
const INITIAL_RETRY_BACKOFF_MS = 500;
const MAX_RETRY_BACKOFF_MS = 5_000;
const OFFLINE_GRACE_PERIOD_MS = 15_000;
const DEFAULT_HEARTBEAT_INTERVAL_MS = 10_000;
const LIVE_EDGE_SENTINEL_MS = Number.MAX_SAFE_INTEGER;

const DEFAULT_VIDEO_HWM = 1024 * 1024 * 16;
const DEFAULT_AUDIO_HWM = 1024 * 1024 * 3;

const BANDWIDTH_EMA_PREVIOUS_WEIGHT = 0.8;
const BANDWIDTH_EMA_CURRENT_WEIGHT = 0.2;
const MIN_FETCH_DURATION_FOR_BW_ESTIMATE_MS = 50;

export class SabrStream extends EventEmitterLike<SabrStreamEvents> {
  private readonly logger = Logger.getInstance();
  private readonly bufferState: SabrBufferState;
  private readonly formatIds: SabrFormat[] = [];

  private fetchFunction: FetchFunction;
  private abortController?: AbortController;
  private requestTimeoutId?: ReturnType<typeof setTimeout>;

  private serverAbrStreamingUrl: URL;
  private videoPlaybackUstreamerConfig: string;
  private clientInfo: ClientInfo;
  private proofOfOriginToken?: Uint8Array;
  private heartbeatParams: HeartbeatParams;

  private nextRequestPolicy?: NextRequestPolicy;
  private sabrContextUpdates = new Map<number, SabrContextUpdate>();
  private activeSabrContextTypes = new Set<number>();
  private trackOutputs: TrackOutputs;
  private trackMetadata: TrackMetadata = {
    video: { trackedSegments: new Map() },
    audio: { trackedSegments: new Map() }
  };

  private videoId?: string;
  private broadcastId?: string;
  private playerTimeMs = 0;
  private requestNumber = 0;
  private bandwidthEstimateBps = 0;
  private lastHeartbeatTimeMs = 0;
  private playbackSessionStartMs?: number;
  private poTokenGenerationId = 0;
  private spsRejectCount = 0;

  private ssapPlaybackInfos = new Map<string, ServerStitchedDaiInfo>();
  private idleResolvers: (() => void)[] = [];
  private drainResolver?: () => void;

  private shouldStop = false;
  private isMintingPoToken = false;

  private _isLive = false;
  private _errored = false;
  private _aborted = false;
  private _isBusy = false;

  private progressTracker: ProgressTracker = {
    lastProgressTime: Date.now(),
    lastBufferedTimeMs: 0,
    stallCount: 0
  };

  private callbacks: SabrStreamCallbacks;

  constructor(config: SabrStreamConfig) {
    super();
    this.fetchFunction = config.fetchFunction || fetch;

    this.videoId = config.videoId;
    this.formatIds = config.formats || [];
    this.clientInfo = config.clientInfo;
    this.serverAbrStreamingUrl = new URL(config.serverAbrStreamingUrl);
    this.videoPlaybackUstreamerConfig = config.videoPlaybackUstreamerConfig;
    this.proofOfOriginToken = config.poToken ? base64ToU8(config.poToken) : undefined;
    this.heartbeatParams = config.heartbeatParams || {};
    this.callbacks = config.callbacks || {};

    this._isLive = [ 'yt_premiere_broadcast', 'yt_live_broadcast' ].includes(this.serverAbrStreamingUrl.searchParams.get('source') || '');

    this.broadcastId = this._isLive ? getBroadcastId(this.serverAbrStreamingUrl) : undefined;

    this.trackOutputs = {
      video: this.createTrackStream(config.videoHighWaterMark ?? DEFAULT_VIDEO_HWM),
      audio: this.createTrackStream(config.audioHighWaterMark ?? DEFAULT_AUDIO_HWM)
    };

    this.bufferState = new SabrBufferState(this._isLive, config.stripDuplicateInit, this.trackOutputs);
  }

  //#region Public API
  public get isBusy(): boolean {
    return this._isBusy;
  }

  public get isLive(): boolean {
    return this._isLive;
  }

  public get isAborted(): boolean {
    return this._aborted;
  }

  public get hasErrored(): boolean {
    return this._errored;
  }

  public get videoEndTimeMs(): number {
    return getEndTimeMs(this.trackMetadata.video);
  }

  public get audioEndTimeMs(): number {
    return getEndTimeMs(this.trackMetadata.audio);
  }

  public get livePlaybackLatencyMs(): number | undefined {
    const videoLatencyMs = this.trackMetadata.video.emsgSegmentMetadata?.latencyMs ?? 0;
    const audioLatencyMs = this.trackMetadata.audio.emsgSegmentMetadata?.latencyMs ?? 0;

    if (!this._isLive || (!videoLatencyMs && !audioLatencyMs))
      return;

    return Math.max(videoLatencyMs, audioLatencyMs);
  }

  public setStreamingURL(url: string): void {
    this.serverAbrStreamingUrl = new URL(url);
    this.validateStreamingUrl(this.serverAbrStreamingUrl);
  }

  public setUstreamerConfig(config: string): void {
    this.videoPlaybackUstreamerConfig = config;
  }

  public async waitForIdle(): Promise<void> {
    if (this._isBusy) await new Promise<void>((resolve) => this.idleResolvers.push(resolve));
  }

  public async snapshot(): Promise<SabrSnapshot> {
    await this.waitForIdle();

    return {
      playerTimeMs: this.playerTimeMs,
      tracks: this.bufferState.snapshot()
    };
  }

  public async abort(options: AbortOptions = {}): Promise<SabrSnapshot | undefined> {
    let snapshotData: SabrSnapshot | undefined;
    if (options.snapshot) snapshotData = await this.snapshot();

    this.emit('abort');

    this._aborted = true;

    this.abortController?.abort();

    const errorInstance = new Error('Stream aborted');
    this.trackOutputs.video.controller?.error(errorInstance);
    this.trackOutputs.audio.controller?.error(errorInstance);

    this.drainResolver?.();
    this.drainResolver = undefined;

    return snapshotData;
  }

  public start(options: SabrPlaybackOptions): StreamStartResult {
    assert(this.playbackSessionStartMs === undefined, 'This stream instance has already been started and cannot be reused');
    const { videoFormat, audioFormat } = this.selectFormats(options);

    this.setupStreaming(videoFormat, audioFormat, options).catch(() => { /* no-op */ });

    return {
      videoStream: this.trackOutputs.video.stream,
      audioStream: this.trackOutputs.audio.stream,
      selectedFormats: { videoFormat, audioFormat }
    };
  }
  //#endregion

  //#region Internal
  private createTrackStream(highWaterMark: number): TrackOutput {
    let controller!: ReadableStreamDefaultController<Uint8Array>;
    const stream = new ReadableStream({
      start: (c) => controller = c,
      pull: () => this.notifyDrain(),
      cancel: (reason) => {
        this.logger.debug(TAG, `Stream cancelled by consumer. Reason: ${reason || 'N/A'}`);
        this.abort().catch(() => { /* no-op */ });
      }
    }, new ByteLengthQueuingStrategy({ highWaterMark }));
    return { stream, controller };
  }

  private notifyDrain(): void {
    if (!this.needsDrain() && this.drainResolver) {
      this.drainResolver();
      this.drainResolver = undefined;
    }
  }

  private waitForDrain(): Promise<void> {
    if (!this.needsDrain()) return Promise.resolve();
    this.logger.debug(TAG, 'Waiting for drain');
    return new Promise<void>((resolve) => this.drainResolver = resolve);
  }

  private needsDrain(): boolean {
    const videoFull = (this.trackOutputs.video.controller?.desiredSize ?? 0) <= 0;
    const audioFull = (this.trackOutputs.audio.controller?.desiredSize ?? 0) <= 0;
    return videoFull || audioFull;
  }

  private validateStreamingUrl(url: URL): void {
    const broadcastId = getBroadcastId(url);
    if (broadcastId) this.validateBroadcastId(broadcastId);
  }

  private validateBroadcastId(bid: string): void {
    if (this._isLive && this.broadcastId !== bid) {
      this.logger.warn(TAG, `Broadcast ID changed from ${this.broadcastId} to ${bid}. Stopping.`);
      this.shouldStop = true;
    }
  }

  private selectFormats(options: SabrPlaybackOptions): SelectedFormats {
    const audioOnly = options.enabledTrackTypes === EnabledTrackTypes.AUDIO_ONLY;
    const hasAudioSpecs = options.audioFormat || options.audioPreferences;
    const hasVideoSpecs = options.videoFormat || options.videoPreferences;

    if (audioOnly) assert(hasAudioSpecs, 'Track type is set to "AUDIO_ONLY" but no audio format or preferences were provided');
    else assert(hasAudioSpecs && hasVideoSpecs, 'No video and/or audio format or preferences provided');

    const videoFormat = chooseFormat(this.formatIds, options.videoFormat, {
      isAudio: false,
      ...options.videoPreferences
    });

    const audioFormat = chooseFormat(this.formatIds, options.audioFormat, {
      isAudio: true,
      ...options.audioPreferences
    });

    if (!videoFormat || !audioFormat) {
      const missing: string[] = [];
      if (!videoFormat) missing.push(describeMissingFormat('video', options.videoFormat, this.formatIds));
      if (!audioFormat) missing.push(describeMissingFormat('audio', options.audioFormat, this.formatIds));
      throw new Error(`Could not select formats: ${missing.join('; ')}`);
    }

    return { videoFormat, audioFormat };
  }

  private async setupStreaming(
    videoFormat: SabrFormat,
    audioFormat: SabrFormat,
    options: SabrPlaybackOptions
  ): Promise<void> {
    try {
      this.logger.debug(TAG, `Starting SABR stream: videoFormat=${videoFormat.itag}, audioFormat=${audioFormat.itag}, isLive=${this._isLive}, isPostLiveDvr=${options.isPostLiveDvr}`);

      this.tryMintPoToken();

      const maxRetries = options.maxRetries ?? DEFAULT_MAX_RETRIES;
      const enabledTrackTypesBitfield = options.enabledTrackTypes ?? EnabledTrackTypes.VIDEO_AND_AUDIO;

      if (options.snapshot && options.snapshot.tracks.length > 0) {
        const snapshot = options.snapshot;
        const snapshotVideoFormat = snapshot.tracks.find((track) => createFormatKey(track) === createFormatKey(videoFormat));
        const snapshotAudioFormat = snapshot.tracks.find((track) => createFormatKey(track) === createFormatKey(audioFormat));

        assertIsDefined(snapshotVideoFormat, 'Video format from snapshot does not match the selected video format');
        assertIsDefined(snapshotAudioFormat, 'Audio format from snapshot does not match the selected audio format');

        this.trackMetadata = this.bufferState.restore(snapshot.tracks);
        this.seekTo(snapshot.playerTimeMs, 'client');
      } else this.seekTo(options.startTimeMs ?? (this._isLive && !options.isPostLiveDvr ? LIVE_EDGE_SENTINEL_MS : 0), 'client');

      const abrState: ClientAbrState = {
        playerTimeMs: this.playerTimeMs.toString(),
        audioTrackId: audioFormat.audioTrackId,
        playbackRate: 1,
        stickyResolution: videoFormat.height,
        elapsedWallTimeMs: '0',
        timeSinceLastSeek: '0',
        timeSinceLastActionMs: '0',
        drcEnabled: audioFormat.isVb ? false : audioFormat.isDrc,
        enableVoiceBoost: audioFormat.isVb,
        clientViewportIsFlexible: false,
        visibility: 1,
        enabledTrackTypesBitfield
      };

      this.playbackSessionStartMs = Date.now();

      while (!this.shouldStop) {
        if (this._aborted) {
          this.logger.debug(TAG, 'Stream aborted');
          break;
        }

        const elapsedTimeMs = this.getElapsedWallTimeMs().toString();

        // In a real player, these two would have their own values, but we're downloading so it doesn't matter.. Just need them so that
        // nextRequestPolicy#targetAudioReadaheadMs and nextRequestPolicy#targetVideoReadaheadMs naturally increase over time.
        abrState.timeSinceLastSeek = elapsedTimeMs;
        abrState.timeSinceLastActionMs = elapsedTimeMs;
        abrState.elapsedWallTimeMs = elapsedTimeMs;

        if (this.bandwidthEstimateBps > 0)
          abrState.bandwidthEstimate = Math.round(this.bandwidthEstimateBps).toString();

        this.logger.debug(TAG, `Starting new segment fetch, playerTimeMs=${abrState.playerTimeMs}, bandwidthEstimate=${abrState.bandwidthEstimate}, elapsedWallTimeMs=${abrState.elapsedWallTimeMs}`);

        this.checkForStall(options.stallDetectionMs);

        const success = await this.executeWithRetry(
          () => this.fetchAndProcess(
            abrState,
            audioFormat,
            videoFormat
          ),
          maxRetries
        );

        abrState.playerTimeMs = this.playerTimeMs.toString();

        const videoEndOfStreamReached = endOfStreamReached(this.trackMetadata.video);
        const audioEndOfStreamReached = endOfStreamReached(this.trackMetadata.audio);

        const endOfStream =
          (videoEndOfStreamReached && audioEndOfStreamReached)
          || (abrState.enabledTrackTypesBitfield === EnabledTrackTypes.VIDEO_ONLY && videoEndOfStreamReached)
          || (abrState.enabledTrackTypesBitfield === EnabledTrackTypes.AUDIO_ONLY && audioEndOfStreamReached);

        if (endOfStream)
          this.shouldStop = true;

        if (this._isLive)
          this.heartbeat().then();

        if (!success) break;
      }
    } catch (error) {
      if (!this._aborted)
        this.errorHandler(error as Error);
    } finally {
      if (!this._aborted && !this._errored) {
        this.trackOutputs.video.controller?.close();
        this.trackOutputs.audio.controller?.close();
        this.emit('finish');
      }

      this.reset();
    }
  }

  private async heartbeat(): Promise<void> {
    const heartbeatParams = this.heartbeatParams;
    const heartbeatCallback = this.callbacks.onCheckHeartbeat;

    if (!heartbeatCallback || !this.videoId)
      return;

    const intervalMs = heartbeatParams.intervalMilliseconds !== undefined ? parseInt(heartbeatParams.intervalMilliseconds, 10) : DEFAULT_HEARTBEAT_INTERVAL_MS;
    const timeSinceLastHeartbeat = Date.now() - this.lastHeartbeatTimeMs;

    if (timeSinceLastHeartbeat < intervalMs)
      return;

    try {
      this.lastHeartbeatTimeMs = Date.now();

      const heartbeatBody: HeartbeatRequest = {
        heartbeatRequestParams: {
          heartbeatChecks: [ 'HEARTBEAT_CHECK_TYPE_LIVE_STREAM_STATUS' ]
        },
        videoId: this.videoId
      };

      if ('heartbeatToken' in heartbeatParams)
        heartbeatBody.heartbeatToken = heartbeatParams.heartbeatToken;

      if ('heartbeatServerData' in heartbeatParams)
        heartbeatBody.heartbeatServerData = heartbeatParams.heartbeatServerData;

      const response = await heartbeatCallback(heartbeatBody);
      if (this.shouldStop) return; // bail early if we stopped during the heartbeat check

      // Not needed, but observed that YouTube does this, so might as well.
      if ('heartbeatServerData' in response)
        this.heartbeatParams.heartbeatServerData = response.heartbeatServerData;

      if ('broadcastId' in response && response.broadcastId !== undefined)
        this.validateBroadcastId(response.broadcastId);

      if (response.status === 'OK') {
        this.logger.debug(TAG, 'Live stream is online');
        return;
      }

      if (response.status === 'LIVE_STREAM_OFFLINE') {
        if (response.offlineSlatePresent && !response.displayEndscreen) {
          this.logger.debug(TAG, 'Live stream is offline but not displaying endscreen. Continuing.');
        } else if (response.displayEndscreen || response.offlineSlateButtonsPresent) {
          const elapsedTimeSinceLastProgress = Date.now() - this.progressTracker.lastProgressTime;

          if (elapsedTimeSinceLastProgress > OFFLINE_GRACE_PERIOD_MS) {
            this.logger.debug(TAG, `Heartbeat check indicates live stream is offline and no activity for ${elapsedTimeSinceLastProgress}ms. Stopping stream.`);
            this.shouldStop = true;
          } else { // e.g., post live
            this.logger.debug(TAG, `Heartbeat check indicates live stream is offline, but progress was made ${elapsedTimeSinceLastProgress}ms ago. Continuing.`);
          }
        }
      }
    } catch (error: unknown) {
      this.logger.error(TAG, 'Heartbeat check failed:', (error as Error).message);
    }
  }

  private reset(): void {
    this.sabrContextUpdates.clear();
    this.ssapPlaybackInfos.clear();
    this.activeSabrContextTypes.clear();
    this.bufferState.reset();

    this.abortController = undefined;
    this.nextRequestPolicy = undefined;

    this.spsRejectCount = 0;
    this.playerTimeMs = 0;
    this.requestNumber = 0;
    this.bandwidthEstimateBps = 0;
    this.isMintingPoToken = false;

    this.resetProgressTracker(0);
    this.clearRequestTimeout();
    this.setBusyState(false);
  }

  private getElapsedWallTimeMs(): number {
    if (this.playbackSessionStartMs === undefined) return 0;
    return Date.now() - this.playbackSessionStartMs;
  }

  private checkForStall(stallDetectionMs?: number): void {
    if (this._isLive && this.playerTimeMs === LIVE_EDGE_SENTINEL_MS)
      return; // no progress yet

    const currentTime = Date.now();
    const currentProgress = this.playerTimeMs;
    const stallThreshold = stallDetectionMs ?? DEFAULT_STALL_DETECTION_MS;

    if (currentProgress > this.progressTracker.lastBufferedTimeMs) {
      this.recordProgress(currentProgress);
    } else if (currentTime - this.progressTracker.lastProgressTime > stallThreshold) {
      this.progressTracker.stallCount++;

      this.logger.warn(TAG, `Stream stalled for ${stallThreshold}ms (stall #${this.progressTracker.stallCount})`);

      if (this.progressTracker.stallCount >= MAX_STALLS) {
        if (this._isLive) {
          this.logger.warn(TAG, 'Live stream stalled. Assuming end of stream and stopping download');
          this.shouldStop = true;
        } else throw new Error(`Stream stalled ${MAX_STALLS} times. Aborting`);
      }

      this.progressTracker.lastProgressTime = currentTime;
    }
  }

  private async executeWithRetry(
    fetchFn: () => Promise<void>,
    maxRetries: number
  ): Promise<boolean> {
    const backoffTimeMs = this.nextRequestPolicy?.backoffTimeMs || 0;

    if (backoffTimeMs > 0) {
      this.logger.debug(TAG, `Backing off for ${backoffTimeMs}ms before next request`);
      await wait(backoffTimeMs);
    }

    for (let attempt = 1; attempt <= maxRetries + 1; attempt++) {
      // If the stream is aborted during the backoff wait, exit early without making a request.
      if (this._aborted) {
        this.logger.debug(TAG, 'Abort requested, preventing new requests');
        return false;
      }

      try {
        this.setBusyState(true);
        await fetchFn();
        this.setBusyState(false);
        return true;
      } catch (e) {
        // @NOTE: Don't use a finally block for this. A retry backoff would delay the busy state
        // from being updated.
        this.setBusyState(false);

        const error = e as Error;

        // If we abort WHILE processing data, bufferManager#finalizeSegment might throw if it is called
        // because both media streams are closed.
        if (this._aborted) {
          this.logger.debug(TAG, 'Abort requested, not retrying fetch');
          return false;
        }

        if (attempt > maxRetries) {
          this.logger.error(TAG, `Retries exhausted while fetching segment: ${error.message}`);
          this.errorHandler(error);
          break;
        }

        const retryBackoffMs = Math.min(INITIAL_RETRY_BACKOFF_MS * Math.pow(2, attempt - 1), MAX_RETRY_BACKOFF_MS);
        this.logger.warn(TAG, `Segment fetch attempt ${attempt}/${maxRetries} failed - retrying in ${retryBackoffMs}ms`, error);
        await wait(retryBackoffMs);
      }
    }

    return false;
  }

  private setBusyState(isBusy: boolean): void {
    this._isBusy = isBusy;
    if (!isBusy) {
      this.idleResolvers.forEach((resolve) => resolve());
      this.idleResolvers = [];
    }
  }

  private errorHandler(error: Error): void {
    this._errored = true;
    this.trackOutputs.video.controller?.error(error);
    this.trackOutputs.audio.controller?.error(error);
    this.emit('error', error);
  }

  private async fetchAndProcess(
    abrState: ClientAbrState,
    selectedAudioFormat: SabrFormat,
    selectedVideoFormat: SabrFormat
  ): Promise<void> {
    // Keep current gen id so we can detect if it changes during this request.
    const requestPoTokenGeneration = this.poTokenGenerationId;

    const requestBody = this.buildRequestBody(abrState, selectedAudioFormat, selectedVideoFormat);
    const response = await this.makeStreamingRequest(requestBody);
    const contentType = response.headers.get('content-type');

    assert(response.ok, `Server returned ${response.status} ${response.statusText}`);
    assert(contentType === 'application/vnd.yt-ump', `Unexpected content type from server: ${contentType}`);
    assertIsDefined(response.body, 'Response body is null');

    const startTime = performance.now();

    const reader = response.body.getReader();

    let serverSeek = false;
    let bytesDownloaded = 0;

    //#region UMP Reader
    const umpReader = new UmpReader({
      onPart: async (type, data) => {
        switch (type) {
          case UMPPartId.SABR_ERROR: {
            const sabrError = decodePart(data.chunks, SabrError);
            if (!sabrError) break;
            throw new Error(`SABR Error: ${sabrError.type} - ${sabrError.code}`);
          }

          case UMPPartId.FORMAT_INITIALIZATION_METADATA: {
            const formatInitializationMetadata = decodePart(data.chunks, FormatInitializationMetadata);
            if (!formatInitializationMetadata) break;

            if (this.videoId !== formatInitializationMetadata.videoId) {
              this.logger.warn(TAG, `Video ID mismatch: expected ${this.videoId}, got ${formatInitializationMetadata.videoId}. Ignoring format initialization metadata.`);
              return;
            }

            const formatKey = createFormatKey(formatInitializationMetadata);

            if (!this.bufferState.tracks.has(formatKey)) {
              const formatType = getMediaType(formatInitializationMetadata);
              const selectedFormat = formatType === 'video' ? selectedVideoFormat : selectedAudioFormat;

              this.logger.debug(TAG, `Initialized format: itag=${formatInitializationMetadata.formatId?.itag}, mimeType=${formatInitializationMetadata.mimeType}`);

              const track = this.trackMetadata[formatType];
              track.formatId = formatInitializationMetadata.formatId;
              track.mimeType = formatInitializationMetadata.mimeType;
              track.endTimeTicks = parseInt(formatInitializationMetadata.endTimeTicks || '0');
              track.endTimescale = parseInt(formatInitializationMetadata.endTimeTimescale || '1000');
              track.endSegmentNum = parseInt(formatInitializationMetadata.endSegmentNum || '0');
              track.targetDurationSec = selectedFormat.targetDurationSec; // @NOTE: Not a requirement. We always get it from the EMSG box anyway.
              this.bufferState.tracks.set(formatKey, track);

              this.emit('formatInitialization', track);
            }
            break;
          }

          case UMPPartId.MEDIA_HEADER: {
            const mediaHeader = decodePart(data.chunks, MediaHeader);
            if (!mediaHeader) break;

            if (this.videoId !== mediaHeader.videoId) {
              this.logger.warn(TAG, `Video ID mismatch: expected ${this.videoId}, got ${mediaHeader.videoId}. Ignoring media header.`);
              break;
            }

            this.logger.debug(TAG, `Received media header: headerId=${mediaHeader.headerId}, itag=${mediaHeader.itag}, segmentNum=${mediaHeader.segmentNum}, startMs=${mediaHeader.startMs}, durationMs=${mediaHeader.durationMs}, segmentLengthBytes=${mediaHeader.segmentLengthBytes}`);
            this.bufferState.queueMediaHeader(mediaHeader);
            break;
          }

          case UMPPartId.MEDIA: {
            const headerId = data.getUint8(0);
            const dataBuffer = data.split(1).remainingBuffer;
            this.bufferState.appendMediaData(headerId, dataBuffer.chunks);
            break;
          }

          case UMPPartId.MEDIA_END: {
            const headerId = data.getUint8(0);
            if (this.bufferState.finalizeSegment(headerId)) {
              this.recordProgress(this.bufferState.getBuffered());
              this.logger.debug(TAG, `Finalized segment: headerId=${headerId}`);
              this.emit('trackMetadataUpdate', this.trackMetadata);
            }
            break;
          }

          case UMPPartId.LIVE_METADATA: {
            const sabrLiveMetadata = decodePart(data.chunks, SabrLiveMetadata);
            if (!sabrLiveMetadata) break;

            const broadcastId = sabrLiveMetadata.broadcastId;
            if (broadcastId) this.validateBroadcastId(broadcastId);

            this.emit('liveMetadataUpdate', sabrLiveMetadata);
            break;
          }

          case UMPPartId.SABR_SEEK: {
            const sabrSeek = decodePart(data.chunks, SabrSeek);
            if (!sabrSeek) break;

            if (sabrSeek.seekSource === SeekSource.SABR_SEEK_TO_HEAD) {
              const seekTimeMs = ticksToMs(parseInt(sabrSeek.seekMediaTime || '0'), sabrSeek.seekMediaTimescale || 1000, Math.floor);
              this.seekTo(seekTimeMs, 'server');
              this.resetProgressTracker(seekTimeMs);
              this.ssapPlaybackInfos.clear();
              serverSeek = true;
            }

            break;
          }

          case UMPPartId.CUEPOINT_LIST: {
            const cuepointList = decodePart(data.chunks, CuepointList);

            if (!(cuepointList && 'ssapInfos' in cuepointList))
              break;

            for (const info of cuepointList.ssapInfos) {
              const cuepoint = info.cuepoint;
              const cuepointId = cuepoint?.identifier || '';
              const timeRange = info.timeRange;

              if (!cuepoint || !timeRange)
                continue;

              if (cuepoint.event === CuepointEvent.STOP) {
                this.ssapPlaybackInfos.delete(cuepointId);
                this.logger.debug(TAG, `Removed cuepoint: identifier=${cuepointId}`);
              } else {
                if (this.ssapPlaybackInfos.has(cuepointId))
                  continue;

                const timescale = timeRange.timescale || 1000;
                const startTicks = parseInt(timeRange.startTicks || '0');
                const startTimeMs = String(Math.floor(ticksToMs(startTicks, timescale, Math.floor) - ((cuepoint.playheadTimeSec ?? 0) * 1000)));
                const durationMs = String((cuepoint.totalDurationSec ?? 0) * 1000);

                this.ssapPlaybackInfos.set(cuepointId, {
                  adCpns: [],
                  cuepointId,
                  startTimeMs,
                  durationMs,
                  state: AdState.RATECONTROL_CLIENT
                });

                this.logger.debug(TAG, `Added new cuepoint: cuepointId=${cuepointId}, startTimeMs=${startTimeMs}, durationMs=${durationMs}`);
              }
            }
            break;
          }

          case UMPPartId.SABR_CONTEXT_UPDATE: {
            const contextUpdate = decodePart(data.chunks, SabrContextUpdate);
            if (!contextUpdate || contextUpdate.type === undefined || !contextUpdate.value?.length)
              break;

            if (
              contextUpdate.writePolicy === SabrContextWritePolicy.KEEP_EXISTING &&
              this.sabrContextUpdates.has(contextUpdate.type)
            ) break;

            this.sabrContextUpdates.set(contextUpdate.type, contextUpdate);

            if (contextUpdate.sendByDefault)
              this.activeSabrContextTypes.add(contextUpdate.type);

            break;
          }

          case UMPPartId.SABR_CONTEXT_SENDING_POLICY: {
            const contextSendingPolicy = decodePart(data.chunks, SabrContextSendingPolicy);
            if (!contextSendingPolicy) break;

            for (const startPolicy of contextSendingPolicy.startPolicy) {
              if (!this.activeSabrContextTypes.has(startPolicy)) {
                this.activeSabrContextTypes.add(startPolicy);
                this.logger.debug(TAG, `Activated SABR context: type=${startPolicy}`);
              }
            }

            for (const stopPolicy of contextSendingPolicy.stopPolicy) {
              if (this.activeSabrContextTypes.has(stopPolicy)) {
                this.activeSabrContextTypes.delete(stopPolicy);
                this.logger.debug(TAG, `Deactivated SABR context: type=${stopPolicy}`);
              }
            }

            for (const discardPolicy of contextSendingPolicy.discardPolicy) {
              if (this.sabrContextUpdates.has(discardPolicy)) {
                this.sabrContextUpdates.delete(discardPolicy);
                this.logger.debug(TAG, `Discarded SABR context: type=${discardPolicy}`);
              }
            }
            break;
          }

          case UMPPartId.NEXT_REQUEST_POLICY: {
            this.nextRequestPolicy = decodePart(data.chunks, NextRequestPolicy);
            break;
          }

          case UMPPartId.STREAM_PROTECTION_STATUS: {
            const streamProtectionStatus = decodePart(data.chunks, StreamProtectionStatus);
            if (!streamProtectionStatus || !streamProtectionStatus.status) break;

            this.emit('streamProtectionStatusUpdate', streamProtectionStatus);

            // If this is different, onMintPoToken resolved sometime before this part was received, so we should just ignore it.
            if (requestPoTokenGeneration !== this.poTokenGenerationId)
              break;

            const status = streamProtectionStatus.status;
            const reject = status === 3;
            const pending = status === 2;

            const maxRetries = streamProtectionStatus.maxRetries || 5;

            assert(this.spsRejectCount < maxRetries, `Stream protection attestation rejected after ${this.spsRejectCount} attempts`);

            if ((reject || pending) && !this.isMintingPoToken) {
              this.logger.warn(TAG,
                reject ?
                  `Stream protection attestation rejected: attempt ${this.spsRejectCount} of ${maxRetries}` :
                  'Stream protection attestation pending');

              if (reject)
                this.spsRejectCount += 1;

              this.tryMintPoToken();
            }

            break;
          }

          case UMPPartId.SABR_REDIRECT: {
            const sabrRedirect = decodePart(data.chunks, SabrRedirect);
            if (!sabrRedirect || !sabrRedirect.url) break;

            this.serverAbrStreamingUrl = new URL(sabrRedirect.url);
            this.validateStreamingUrl(this.serverAbrStreamingUrl);

            this.logger.debug(TAG, `Received SABR redirect: newUrl=${sabrRedirect.url}`);
            break;
          }

          case UMPPartId.RELOAD_PLAYER_RESPONSE: {
            const reloadPlaybackContext = decodePart(data.chunks, ReloadPlaybackContext);
            if (!reloadPlaybackContext) break;

            this.logger.debug(TAG, `Reload requested: reloadPlaybackParams=${reloadPlaybackContext.reloadPlaybackParams}`);

            const onReloadPlayerResponseCb = this.callbacks.onReloadPlayerResponse;

            if (onReloadPlayerResponseCb) {
              try {
                const response = await onReloadPlayerResponseCb(reloadPlaybackContext);
                this.setStreamingURL(response.serverAbrStreamingUrl);
                this.setUstreamerConfig(response.videoPlaybackUstreamerConfig);

                this.sabrContextUpdates.clear();
                this.activeSabrContextTypes.clear();
                this.ssapPlaybackInfos.clear();
              } catch (err: unknown) {
                throw new Error(`An error occurred while reloading streaming data: ${(err as Error)?.message}`);
              }
            } else throw new Error('Streaming data reload requested by server but no handler was found');
            break;
          }
        }
      }
    });
    //#endregion

    const abortController = this.abortController;

    try {
      while (true) {
        await this.waitForDrain();

        if (abortController?.signal.aborted && !this._aborted)
          throw new Error('Request timed out');

        // Bail if the stream is manually aborted while waiting for drain.
        if (this._aborted)
          break;

        const { done, value } = await reader.read();

        if (done)
          break;

        if (value.length > 0) {
          bytesDownloaded += value.length;
          this.resetRequestTimeout();
          await umpReader.feed(value);
        }
      }
    } finally {
      this.clearRequestTimeout();
      reader.cancel().catch(() => { /* no-op */ });
      reader.releaseLock();
      umpReader.dispose();
    }

    const fetchDurationMs = performance.now() - startTime;

    if (fetchDurationMs > MIN_FETCH_DURATION_FOR_BW_ESTIMATE_MS && bytesDownloaded > 0) {
      const currentBps = (bytesDownloaded * 8) / (fetchDurationMs / 1000);
      this.bandwidthEstimateBps = this.bandwidthEstimateBps === 0 ? currentBps : BANDWIDTH_EMA_PREVIOUS_WEIGHT * this.bandwidthEstimateBps + BANDWIDTH_EMA_CURRENT_WEIGHT * currentBps;
    }

    if (!serverSeek) {
      const buffered = this.bufferState.getBuffered();
      if (buffered !== Infinity) {
        this.seekTo(buffered, 'client');
      }
    }
  }

  private tryMintPoToken(): void {
    const onMintPoToken = this.callbacks.onMintPoToken;

    if (onMintPoToken) {
      this.isMintingPoToken = true;

      (async () => {
        try {
          const token = await onMintPoToken();
          this.proofOfOriginToken = token;
          this.poTokenGenerationId += 1;
        } catch (err: unknown) {
          this.logger.error(TAG, `An error occurred while minting proof of origin token: ${(err as Error)?.message}`);
        } finally {
          this.isMintingPoToken = false;
        }
      })();
    }
  }

  private buildRequestBody(
    abrState: ClientAbrState,
    selectedAudioFormat: SabrFormat,
    selectedVideoFormat: SabrFormat
  ): Uint8Array<ArrayBuffer> {
    const initializationFormatIds: FormatId[] = [];
    const ssapPlaybackInfos = Array.from(this.ssapPlaybackInfos.values());
    const videoPlaybackUstreamerConfig = base64ToU8(this.videoPlaybackUstreamerConfig);
    const bufferedRanges = this.bufferState.getBufferedRanges();
    const playbackCookie = this.nextRequestPolicy?.playbackCookie ? PlaybackCookie.encode(this.nextRequestPolicy.playbackCookie).finish() : undefined;
    const clientInfo = this.clientInfo;
    const poToken = this.proofOfOriginToken;

    // No need to set initialization formats for live since every segment is self-initializing.
    if (!this._isLive)
      for (const track of [ this.trackMetadata.video, this.trackMetadata.audio ])
        if (track.formatId) initializationFormatIds.push(track.formatId);

    const { sabrContexts, unsentSabrContexts } = this.prepareSabrContexts();

    return <Uint8Array<ArrayBuffer>>VideoPlaybackAbrRequest.encode({
      clientAbrState: abrState,
      bufferedRanges,
      ssapPlaybackInfos,
      initializationFormatIds,
      selectedAudioFormatIds: [ selectedAudioFormat ],
      selectedVideoFormatIds: [ selectedVideoFormat ],
      selectedCaptionFormatIds: [],
      videoPlaybackUstreamerConfig,
      streamerContext: {
        clientInfo,
        playbackCookie,
        unsentSabrContexts,
        sabrContexts,
        poToken
      },
      field1000: []
    }).finish();
  }

  private prepareSabrContexts() {
    const sabrContexts: SabrContextUpdate[] = [];
    const unsentSabrContexts: number[] = [];

    for (const [ type, ctxUpdate ] of this.sabrContextUpdates.entries()) {
      if (this.activeSabrContextTypes.has(type)) sabrContexts.push(ctxUpdate);
      else unsentSabrContexts.push(type);
    }

    return { sabrContexts, unsentSabrContexts };
  }

  private async makeStreamingRequest(body: Uint8Array<ArrayBuffer>): Promise<Response> {
    this.serverAbrStreamingUrl.searchParams.set('rn', this.requestNumber.toString());

    this.abortController = new AbortController();
    this.resetRequestTimeout();

    try {
      return await this.fetchFunction(this.serverAbrStreamingUrl, {
        body,
        method: 'POST',
        headers: {
          'content-type': 'application/x-protobuf',
          'accept-encoding': 'identity',
          'accept': 'application/vnd.yt-ump'
        },
        signal: this.abortController.signal
      });
    } catch (error) {
      this.clearRequestTimeout();
      throw error;
    } finally {
      this.requestNumber += 1;
    }
  }

  private resetRequestTimeout(): void {
    this.clearRequestTimeout();
    const abortController = this.abortController;
    this.requestTimeoutId = setTimeout(() => abortController?.abort(), REQUEST_TIMEOUT_MS);
  }

  private clearRequestTimeout(): void {
    if (this.requestTimeoutId !== undefined) {
      clearTimeout(this.requestTimeoutId);
      this.requestTimeoutId = undefined;
    }
  }

  private recordProgress(progressMs: number): void {
    if (!Number.isFinite(progressMs) || progressMs <= this.progressTracker.lastBufferedTimeMs) {
      return;
    }

    this.progressTracker.lastProgressTime = Date.now();
    this.progressTracker.lastBufferedTimeMs = progressMs;
    this.progressTracker.stallCount = 0;
  }

  private seekTo(timeMs: number, source: 'server' | 'client'): void {
    this.logger.debug(TAG, `Seeking: timeMs=${timeMs}, source=${source}`);
    this.playerTimeMs = Math.round(timeMs);
  }

  private resetProgressTracker(progressMs: number): void {
    this.progressTracker = {
      lastProgressTime: Date.now(),
      lastBufferedTimeMs: progressMs,
      stallCount: 0
    };
  }
  //#endregion
}