import { beforeEach, describe, expect, it, vi } from 'vitest';

import { Logger, LogLevel, concatenateChunks, EnabledTrackTypes } from '../src/utils/index.js';
import { SabrFormat } from '../src/types/shared.js';
import { CompositeBuffer, UmpWriter } from '../src/exports/ump.js';
import { SabrStream } from '../src/exports/sabr-stream.js';

import {
  UMPPartId,
  FormatInitializationMetadata,
  MediaHeader, NextRequestPolicy,
  StreamProtectionStatus,
  VideoPlaybackAbrRequest
} from '../src/utils/Protos.js';

Logger.getInstance().setLogLevels(LogLevel.NONE);

const AUDIO_FORMAT = {
  itag: 140,
  lastModified: 1700000000,
  contentLength: 117138,
  mimeType: 'audio/mp4; codecs="mp4a.40.2"',
  bitrate: 128000,
  approxDurationMs: 120000
};

const VIDEO_FORMAT = {
  itag: 137,
  mimeType: 'video/mp4; codecs="avc1.640028"',
  bitrate: 4337000,
  lastModified: 1700000000,
  height: 1080,
  approxDurationMs: 120000,
  qualityLabel: undefined,
  language: null
};

const CLIENT_INFO = {
  clientName: 1,
  clientVersion: '2.20240101.00.00'
};

function createMediaHeader(
  headerId: number,
  sequenceNumber: number,
  startMs: number,
  durationMs: number,
  startRange: number,
  contentLength: number,
  isInitSeg: boolean,
  format: SabrFormat
) {
  return {
    partType: UMPPartId.MEDIA_HEADER,
    partData: MediaHeader.encode({
      headerId,
      videoId: '',
      itag: format.itag,
      lmt: format.lastModified,
      startRange,
      compressionAlgorithm: 0,
      isInitSeg,
      sequenceNumber,
      bitrateBps: format.bitrate,
      startMs,
      durationMs: durationMs || 0,
      formatId: format,
      contentLength,
      timeRange: {
        startTicks: startMs,
        durationTicks: durationMs || 0,
        timescale: 1000
      }
    }).finish()
  };
}

function createMediaPart(headerId: number, mockedSize: number) {
  return {
    partType: UMPPartId.MEDIA,
    partData: new Uint8Array([ headerId, ...new Uint8Array(mockedSize).fill(0) ])
  };
}

function createMediaEndPart(headerId: number) {
  return {
    partType: UMPPartId.MEDIA_END,
    partData: new Uint8Array([ headerId ])
  };
}

function createMockFetch(maxSegmentSize: number, maxSegmentDuration: number, streamProtectionStatus = 1) {
  let startMs = 0;
  let startRange = 0;
  let segmentNumber = 0;

  return vi.fn().mockImplementation(async (url, options) => {
    const request = new Request(url, options);
    const requestBodyData = await request.arrayBuffer();
    const requestBody = VideoPlaybackAbrRequest.decode(new Uint8Array(requestBodyData));

    const playerTimeMs = requestBody.clientAbrState?.playerTimeMs || 0;

    const partsToWrite = [];

    partsToWrite.push({
      partType: UMPPartId.NEXT_REQUEST_POLICY,
      partData: NextRequestPolicy.encode({
        targetAudioReadaheadMs: 15011,
        targetVideoReadaheadMs: 15011,
        backoffTimeMs: 0,
        playbackCookie: {
          resolution: 999999,
          field2: 0,
          videoFmt: VIDEO_FORMAT,
          audioFmt: AUDIO_FORMAT
        },
        videoId: ''
      }).finish()
    });

    partsToWrite.push({
      partType: UMPPartId.STREAM_PROTECTION_STATUS,
      partData: StreamProtectionStatus.encode({ status: streamProtectionStatus }).finish()
    });

    if (playerTimeMs === 0) {
      // Initialize the format.
      partsToWrite.push({
        partType: UMPPartId.FORMAT_INITIALIZATION_METADATA,
        partData: FormatInitializationMetadata.encode({
          formatId: AUDIO_FORMAT,
          durationUnits: 120000,
          durationTimescale: 1000,
          endSegmentNumber: 5,
          mimeType: AUDIO_FORMAT.mimeType,
          endTimeMs: 120000,
          videoId: ''
        }).finish()
      });

      // Add the init segment.
      const initHeaderId = 0;
      partsToWrite.push(createMediaHeader(initHeaderId, segmentNumber, 0, 0, 0, maxSegmentSize, true, AUDIO_FORMAT));
      partsToWrite.push(createMediaPart(initHeaderId, maxSegmentSize));
      partsToWrite.push(createMediaEndPart(initHeaderId));
      startRange += maxSegmentSize;

      segmentNumber += 1;

      // Send 1 segment to get the stream started.
      const mediaHeaderId = 1;
      partsToWrite.push(createMediaHeader(mediaHeaderId, segmentNumber, startMs, maxSegmentDuration, startRange, maxSegmentSize, false, AUDIO_FORMAT));
      partsToWrite.push(createMediaPart(mediaHeaderId, maxSegmentSize));
      partsToWrite.push(createMediaEndPart(mediaHeaderId));
      startMs += maxSegmentDuration;
      startRange += maxSegmentSize;
    } else if (playerTimeMs < 120000) {
      const mediaHeaderId = 0;
      partsToWrite.push(createMediaHeader(mediaHeaderId, segmentNumber, startMs, maxSegmentDuration, startRange, maxSegmentSize, false, AUDIO_FORMAT));
      partsToWrite.push(createMediaPart(mediaHeaderId, maxSegmentSize));
      partsToWrite.push(createMediaEndPart(mediaHeaderId));
      startMs += maxSegmentDuration;
      startRange += maxSegmentSize;
    }

    segmentNumber += 1;

    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    // Write all parts to the response.
    for (const part of partsToWrite) {
      umpWriter.write(part.partType, part.partData);
    }

    const responseBody = concatenateChunks(buffer.chunks);
    return new Response(responseBody, {
      status: 200,
      headers: { 'Content-Type': 'application/vnd.yt-ump' }
    });
  });
}

