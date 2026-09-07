import Innertube, { YT, Constants, Platform, UniversalCache, type Types, type Context } from 'youtubei.js';

import {
  UMPPartId,
  OnesieInnertubeRequest,
  OnesieHeader,
  SabrError,
  OnesieProxyStatus,
  OnesieInnertubeResponse,
  OnesieRequest,
  CompressionType,
  OnesieHeaderType
} from 'googlevideo/protos';

import { UmpReader } from 'googlevideo/ump';
import { base64ToU8, concatenateChunks } from 'googlevideo/utils';
import { decryptResponse, encryptRequest } from './utils.js';

type ClientConfig = {
  clientKeyData: Uint8Array;
  encryptedClientKey: Uint8Array;
  onesieUstreamerConfig: Uint8Array;
  baseUrl: string;
};

Platform.shim.eval = async (data: Types.BuildScriptResult) => {
  return new Function(data.output)();
};

const enableCompression = true;

/**
 * Fetches and parses the YouTube TV client configuration.
 * Configurations from other clients can be used as well. I chose TVHTML5 for its simplicity.
 */
async function getYouTubeTVClientConfig(): Promise<ClientConfig> {
  const tvConfigResponse = await fetch('https://www.youtube.com/tv_config?action_get_config=true&client=lb4&theme=cl', {
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version'
    }
  });

  const tvConfig = await tvConfigResponse.text();
  if (!tvConfig.startsWith(')]}'))
    throw new Error('Invalid response from YouTube TV config endpoint.');

  const tvConfigJson = JSON.parse(tvConfig.slice(4));

  const webPlayerContextConfig = tvConfigJson.webPlayerContextConfig.WEB_PLAYER_CONTEXT_CONFIG_ID_LIVING_ROOM_WATCH;
  const onesieHotConfig = webPlayerContextConfig.onesieHotConfig;

  const clientKeyData = base64ToU8(onesieHotConfig.clientKey);
  const encryptedClientKey = base64ToU8(onesieHotConfig.encryptedClientKey);
  const onesieUstreamerConfig = base64ToU8(onesieHotConfig.onesieUstreamerConfig);
  const baseUrl = onesieHotConfig.baseUrl;

  return {
    clientKeyData,
    encryptedClientKey,
    onesieUstreamerConfig,
    baseUrl
  };
}

type OnesieRequestArgs = {
  videoId: string;
  poToken?: string;
  clientConfig: ClientConfig;
  innertube: Innertube;
};

/**
 * Prepares a Onesie request.
 */
async function prepareOnesieRequest(args: OnesieRequestArgs) {
  const { videoId, poToken, clientConfig, innertube } = args;
  const { clientKeyData, encryptedClientKey, onesieUstreamerConfig } = clientConfig;
  const clonedInnerTubeContext: Context = structuredClone(innertube.session.context);

  const params: Record<string, any> = {
    playbackContext: {
      contentPlaybackContext: {
        vis: 0,
        splay: false,
        lactMilliseconds: '-1',
        signatureTimestamp: innertube.session.player?.signature_timestamp
      }
    },
    videoId
  };

  if (poToken) {
    params.serviceIntegrityDimensions = {};
    params.serviceIntegrityDimensions.poToken = poToken;
  }

  const playerRequestJson = {
    context: clonedInnerTubeContext,
    ...params
  };

  const headers = [
    {
      name: 'Content-Type',
      value: 'application/json'
    },
    {
      name: 'User-Agent',
      value: clonedInnerTubeContext.client.userAgent
    },
    {
      name: 'X-Goog-Visitor-Id',
      value: clonedInnerTubeContext.client.visitorData
    }
  ];

  const onesieInnertubeRequest = OnesieInnertubeRequest.encode({
    url: 'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyDCU8hByM-4DrUqRUYnGn-3llEO78bcxq8',
    headers,
    body: JSON.stringify(playerRequestJson),
    proxiedByTrustedBandaid: true,
    skipResponseEncryption: true
  }).finish();

  const { encrypted, hmac, iv } = await encryptRequest(clientKeyData, onesieInnertubeRequest);

  const body = OnesieRequest.encode({
    urls: [],
    innertubeRequest: {
      enableCompression,
      encryptedClientKey,
      enableAdPlacementsPreroll: false,
      encryptedOnesieInnertubeRequest: encrypted,
      /* 
       * If you want to use an unencrypted player request:
       * unencryptedOnesieInnertubeRequest: onesieInnertubeRequest, 
       */
      hmac: hmac,
      iv: iv,
      useJsonformatterToParsePlayerResponse: false,
      serializeResponseAsJson: true // If false, the response will be serialized as protobuf.
    },
    streamerContext: {
      sabrContexts: [],
      unsentSabrContexts: [],
      poToken: poToken ? base64ToU8(poToken) : undefined,
      playbackCookie: undefined,
      clientInfo: {
        clientName: parseInt(Constants.CLIENT_NAME_IDS[clonedInnerTubeContext.client.clientName as keyof typeof Constants.CLIENT_NAME_IDS]),
        clientVersion: clonedInnerTubeContext.client.clientVersion
      }
    },
    bufferedRanges: [],
    onesieUstreamerConfig
  }).finish();

  const videoIdBytes = base64ToU8(videoId);
  const encodedVideoIdChars = [];

  for (const byte of videoIdBytes) {
    encodedVideoIdChars.push(byte.toString(16).padStart(2, '0'));
  }

  const encodedVideoId = encodedVideoIdChars.join('');

  return { body, encodedVideoId };
}

