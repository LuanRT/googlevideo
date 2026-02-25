import shaka from 'shaka-player/dist/shaka-player.ui.js';
import type { Types } from 'youtubei.js/web';
import { Constants, Innertube, Platform, UniversalCache, Utils, YT } from 'youtubei.js/web';
import { SabrStreamingAdapter } from 'googlevideo/sabr-streaming-adapter';
import { buildSabrFormat } from 'googlevideo/utils';
import { ShakaPlayerAdapter } from './ShakaPlayerAdapter.js';
import { checkExtension, fetchFunction } from './helpers.js';
import { botguardService } from './BotguardService.js';
import 'shaka-player/dist/controls.css';

const videoElement = document.getElementById('video') as HTMLVideoElement;
const videoContainer = document.getElementById('video-container') as HTMLDivElement;
const videoIdInput = document.getElementById('videoIdInput') as HTMLInputElement;
const loadButton = document.getElementById('loadButton') as HTMLButtonElement;
const statusElement = document.getElementById('status') as HTMLDivElement;

let player: shaka.Player;
let sabrAdapter: SabrStreamingAdapter;
let innertube: Innertube;
let playbackWebPoTokenContentBinding: string | undefined;
let playbackWebPoTokenCreationLock = false;
let playbackWebPoToken: string | undefined;
let coldStartToken: string | undefined;

Platform.shim.eval = async (data: Types.BuildScriptResult, env: Record<string, Types.VMPrimative>) => {
  const properties = [];

  if (env.n) {
    properties.push(`n: exportedVars.nFunction("${env.n}")`);
  }

  if (env.sig) {
    properties.push(`sig: exportedVars.sigFunction("${env.sig}")`);
  }

  const code = `${data.output}\nreturn { ${properties.join(', ')} }`;

  return new Function(code)();
};

async function main() {
  shaka.polyfill.installAll();

  if (!shaka.Player.isBrowserSupported())
    throw new Error('Shaka Player is not supported on this browser.');

  if (!checkExtension()) {
    throw new Error('This application requires the "ytc-bridge" browser extension to function. This extension is needed to communicate with YouTube\'s internal APIs by bypassing browser security restrictions (like CORS) that would otherwise block requests. Please install the extension from https://github.com/LuanRT/ytc-bridge and then reload the page.');
  }

  innertube = await Innertube.create({
    cache: new UniversalCache(true),
    fetch: fetchFunction
  });

  botguardService.init().then(() => console.info('[Main]', 'BotGuard client initialized'));

  console.log('[Main] Innertube initialized');

  // Now init the player.
  player = new shaka.Player();
  player.configure({
    abr: { enabled: true },
    streaming: {
      bufferingGoal: 120,
      rebufferingGoal: 2
    }
  });

  await player.attach(videoElement);

  const ui = new shaka.ui.Overlay(player, videoContainer, videoElement);

  ui.configure({
    addBigPlayButton: false,
    overflowMenuButtons: [
      'captions',
      'quality',
      'language',
      'chapter',
      'picture_in_picture',
      'playback_rate',
      'loop',
      'recenter_vr',
      'toggle_stereoscopic',
      'save_video_frame'
    ],
    customContextMenu: true
  });

  const volumeContainer = videoContainer.getElementsByClassName('shaka-volume-bar-container');
  volumeContainer[0].addEventListener('mousewheel', (event) => {
    event.preventDefault();
    const delta = Math.sign((event as any).deltaY);
    videoElement.volume = Math.max(0, Math.min(1, videoElement.volume - delta * 0.05));
  });

  console.log('[Main] Shaka Player initialized');

  // Set up UI listeners.
  loadButton.addEventListener('click', () => loadVideo(videoIdInput.value));
  loadButton.disabled = false;
  statusElement.textContent = 'Ready. Enter a video ID and click "Load Video".';
}

