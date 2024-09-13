/**
 * TODO: Use camelCase for all variables and functions here (except for protobuf generated stuff).
 * I was originally planning to implement this into YouTube.js, but as I started implementing more
 * googlevideo related things, I realized this would be better suited as a separate module :).
 */

import { UMP } from './UMP.js';
import { EventEmitterLike, PART, base64ToU8 } from '../utils/index.js';

import { MediaInfo_MediaType } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import { VideoPlaybackAbrRequest } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import { MediaHeader } from '../../protos/generated/video_streaming/media_header.js';
import { NextRequestPolicy } from '../../protos/generated/video_streaming/next_request_policy.js';
import { FormatInitializationMetadata } from '../../protos/generated/video_streaming/format_initialization_metadata.js';
import { SabrRedirect } from '../../protos/generated/video_streaming/sabr_redirect.js';
import { SabrError } from '../../protos/generated/video_streaming/sabr_error.js';
import { StreamProtectionStatus } from '../../protos/generated/video_streaming/stream_protection_status.js';
import { PlaybackCookie } from '../../protos/generated/video_streaming/playback_cookie.js';

import type { FormatId } from '../../protos/generated/misc/common.js';
import type { MediaInfo } from '../../protos/generated/video_streaming/video_playback_abr_request.js';
import type { FetchFunction, InitializedFormat, InitOptions, MediaArgs, ServerAbrResponse, ServerAbrStreamOptions } from '../utils/types.js';
import { ChunkedDataBuffer } from './ChunkedDataBuffer.js';

export class ServerAbrStream extends EventEmitterLike {
  private fetch_fn: FetchFunction;
  private server_abr_streaming_url: string;
  private video_playback_ustreamer_config: string;
  private po_token?: string;
  private playback_cookie?: PlaybackCookie;
  private initialized_formats: InitializedFormat[] = [];
  private total_duration_ms: number;

  constructor(args: ServerAbrStreamOptions) {
    super();
    this.fetch_fn = args.fetch || fetch;
    this.server_abr_streaming_url = args.server_abr_streaming_url;
    this.video_playback_ustreamer_config = args.video_playback_ustreamer_config;
    this.po_token = args.po_token;
    this.total_duration_ms = args.duration_ms;
  }

  public on(event: 'data', listener: (data: ServerAbrResponse) => void): void;
  public on(event: 'error', listener: (error: Error) => void): void;
  public on(event: string, listener: (...args: any[]) => void): void {
    super.on(event, listener);
  }

  public once(event: 'data', listener: (data: ServerAbrResponse) => void): void;
  public once(event: 'error', listener: (error: Error) => void): void;
  public once(event: string, listener: (...args: any[]) => void): void {
    super.once(event, listener);
  }

  public async init(args: InitOptions) {
    const { audio_formats, video_formats, media_info: initial_media_info } = args;

    const first_video_format = video_formats ? video_formats[0] : undefined;
   
    const media_info: MediaInfo = {
      lastManualDirection: 0,
      timeSinceLastManualFormatSelectionMs: 0,
      videoWidth: video_formats.length === 1 ? first_video_format?.width : 720,
      iea: video_formats.length === 1 ? first_video_format?.width : 720,
      startTimeMs: 0,
      visibility: 0,
      mediaType: MediaInfo_MediaType.MEDIA_TYPE_DEFAULT,
      ...initial_media_info
    };

    const audio_format_ids = audio_formats.map<FormatId>((fmt) => ({
      itag: fmt.itag,
      lastModified: parseInt(fmt.last_modified_ms),
      xtags: fmt.xtags
    }));

    const video_format_ids = video_formats.map<FormatId>((fmt) => ({
      itag: fmt.itag,
      lastModified: parseInt(fmt.last_modified_ms),
      xtags: fmt.xtags
    }));

    if (typeof media_info.startTimeMs !== 'number')
      throw new Error('Invalid media start time');

    try {
      while (media_info.startTimeMs < this.total_duration_ms) {
        const data = await this.fetchMedia({ media_info, audio_format_ids, video_format_ids });

        this.emit('data', data);

        if (data.sabr_error) break;

        const main_format =
          media_info.mediaType === MediaInfo_MediaType.MEDIA_TYPE_DEFAULT
            ? data.initialized_formats.find((fmt) => fmt.mime_type?.includes('video'))
            : data.initialized_formats[0];

        if (!main_format) break;
        if (main_format?.sequence_count === main_format.sequence_list[main_format.sequence_list.length - 1].sequence_number) break;

        media_info.startTimeMs += main_format.sequence_list.reduce((acc, seq) => acc + (seq.duration_ms || 0), 0);
      }
    } catch (error) {
      this.emit('error', error);
    }
  }

