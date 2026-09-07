import type { MediaHeader } from './Protos.js';

export function ticksToMs(ticks: number, timescale: number, round: (value: number) => number): number {
  return round((ticks / timescale) * 1000);
}

export function getDurationMs(mediaHeader: MediaHeader): number {
  const durationMsFromHeader = Number(mediaHeader.durationMs ?? 0);
  if (Number.isFinite(durationMsFromHeader) && durationMsFromHeader > 0) {
    return durationMsFromHeader;
  }

  const durationTicks = Number(mediaHeader.timeRange?.durationTicks ?? 0);
  const timescale = Number(mediaHeader.timeRange?.timescale ?? 0);
  if (durationTicks > 0 && timescale > 0) {
    return ticksToMs(durationTicks, timescale, Math.ceil);
  }

  return 0;
}

export function getStartMs(mediaHeader: MediaHeader): number {
  const startMsFromHeader = Number(mediaHeader.startMs ?? 0);
  if (Number.isFinite(startMsFromHeader) && startMsFromHeader > 0) {
    return startMsFromHeader;
  }

  const startTicks = Number(mediaHeader.timeRange?.startTicks ?? 0);
  const timescale = Number(mediaHeader.timeRange?.timescale ?? 0);
  if (startTicks > 0 && timescale > 0) {
    return ticksToMs(startTicks, timescale, Math.floor);
  }

  return 0;
}