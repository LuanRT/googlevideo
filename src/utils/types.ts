import type { FormatId } from '../../protos/generated/misc/common.js';
import type { MediaHeader_TimeRange } from '../../protos/generated/video_streaming/media_header.js';
import type { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
import type { SabrRedirect } from '../../protos/generated/video_streaming/sabr_redirect.js';
import type { StreamProtectionStatus } from '../../protos/generated/video_streaming/stream_protection_status.js';
import type { Zpa, MediaInfo } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
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
  durationMs?: number;
  startMs?: number;
  startDataRange?: number;
  sequenceNumber?: number;
  contentLength?: number;
  timeRange?: MediaHeader_TimeRange;
}

export type InitializedFormat = {
  formatId: FormatId;
  durationMs?: number;
  mimeType?: string;
  sequenceCount?: number;
  initSegment?: Uint8Array;
  sequenceList: Sequence[];
  mediaData: Uint8Array;
  _initSegmentMediaId?: number;
  _headerIds: Set<number>;
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