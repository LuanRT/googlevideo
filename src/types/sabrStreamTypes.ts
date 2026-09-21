import type { FetchFunction, SabrFormat } from './shared.js';
import type { BufferedRangeSummary, CompletedSegment } from '../utils/SabrBufferState.js';
import type { ClientInfo, FormatId, ReloadPlaybackContext, SabrLiveMetadata, StreamProtectionStatus } from '../utils/Protos.js';
import type { EnabledTrackTypes } from '../utils/formatUtils.js';
import type { EmsgSegmentMetadata } from '../utils/EmsgSegmentMetadata.js';

export interface SabrStreamConfig {
  videoId: string;
  /**
   * Custom fetch implementation to use for HTTP requests.
   * If not provided, the global `fetch` function will be used.
   */
  fetchFunction?: FetchFunction;
  serverAbrStreamingUrl: string;
  videoPlaybackUstreamerConfig: string;
  heartbeatParams?: HeartbeatParams;
  clientInfo: ClientInfo;
  /**
   * Proof of Origin token. It is recommended to use {@link SabrStreamCallbacks.onMintPoToken} instead,
   * as the server may reject the provided token if it is expired or invalid.
   */
  poToken?: string;
  formats: SabrFormat[];
  callbacks?: SabrStreamCallbacks;
  /**
   * Whether to strip duplicate initialization headers (moov/EBML) from segments after the first one.
   * @default true
   */
  stripDuplicateInit?: boolean;
  /**
   * @default
   * 1024 * 1024 * 16
   */
  videoHighWaterMark?: number;
  /**
   * @default
   * 1024 * 1024 * 2
   */
  audioHighWaterMark?: number;
}

export interface SabrStreamCallbacks {
  onCheckHeartbeat?: (innertubeRequestBody: HeartbeatRequest) => Promise<HeartbeatResponse>;
  onReloadPlayerResponse?: (context: ReloadPlaybackContext) => Promise<ReloadResponse>;
  onMintPoToken?: () => Promise<Uint8Array>;
}

export interface SelectedFormats {
  videoFormat: SabrFormat;
  audioFormat: SabrFormat;
}

export interface StreamStartResult {
  videoStream: ReadableStream<ArrayBufferView<ArrayBufferLike>>;
  audioStream: ReadableStream<ArrayBufferView<ArrayBufferLike>>;
  selectedFormats: SelectedFormats;
}

export type SabrStreamEvents = {
  trackMetadataUpdate: (trackMetadata: TrackMetadata) => void;
  formatInitialization: (track: TrackSegmentInfo) => void;
  streamProtectionStatusUpdate: (sps: StreamProtectionStatus) => void;
  liveMetadataUpdate: (liveMetadata: SabrLiveMetadata) => void;
  finish: () => void;
  abort: () => void;
  error: (e: Error) => void;
};

export interface HeartbeatRequest {
  heartbeatRequestParams?: {
    heartbeatChecks?: Array<
      | 'HEARTBEAT_CHECK_TYPE_UNKNOWN'
      | 'HEARTBEAT_CHECK_TYPE_LIVE_STREAM_STATUS'
      | 'HEARTBEAT_CHECK_TYPE_YPC'
      | 'HEARTBEAT_CHECK_TYPE_UNPLUGGED'
    >;
  };
  heartbeatServerData?: string;
  heartbeatToken?: string;
  videoId?: string;
}

export type PlayabilityStatus =
  | 'OK'
  | 'ERROR'
  | 'UNPLAYABLE'
  | 'LOGIN_REQUIRED'
  | 'CONTENT_CHECK_REQUIRED'
  | 'AGE_CHECK_REQUIRED'
  | 'LIVE_STREAM_OFFLINE'
  | 'FULLSCREEN_ONLY'
  | 'GL_PLAYBACK_REQUIRED'
  | 'AGE_VERIFICATION_REQUIRED';

