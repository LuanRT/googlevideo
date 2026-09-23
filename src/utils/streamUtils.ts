import { ticksToMs } from './mediaTimeUtils.js';
import type { TrackSegmentInfo } from '../types/sabrStreamTypes.js';
import type { FormatInitializationMetadata } from './Protos.js';

export function getMediaType(track: TrackSegmentInfo | FormatInitializationMetadata) {
  return track.mimeType?.includes('audio') ? 'audio' : 'video';
}

export function getEndTimeMs(track: TrackSegmentInfo): number {
  if (track.endTimeTicks === undefined || track.endTimescale === undefined) return 0;
  return ticksToMs(track.endTimeTicks, track.endTimescale, Math.ceil);
}

export function endOfStreamReached(trackInfo: TrackSegmentInfo): boolean {
  const endSegmentNum = trackInfo.endSegmentNum;
  return endSegmentNum !== undefined && endSegmentNum > 0 && trackInfo.trackedSegments.has(endSegmentNum);
}