async function collectStreamChunks(stream: ReadableStream<Uint8Array>): Promise<Uint8Array[]> {
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
    fetch: mockFetch,
    serverAbrStreamingUrl: 'https://test.com/sabr',
    videoPlaybackUstreamerConfig: 'abc',
    poToken: 'abc',
    clientInfo: CLIENT_INFO,
    formats: [ VIDEO_FORMAT, AUDIO_FORMAT ]
  });
}

describe('SabrStream', { timeout: 80000 }, () => {
  const maxSegmentSize = 19523; // 117138 / 6 = 19523 bytes
  const maxSegmentDuration = 24000; // 120000 / 5 = 24000 ms

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should initialize, download, and finish a stream successfully', async () => {
    const mockFetch = createMockFetch(maxSegmentSize, maxSegmentDuration);

    const onFormatInitialization = vi.fn();
    const onStreamProtectionStatusUpdate = vi.fn();
    const onFinish = vi.fn();

    const stream = createSabrStream(mockFetch);

    stream.on('formatInitialization', onFormatInitialization);
    stream.on('streamProtectionStatusUpdate', onStreamProtectionStatusUpdate);
    stream.on('finish', onFinish);

    const { audioStream, selectedFormats } = await stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      enabledTrackTypes: EnabledTrackTypes.AUDIO_ONLY
    });

    const audioChunks = await collectStreamChunks(audioStream);

    expect(selectedFormats.audioFormat).toEqual(AUDIO_FORMAT);
    expect(selectedFormats.videoFormat).toEqual(VIDEO_FORMAT);
    expect(onFinish).toHaveBeenCalled();
    expect(onFormatInitialization).toHaveBeenCalled();
    expect(onStreamProtectionStatusUpdate).toHaveBeenCalledWith({ status: 1, maxRetries: 0 });
    expect(concatenateChunks(audioChunks).length).toBe(AUDIO_FORMAT.contentLength);
    expect(mockFetch).toHaveBeenCalledTimes(6);
  });

  it('should abort the stream when abort() is called', async () => {
    const mockFetch = createMockFetch(maxSegmentSize, maxSegmentDuration);

    const stream = createSabrStream(mockFetch);

    const onAbort = vi.fn();
    stream.on('abort', onAbort);

    const startPromise = stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      enabledTrackTypes: EnabledTrackTypes.AUDIO_ONLY
    });

    stream.abort();

    const { videoStream } = await startPromise;

    await expect(videoStream.getReader().read()).rejects.toThrow('Download aborted.');
    expect(onAbort).toHaveBeenCalledOnce();
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });

  it('should fail after exhausting all retry attempts when server returns an error', async () => {
    const mockFetch = createMockFetch(maxSegmentSize, maxSegmentDuration);
    mockFetch.mockResolvedValue(new Response(null, { status: 500, statusText: 'Internal Server Error' }));
    
    const stream = createSabrStream(mockFetch);

    const { audioStream } = await stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      enabledTrackTypes: EnabledTrackTypes.AUDIO_ONLY,
      maxRetries: 1
    });

    await expect(collectStreamChunks(audioStream)).rejects.toThrow('Server returned 500 ');

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });

  it('should terminate streaming when attestation is required by stream protection', async () => {
    const mockFetch = createMockFetch(maxSegmentSize, maxSegmentDuration, 3);
    
    const stream = createSabrStream(mockFetch);

    const { audioStream } = await stream.start({
      videoFormat: VIDEO_FORMAT,
      audioFormat: AUDIO_FORMAT,
      enabledTrackTypes: EnabledTrackTypes.AUDIO_ONLY,
      maxRetries: 1
    });

    await expect(collectStreamChunks(audioStream)).rejects.toThrow('Cannot proceed with stream: attestation required');

    expect(mockFetch).toHaveBeenCalledTimes(2);
  });
});