async function loadVideo(videoId: string) {
  if (!videoId) {
    alert('Please enter a video ID.');
    return;
  }
  
  playbackWebPoToken = undefined;
  playbackWebPoTokenContentBinding = videoId;

  statusElement.textContent = `Loading video: ${videoId}...`;
  console.log('[Player]', `Loading video: ${videoId}`);

  try {
    // Unload previous video.
    await player.unload();

    if (sabrAdapter) {
      sabrAdapter.dispose();
    }

    // Now fetch video info from YouTube.
    const playerResponse = await innertube.actions.execute('/player', {
      videoId,
      contentCheckOk: true,
      racyCheckOk: true,
      playbackContext: {
        contentPlaybackContext: {
          signatureTimestamp: innertube.session.player?.signature_timestamp
        }
      }
    });

    const cpn = Utils.generateRandomString(16);
    const videoInfo = new YT.VideoInfo([ playerResponse ], innertube.actions, cpn);

    if (videoInfo.playability_status?.status !== 'OK') {
      throw new Error(`Cannot play video: ${videoInfo.playability_status?.reason}`);
    }

    const isLive = videoInfo.basic_info.is_live;
    const isPostLiveDVR = !!videoInfo.basic_info.is_post_live_dvr ||
      (videoInfo.basic_info.is_live_content && !!(videoInfo.streaming_data?.dash_manifest_url || videoInfo.streaming_data?.hls_manifest_url));

    // Initialize and attach SABR adapter.
    sabrAdapter = new SabrStreamingAdapter({
      playerAdapter: new ShakaPlayerAdapter(),
      clientInfo: {
        osName: innertube.session.context.client.osName,
        osVersion: innertube.session.context.client.osVersion,
        clientName: parseInt(Constants.CLIENT_NAME_IDS[innertube.session.context.client.clientName as keyof typeof Constants.CLIENT_NAME_IDS]),
        clientVersion: innertube.session.context.client.clientVersion
      }
    });

    sabrAdapter.onMintPoToken(async () => {
      if (!playbackWebPoToken) {
        // For live streams, we must block and wait for the PO token as it's sometimes required for playback to start.
        // For VODs, we can mint the token in the background to avoid delaying playback, as it's not immediately required.
        // While BotGuard is pretty darn fast, it still makes a difference in user experience (from my own testing).
        if (isLive) {
          await mintContentWebPO();
        } else {
          mintContentWebPO().then();
        }
      }

      return playbackWebPoToken || coldStartToken || '';
    });

    sabrAdapter.onReloadPlayerResponse(async (reloadContext) => {
      console.log('[SABR]', 'Reloading player response...');

      const reloadedInfo = await innertube.actions.execute('/player', {
        videoId,
        contentCheckOk: true,
        racyCheckOk: true,
        playbackContext: {
          contentPlaybackContext: {
            signatureTimestamp: innertube.session.player?.signature_timestamp
          },
          reloadPlaybackContext: reloadContext
        }
      });

      const parsedInfo = new YT.VideoInfo([ reloadedInfo ], innertube.actions, cpn);
      sabrAdapter.setStreamingURL(await innertube.session.player!.decipher(parsedInfo.streaming_data?.server_abr_streaming_url));
      sabrAdapter.setUstreamerConfig(videoInfo.player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config);
    });

    sabrAdapter.attach(player);

    if (videoInfo.streaming_data && !isPostLiveDVR && !isLive) {
      sabrAdapter.setStreamingURL(await innertube.session.player!.decipher(videoInfo.streaming_data?.server_abr_streaming_url));
      sabrAdapter.setUstreamerConfig(videoInfo.player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config);
      sabrAdapter.setServerAbrFormats(videoInfo.streaming_data.adaptive_formats.map(buildSabrFormat));
    }

    let manifestUri: string | undefined;
    if (videoInfo.streaming_data) {
      if (isLive) {
        manifestUri = videoInfo.streaming_data.dash_manifest_url ? `${videoInfo.streaming_data.dash_manifest_url}/mpd_version/7` : videoInfo.streaming_data.hls_manifest_url;
      } else if (isPostLiveDVR) {
        manifestUri = videoInfo.streaming_data.hls_manifest_url || `${videoInfo.streaming_data.dash_manifest_url}/mpd_version/7`;
      } else {
        manifestUri = `data:application/dash+xml;base64,${btoa(await videoInfo.toDash({
          manifest_options: {
            is_sabr: true,
            captions_format: 'vtt',
            include_thumbnails: false
          }
        }))}`;
      }
    }

    if (!manifestUri)
      throw new Error('Could not find a valid manifest URI.');

    await player.load(manifestUri);

    statusElement.textContent = `Playing: ${videoInfo.basic_info.title}`;
    console.log('[Player]', `Now playing: ${videoInfo.basic_info.title}`);
  } catch (e: any) {
    console.error('[Player]', 'Error:', e);
    statusElement.textContent = `Error: ${e.message}`;
  }
}

async function mintContentWebPO() {
  if (!playbackWebPoTokenContentBinding || playbackWebPoTokenCreationLock) return;

  playbackWebPoTokenCreationLock = true;
  try {
    coldStartToken = botguardService.mintColdStartToken(playbackWebPoTokenContentBinding);
    console.info('[Player]', `Cold start token created (Content binding: ${decodeURIComponent(playbackWebPoTokenContentBinding)})`);

    if (!botguardService.isInitialized()) await botguardService.reinit();

    if (botguardService.integrityTokenBasedMinter) {
      playbackWebPoToken = await botguardService.integrityTokenBasedMinter.mintAsWebsafeString(decodeURIComponent(playbackWebPoTokenContentBinding));
      console.info('[Player]', `WebPO token created (Content binding: ${decodeURIComponent(playbackWebPoTokenContentBinding)})`);
    }
  } catch (err) {
    console.error('[Player]', 'Error minting WebPO token', err);
  } finally {
    playbackWebPoTokenCreationLock = false;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  statusElement.textContent = 'Initializing...';
  loadButton.disabled = true;
  main().catch((err) => {
    console.error('Initialization failed:', err);
    statusElement.textContent = `Initialization failed: ${err.message}`;
  });
});