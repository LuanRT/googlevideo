/**
 * This module contains type definitions used across the library.
 * @module
 */

import type { CompositeBuffer } from '../core/CompositeBuffer.js';

export type Part = {
  type: number;
  size: number;
  data: CompositeBuffer;
};

export interface SabrFormat {
  itag: number;
  lastModified: string;
  xtags?: string;
  width?: number;
  height?: number;
  contentLength?: number;
  audioTrackId?: string;
  mimeType?: string;
  isDrc?: boolean;
  quality?: string;
  qualityLabel?: string;
  averageBitrate?: number;
  bitrate: number;
  audioQuality?: string;
  approxDurationMs: number;
  language?: string | null;
  isDubbed?: boolean;
  isAutoDubbed?: boolean;
  isDescriptive?: boolean;
  isSecondary?: boolean;
  isOriginal?: boolean;
}

export interface FormatStream {
  itag: number;
  last_modified_ms?: string;
  lastModified?: string;
  xtags?: string;
  width?: number;
  height?: number;
  mime_type?: string;
  mimeType?: string;
  audio_quality?: string;
  audioQuality?: string;
  bitrate: number;
  average_bitrate?: number;
  averageBitrate?: number;
  quality?: string;
  quality_label?: string;
  qualityLabel?: string;
  audio_track?: { id: string };
  audioTrackId?: string;
  is_drc?: boolean;
  isDrc?: boolean;
  approx_duration_ms?: number;
  approxDurationMs?: string;
  content_length?: number;
  contentLength?: string;
  is_auto_dubbed?: boolean;
  is_descriptive?: boolean;
  is_dubbed?: boolean;
  language?: string | null;
  is_original?: boolean;
  is_secondary?: boolean;
}

export type FetchFunction = typeof fetch;