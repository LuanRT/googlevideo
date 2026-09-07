import { Logger } from './Logger.js';
import { createFormatKey } from './formatUtils.js';
import { getDurationMs, getStartMs } from './mediaTimeUtils.js';
import { stripMp4Init, stripWebmInit } from './mediaSegmentUtils.js';
import { getMediaType } from './streamUtils.js';
import { concatenateChunks } from './uint8arrayUtils.js';

import type { MediaHeader, BufferedRange } from './Protos.js';
import type { TrackMetadata, TrackOutputs, TrackSegmentInfo, TrackState } from '../types/sabrStreamTypes.js';

interface PendingSegment {
  formatKey: string;
  segmentNumber: number;
  mediaHeader: MediaHeader;
  startTimeMs: number;
  durationMs: number;
  bufferedChunks: Uint8Array[];
  type: 'audio' | 'video';
}

export interface CompletedSegment {
  segmentNumber: number;
  durationMs: number;
  startTimeMs: number;
  endTimeMs: number;
  mediaHeader: MediaHeader;
}

export interface BufferedRangeSummary {
  startTimeMs: number;
  durationMs: number;
  startSegmentIndex: number;
  endSegmentIndex: number;
}

const TAG = 'SabrBufferState';
const MAX_TRACKED_SEGMENTS = 64; // @NOTE: only metadata, not actual media

export class SabrBufferState {
  private readonly logger = Logger.getInstance();
  private readonly tracksMap = new Map<string, TrackSegmentInfo>();
  private readonly pendingSegments = new Map<number, PendingSegment>();

  constructor(
    private readonly stripDuplicateInit: boolean = true,
    private readonly trackOutputs: TrackOutputs
  ) { }

  get tracks(): Map<string, TrackSegmentInfo> {
    return this.tracksMap;
  }

  public reset(): void {
    this.tracksMap.clear();
    this.pendingSegments.clear();
  }

  public snapshot(): TrackState[] {
    const trackStates: TrackState[] = [];

    for (const track of this.tracksMap.values()) {
      trackStates.push({
        ...track,
        trackedSegments: Array.from(track.trackedSegments?.entries() || [])
      });
    }

    return trackStates;
  }

  public restore(states: TrackState[]): TrackMetadata {
    const trackMetadata = {} as TrackMetadata;

    for (const state of states) {
      const track = {
        ...state,
        trackedSegments: new Map(state.trackedSegments)
      };

      this.tracksMap.set(createFormatKey(track), track);

      const mediaType = getMediaType(track);
      trackMetadata[mediaType] = track;
    }

    return trackMetadata;
  }

  public queueMediaHeader(mediaHeader: MediaHeader): void {
    const headerId = mediaHeader.headerId ?? 0;
    const formatKey = createFormatKey(mediaHeader);
    const track = this.tracksMap.get(formatKey);

    if (!track) {
      this.logger.warn(TAG, `No track found: formatKey=${formatKey}, headerId=${headerId}`);
      return;
    }

    const segmentNumber = mediaHeader.isInitializationSegment ? 0 : mediaHeader.segmentNum!;

    if (track.trackedSegments.has(segmentNumber)) {
      this.logger.debug(TAG, `Ignoring recently downloaded segment: formatKey=${formatKey}, segmentNumber=${segmentNumber}`);
      return;
    }

    this.pendingSegments.set(headerId, {
      formatKey,
      segmentNumber,
      mediaHeader,
      startTimeMs: getStartMs(mediaHeader),
      durationMs: getDurationMs(mediaHeader),
      bufferedChunks: [],
      type: getMediaType(track)
    });
  }

  public appendMediaData(headerId: number, chunks: Uint8Array[]): void {
    const pendingSegment = this.pendingSegments.get(headerId);
    if (!pendingSegment) {
      this.logger.debug(TAG, `Received MEDIA for unknown header id ${headerId}`);
      return;
    }

    pendingSegment.bufferedChunks.push(...chunks);
  }

