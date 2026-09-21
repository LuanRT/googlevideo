import sanitize from 'sanitize-filename';
import { createWriteStream, type WriteStream } from 'node:fs';
import { Constants, type IPlayerResponse, Platform, YTNodes } from 'youtubei.js';
import { buildSabrFormat } from 'googlevideo/utils';
import { SabrStream, type SabrPlaybackConfig } from 'googlevideo/sabr-stream';

import type { Innertube, Types } from 'youtubei.js';
import type { PlayabilityStatus } from 'googlevideo/sabr-stream';
import type { ReloadPlaybackContext } from 'googlevideo/protos';
import type { SabrFormat } from 'googlevideo/shared-types';

import { ProgressDisplay, formatDuration, type ProgressLine } from './progress-reporter.js';
import { getWebPoMinter } from './webpo-helper.js';

export interface DownloadOutput {
  stream: WriteStream;
  filePath: string;
}

export interface SabrStreamResults {
  videoStream: ReadableStream;
  audioStream: ReadableStream;
  selectedFormats: {
    videoFormat: SabrFormat;
    audioFormat: SabrFormat;
  };
  sabrStreamInstance: SabrStream;
  videoTitle: string;
  duration: string;
  views: string;
  author: string;
}

Platform.shim.eval = async (data: Types.BuildScriptResult) => {
  return new Function(data.output)();
};

export async function makePlayerRequest(innertube: Innertube, input: string | YTNodes.NavigationEndpoint, reloadPlaybackContext?: ReloadPlaybackContext) {
  const watchEndpoint = typeof input === 'string' ? new YTNodes.NavigationEndpoint({ watchEndpoint: { videoId: input } }) : input;

  const extraArgs: Record<string, any> = {
    playbackContext: {
      contentPlaybackContext: {
        vis: 0,
        splay: false,
        signatureTimestamp: innertube.session.player?.signature_timestamp
      }
    },
    contentCheckOk: true,
    racyCheckOk: true,
    client: 'WEB'
  };

  if (reloadPlaybackContext) {
    extraArgs.playbackContext.reloadPlaybackContext = reloadPlaybackContext;
  }

  return await watchEndpoint.call(innertube.actions, { ...extraArgs, parse: true });
}

export function determineFileExtension(mimeType: string): string {
  if (mimeType.includes('video')) {
    return mimeType.includes('webm') ? 'webm' : 'mp4';
  } else if (mimeType.includes('audio')) {
    return mimeType.includes('webm') ? 'webm' : 'm4a';
  }
  return 'bin';
}

export function createOutputStream(title: string, mimeType: string, append: boolean = false): DownloadOutput {
  const type = mimeType.includes('video') ? 'video' : 'audio';
  const extension = determineFileExtension(mimeType);
  const fileName = `${sanitize(title)}.${type}.${extension}`;

  return {
    stream: createWriteStream(fileName, { flags: append ? 'a' : 'w', encoding: 'binary' }),
    filePath: fileName
  };
}

export function createProgressDisplay(): ProgressDisplay {
  return new ProgressDisplay();
}

export function createStreamSink(outputStream: WriteStream, progressLine?: ProgressLine) {
  let size = 0;

  return new WritableStream({
    write(chunk) {
      return new Promise((resolve, reject) => {
        size += chunk.length;

        progressLine?.update(size);

        outputStream.write(chunk, (err) => {
          if (err) reject(err);
          else resolve();
        });
      });
    },
    close() {
      progressLine?.done();
      outputStream.end();
    }
  });
}

export async function createSabrStream(
  options: SabrPlaybackConfig,
  playerResponse: IPlayerResponse,
  innertube: Innertube
): Promise<{
  innertube: Innertube;
  results: SabrStreamResults;
}> {
  const webpoMinter = await getWebPoMinter();

  const videoId = playerResponse.video_details?.id;
  const serverAbrStreamingUrl = await innertube.session.player?.decipher(playerResponse.streaming_data?.server_abr_streaming_url);
  const videoPlaybackUstreamerConfig = playerResponse.player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config;
  const sabrFormats = playerResponse.streaming_data?.adaptive_formats.map(buildSabrFormat) || [];
  const heartbeatParams = playerResponse.heartbeat_params;

  const clientName = parseInt(Constants.CLIENT_NAME_IDS[innertube.session.context.client.clientName as keyof typeof Constants.CLIENT_NAME_IDS]);
  const clientVersion = innertube.session.context.client.clientVersion;

  if (!serverAbrStreamingUrl || !videoPlaybackUstreamerConfig || !videoId)
    throw new Error('Streaming info missing');

  const sabrStream = new SabrStream({
    videoId: videoId,
    formats: sabrFormats,
    serverAbrStreamingUrl,
    videoPlaybackUstreamerConfig,
    heartbeatParams: {
      heartbeatToken: heartbeatParams?.heartbeat_token,
      heartbeatServerData: heartbeatParams?.heartbeat_server_data,
      intervalMilliseconds: heartbeatParams?.interval_milliseconds
    },
    clientInfo: {
      clientName,
      clientVersion
    },
    callbacks: {
      onMintPoToken: () => webpoMinter.mint(videoId),
      onReloadPlayerResponse: async (playbackContext) => {
        const playerResponse = await makePlayerRequest(innertube, videoId, playbackContext);
        const serverAbrStreamingUrl = await innertube.session.player?.decipher(playerResponse.streaming_data?.server_abr_streaming_url);
        const videoPlaybackUstreamerConfig = playerResponse.player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config;

        if (!serverAbrStreamingUrl || !videoPlaybackUstreamerConfig) {
          throw new Error('Missing serverAbrStreamingUrl or videoPlaybackUstreamerConfig in reloaded player response');
        }

        return {
          videoPlaybackUstreamerConfig,
          serverAbrStreamingUrl
        };
      },
      onCheckHeartbeat: async (innertubeRequestBody) => {
        const heartbeatResponse = await innertube.actions.execute('/player/heartbeat', {
          ...innertubeRequestBody,
          parse: true
        });

        if (!heartbeatResponse.playability_status || !heartbeatResponse.playability_status_memo) {
          throw new Error('Invalid heartbeat response: missing playability_status');
        }

        const status = heartbeatResponse.playability_status.status as PlayabilityStatus;
        const pollDelayMs = heartbeatResponse.poll_delay_ms;
        const liveStreamability = heartbeatResponse.playability_status_memo?.getType(YTNodes.LiveStreamability).first();
        const displayEndscreen = !!liveStreamability.display_endscreen;
        const offlineSlate = liveStreamability.offline_slate;
        const broadcastId = liveStreamability.broadcast_id;

        return {
          status,
          displayEndscreen,
          offlineSlatePresent: !!offlineSlate,
          offlineSlateButtonsPresent: !!offlineSlate?.action_buttons.length,
          broadcastId,
          pollDelayMs
        };
      }
    }
  });

  const { videoStream, audioStream, selectedFormats } = sabrStream.start(options);

  return {
    innertube,
    results: {
      audioStream,
      videoStream,
      selectedFormats,
      author: playerResponse.video_details?.author || 'N/A',
      duration: playerResponse.video_details?.is_live ? 'LIVE' : formatDuration(playerResponse.video_details?.duration ?? NaN),
      videoTitle: playerResponse.video_details?.title || '',
      views: playerResponse.video_details?.view_count !== undefined ? playerResponse.video_details.view_count.toLocaleString() : 'N/A',
      sabrStreamInstance: sabrStream
    }
  };
}