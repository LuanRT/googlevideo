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
const ENABLED_TRACK_TYPES: number = EnabledTrackTypes.AUDIO_ONLY;

async function main() {
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
      enabledTrackTypes: ENABLED_TRACK_TYPES,
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

    if (selectedFormats.videoFormat)
      videoOutputStream = createOutputStream(videoTitle, selectedFormats.videoFormat.mimeType!);

    const progressDisplay = createProgressDisplay();
    const audioProgress = progressDisplay.createLine('audio', selectedFormats.audioFormat.contentLength, sabrStreamInstance.isLive);
    const streamPromises = [ audioStream.pipeTo(createStreamSink(audioOutputStream.stream, audioProgress)) ];

    // Not available when enabled track type is audio-only.
    if (selectedFormats.videoFormat && videoOutputStream) {
      const videoProgress = progressDisplay.createLine('video', selectedFormats.videoFormat.contentLength, sabrStreamInstance.isLive);
      streamPromises.push(videoStream.pipeTo(createStreamSink(videoOutputStream.stream, videoProgress)));
    }

    await Promise.all(streamPromises);
  } catch (error) {
    // Aborts are intentional.
    if (!sabrStreamInstance?.isAborted) {
      console.error('[error]', 'Download failed:', error);
      process.exitCode = 1;
    }
  } finally {
    if (ENABLED_TRACK_TYPES !== EnabledTrackTypes.AUDIO_ONLY && (!audioOutputStream || !videoOutputStream)) {
      console.error('[error]', 'Missing output streams.');
      process.exitCode = 1;
    } else {
      console.info('[info]', 'Saved as:');
      if (audioOutputStream)
        console.log(`  Audio: ${audioOutputStream?.filePath || 'N/A'}`);
      if (videoOutputStream)
        console.log(`  Video: ${videoOutputStream?.filePath || 'N/A'}`);
    }
  }
}

main().then();