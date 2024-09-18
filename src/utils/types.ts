import type { FormatId } from '../../protos/generated/misc/common.js';
import type { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
import type { SabrRedirect } from '../../protos/generated/video_streaming/sabr_redirect.js';
import type { StreamProtectionStatus } from '../../protos/generated/video_streaming/stream_protection_status.js';
import type { TimeRange } from '../../protos/generated/video_streaming/time_range.js';
import type { Zpa } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import type { MediaInfo } from '../../protos/generated/video_streaming/media_info.js';
import type { ChunkedDataBuffer } from '../core/index.js';

export type Part = {
  type: number;
  size: number;
  data: ChunkedDataBuffer;
};

export type ServerAbrStreamOptions = {
  fetch: FetchFunction;
  serverAbrStreamingUrl: string;
  videoPlaybackUstreamerConfig: string;
  poToken?: string;
  durationMs: number;
}

export type ServerAbrResponse = {
  initializedFormats: InitializedFormat[];
  streamProtectionStatus?: StreamProtectionStatus;
  sabrRedirect?: SabrRedirect;
  sabrError?: SabrError;
}

export type Sequence = {
  itag?: number;
  formatId?: FormatId;
  isInitSegment?: boolean;
  durationMs?: number;
  startMs?: number;
  startDataRange?: number;
  sequenceNumber?: number;
  contentLength?: number;
  timeRange?: TimeRange;
}

export type InitializedFormat = {
  formatId: FormatId;
  formatKey: string;
  durationMs?: number;
  mimeType?: string;
  sequenceCount?: number;
  sequenceList: Sequence[];
  mediaChunks: Uint8Array[];
  _state: Zpa;
}

export type InitOptions = {
  audioFormats: Format[];
  videoFormats: Format[];
  mediaInfo?: MediaInfo;
};

export type MediaArgs = {
  mediaInfo: MediaInfo;
  audioFormatIds: FormatId[];
  videoFormatIds: FormatId[];
}

export type Format = {
  itag: number;
  width?: number;
  height?: number;
  lastModified: string;
  xtags?: string;
}

export type FetchFunction = typeof fetch;