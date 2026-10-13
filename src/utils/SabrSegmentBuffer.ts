import { Logger } from './Logger.js';
import { createFormatKey } from './formatUtils.js';
import { getDurationMs, getStartMs } from './mediaTimeUtils.js';
import { parseEmsgSegmentMetadata, stripMp4Init, stripWebmInit } from './mediaSegmentUtils.js';
import { concatenateChunks } from './uint8arrayUtils.js';

import type { MediaHeader } from './Protos.js';
import type { SegmentInfo } from '../types/sabrStreamTypes.js';
import type { TrackCollection } from './TrackCollection.js';
import type { CompositeBuffer } from '../core/CompositeBuffer.js';

interface PendingSegment extends SegmentInfo {
  bufferedChunks: Uint8Array[];
  loadedLengthBytes: number;
  type: 'audio' | 'video';
}

const TAG = 'SabrSegmentBuffer';

export class SabrSegmentBuffer {
  private readonly logger = Logger.getInstance();
  private readonly pendingSegments = new Map<number, PendingSegment>();

  constructor(
    private readonly trackMetadata: TrackCollection,
    private readonly isBroadcast: boolean = false,
    private readonly stripDuplicateInit: boolean = true
  ) { }

  public reset(): void {
    this.trackMetadata.initializedTracksMap.clear();
    this.pendingSegments.clear();
  }

  public queueMediaHeader(mediaHeader: MediaHeader): void {
    const headerId = mediaHeader.headerId ?? 0;
    const formatKey = createFormatKey(mediaHeader);
    const track = this.trackMetadata.initializedTracksMap.get(formatKey);

    if (!track) {
      this.logger.warn(TAG, `No track found: formatKey=${formatKey}, headerId=${headerId}`);
      return;
    }

    const segmentNumber = mediaHeader.isInitializationSegment ? 0 : mediaHeader.segmentNum!;

    // Should never happen.
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
      loadedLengthBytes: 0,
      type: track.type
    });
  }

  public appendMediaData(headerId: number, buffer: CompositeBuffer): void {
    const pendingSegment = this.pendingSegments.get(headerId);
    if (!pendingSegment) {
      this.logger.debug(TAG, `Received MEDIA for unknown header id ${headerId}`);
      return;
    }

    pendingSegment.bufferedChunks.push(...buffer.chunks);
    pendingSegment.loadedLengthBytes += buffer.getLength();
  }

  public finalizeSegment(headerId: number): boolean {
    const pendingSegment = this.pendingSegments.get(headerId);
    if (!pendingSegment) {
      this.logger.debug(TAG, `Received MEDIA_END for unknown header id ${headerId}`);
      return false;
    }

    const track = this.trackMetadata.getInitializedTrack(pendingSegment.formatKey);

    if (!track) {
      this.pendingSegments.delete(headerId);
      return false;
    }

    const expectedLengthBytes = parseInt(pendingSegment.mediaHeader.segmentLengthBytes || '0');
    const loadedLengthBytes = pendingSegment.loadedLengthBytes;

    // Should never happen.
    if (expectedLengthBytes > 0 && loadedLengthBytes !== expectedLengthBytes) {
      this.logger.warn(
        TAG,
        `Ignoring partial segment ${pendingSegment.segmentNumber} for ${pendingSegment.formatKey}.\n` +
        `expected=${expectedLengthBytes}, received=${loadedLengthBytes}`
      );
      this.pendingSegments.delete(headerId);
      return false;
    }

    let segment = concatenateChunks(pendingSegment.bufferedChunks);

    const emsgMetadata = parseEmsgSegmentMetadata(segment);

    if (this.isBroadcast && this.stripDuplicateInit && track.trackedSegments.size !== 0)
      segment = track.mimeType?.includes('webm') ? stripWebmInit(segment) : stripMp4Init(segment);

    // If the stream is not locked, keep enqueueing until it's over capacity.
    // Once it is, assume nobody cares about the track and stop enqueueing.
    if (track.streamLocked || track.streamDesiredSize > 0)
      track.streamController.enqueue(segment);

    track.recordCompletedSegment(pendingSegment, emsgMetadata);

    this.pendingSegments.delete(headerId);

    return !pendingSegment.mediaHeader.isInitializationSegment;
  }
}