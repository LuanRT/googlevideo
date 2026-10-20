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
import type { SabrPlaybackOptions } from 'googlevideo/sabr-stream';
import Innertube, { UniversalCache, YTNodes, Log } from 'youtubei.js';

// Disable ytjs logs to reduce noise.
Log.setLevel(Log.Level.NONE);

const EXAMPLE_DURATION_MIN = 10;

async function main() {
  const tempFiles: string[] = [];

  let downloadTimer: NodeJS.Timeout | undefined;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });
    const searchResults = await innertube.search('lofi hip hop radio - beats to relax/study to');
    const liveVideo = searchResults.videos.filterType(YTNodes.Video).find((video) => video.is_live);
    const videoId = liveVideo?.video_id;

    if (!videoId)
      throw new Error('No live video found in search results.');

    const playerResponse = await makePlayerRequest(innertube, videoId);

    const options: SabrPlaybackOptions = {
      videoPreferences: { container: 'webm', quality: '720p', preferredVideoCodec: 'vp9' },
      audioPreferences: {
        container: 'mp4',
        preferredAudioCodec: 'aac',
        dynamicRangeCompression: false,
        voiceBoost: false
      },
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    console.info('[info]', `Downloading live stream for ${EXAMPLE_DURATION_MIN} minutes...`);

    const { results } = await createSabrStream(options, playerResponse, innertube);
    
    const {
      videoStream,
      audioStream,
      selectedFormats,
      videoTitle,
      author,
      views,
      duration,
      sabrStreamInstance
    } = results;

    // Needed because we try merging them with ffmpeg.
    if (!selectedFormats.videoFormat)
      throw new Error('Please set enabledTrackTypes to "VIDEO_AND_AUDIO"');

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${videoId}\n
    `);

    downloadTimer = setTimeout(() => sabrStreamInstance.abort(), EXAMPLE_DURATION_MIN * 60 * 1000);

    const progressDisplay = createProgressDisplay();

    const createTrackOutput = (label: 'audio' | 'video', format: SabrFormat) => {
      const output = createOutputStream(videoTitle, format.mimeType!);
      tempFiles.push(output.filePath); // for cleanup
      return {
        output,
        progress: progressDisplay.createLine(label, format.contentLength, sabrStreamInstance.isLive)
      };
    };

    const audio = createTrackOutput('audio', selectedFormats.audioFormat);
    const video = createTrackOutput('video', selectedFormats.videoFormat);

    try {
      await Promise.all([
        videoStream.pipeTo(createStreamSink(video.output.stream, video.progress)),
        audioStream.pipeTo(createStreamSink(audio.output.stream, audio.progress))
      ]);
    } catch (error) {
      if (!sabrStreamInstance.isAborted) throw error;
    }

    const outputPath = await mergeAudioAndVideo(
      videoTitle,
      audio.output.filePath,
      video.output.filePath
    );
    console.info('[info]', `Download complete! Output saved as "${outputPath}"`);
  } catch (error) {
    console.error('[error]', 'Download failed:', error);
    process.exitCode = 1;
  } finally {
    if (downloadTimer) clearTimeout(downloadTimer);
    await cleanupTempFiles(tempFiles);
  }
}

async function mergeAudioAndVideo(videoTitle: string, audioPath: string, videoPath: string): Promise<string> {
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
        if (progress.percent)
          process.stdout.write(`\r[merge] ${Math.min(progress.percent, 100).toFixed(1).padStart(5)}%`);
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