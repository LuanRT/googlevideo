import { SabrStream } from '../src/exports/sabr-stream.js';
import { CompositeBuffer, UmpWriter } from '../src/exports/ump.js';
import { Logger, LogLevel, concatenateChunks, EnabledTrackTypes } from '../src/utils/index.js';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { SabrFormat } from '../src/types/shared.js';

import {
  UMPPartId,
  MediaHeader,
  NextRequestPolicy,
  StreamProtectionStatus,
  FormatInitializationMetadata,
  VideoPlaybackAbrRequest,
  SabrError
} from '../src/utils/Protos.js';

vi.setConfig({ testTimeout: 120_000 });

Logger.getInstance().setLogLevels(LogLevel.NONE);

const VIDEO_ID = 'test-video-id';
const TOTAL_SEGMENTS = 5;
const SEGMENT_DURATION_MS = 24000;
const TOTAL_DURATION_MS = TOTAL_SEGMENTS * SEGMENT_DURATION_MS;

const AUDIO_FORMAT: SabrFormat = {
  itag: 140,
  lastModified: '1700000000',
  contentLength: 117138,
  mimeType: 'audio/mp4; codecs="mp4a.40.2"',
  bitrate: 128000,
  approxDurationMs: TOTAL_DURATION_MS
};

const VIDEO_FORMAT: SabrFormat = {
  itag: 137,
  lastModified: '1700000000',
  contentLength: 234270,
  mimeType: 'video/mp4; codecs="avc1.640028"',
  bitrate: 4337000,
  height: 1080,
  approxDurationMs: TOTAL_DURATION_MS
};

const CLIENT_INFO = {
  clientName: 1,
  clientVersion: '2.20690101.00.00'
};

function createMockSabrServer(options: {
  streamProtectionStatus?: number;
  streamProtectionMaxRetries?: number;
  responseStatus?: number;
  simulateSabrError?: boolean;
} = {}) {
  const { streamProtectionStatus = 1, streamProtectionMaxRetries = 0, responseStatus = 200, simulateSabrError = false } = options;

  let nextHeaderId = 0;

  const segmentSizeFor = (format: SabrFormat) => Math.floor((format.contentLength || 0) / (TOTAL_SEGMENTS + 1));

  const mockFetch = vi.fn().mockImplementation(async (url: string, init: RequestInit) => {
    if (responseStatus !== 200) {
      return new Response(null, { status: responseStatus, statusText: 'Internal Server Error' });
    }

    const request = new Request(url, init);
    const requestBody = VideoPlaybackAbrRequest.decode(new Uint8Array(await request.arrayBuffer()));

    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    umpWriter.write(UMPPartId.NEXT_REQUEST_POLICY, NextRequestPolicy.encode({ backoffTimeMs: 0, videoId: VIDEO_ID }).finish());
    umpWriter.write(UMPPartId.STREAM_PROTECTION_STATUS, StreamProtectionStatus.encode({
      status: streamProtectionStatus,
      maxRetries: streamProtectionMaxRetries
    }).finish());

    if (simulateSabrError) {
      umpWriter.write(UMPPartId.SABR_ERROR, SabrError.encode({ type: 'whatthehell', code: 123 }).finish());
    } else {
      const requestedFormats = [
        ...requestBody.selectedVideoFormatIds,
        ...requestBody.selectedAudioFormatIds
      ];

      const initializedFormats = requestBody.initializationFormatIds.map((formatId) => formatId.itag);

      for (const requestedFormat of requestedFormats) {
        const format = requestedFormat.itag === VIDEO_FORMAT.itag ? VIDEO_FORMAT : AUDIO_FORMAT;
        const segmentSize = segmentSizeFor(format);

        const bufferedRange = requestBody.bufferedRanges.find((range) => range.formatId?.itag === format.itag);
        const segmentsDownloaded = bufferedRange ? Math.round(parseInt(bufferedRange.durationMs || '0', 10) / SEGMENT_DURATION_MS) : 0;

        if (!initializedFormats.includes(format.itag)) {
          umpWriter.write(UMPPartId.FORMAT_INITIALIZATION_METADATA, FormatInitializationMetadata.encode({
            videoId: VIDEO_ID,
            formatId: format,
            mimeType: format.mimeType,
            endSegmentNum: TOTAL_SEGMENTS.toString(),
            endTimeMs: TOTAL_DURATION_MS.toString(),
            endTimeTicks: TOTAL_DURATION_MS.toString(),
            endTimeTimescale: '1000'
          }).finish());

          const initHeaderId = nextHeaderId++;
          umpWriter.write(UMPPartId.MEDIA_HEADER, MediaHeader.encode({
            headerId: initHeaderId,
            videoId: VIDEO_ID,
            itag: format.itag,
            lmt: format.lastModified,
            formatId: format,
            isInitializationSegment: true,
            segmentNum: 0,
            segmentByteRangeStart: '0',
            segmentLengthBytes: segmentSize.toString(),
            startMs: '0',
            durationMs: '0'
          }).finish());
          umpWriter.write(UMPPartId.MEDIA, new Uint8Array([ initHeaderId, ...new Uint8Array(segmentSize).fill(1) ]));
          umpWriter.write(UMPPartId.MEDIA_END, new Uint8Array([ initHeaderId ]));
        }

        if (segmentsDownloaded >= TOTAL_SEGMENTS)
          continue;

        const segmentNum = segmentsDownloaded + 1;
        const startMs = segmentsDownloaded * SEGMENT_DURATION_MS;
        const startRange = (segmentsDownloaded + 1) * segmentSize;

        const headerId = nextHeaderId++;
        umpWriter.write(UMPPartId.MEDIA_HEADER, MediaHeader.encode({
          headerId,
          videoId: VIDEO_ID,
          itag: format.itag,
          lmt: format.lastModified,
          formatId: format,
          isInitializationSegment: false,
          segmentNum,
          segmentByteRangeStart: startRange.toString(),
          segmentLengthBytes: segmentSize.toString(),
          startMs: startMs.toString(),
          durationMs: SEGMENT_DURATION_MS.toString()
        }).finish());
        umpWriter.write(UMPPartId.MEDIA, new Uint8Array([ headerId, ...new Uint8Array(segmentSize).fill(2) ]));
        umpWriter.write(UMPPartId.MEDIA_END, new Uint8Array([ headerId ]));
      }
    }

    return new Response(concatenateChunks(buffer.chunks) as BodyInit, {
      status: 200,
      headers: { 'content-type': 'application/vnd.yt-ump' }
    });
  });

  return mockFetch;
}