  private async fetchMedia(args: MediaArgs): Promise<ServerAbrResponse> {
    const { media_info, audio_format_ids, video_format_ids } = args;

    this.initialized_formats.forEach((format) => {
      format.sequence_list = [];
      format.media_data = new Uint8Array(0);
    });

    const body = VideoPlaybackAbrRequest.encode({
      mediaInfo: media_info,
      formatIds: this.initialized_formats.map((fmt) => fmt.format_id),
      audioFormatIds: audio_format_ids,
      videoFormatIds: video_format_ids,
      videoPlaybackUstreamerConfig: base64ToU8(this.video_playback_ustreamer_config),
      sc: {
        field5: [],
        field6: [],
        poToken: this.po_token ? base64ToU8(this.po_token) : undefined,
        playbackCookie: this.playback_cookie ? PlaybackCookie.encode(this.playback_cookie).finish() : undefined,
        clientInfo: {
          clientName: 1,
          clientVersion: '2.2040620.05.00',
          osName: 'Windows',
          osVersion: '10.0'
        }
      },
      ud: this.initialized_formats.map((fmt) => fmt._state),
      field1000: []
    }).finish();

    const response = await this.fetch_fn(this.server_abr_streaming_url, { method: 'POST', body });

    return this.processUMPResponse(response);
  }

  public async processUMPResponse(response: Response) {
    let sabr_error: SabrError | undefined;
    let stream_protection_status: StreamProtectionStatus | undefined;

    const data = await response.arrayBuffer();
    const ump = new UMP(new ChunkedDataBuffer([ new Uint8Array(data) ]));

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
        case PART.SABR_REDIRECT:
          this.processSabrRedirect(data);
          break;
        case PART.SABR_ERROR:
          sabr_error = SabrError.decode(data);
          break;
        case PART.STREAM_PROTECTION_STATUS:
          stream_protection_status = StreamProtectionStatus.decode(data);
          break;
        default:
          break;
      }
    });

    return {
      initialized_formats: this.initialized_formats,
      stream_protection_status,
      sabr_error
    };
  }

  private processMediaHeader(data: Uint8Array) {
    const media_header = MediaHeader.decode(data);
    const target_format = this.initialized_formats.find((fmt) => fmt.format_id.itag === media_header.itag);

    if (!target_format) return;

    // Skip processing if this is an init segment and we've already received it.
    if (media_header.isInitSeg) {
      if (!target_format.init_segment) {
        target_format._init_segment_media_id = media_header.headerId;
      } else return;
    }

    // Save the header's ID so we can identify its media data later.
    if (!target_format._media_data_ids.includes(media_header.headerId || 0)) {
      target_format._media_data_ids.push(media_header.headerId || 0);
    }

    if (media_header.sequenceNumber && !target_format.sequence_list.some((seq) => seq.sequence_number === media_header.sequenceNumber)) {
      target_format.sequence_list.push({
        itag: media_header.itag,
        format_id: media_header.formatId,
        duration_ms: media_header.durationMs,
        start_ms: media_header.startMs,
        start_data_range: media_header.startDataRange,
        sequence_number: media_header.sequenceNumber,
        content_length: media_header.contentLength,
        time_range: media_header.timeRange
      });

      // This ensures sequences are retrieved in order.
      this.initialized_formats.forEach((item) => {
        if (item._state && item.format_id.itag === media_header.itag) {
          item._state.durationMs += media_header.durationMs || 0;
          item._state.field5 += 1;
        }
      });
    }
  }

  private processMediaData(data: ChunkedDataBuffer) {
    const media_data_id = data.getUint8(0);
    const new_data = data.split(1).remainingBuffer.chunks[0];

    const target_format = this.initialized_formats.find((fmt) => fmt._media_data_ids.includes(media_data_id));

    if (!target_format) return;

    const isInitSegData = target_format._init_segment_media_id === media_data_id;

    if (target_format.init_segment && isInitSegData)
      return;

    if (isInitSegData) {
      target_format.init_segment = new_data;
      delete target_format._init_segment_media_id;
      return;
    }

    const combined_length = target_format.media_data.length + new_data.length;
    const temp_media_data = new Uint8Array(combined_length);

    temp_media_data.set(target_format.media_data);
    temp_media_data.set(new_data, target_format.media_data.length);

    target_format.media_data = temp_media_data;
  }

  private processEndOfMedia(data: ChunkedDataBuffer) {
    const media_data_id = data.getUint8(0);
    const target_format = this.initialized_formats.find((fmt) => fmt._media_data_ids.includes(media_data_id));
    if (target_format) target_format._media_data_ids.splice(target_format._media_data_ids.indexOf(media_data_id), 1);
  }

  private processNextRequestPolicy(data: Uint8Array) {
    const next_request_policy = NextRequestPolicy.decode(data);
    this.playback_cookie = next_request_policy.playbackCookie;
  }

  private processFormatInitialization(data: Uint8Array) {
    const format_initialization_metadata = FormatInitializationMetadata.decode(data);
    if (format_initialization_metadata.formatId && !this.initialized_formats.some((item) => item.format_id.itag === format_initialization_metadata.formatId?.itag)) {
      this.initialized_formats.push({
        format_id: format_initialization_metadata.formatId,
        duration_ms: format_initialization_metadata.durationMs,
        mime_type: format_initialization_metadata.mimeType,
        sequence_count: format_initialization_metadata.field4,
        sequence_list: [],
        media_data: new Uint8Array(),
        // Only meant to be used internally.
        _media_data_ids: [],
        _state: {
          formatId: format_initialization_metadata.formatId,
          startTimeMs: 0,
          durationMs: 0,
          field4: 1,
          field5: 0
        }
      });
    }
  }

  private processSabrRedirect(data: Uint8Array) {
    const sabr_redirect = SabrRedirect.decode(data);

    if (!sabr_redirect.url)
      throw new Error('Invalid SABR redirect');

    this.server_abr_streaming_url = sabr_redirect.url;
  }
}