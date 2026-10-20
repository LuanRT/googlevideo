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
const ENABLED_TRACK_TYPES: number = EnabledTrackTypes.VIDEO_AND_AUDIO;

async function main() {
  let sabrStreamInstance: SabrStream | undefined;

  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(true) });
    const playerResponse = await makePlayerRequest(innertube, VIDEO_ID);

    if (playerResponse.playability_status?.status !== 'OK')
      throw new Error(`Video is not playable: ${playerResponse.playability_status?.status}`);

    const options: SabrPlaybackOptions = {
      videoPreferences: { container: 'webm', quality: '1080p', preferredVideoCodec: 'vp9' },
      audioPreferences: { container: 'webm', dynamicRangeCompression: false, voiceBoost: false },
      enabledTrackTypes: ENABLED_TRACK_TYPES,
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

    console.info(`
      Title: ${videoTitle}
      Duration: ${duration}
      Views: ${views}
      Author: ${author}
      Video ID: ${VIDEO_ID}\n
    `);

    const progressDisplay = createProgressDisplay();
    const audioOutput = createOutputStream(videoTitle, selectedFormats.audioFormat.mimeType!);

    const downloads = [
      audioStream.pipeTo(
        createStreamSink(
          audioOutput.stream,
          progressDisplay.createLine('audio', selectedFormats.audioFormat.contentLength, stream.isLive)
        )
      )
    ];

    let videoOutput: DownloadOutput | undefined;
    if (selectedFormats.videoFormat) {
      videoOutput = createOutputStream(videoTitle, selectedFormats.videoFormat.mimeType!);
      downloads.push(
        videoStream.pipeTo(
          createStreamSink(
            videoOutput.stream,
            progressDisplay.createLine('video', selectedFormats.videoFormat.contentLength, stream.isLive)
          )
        )
      );
    } else if (ENABLED_TRACK_TYPES !== EnabledTrackTypes.AUDIO_ONLY)
      throw new Error('Video format was expected but not selected.');

    await Promise.all(downloads);

    console.info('[info]', 'Saved as:');
    console.log(`  Audio: ${audioOutput.filePath}`);
    if (videoOutput) console.log(`  Video: ${videoOutput.filePath}`);
  } catch (error) {
    // Aborts are intentional.
    if (!sabrStreamInstance?.isAborted) {
      console.error('[error]', 'Download failed:', error);
      process.exitCode = 1;
    }
  }
}

main().then();