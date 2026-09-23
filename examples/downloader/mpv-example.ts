import http from 'node:http';
import os from 'node:os';
import path from 'node:path';
import fs from 'node:fs';

import { spawn } from 'node:child_process';
import { PassThrough, Readable } from 'node:stream';

import Innertube, { Log, UniversalCache, YTNodes } from 'youtubei.js';
import type { SabrPlaybackOptions, SabrStream } from 'googlevideo/sabr-stream';
import { EnabledTrackTypes } from 'googlevideo/utils';

import {
  createSabrStream,
  makePlayerRequest
} from './utils/sabr-stream-factory.js';

// Disable ytjs logs to reduce noise
Log.setLevel(Log.Level.NONE);

/**
 * A basic example of streaming to mpv.
 * 
 * NOTE: 
 * VOD playback is also supported, but seeking is restricted 
 * to already buffered segments of the stream...
 */

async function main() {
  let sabrStreamInstance: SabrStream | undefined;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });
    const searchResults = await innertube.search('lofi & chill beats | Radio Cutman');
    const liveVideo = searchResults.videos.filterType(YTNodes.Video).find((video) => video.is_live);
    const videoId = liveVideo?.video_id;

    if (!videoId) {
      console.error('[error]', 'No live video found in search results.');
      process.exit(1);
    }

    const playerResponse = await makePlayerRequest(innertube, videoId);

    if (playerResponse.playability_status?.status !== 'OK') {
      console.error('[error]', 'Video is not playable:', playerResponse.playability_status?.status);
      process.exit(1);
    }

    const options: SabrPlaybackOptions = {
      videoPreferences: { container: 'mp4', quality: '720' },
      audioPreferences: { container: 'mp4', dynamicRangeCompression: false, voiceBoost: false },
      enabledTrackTypes: EnabledTrackTypes.VIDEO_AND_AUDIO,
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    const { results } = await createSabrStream(options, playerResponse, innertube);
    const { videoStream, audioStream, videoTitle, author, views, duration } = results;

    sabrStreamInstance = results.sabrStreamInstance;

    const totalSeconds = playerResponse.video_details?.duration || 0;

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${videoId}\n
    `);

    await streamToMpv(
      sabrStreamInstance,
      videoStream,
      audioStream,
      totalSeconds,
      videoTitle
    );
  } catch (error) {
    if (!sabrStreamInstance?.isAborted) {
      if (error instanceof Error && error.message.includes('ENOENT')) {
        console.error('[error]', 'Please ensure that mpv is installed and available before running this example.');
      } else {
        console.error('[error]', error);
      }
      process.exitCode = 1;
    }
  }
}

export async function streamToMpv(
  sabrStreamInstance: SabrStream,
  videoStream: ReadableStream<Uint8Array>,
  audioStream: ReadableStream<Uint8Array>,
  durationInSeconds: number,
  videoTitle: string
): Promise<void> {
  return new Promise((resolve, reject) => {
    const isWindows = os.platform() === 'win32';
    const ipcPath = isWindows
      ? `\\\\.\\pipe\\mpv-ipc-${Date.now()}`
      : path.join(os.tmpdir(), `mpv-ipc-${Date.now()}.sock`);

    const videoPassThrough = new PassThrough({ highWaterMark: 32 * 1024 * 1024 });
    const audioPassThrough = new PassThrough({ highWaterMark: 16 * 1024 * 1024 });

    Readable.fromWeb(videoStream as any)
      .on('error', (err) => reject(err))
      .pipe(videoPassThrough);

    Readable.fromWeb(audioStream as any)
      .on('error', (err) => reject(err))
      .pipe(audioPassThrough);

    const server = http.createServer((req, res) => {
      req.socket.setTimeout(0);
      req.socket.setKeepAlive(true, 10000);

      if (req.url === '/video') {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Connection': 'keep-alive'
        });
        videoPassThrough.pipe(res);
      } else if (req.url === '/audio') {
        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Connection': 'keep-alive'
        });
        audioPassThrough.pipe(res);
      } else {
        res.writeHead(404);
        res.end();
      }
    });

    server.timeout = 0;
    server.keepAliveTimeout = 0;

    server.listen(0, '127.0.0.1', () => {
      const address = server.address();

      if (!address || typeof address === 'string')
        return reject(new Error('Failed to retrieve HTTP server port'));

      const baseUrl = `http://127.0.0.1:${address.port}`;

      // docs: https://mpv.io/manual/master/
      const mpvArgs = [
        `${baseUrl}/video`,
        `--audio-file=${baseUrl}/audio`,
        `--input-ipc-server=${ipcPath}`,
        `--force-media-title=${videoTitle}`,
        '--ytdl=no',
        '--cache=yes',
        '--demuxer-max-bytes=500MiB',
        '--demuxer-max-back-bytes=200MiB',
        '--cache-secs=300'
      ];

      if (!sabrStreamInstance.isLive && durationInSeconds > 0) {
        mpvArgs.push(`--length=${durationInSeconds}`);
      }

      const mpv = spawn('mpv', mpvArgs, {
        stdio: [ 'ignore', 'ignore', 'ignore' ] // ignore cause we want to avoid deadlocking mpv since we aren't listening to its stdout/stderr
      });

      mpv.on('error', (err) => {
        server.close();
        reject(err);
      });

      mpv.on('close', () => {
        sabrStreamInstance.abort();
        server.close(() => resolve());

        if (!isWindows && fs.existsSync(ipcPath)) {
          fs.unlinkSync(ipcPath);
        }
      });
    });
  });
}

main().then();