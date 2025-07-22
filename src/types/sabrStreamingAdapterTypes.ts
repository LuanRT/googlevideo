import type {
  ClientInfo,
  FormatInitializationMetadata,
  MediaHeader,
  NextRequestPolicy,
  PlaybackCookie,
  ReloadPlaybackContext,
  SabrContextSendingPolicy,
  SabrContextUpdate,
  SabrError,
  SabrRedirect,
  SnackbarMessage,
  StreamProtectionStatus
} from '../utils/Protos.js';

import type { SabrFormat } from './shared.js';
import type { CacheManager, RequestMetadataManager } from '../utils/index.js';

export interface SabrRequestMetadata {
  byteRange?: { start: number; end: number };
  format?: SabrFormat;
  isInit?: boolean;
  isUMP?: boolean;
  isSABR?: boolean;
  streamInfo?: {
    playbackCookie?: PlaybackCookie;
    nextRequestPolicy?: NextRequestPolicy;
    formatInitMetadata?: FormatInitializationMetadata[];
    streamProtectionStatus?: StreamProtectionStatus;
    reloadPlaybackContext?: ReloadPlaybackContext;
    sabrContextSendingPolicy?: SabrContextSendingPolicy;
    sabrContextUpdate?: SabrContextUpdate;
    snackbarMessage?: SnackbarMessage;
    mediaHeader?: MediaHeader;
    redirect?: SabrRedirect;
  };
  error?: {
    sabrError?: SabrError;
  };
  timestamp: number;
}

export interface SabrOptions {
  /**
   * Whether to enable caching of SABR segments.
   * @default true
   */
  enableCaching?: boolean;
  /**
   * Enables verbose logging of all SABR requests made by the player.
   * @NOTE: `DEBUG` level logging must be enabled for this to take effect.
   * @default false
   */
  enableVerboseRequestLogging?: boolean;
  /**
   * Maximum size of the segment cache in megabytes.
   * @default 3
   */
  maxCacheSizeMB?: number;
  /**
   * Maximum age of cached segments in seconds.
   * @default 300 (5 minutes)
   */
  maxCacheAgeSeconds?: number;
  /**
   * Player adapter to use for SABR streaming.
   */
  playerAdapter?: SabrPlayerAdapter;
  /**
   * Client information to send with SABR requests.
   */
  clientInfo?: ClientInfo;
}

export interface PlayerHttpResponse {
  url: string;
  method: string;
  headers: Record<string, string>;
  data?: ArrayBuffer | ArrayBufferView;
  makeRequest: (url: string, headers: Record<string, string>) => Promise<Omit<PlayerHttpResponse, 'makeRequest'>>;
}

export interface PlayerHttpRequest {
  url: string;
  method: string;
  headers: Record<string, string>;
  segment: RequestSegment;
  body?: ArrayBuffer | ArrayBufferView | null;
}

export interface RequestSegment {
  getStartTime: () => number | null;
  isInit: () => boolean;
}

export type RequestFilter = (request: PlayerHttpRequest) => Promise<PlayerHttpRequest | undefined> | PlayerHttpRequest | undefined;
export type ResponseFilter = (response: PlayerHttpResponse) => Promise<PlayerHttpResponse | undefined> | PlayerHttpResponse | undefined;

export interface SabrPlayerAdapter {
  initialize(
    player: any, 
    requestMetadataManager: RequestMetadataManager, 
    cache: CacheManager | null
  ): void;
  getPlayerTime(): number;
  getPlaybackRate(): number;
  getBandwidthEstimate(): number;
  getActiveTrackFormats(activeFormat: SabrFormat, sabrFormats: SabrFormat[]): {
    audioFormat?: SabrFormat;
    videoFormat?: SabrFormat;
  };
  registerRequestInterceptor(interceptor: RequestFilter): void;
  registerResponseInterceptor(interceptor: ResponseFilter): void;
  dispose(): void;
}