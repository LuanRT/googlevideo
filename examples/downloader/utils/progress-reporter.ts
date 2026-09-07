const BYTE_UNITS = [ 'B', 'KiB', 'MiB', 'GiB', 'TiB' ];
const RATE_WINDOW_MS = 15000;

interface TrackState {
  totalBytes: number | undefined;
  isLive: boolean;
  startTime: number;
  rateEstimator: RateEstimator;
  downloadedBytes: number;
  speedBps: number;
  done: boolean;
}

export interface ProgressLine {
  update(downloadedBytes: number): void;
  done(): void;
}

export class ProgressDisplay {
  private lines: string[] = [];
  private tracks: TrackState[] = [];
  private started = false;

  createLine(label: string, totalBytes: number | undefined, isLive: boolean): ProgressLine {
    const index = this.lines.length;

    const track: TrackState = {
      totalBytes,
      isLive,
      startTime: Date.now(),
      rateEstimator: new RateEstimator(),
      downloadedBytes: 0,
      speedBps: 0,
      done: false
    };

    this.tracks.push(track);
    this.lines.push(formatLine(label, 0, totalBytes, 0, 0, isLive, false));
    this.render();

    let lastRenderTime = 0;

    const render = (downloadedBytes: number, done: boolean) => {
      track.downloadedBytes = downloadedBytes;
      track.speedBps = track.rateEstimator.sample(downloadedBytes);
      track.done = done;

      const elapsedSec = (Date.now() - track.startTime) / 1000;

      this.lines[index] = formatLine(label, downloadedBytes, totalBytes, track.speedBps, elapsedSec, isLive, done);
      this.render();
    };

    return {
      update: (downloadedBytes: number) => {
        const now = Date.now();
        if (now - lastRenderTime < 200) return;
        lastRenderTime = now;
        render(downloadedBytes, false);
      },
      done: () => render(track.downloadedBytes, true)
    };
  }

  private computeEta(): number {
    let remainingBytes = 0;
    let combinedSpeedBps = 0;

    for (const track of this.tracks) {
      if (track.isLive || !track.totalBytes || track.done || track.downloadedBytes === 0) continue;
      remainingBytes += track.totalBytes - track.downloadedBytes;
      combinedSpeedBps += track.speedBps;
    }

    // If we were to do this for each track separately, it would be inaccurate because sabr 
    // downloads both streams and they always finish at the same time..
    return combinedSpeedBps > 0 ? remainingBytes / combinedSpeedBps : NaN;
  }

  private hasSizedTrack(): boolean {
    return this.tracks.some((track) => !track.isLive && track.totalBytes !== undefined);
  }

  private render(): void {
    const extraLines = this.hasSizedTrack() ? [ `[download] ETA ${formatDuration(this.computeEta())}` ] : [];
    const outputLines = [ ...this.lines, ...extraLines ];

    if (this.started) process.stdout.write(`\x1b[${outputLines.length}A`);

    for (const line of outputLines)
      process.stdout.write(`\r\x1b[2K${line}\n`);

    this.started = true;
  }
}

export function formatDuration(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';

  const totalSeconds = Math.round(seconds);
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const secs = totalSeconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');

  return hours > 0 ? `${pad(hours)}:${pad(minutes)}:${pad(secs)}` : `${pad(minutes)}:${pad(secs)}`;
}

function formatLine(label: string, downloadedBytes: number, totalBytes: number | undefined, speedBps: number, elapsedSec: number, isLive: boolean, done: boolean): string {
  const speedStr = speedBps > 0 ? `${formatBytes(speedBps)}/s` : '   N/A B/s';

  if (isLive || !totalBytes) {
    return `[download] ${label} ${formatBytes(downloadedBytes)} at ${speedStr} (elapsed: ${formatDuration(elapsedSec)})`;
  }

  // Format size may differr slightly from the actual downloaded size due to rounding, so just set it to 100% when the stream says it's done.
  const percent = done && downloadedBytes > 0 ? 100 : Math.min((downloadedBytes / totalBytes) * 100, 100);

  return `[download] ${label} ${percent.toFixed(1).padStart(5)}% of ${formatBytes(totalBytes)} at ${speedStr}`;
}

function formatBytes(bytes: number): string {
  if (!Number.isFinite(bytes) || bytes < 0) return '  N/A B';

  let value = bytes;
  let unitIndex = 0;

  while (value >= 1024 && unitIndex < BYTE_UNITS.length - 1) {
    value /= 1024;
    unitIndex++;
  }

  return `${value.toFixed(2).padStart(6)}${BYTE_UNITS[unitIndex]}`;
}

class RateEstimator {
  private samples: { time: number; bytes: number }[] = [];

  sample(bytes: number): number {
    const now = Date.now();
    this.samples.push({ time: now, bytes });

    while (this.samples.length > 1 && now - this.samples[0].time > RATE_WINDOW_MS)
      this.samples.shift();

    if (this.samples.length < 2) return 0;

    const oldest = this.samples[0];
    const elapsedSec = (now - oldest.time) / 1000;

    return elapsedSec > 0 ? (bytes - oldest.bytes) / elapsedSec : 0;
  }
}