import type { SabrStreamState } from '../core/SabrStream.js';
import type { FetchFunction, SabrFormat } from './shared.js';
import type { EnabledTrackTypes } from '../utils/index.js';
import type { ClientInfo } from '../utils/Protos.js';

export interface SabrStreamConfig {
  /**
   * Custom fetch implementation to use for HTTP requests.
   * If not provided, the global `fetch` function will be used.
   */
  fetch?: FetchFunction;

  /**
   * The URL endpoint for server-side ABR streaming requests.
   * This is typically obtained from the initial player response.
   */
  serverAbrStreamingUrl?: string;

  /**
   * Base64-encoded Ustreamer configuration obtained from the player response.
   * Required for authorizing and configuring the streaming session.
   */
  videoPlaybackUstreamerConfig?: string;

  /**
   * Client information used to identify the requesting device/app.
   * Contains details like client name, version, and capabilities.
   */
  clientInfo?: ClientInfo;

  /**
   * Proof of Origin token for content protection verification.
   */
  poToken?: string;

  /**
   * Total duration of the media content in milliseconds.
   * If not provided, will be determined from format metadata.
   */
  durationMs?: number;

  /**
   * Array of available streaming formats obtained from the player response.
   */
  formats?: SabrFormat[];
}

export interface SabrPlaybackOptions {
  /**
   * Video format selection, can be a format ID number, a SabrFormat object,
   * or a function that selects a format from the available formats array.
   */
  videoFormat?: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined);

  /**
   * Audio format selection, can be a format ID number, a SabrFormat object,
   * or a function that selects a format from the available formats array.
   */
  audioFormat?: number | SabrFormat | ((formats: SabrFormat[]) => SabrFormat | undefined);

  /**
   * Preferred video quality (e.g., "1080p", "720p").
   */
  videoQuality?: string;

  /**
   * Preferred audio quality (e.g., "high", "medium").
   */
  audioQuality?: string;

  /**
   * Preferred video language code.
   */
  videoLanguage?: string;

  /**
   * Preferred audio language code.
   */
  audioLanguage?: string;

  /**
   * Whether to prefer WebM container format.
   */
  preferWebM?: boolean;

  /**
   * Whether to prefer MP4 container format.
   */
  preferMP4?: boolean;

  /**
   * Whether to prefer H.264 video codec.
   */
  preferH264?: boolean;

  /**
   * Whether to prefer Opus audio codec.
   */
  preferOpus?: boolean;

  /**
   * Maximum number of retry attempts when fetching segments.
   * Default is 10.
   */
  maxRetries?: number;

  /**
   * Duration in milliseconds after which a stall is detected if no progress is made.
   * Default is 30000 (30 seconds).
   */
  stallDetectionMs?: number;

  /**
   * Enabled track types for streaming (audio only, video only, or both).
   * @see EnabledTrackTypes
   */
  enabledTrackTypes?: EnabledTrackTypes;

  /**
   * Previously saved state to resume a download.
   */
  state?: SabrStreamState;
}
