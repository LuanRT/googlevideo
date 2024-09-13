import type { FormatId } from '../../protos/generated/misc/common.js';
import type { MediaHeader_TimeRange } from '../../protos/generated/video_streaming/media_header.js';
import type { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
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
  server_abr_streaming_url: string;
  video_playback_ustreamer_config: string;
  po_token?: string;
  duration_ms: number;
}
export type ServerAbrResponse = {
  initialized_formats: InitializedFormat[];
  stream_protection_status?: StreamProtectionStatus;
  sabr_error?: SabrError;
}

export type Sequence = {
  itag?: number;
  format_id?: FormatId;
  duration_ms?: number;
  start_ms?: number;
  start_data_range?: number;
  sequence_number?: number;
  content_length?: number;
  time_range?: MediaHeader_TimeRange;
}

export type InitializedFormat = {
  format_id: FormatId;
  duration_ms?: number;
  mime_type?: string;
  sequence_count?: number;
  init_segment?: Uint8Array;
  sequence_list: Sequence[];
  media_data: Uint8Array;
  _init_segment_media_id?: number;
  _media_data_ids: number[];
  _state: Zpa;
}

export type InitOptions = {
  audio_formats: Format[];
  video_formats: Format[];
  media_info?: MediaInfo;
};

export type MediaArgs = {
  media_info: MediaInfo;
  audio_format_ids: FormatId[];
  video_format_ids: FormatId[];
}

export type Format = {
  itag: number;
  url?: string;
  width?: number;
  height?: number;
  last_modified: Date;
  last_modified_ms: string;
  content_length?: number;
  quality?: string;
  xtags?: string;
  drm_families?: string[];
  fps?: number;
  quality_label?: string;
  projection_type?: 'RECTANGULAR' | 'EQUIRECTANGULAR' | 'EQUIRECTANGULAR_THREED_TOP_BOTTOM' | 'MESH';
  average_bitrate?: number;
  bitrate: number;
  spatial_audio_type?: 'AMBISONICS_5_1' | 'AMBISONICS_QUAD' | 'FOA_WITH_NON_DIEGETIC';
  target_duration_dec?: number;
  fair_play_key_uri?: string;
  stereo_layout?: 'LEFT_RIGHT' | 'TOP_BOTTOM';
  max_dvr_duration_sec?: number;
  high_replication?: boolean;
  audio_quality?: string;
  approx_duration_ms: number;
  audio_sample_rate?: number;
  audio_channels?: number;
  loudness_db?: number;
  signature_cipher?: string;
  is_drc?: boolean;
  drm_track_type?: string;
  distinct_params?: string;
  track_absolute_loudness_lkfs?: number;
  mime_type: string;
  is_type_otf: boolean;
  init_range?: {
    start: number;
    end: number;
  };
  index_range?: {
    start: number;
    end: number;
  };
  cipher?: string;
  audio_track?: {
    audio_is_default: boolean;
    display_name: string;
    id: string;
  };
  has_audio: boolean;
  has_video: boolean;
  has_text: boolean;
  language?: string | null;
  is_dubbed?: boolean;
  is_descriptive?: boolean;
  is_secondary?: boolean;
  is_original?: boolean;
  color_info?: {
    primaries?: string;
    transfer_characteristics?: string;
    matrix_coefficients?: string;
  };
  caption_track?: {
    display_name: string;
    vss_id: string;
    language_code: string;
    kind?: 'asr' | 'frc';
    id: string;
  };
}

export type FetchFunction = typeof fetch;