export interface HeartbeatResponse {
  status?: PlayabilityStatus;
  broadcastId?: string;
  pollDelayMs?: string;
  displayEndscreen?: boolean;
  offlineSlatePresent?: boolean;
  offlineSlateButtonsPresent?: boolean;
  heartbeatServerData?: string;
}

export interface HeartbeatParams {
  heartbeatServerData?: string;
  heartbeatToken?: string;
  intervalMilliseconds?: string;
}

export interface ReloadResponse {
  serverAbrStreamingUrl: string;
  videoPlaybackUstreamerConfig: string;
}

export interface SabrPlaybackOptions {
  /**
   * Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.
   */
  videoFormat?: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined);
  /**
   * Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.
   */
  audioFormat?: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined);
  videoPreferences?: VideoFormatPreferences;
  audioPreferences?: AudioFormatPreferences;
  /**
   * Maximum number of retries for failed requests.
   * @default 10
   */
  maxRetries?: number;
  /**
   * Duration in milliseconds after which a stall is detected if no progress is made.
   * @default 30_000
   */
  stallDetectionMs?: number;
  enabledTrackTypes?: EnabledTrackTypes;
  startTimeMs?: number;
  isPostLiveDvr: boolean;
  /**
   * If provided, the stream will attempt to continue from the given snapshot.
   */
  snapshot?: SabrSnapshot;
}

export interface VideoFormatPreferences {
  /**
   * Quality label.
   * If not provided, the highest quality format will be selected.
   * @example '1080p', '720p', '480p', '360p', '240p', '144p'
   * @default undefined
   */
  quality?: string;
  /**
   * Required container format.
   * @default undefined
   */
  container?: 'webm' | 'mp4';
  /**
   * Video codec to prefer when available.
   * @default undefined
   */
  preferredVideoCodec?: 'h264' | 'vp9' | 'av1';
  superResolution?: boolean;
}

export interface AudioFormatPreferences {
  /**
   * Quality label.
   * If not provided, the highest quality format will be selected.
   * @default undefined
   */
  quality?:
  | 'AUDIO_QUALITY_ULTRALOW'
  | 'AUDIO_QUALITY_LOW'
  | 'AUDIO_QUALITY_MEDIUM'
  | 'AUDIO_QUALITY_HIGH';
  language?: string;
  /**
   * Required container format.
   * @default undefined
   */
  container?: 'webm' | 'mp4';
  /**
   * Audio codec to prefer when available.
   * @default undefined
   */
  preferredAudioCodec?: 'aac' | 'opus';
  voiceBoost?: boolean;
  dynamicRangeCompression?: boolean;
}

export interface AbortOptions {
  /**
   * If true, a snapshot will be created before aborting the stream.
   * @NOTE
   * To keep the snapshot accurate, `abort` will wait until the stream is idle before aborting the stream.
   */
  snapshot?: boolean;
}

export interface TrackOutput {
  stream: ReadableStream<ArrayBufferView<ArrayBufferLike>>;
  controller: ReadableStreamDefaultController<Uint8Array>;
}

export interface TrackOutputs {
  video: TrackOutput;
  audio: TrackOutput;
}

export interface TrackSegmentInfo {
  formatId?: FormatId;
  mimeType?: string;
  endSegmentNum?: number;
  endTimeTicks?: number;
  endTimescale?: number;
  targetDurationSec?: number;
  trackedSegments: Map<number, CompletedSegment>;
  bufferedRangeSummary?: BufferedRangeSummary;
  emsgSegmentMetadata?: EmsgSegmentMetadata;
}

export interface SabrSnapshot {
  playerTimeMs: number;
  tracks: TrackState[];
}
export interface TrackState extends Omit<TrackSegmentInfo, 'trackedSegments'> {
  trackedSegments: [number, CompletedSegment][];
}

export interface TrackMetadata {
  video: TrackSegmentInfo;
  audio: TrackSegmentInfo;
}