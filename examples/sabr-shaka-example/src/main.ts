import shaka from 'shaka-player/dist/shaka-player.ui.js';
import { Innertube, UniversalCache, YT, Utils, Constants } from 'youtubei.js';
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
let sessionPoTokenContentBinding: string | undefined;
let sessionPoTokenCreationLock = false;
let sessionPoToken: string | undefined;
let coldStartToken: string | undefined;

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

  botguardService.init().then(() => console.info('[App]', 'BotGuard client initialized'));

  sessionPoTokenContentBinding = innertube.session.context.client.visitorData;

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
    const newVolume = Math.max(0, Math.min(1, videoElement.volume - delta * 0.05));
    videoElement.volume = newVolume;
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
        adPlaybackContext: {
          pyv: true
        },
        contentPlaybackContext: {
          signatureTimestamp: innertube.session.player?.sts
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
      if (!sessionPoToken) {
        // For live streams, we must block and wait for the PO token as it's sometimes required for playback to start.
        // For VODs, we can mint the token in the background to avoid delaying playback, as it's not immediately required.
        // While BotGuard is pretty darn fast, it still makes a difference in user experience (from my own testing).
        if (isLive) {
          await mintSessionPoToken();
        } else {
          mintSessionPoToken().then();
        }
      }

      return sessionPoToken || coldStartToken || '';
    });

    sabrAdapter.onReloadPlayerResponse(async (reloadContext) => {
      console.log('[SABR]', 'Reloading player response...');

      const reloadedInfo = await innertube.actions.execute('/player', {
        videoId,
        contentCheckOk: true,
        racyCheckOk: true,
        playbackContext: {
          adPlaybackContext: {
            pyv: true
          },
          contentPlaybackContext: {
            signatureTimestamp: innertube.session.player?.sts
          },
          reloadPlaybackContext: reloadContext
        }
      });

      const parsedInfo = new YT.VideoInfo([ reloadedInfo ], innertube.actions, cpn);
      sabrAdapter.setStreamingURL(innertube.session.player!.decipher(parsedInfo.streaming_data?.server_abr_streaming_url));
      sabrAdapter.setUstreamerConfig(videoInfo.player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config);
    });

    sabrAdapter.attach(player);

    if (videoInfo.streaming_data && !isPostLiveDVR && !isLive) {
      sabrAdapter.setStreamingURL(innertube.session.player!.decipher(videoInfo.streaming_data?.server_abr_streaming_url));
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

async function mintSessionPoToken() {
  if (!sessionPoTokenContentBinding || sessionPoTokenCreationLock) return;

  sessionPoTokenCreationLock = true;
  try {
    coldStartToken = botguardService.mintColdStartToken(sessionPoTokenContentBinding);
    console.info('[Player]', `Cold start token created (Content binding: ${decodeURIComponent(sessionPoTokenContentBinding)})`);

    if (!botguardService.isInitialized()) await botguardService.reinit();

    if (botguardService.integrityTokenBasedMinter) {
      sessionPoToken = await botguardService.integrityTokenBasedMinter.mintAsWebsafeString(decodeURIComponent(sessionPoTokenContentBinding));
      console.info('[Player]', `Session PO token created (Content binding: ${decodeURIComponent(sessionPoTokenContentBinding)})`);
    }
  } catch (err) {
    console.error('[Player]', 'Error minting session PO token', err);
  } finally {
    sessionPoTokenCreationLock = false;
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