/**
 * Fetches basic video info (streaming data, video details, etc.) using a Onesie request (/initplayback).
 */
async function getBasicInfo(innertube: Innertube, videoId: string): Promise<YT.VideoInfo> {
  const redirectorResponse = await fetch(`https://redirector.googlevideo.com/initplayback?source=youtube&itag=0&pvi=0&pai=0&owc=yes&cmo:sensitive_content=yes&alr=yes&id=${Math.round(Math.random() * 1E5)}`, { method: 'GET' });
  const redirectorResponseUrl = await redirectorResponse.text();

  if (!redirectorResponseUrl.startsWith('https://'))
    throw new Error('Invalid redirector response');

  const clientConfig = await getYouTubeTVClientConfig();
  const onesieRequest = await prepareOnesieRequest({ videoId, /* If needed - poToken,*/ clientConfig, innertube });

  let url = `${redirectorResponseUrl.split('/initplayback')[0]}${clientConfig.baseUrl}`;

  const queryParams = [];
  queryParams.push(`id=${onesieRequest.encodedVideoId}`);
  queryParams.push('cmo:sensitive_content=yes');
  queryParams.push('opr=1'); // Onesie Playback Request.
  queryParams.push('osts=0'); // Onesie Start Time Seconds.
  queryParams.push('por=1');
  queryParams.push('rn=0');

  /**
   * Add the following search params to get media data parts along with the onesie player response.
   * const preferredVideoItags = [ ... ];
   * const preferredAudioItags = [ ... ];
   * searchParams.push(`pvi=${preferredVideoItags.join(',')}`);
   * searchParams.push(`pai=${preferredAudioItags.join(',')}`);
   */

  url += `&${queryParams.join('&')}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'content-type': 'application/octet-stream'
    },
    referrer: 'https://www.youtube.com/',
    body: onesieRequest.body as any
  });

  let lastHeader: OnesieHeader | undefined;
  let playerResponseHeader: OnesieHeader | undefined;
  let playerResponseData: Uint8Array | undefined;

  const umpReader = new UmpReader({
    onPart: (type, data) => {
      switch (type) {
        case UMPPartId.SABR_ERROR: {
          const error = SabrError.decode(concatenateChunks(data.chunks));
          console.error('[SABR_ERROR]:', error);
          throw new Error('Got SABR error');
        }
        case UMPPartId.ONESIE_HEADER:
          lastHeader = OnesieHeader.decode(concatenateChunks(data.chunks));
          break;
        case UMPPartId.ONESIE_DATA:
          if (lastHeader?.type === OnesieHeaderType.ONESIE_PLAYER_RESPONSE) {
            playerResponseHeader = lastHeader;
            playerResponseData = concatenateChunks(data.chunks);
          }
          lastHeader = undefined;
          break;
      }
    }
  });

  const reader = response.body?.getReader();

  if (!reader)
    throw new Error('Missing response body');

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    await umpReader.feed(value);
  }

  if (!playerResponseHeader || !playerResponseData)
    throw new Error('Missing Onesie Player Response');

  const iv = playerResponseHeader.cryptoParams?.iv;
  const hmac = playerResponseHeader.cryptoParams?.hmac;

  if (!iv || !hmac)
    throw new Error('Missing crypto params for Onesie Player Response');

  let decryptedData = hmac.length && iv.length ?
    await decryptResponse(iv, hmac, playerResponseData, clientConfig.clientKeyData) : playerResponseData;

  if (decryptedData && enableCompression && playerResponseHeader.cryptoParams?.compressionType === CompressionType.GZIP) {
    if (typeof window === 'undefined') {
      const zlib = await import('node:zlib');
      decryptedData = new Uint8Array(zlib.gunzipSync(decryptedData));
    } else {
      const ds = new DecompressionStream('gzip');
      const stream = new Blob([ decryptedData as any ]).stream().pipeThrough(ds);
      decryptedData = await new Response(stream).arrayBuffer().then((buf) => new Uint8Array(buf));
    }
  }

  const onesieInnertubeResponse = OnesieInnertubeResponse.decode(decryptedData);

  if (onesieInnertubeResponse.onesieProxyStatus !== OnesieProxyStatus.OK)
    throw new Error('Onesie proxy status not OK');

  if (onesieInnertubeResponse.httpStatus !== 200)
    throw new Error('Http status not OK');

  const apiResponse = {
    success: true,
    status_code: 200,
    data: JSON.parse(new TextDecoder().decode(onesieInnertubeResponse.body))
  };

  return new YT.VideoInfo([ apiResponse ], innertube.actions, '');
}

const innertube = await Innertube.create({ cache: new UniversalCache(true) });

const videoInfo = await getBasicInfo(innertube, 'hzGmbwS_Drs');
console.log('Basic info:', videoInfo);