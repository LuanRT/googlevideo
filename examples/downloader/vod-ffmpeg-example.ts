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

import type { SabrPlaybackOptions, SabrStream } from 'googlevideo/sabr-stream';
import Innertube, { UniversalCache } from 'youtubei.js';

const VIDEO_ID = 'hzGmbwS_Drs';

async function main() {
  let videoTitle: string | undefined;
  let audioOutputStream: DownloadOutput | undefined;
  let videoOutputStream: DownloadOutput | undefined;
  let sabrStreamInstance: SabrStream | undefined;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });

    const playerResponse = await makePlayerRequest(innertube, VIDEO_ID);

    if (playerResponse.playability_status?.status !== 'OK') {
      console.error('[error]', 'Video is not playable:', playerResponse.playability_status?.status);
      process.exit(1);
    }

    const options: SabrPlaybackOptions = {
      videoPreferences: { container: 'webm', quality: '720p', preferredVideoCodec: 'vp9' },
      audioPreferences: { container: 'webm', dynamicRangeCompression: false, voiceBoost: false },
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    const { results } = await createSabrStream(options, playerResponse, innertube);
    const { videoStream, audioStream, selectedFormats, videoTitle, author, views, duration } = results;

    sabrStreamInstance = results.sabrStreamInstance;

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${VIDEO_ID}\n
    `);

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
    if (!audioOutputStream || !videoOutputStream || !videoTitle) {
      console.error('[error]', 'Missing output streams or video title.');
      process.exitCode = 1;
    } else {
      await mergeAudioAndVideo(videoTitle, audioOutputStream.filePath, videoOutputStream.filePath);
      await cleanupTempFiles([ audioOutputStream.filePath, videoOutputStream.filePath ]);

      console.info('[info]', `Saved as: ${sanitize(videoTitle)}.mkv`);
    }
  }
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

async function mergeAudioAndVideo(videoTitle: string, audioPath: string, videoPath: string): Promise<string> {
  const sanitizedTitle = sanitize(videoTitle) || 'output';
  const outputPath = `${sanitizedTitle}.mkv`;

  return new Promise((resolve, reject) => {
    console.info('[info]', 'Merging files...');

    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions([
        '-c:v copy',
        '-c:a copy',
        '-map 0:v:0',
        '-map 1:a:0'
      ])
      .on('end', () => resolve(outputPath))
      .on('error', (err) => {
        reject(new Error(`Error merging files: ${err.message}`));
      })
      .save(outputPath);
  });
}

main().then();