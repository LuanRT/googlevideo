import {
  createOutputStream,
  createStreamSink,
  createSabrStream,
  createProgressDisplay,
  makePlayerRequest,
  type DownloadOutput
} from './utils/sabr-stream-factory.js';

import { EnabledTrackTypes } from 'googlevideo/utils';
import type { SabrPlaybackOptions, SabrStream } from 'googlevideo/sabr-stream';
import Innertube, { UniversalCache } from 'youtubei.js';

const VIDEO_ID = 'SHxtKriIRYI';

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
      videoPreferences: { container: 'webm', quality: '1080p', preferredVideoCodec: 'vp9' },
      audioPreferences: { container: 'webm', dynamicRangeCompression: false, voiceBoost: false },
      enabledTrackTypes: EnabledTrackTypes.VIDEO_AND_AUDIO,
      isPostLiveDvr: !!playerResponse.video_details?.is_post_live_dvr
    };

    const { results } = await createSabrStream(options, playerResponse, innertube);

    const duration = results.duration;
    const views = results.views;
    const author = results.author;

    const videoStream = results.videoStream;
    const audioStream = results.audioStream;
    const selectedFormats = results.selectedFormats;

    sabrStreamInstance = results.sabrStreamInstance;
    videoTitle = results.videoTitle;

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
      console.info('[info]', 'Saved as:');
      console.log(`  Audio: ${audioOutputStream.filePath}`);
      console.log(`  Video: ${videoOutputStream.filePath}`);
    }
  }
}

main().then();