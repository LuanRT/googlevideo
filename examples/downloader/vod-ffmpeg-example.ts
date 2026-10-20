import { promises as fs } from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';
import sanitize from 'sanitize-filename';

import {
  createOutputStream,
  createStreamSink,
  createSabrStream,
  createProgressDisplay,
  makePlayerRequest
} from './utils/sabr-stream-factory.js';

import type { SabrFormat } from 'googlevideo/shared-types';
import type { SabrPlaybackOptions, SabrStream } from 'googlevideo/sabr-stream';
import Innertube, { UniversalCache } from 'youtubei.js';

const VIDEO_ID = 'yFd-Mlt4Ybc';

async function main() {
  const tempFiles: string[] = [];
  
  let sabrStreamInstance: SabrStream | undefined;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });
    const playerResponse = await makePlayerRequest(innertube, VIDEO_ID);

    if (playerResponse.playability_status?.status !== 'OK')
      throw new Error(`Video is not playable: ${playerResponse.playability_status?.status}`);

    const options: SabrPlaybackOptions = {
      videoPreferences: { container: 'webm', quality: '1080p', preferredVideoCodec: 'vp9' },
      audioPreferences: { container: 'webm', dynamicRangeCompression: false, voiceBoost: false },
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    const { results } = await createSabrStream(options, playerResponse, innertube);
    
    const {
      videoStream,
      audioStream,
      selectedFormats,
      videoTitle,
      author,
      views,
      duration,
      sabrStreamInstance: stream
    } = results;

    sabrStreamInstance = stream;

    if (!selectedFormats.videoFormat)
      throw new Error('Please set enabledTrackTypes to "VIDEO_AND_AUDIO"');

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${VIDEO_ID}\n
    `);

    const progressDisplay = createProgressDisplay();

    const createTrackOutput = (label: 'audio' | 'video', format: SabrFormat) => {
      const output = createOutputStream(videoTitle, format.mimeType!);
      tempFiles.push(output.filePath); // for cleanup
      return {
        output,
        progress: progressDisplay.createLine(label, format.contentLength, stream.isLive)
      };
    };

    const audio = createTrackOutput('audio', selectedFormats.audioFormat);
    const video = createTrackOutput('video', selectedFormats.videoFormat);

    await Promise.all([
      videoStream.pipeTo(createStreamSink(video.output.stream, video.progress)),
      audioStream.pipeTo(createStreamSink(audio.output.stream, audio.progress))
    ]);

    const outputPath = await mergeAudioAndVideo(
      videoTitle,
      audio.output.filePath,
      video.output.filePath
    );

    console.info('[info]', `Saved as: ${outputPath}`);
  } catch (error) {
    // Aborts are intentional.
    if (!sabrStreamInstance?.isAborted) {
      console.error('[error]', 'Download failed:', error);
      process.exitCode = 1;
    }
  } finally {
    await cleanupTempFiles(tempFiles);
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