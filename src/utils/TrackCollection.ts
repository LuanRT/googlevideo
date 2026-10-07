import type { TrackState } from '../types/sabrStreamTypes.js';
import type { BufferedRange, FormatId } from './Protos.js';
import { createFormatKey, EnabledTrackTypes } from './formatUtils.js';
import { Track } from './Track.js';

export class TrackCollection {
  public readonly video = new Track('video');
  public readonly audio = new Track('audio');
  public readonly initializedTracksMap = new Map<string, Track>();

  public get needsDrain(): boolean {
    return this.video.streamFull || this.audio.streamFull;
  }

  public get buffered(): number {
    let bufferedUntil = Infinity;

    for (const track of this.initializedTracks) {
      const summary = track.bufferedRangeSummary;
      if (!summary) return 0;
      bufferedUntil = Math.min(bufferedUntil, summary.startTimeMs + summary.durationMs);
    }

    return bufferedUntil;
  }

  public get bufferedRanges(): BufferedRange[] {
    const ranges: BufferedRange[] = [];

    for (const track of this.initializedTracks) {
      const summary = track.bufferedRangeSummary;
      if (!summary) continue;

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

  public get initializedTracks(): MapIterator<Track> {
    return this.initializedTracksMap.values();
  }

  public get initializationFormatIds(): FormatId[] {
    const formatIds: FormatId[] = [];
    if (this.video.formatId) formatIds.push(this.video.formatId);
    if (this.audio.formatId) formatIds.push(this.audio.formatId);
    return formatIds;
  }

  public get livePlaybackLatencyMs(): number | undefined {
    const videoLatency = this.video.latencyMs;
    const audioLatency = this.audio.latencyMs;

    if (!videoLatency && !audioLatency)
      return;

    return Math.max(videoLatency, audioLatency);
  }

  public initialize(type: 'video' | 'audio', metadata: TrackState): void {
    this[type].update(metadata);
    if ('formatId' in metadata && metadata.formatId !== undefined)
      this.initializedTracksMap.set(createFormatKey(metadata.formatId), this[type]);
  }

  public getInitializedTrack(formatKey: string): Track | undefined {
    return this.initializedTracksMap.get(formatKey);
  }

  public endOfStreamReached(enabledTrackTypes: EnabledTrackTypes) {
    const videoEndOfStreamReached = this.video.endOfStreamReached;
    const audioEndOfStreamReached = this.audio.endOfStreamReached;

    return (videoEndOfStreamReached && audioEndOfStreamReached)
      || (enabledTrackTypes === EnabledTrackTypes.VIDEO_ONLY && videoEndOfStreamReached)
      || (enabledTrackTypes === EnabledTrackTypes.AUDIO_ONLY && audioEndOfStreamReached);
  }

  public snapshot(): TrackState[] {
    const trackStates = [];

    for (const initializedTrack of this.initializedTracksMap.values())
      trackStates.push(initializedTrack.snapshot());

    return trackStates;
  }

  public error(err?: string | Error): void {
    const errorInstance =
      typeof err === 'string' ? new Error(err) : err;
    for (const track of this.initializedTracks)
      track.streamController.error(errorInstance);
  }

  public close(): void {
    this.video.streamController.close();
    this.audio.streamController.close();
  }
}