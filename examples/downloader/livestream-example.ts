import { promises as fs } from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import sanitize from 'sanitize-filename';

import {
  createOutputStream,
  createStreamSink,
  createSabrStream,
  createProgressDisplay,
  makePlayerRequest,
  type DownloadOutput
} from './utils/sabr-stream-factory.js';

import type { SabrPlaybackConfig, SabrStream } from 'googlevideo/sabr-stream';
import Innertube, { UniversalCache, YTNodes, Log } from 'youtubei.js';

// Disable ytjs logs to reduce noise
Log.setLevel(Log.Level.NONE);

async function main() {
  let title: string | undefined;
  let audioOutputStream: DownloadOutput | undefined;
  let videoOutputStream: DownloadOutput | undefined;
  let sabrStreamInstance: SabrStream | undefined;

  const EXAMPLE_DURATION_MIN = 10;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });
    const searchResults = await innertube.search('lofi hip hop radio - beats to relax/study to live stream');
    const liveVideo = searchResults.videos.filterType(YTNodes.Video).find((video) => video.is_live);
    const videoId = liveVideo?.video_id;

    if (!videoId) {
      console.error('[error]', 'No live video found in search results.');
      process.exit(1);
    }

    const playerResponse = await makePlayerRequest(innertube, videoId);

    const options: SabrPlaybackConfig = {
      videoPreferences: { container: 'webm', quality: '720p', preferredVideoCodec: 'vp9' },
      audioPreferences: { container: 'mp4', preferredAudioCodec: 'aac', dynamicRangeCompression: false, voiceBoost: false },
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    console.info('[info]', `Downloading live stream for ${EXAMPLE_DURATION_MIN} minutes...`);

    const { results } = await createSabrStream(options, playerResponse, innertube);
    const { videoStream, audioStream, selectedFormats, videoTitle, author, views, duration } = results;

    title = videoTitle;
    sabrStreamInstance = results.sabrStreamInstance;

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${videoId}\n
    `);

    setTimeout(() => {
      sabrStreamInstance?.abort();
    }, EXAMPLE_DURATION_MIN * 60 * 1000);

    audioOutputStream = createOutputStream(videoTitle, selectedFormats.audioFormat.mimeType!);
    videoOutputStream = createOutputStream(videoTitle, selectedFormats.videoFormat.mimeType!);

    const progressDisplay = createProgressDisplay();
    const videoProgress = progressDisplay.createLine('video', selectedFormats.videoFormat.contentLength, sabrStreamInstance.isLive);
    const audioProgress = progressDisplay.createLine('audio', selectedFormats.audioFormat.contentLength, sabrStreamInstance.isLive);

    await Promise.all([
      videoStream.pipeTo(createStreamSink(videoOutputStream.stream, videoProgress)),
      audioStream.pipeTo(createStreamSink(audioOutputStream.stream, audioProgress))
    ]);
  } catch (error) {
    // Aborts are intentional.
    if (!sabrStreamInstance?.isAborted) {
      console.error('[error]', 'Download failed:', error);
      process.exitCode = 1;
    }
  } finally {
    if (!audioOutputStream || !videoOutputStream || !title) {
      process.exitCode = 1;
    } else {
      await mergeMedia(title, audioOutputStream.filePath, videoOutputStream.filePath);
      await cleanupTempFiles([ audioOutputStream.filePath, videoOutputStream.filePath ]);

      console.log('[info]', `Download complete! Output saved as "${sanitize(title)}.mkv"`);
    }
  }
}

async function mergeMedia(videoTitle: string, audioPath: string, videoPath: string): Promise<string> {
  const sanitizedTitle = sanitize(videoTitle) || 'output';
  const outputPath = `${sanitizedTitle}.mkv`;

  return new Promise((resolve, reject) => {
    console.log('[info]', 'Merging audio and video streams...');

    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions([
        '-c:v copy',
        '-c:a copy',
        '-map 0:v:0',
        '-map 1:a:0'
      ])
      .on('progress', (progress) => {
        if (progress.percent) {
          process.stdout.write(`\r[merge] ${Math.min(progress.percent, 100).toFixed(1).padStart(5)}%`);
        }
      })
      .on('end', () => {
        process.stdout.write('\r[merge] 100.0%\n');
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(new Error(`Error merging files: ${err.message}`));
      })
      .save(outputPath);
  });
}

async function cleanupTempFiles(files: string[]) {
  for (const file of files) {
    try {
      await fs.unlink(file);
    } catch (error) {
      console.warn('[warn]', `Failed to delete temp file ${file}:`, error);
    }
  }
}

main().then();