  public finalizeSegment(headerId: number): boolean {
    const pendingSegment = this.pendingSegments.get(headerId);
    if (!pendingSegment) {
      this.logger.debug(TAG, `Received MEDIA_END for unknown header id ${headerId}`);
      return false;
    }

    const track = this.tracksMap.get(pendingSegment.formatKey);

    if (!track) {
      this.pendingSegments.delete(headerId);
      return false;
    }

    const trackController = this.trackOutputs[getMediaType(track)].controller;
    const loadedBytes = pendingSegment.bufferedChunks.reduce((sum, chunk) => sum + chunk.length, 0);
    const expectedBytes = parseInt(pendingSegment.mediaHeader.segmentLengthBytes || '0');

    if (expectedBytes > 0 && loadedBytes !== expectedBytes) {
      this.logger.warn(
        TAG,
        `Ignoring partial segment ${pendingSegment.segmentNumber} for ${pendingSegment.formatKey}.\n` +
        `expected=${expectedBytes}, received=${loadedBytes}`
      );
      this.pendingSegments.delete(headerId);
      return false;
    }

    // @NOTE: The second check here is to avoid deleting the init segment when downloading vods.
    const shouldStripInit = this.stripDuplicateInit
      ? track.trackedSegments.size === 0 && !pendingSegment.mediaHeader.isInitializationSegment
      : true;

    const fullSegment = concatenateChunks(pendingSegment.bufferedChunks);

    const cleanedSegment =
      track.mimeType?.includes('webm')
        ? stripWebmInit(fullSegment, shouldStripInit)
        : stripMp4Init(fullSegment, shouldStripInit);

    trackController?.enqueue(cleanedSegment);

    const startTimeMs = pendingSegment.startTimeMs;
    const endTimeMs = startTimeMs + pendingSegment.durationMs;

    track.trackedSegments.set(pendingSegment.segmentNumber, {
      segmentNumber: pendingSegment.segmentNumber,
      durationMs: pendingSegment.durationMs,
      startTimeMs,
      endTimeMs,
      mediaHeader: pendingSegment.mediaHeader
    });

    this.evictOldestTrackedSegments(track.trackedSegments);
    this.refreshBufferedRangeSummary(track);

    this.pendingSegments.delete(headerId);

    return !pendingSegment.mediaHeader.isInitializationSegment;
  }

  public getBuffered(): number {
    let bufferedUntil = Infinity;

    for (const track of this.tracksMap.values()) {
      const summary = track.bufferedRangeSummary;
      if (!summary) return 0;
      bufferedUntil = Math.min(bufferedUntil, summary.startTimeMs + summary.durationMs);
    }

    return bufferedUntil;
  }

  public getBufferedRanges(): BufferedRange[] {
    const ranges: BufferedRange[] = [];

    for (const track of this.tracksMap.values()) {
      const summary = track.bufferedRangeSummary;

      if (!summary) {
        continue;
      }

      ranges.push({
        formatId: track.formatId,
        startTimeMs: summary.startTimeMs === 0 ? '' : String(summary.startTimeMs),
        durationMs: String(summary.durationMs),
        startSegmentIndex: summary.startSegmentIndex,
        endSegmentIndex: summary.endSegmentIndex,
        timeRange: {
          startTicks: String(summary.startTimeMs),
          durationTicks: String(summary.durationMs),
          timescale: 1000
        }
      });
    }

    return ranges;
  }

  private refreshBufferedRangeSummary(track: TrackSegmentInfo): void {
    const segments = Array.from(track.trackedSegments.values())
      .filter((segment) => !segment.mediaHeader.isInitializationSegment)
      .sort((a, b) => a.segmentNumber - b.segmentNumber);

    if (!segments.length) {
      track.bufferedRangeSummary = undefined;
      return;
    }

    const firstSegment = segments[0];
    const lastSegment = segments[segments.length - 1];

    track.bufferedRangeSummary = {
      startTimeMs: firstSegment.startTimeMs,
      durationMs: Math.max(0, lastSegment.endTimeMs - firstSegment.startTimeMs),
      startSegmentIndex: firstSegment.segmentNumber,
      endSegmentIndex: lastSegment.segmentNumber
    };
  }

  private evictOldestTrackedSegments(trackedSegments: Map<number, CompletedSegment>): void {
    while (trackedSegments.size > MAX_TRACKED_SEGMENTS) {
      const oldestKey = trackedSegments.keys().next().value;
      if (oldestKey === undefined) break;
      trackedSegments.delete(oldestKey);
    }
  }
}