async function collectStreamChunks(stream: ReadableStream): Promise<Uint8Array[]> {
  const chunks = [];
  const reader = stream.getReader();

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
  }

  return chunks;
}

function createSabrStream(mockFetch: typeof fetch) {
  return new SabrStream({
    videoId: VIDEO_ID,
    fetchFunction: mockFetch,
    serverAbrStreamingUrl: 'https://ytjs.dev/sabr',
    videoPlaybackUstreamerConfig: 'abc',
    poToken: 'abc',
    clientInfo: CLIENT_INFO,
    formats: [ VIDEO_FORMAT, AUDIO_FORMAT ]
  });
}

describe('SabrStream', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should download a VOD stream (video + audio)', async () => {
    const mockFetch = createMockSabrServer();

    const onFormatInitialization = vi.fn();
    const onStreamProtectionStatusUpdate = vi.fn();
    const onFinish = vi.fn();

    const stream = createSabrStream(mockFetch);

    stream.on('formatInitialization', onFormatInitialization);
    stream.on('streamProtectionStatusUpdate', onStreamProtectionStatusUpdate);
    stream.on('finish', onFinish);

    const { videoStream, audioStream, selectedFormats } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false
    });

    const [ videoChunks, audioChunks ] = await Promise.all([
      collectStreamChunks(videoStream),
      collectStreamChunks(audioStream)
    ]);

    expect(selectedFormats.audioFormat).toEqual(AUDIO_FORMAT);
    expect(selectedFormats.videoFormat).toEqual(VIDEO_FORMAT);
    expect(onFinish).toHaveBeenCalledOnce();
    expect(onFormatInitialization).toHaveBeenCalledTimes(2);
    expect(onStreamProtectionStatusUpdate).toHaveBeenCalledWith({ status: 1, maxRetries: 0 });
    expect(concatenateChunks(videoChunks).length).toBe(VIDEO_FORMAT.contentLength);
    expect(concatenateChunks(audioChunks).length).toBe(AUDIO_FORMAT.contentLength);

    expect(mockFetch).toHaveBeenCalledTimes(TOTAL_SEGMENTS);
  });

  it('should download an audio-only stream', async () => {
    const mockFetch = createMockSabrServer();

    const stream = createSabrStream(mockFetch);

    const { audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      enabledTrackTypes: EnabledTrackTypes.AUDIO_ONLY,
      isPostLiveDvr: false
    });

    const audioChunks = await collectStreamChunks(audioStream);

    expect(concatenateChunks(audioChunks).length).toBe(AUDIO_FORMAT.contentLength);
    expect(mockFetch).toHaveBeenCalledTimes(TOTAL_SEGMENTS);
  });

  it('should not be reusable after it has been started', async () => {
    const mockFetch = createMockSabrServer();

    const stream = createSabrStream(mockFetch);

    const { videoStream, audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false
    });

    await Promise.all([
      collectStreamChunks(videoStream),
      collectStreamChunks(audioStream)
    ]);

    expect(mockFetch).toHaveBeenCalledTimes(TOTAL_SEGMENTS);

    expect(() => stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false
    })).toThrow('This stream instance has already been started and cannot be reused');
  });

  it('should abort the stream when abort() is called', async () => {
    const mockFetch = createMockSabrServer();

    const stream = createSabrStream(mockFetch);

    const onAbort = vi.fn();
    stream.on('abort', onAbort);

    const { videoStream, audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false
    });

    await stream.abort();

    await expect(videoStream.getReader().read()).rejects.toThrow('Stream aborted');
    await expect(audioStream.getReader().read()).rejects.toThrow('Stream aborted');
    expect(onAbort).toHaveBeenCalledOnce();
  });

  it('should fail after exhausting all retry attempts when server returns an error', async () => {
    const mockFetch = createMockSabrServer({ responseStatus: 500 });

    const stream = createSabrStream(mockFetch);

    const { audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false,
      maxRetries: 1
    });

    await expect(collectStreamChunks(audioStream)).rejects.toThrow('Server returned 500');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should fail after exhausting all retry attempts when a SABR error is received', async () => {
    const mockFetch = createMockSabrServer({ simulateSabrError: true });

    const stream = createSabrStream(mockFetch);

    const { audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false,
      maxRetries: 1
    });

    await expect(collectStreamChunks(audioStream)).rejects.toThrow('SABR Error: whatthehell - 123');
    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should fail after exhausting all retry attempts when stream protection attestation is rejected', async () => {
    const mockFetch = createMockSabrServer({ streamProtectionStatus: 3, streamProtectionMaxRetries: 2 });

    const stream = createSabrStream(mockFetch);

    const { audioStream } = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      isPostLiveDvr: false,
      maxRetries: 1
    });

    await expect(collectStreamChunks(audioStream)).rejects.toThrow('Stream protection attestation rejected after 2 attempts');
    expect(mockFetch).toHaveBeenCalledTimes(4);
  });
});
