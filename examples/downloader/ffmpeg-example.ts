import { EnabledTrackTypes } from 'googlevideo/utils';
import { promises as fs } from 'node:fs';
import ffmpeg from 'fluent-ffmpeg';

import {
  createOutputStream,
  createStreamSink,
  createSabrStream,
  createMultiProgressBar,
  setupProgressBar
} from './utils/sabr-stream-factory.js';

import type { SabrPlaybackOptions } from 'googlevideo/sabr-stream';

const VIDEO_ID = 'gKOgKVJ7Lio';
const OPTIONS: SabrPlaybackOptions = {
  preferWebM: true,
  preferOpus: true,
  videoQuality: '720p',
  audioQuality: 'AUDIO_QUALITY_MEDIUM',
  enabledTrackTypes: EnabledTrackTypes.VIDEO_AND_AUDIO
};

async function cleanupTempFiles(files: string[]) {
  for (const file of files) {
    try {
      await fs.unlink(file);
    } catch (error) {
      console.warn(`Failed to delete temp file ${file}:`, error);
    }
  }
}

async function mergeAudioAndVideo(videoTitle: string, audioPath: string, videoPath: string, mergeBar: any): Promise<string> {
  const sanitizedTitle = videoTitle?.replace(/[^a-z0-9]/gi, '_') || 'output';
  const outputPath = `${sanitizedTitle}.webm`;

  return new Promise((resolve, reject) => {
    mergeBar.update(10);

    ffmpeg()
      .input(videoPath)
      .input(audioPath)
      .outputOptions([ '-c:v copy', '-c:a copy', '-map 0:v:0', '-map 1:a:0' ])
      .on('progress', (progress) => {
        if (progress.percent) {
          mergeBar.update(Math.min(progress.percent, 99));
        }
      })
      .on('end', () => {
        mergeBar.update(100);
        resolve(outputPath);
      })
      .on('error', (err) => {
        reject(new Error(`Error merging files: ${err.message}`));
      })
      .save(outputPath);
  });
}

async function main() {
  const progressBars = createMultiProgressBar();

  try {
    const { streamResults } = await createSabrStream(VIDEO_ID, OPTIONS);
    const { videoStream, audioStream, selectedFormats, videoTitle } = streamResults;

    const audioOutputStream = createOutputStream(videoTitle, selectedFormats.audioFormat.mimeType!);
    const videoOutputStream = createOutputStream(videoTitle, selectedFormats.videoFormat.mimeType!);

    const audioBar = setupProgressBar(progressBars, 'audio', selectedFormats.audioFormat.contentLength || 0);
    const videoBar = setupProgressBar(progressBars, 'video', selectedFormats.videoFormat.contentLength || 0);
    const mergeBar = setupProgressBar(progressBars, 'merge');

    await Promise.all([
      videoStream.pipeTo(createStreamSink(selectedFormats.videoFormat, videoOutputStream.stream, videoBar)),
      audioStream.pipeTo(createStreamSink(selectedFormats.audioFormat, audioOutputStream.stream, audioBar))
    ]);

    await mergeAudioAndVideo(videoTitle, audioOutputStream.filePath, videoOutputStream.filePath, mergeBar);
    await cleanupTempFiles([ audioOutputStream.filePath, videoOutputStream.filePath ]);

    progressBars.stop();
    console.log(`Download complete! Output saved as "${videoTitle.replace(/[^a-z0-9]/gi, '_')}.webm"`);
  } catch (error) {
    console.error('Download failed:', error);
    progressBars.stop();
    process.exit(1);
  }
}

main().then();