import Innertube, { Constants, type Context, UniversalCache, YT } from 'youtubei.js';
import GoogleVideo, { base64ToU8, PART, Protos, QUALITY } from '../../dist/src/index.js';
import { decryptResponse, encryptRequest } from './utils.js';

type ClientConfig = {
  clientKeyData: Uint8Array;
  encryptedClientKey: Uint8Array;
  onesieUstreamerConfig: Uint8Array;
  baseUrl: string;
};

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

type OnesieRequest = {
  body: Uint8Array;
  encodedVideoId: string;
}

/**
 * Prepares a Onesie request.
 */
async function prepareOnesieRequest(args: OnesieRequestArgs): Promise<OnesieRequest> {
  const { videoId, poToken, clientConfig, innertube } = args;
  const { clientKeyData, encryptedClientKey, onesieUstreamerConfig } = clientConfig;
  const clonedInnerTubeContext: Context = structuredClone(innertube.session.context);

  // Change or remove these if you want to use a different client. I chose TVHTML5 purely for testing.
  clonedInnerTubeContext.client.clientName = Constants.CLIENTS.TV.NAME;
  clonedInnerTubeContext.client.clientVersion = Constants.CLIENTS.TV.VERSION;

  const params: Record<string, any> = {
    playbackContext: {
      contentPlaybackContext: {
        vis: 0,
        splay: false,
        lactMilliseconds: '-1',
        signatureTimestamp: innertube.session.player?.sts
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
      value: innertube.session.context.client.userAgent
    },
    {
      name: 'X-Goog-Visitor-Id',
      value: innertube.session.context.client.visitorData
    }
  ];

  const onesieRequest = Protos.OnesiePlayerRequest.encode({
    url: 'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyDCU8hByM-4DrUqRUYnGn-3llEO78bcxq8',
    headers,
    body: JSON.stringify(playerRequestJson),
    proxiedByTrustedBandaid: true,
    skipResponseEncryption: true
  }).finish();

  const { encrypted, hmac, iv } = await encryptRequest(clientKeyData, onesieRequest);

  const body = Protos.OnesieRequest.encode({
    urls: [],
    playerRequest: {
      encryptedClientKey,
      encryptedOnesiePlayerRequest: encrypted,
      /* 
       * If you want to use an unencrypted player request:
       * unencryptedOnesiePlayerRequest: onesieRequest, 
       */
      enableCompression: true,
      hmac: hmac,
      iv: iv,
      useJsonformatterToParsePlayerResponse: false,
      serializeResponseAsJson: true // If false, the response will be serialized as protobuf.
    },
    clientAbrState: {
      lastManualSelectedResolution: QUALITY.HD720,
      stickyResolution: QUALITY.HD720,
      playerTimeMs: 0,
      visibility: 0
    },
    streamerContext: {
      field5: [],
      field6: [],
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
  queryParams.push('opr=1');
  queryParams.push('por=1');
  queryParams.push('rn=1');
  queryParams.push('cmo:sensitive_content=yes');

  url += `&${queryParams.join('&')}`;

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'accept': '*/*',
      'content-type': 'application/octet-stream'
    },
    referrer: 'https://www.youtube.com/',
    body: onesieRequest.body
  });

  const arrayBuffer = await response.arrayBuffer();
  const googUmp = new GoogleVideo.UMP(new GoogleVideo.ChunkedDataBuffer([ new Uint8Array(arrayBuffer) ]));

  const onesie: (Protos.OnesieHeader & { data?: Uint8Array })[] = [];

  googUmp.parse((part) => {
    const data = part.data.chunks[0];
    switch (part.type) {
      case PART.SABR_ERROR:
        console.log('[SABR_ERROR]:', Protos.SabrError.decode(data));
        break;
      case PART.ONESIE_HEADER:
        onesie.push(Protos.OnesieHeader.decode(data));
        break;
      case PART.ONESIE_DATA:
        onesie[onesie.length - 1].data = data;
        break;
      default:
        break;
    }
  });

  const onesiePlayerResponse = onesie.find((header) => header.type === Protos.OnesieHeaderType.ONESIE_PLAYER_RESPONSE);

  if (onesiePlayerResponse) {
    if (!onesiePlayerResponse.cryptoParams)
      throw new Error('Crypto params not found');

    const iv = onesiePlayerResponse.cryptoParams.iv;
    const hmac = onesiePlayerResponse.cryptoParams.hmac;

    let responseData = onesiePlayerResponse.data;

    // Decompress the response data if compression is enabled.
    if (responseData && onesiePlayerResponse.cryptoParams.compressionType === Protos.CompressionType.GZIP) {
      if (typeof window === 'undefined') {
        const zlib = await import('node:zlib');
        responseData = new Uint8Array(zlib.gunzipSync(responseData));
      } else {
        const ds = new DecompressionStream('gzip');
        const stream = new Blob([ responseData ]).stream().pipeThrough(ds);
        responseData = await new Response(stream).arrayBuffer().then((buf) => new Uint8Array(buf));
      }
    }

    // If skipResponseEncryption is set to true in the request, the response will not be encrypted.
    const decryptedData = hmac?.length && iv?.length ?
      await decryptResponse(iv, hmac, responseData, clientConfig.clientKeyData) : responseData!;
    const response = Protos.OnesiePlayerResponse.decode(decryptedData);

    if (response.onesieProxyStatus !== Protos.OnesieProxyStatus.OK)
      throw new Error('Onesie proxy status not OK');

    if (response.httpStatus !== 200)
      throw new Error('Http status not OK');

    const playerResponse = {
      success: true,
      status_code: 200,
      data: JSON.parse(new TextDecoder().decode(response.body))
    };

    return new YT.VideoInfo([ playerResponse ], innertube.actions, '');
  }

  throw new Error('Player response not found');
}

const innertube = await Innertube.create({ cache: new UniversalCache(true) });

const videoInfo = await getBasicInfo(innertube, 'JAs6WyK-Kr0');
console.log('Basic info:', videoInfo);
console.log('Deciphered audio URL:');
console.log(videoInfo.chooseFormat({
  format: 'mp4',
  quality: 'best',
  type: 'audio'
}).decipher(innertube.session.player));