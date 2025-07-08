import { EnabledTrackTypes } from 'googlevideo/utils';

import {
  createOutputStream,
  createStreamSink,
  createSabrStream,
  createMultiProgressBar,
  setupProgressBar
} from './utils/sabr-stream-factory.js';

import type { SabrPlaybackOptions } from 'googlevideo/sabr-stream';

const VIDEO_ID = 'xjHO_02jZco';
const OPTIONS: SabrPlaybackOptions = {
  preferWebM: true,
  preferOpus: true,
  videoQuality: '720p',
  audioQuality: 'AUDIO_QUALITY_MEDIUM',
  enabledTrackTypes: EnabledTrackTypes.VIDEO_AND_AUDIO
};

async function main() {
  const progressBars = createMultiProgressBar();

  try {
    const { streamResults } = await createSabrStream(VIDEO_ID, OPTIONS);
    const { videoStream, audioStream, selectedFormats, videoTitle } = streamResults;

    const audioOutputStream = createOutputStream(videoTitle, selectedFormats.audioFormat.mimeType!);
    const videoOutputStream = createOutputStream(videoTitle, selectedFormats.videoFormat.mimeType!);

    const audioBar = setupProgressBar(progressBars, 'audio', selectedFormats.audioFormat.contentLength || 0);
    const videoBar = setupProgressBar(progressBars, 'video', selectedFormats.videoFormat.contentLength || 0);

    await Promise.all([
      videoStream.pipeTo(createStreamSink(selectedFormats.videoFormat, videoOutputStream.stream, videoBar)),
      audioStream.pipeTo(createStreamSink(selectedFormats.audioFormat, audioOutputStream.stream, audioBar))
    ]);

    progressBars.stop();

    console.log(`Download completed! Files saved as:
      Audio: ${audioOutputStream.filePath},
      Video: ${videoOutputStream.filePath}`);
  } catch (error) {
    console.error('Download failed:', error);
    progressBars.stop();
    process.exit(1);
  }
}

main().then();