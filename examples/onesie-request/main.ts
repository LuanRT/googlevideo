import Innertube, { Endpoints, Parser, UniversalCache } from 'youtubei.js';

import GoogleVideo, { base64ToU8, Protos, PART, QUALITY } from '../../dist/src/index.js';
import { decryptResponse, encryptRequest } from './utils.js';

const innertube = await Innertube.create({ cache: new UniversalCache(true) });

const tvConfigResponse = await fetch('https://www.youtube.com/tv_config?action_get_config=true&client=lb4&theme=cl', {
  method: 'GET',
  headers: {
    'User-Agent': 'Mozilla/5.0 (ChromiumStylePlatform) Cobalt/Version'
  }
});

const tvConfigResponseData = await tvConfigResponse.text();

if (!tvConfigResponseData.startsWith(')]}'))
  throw new Error('Invalid JSPB response');

const configData = JSON.parse(tvConfigResponseData.slice(4));

const webPlayerContextConfig = configData.webPlayerContextConfig.WEB_PLAYER_CONTEXT_CONFIG_ID_LIVING_ROOM_WATCH;
const onesieHotConfig = webPlayerContextConfig.onesieHotConfig;

const clientKeyData = base64ToU8(onesieHotConfig.clientKey);
const encryptedClientKey = base64ToU8(onesieHotConfig.encryptedClientKey);
const onesieUstreamerConfig = base64ToU8(onesieHotConfig.onesieUstreamerConfig);
const baseUrl = onesieHotConfig.baseUrl;

const videoId = 'JAs6WyK-Kr0';

const clonedContext = JSON.parse(JSON.stringify(innertube.session.context)); // Clone the context to avoid modifying the original one
const playerRequest = {
  context: clonedContext,
  ...Endpoints.PlayerEndpoint.build({
    video_id: videoId,
    sts: innertube.session.player?.sts
  })
};

// Change or remove these if you want to use a different client. I chose TVHTML5 purely for testing.
clonedContext.client.clientName = 'TVHTML5';
clonedContext.client.clientVersion = '7.20240717.18.00';

const headers = [
  {
    name: 'Content-Type',
    value: 'application/json'
  },
  {
    name: 'User-Agent',
    value: 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36'
  },
  {
    name: 'X-Goog-Visitor-Id',
    value: innertube.session.context.client.visitorData
  }
];

const onesieRequest = Protos.OnesieRequest.encode({
  url: 'https://youtubei.googleapis.com/youtubei/v1/player?key=AIzaSyDCU8hByM-4DrUqRUYnGn-3llEO78bcxq8',
  headers,
  body: JSON.stringify(playerRequest),
  field4: false,
  field6: false
}).finish();

const { encrypted, hmac, iv } = await encryptRequest(clientKeyData, onesieRequest);

const body = Protos.OnesieInnertubeRequest.encode({
  encryptedRequest: {
    encryptedClientKey,
    encryptedOnesieRequest: encrypted,
    enableCompression: false,
    hmac: hmac,
    iv: iv,
    TQ: true,
    YP: true
  },
  mediaInfo: {
    timeSinceLastManualFormatSelectionMs: 0,
    lastManualDirection: 0,
    quality: QUALITY.HD720,
    selectedQualityHeight: QUALITY.HD720,
    startTimeMs: 0,
    visibility: 0
  },
  streamerContext: {
    field5: [],
    field6: [],
    poToken: undefined,
    playbackCookie: undefined,
    clientInfo: {
      clientName: 7,
      clientVersion: '7.20240915.19.00'
    }
  },
  onesieUstreamerConfig
}).finish();

const redirectorResponse = await fetch(`https://redirector.googlevideo.com/initplayback?source=youtube&itag=0&pvi=0&pai=0&owc=yes&id=${Math.round(Math.random() * 1E5)}`, {
  method: 'GET',
  redirect: 'manual'
});

const redirectorResponseUrl = redirectorResponse.headers.get('location');

if (!redirectorResponseUrl)
  throw new Error('Invalid redirector response');

let url = `${redirectorResponseUrl.split('/initplayback')[0]}${baseUrl}`;

const queryParams = [];

const videoIdBytes = base64ToU8(videoId);
const encodedVideoId = [];

for (const byte of videoIdBytes) {
  encodedVideoId.push(byte.toString(16).padStart(2, '0'));
}

queryParams.push(`id=${encodedVideoId.join('')}`);
queryParams.push('&opr=1');
queryParams.push('&por=1');
queryParams.push('rn=1');

/**
 * Add the following search params to get media data parts along with the onesie response:
 * Video: searchParams.push('pvi=337,336,335,787,788,313,271,248,247,780,779,244,243,242,137,136,135,134,133,160,360,358,357,274,317,273,318,280,279,225,224,145,144,222,223,143,142,359');
 * Audio: searchParams.push('pai=141,140,149,251,250');
 */

url += `&${queryParams.join('&')}`;

const response = await fetch(url, {
  method: 'POST',
  headers: {
    'accept': '*/*',
    'content-type': 'text/plain'
  },
  referrer: 'https://www.youtube.com/',
  body
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

const onesiePlayerResponse = onesie.find((header) => header.type === Protos.OnesieHeaderType.PLAYER_RESPONSE);

if (onesiePlayerResponse) {
  if (!onesiePlayerResponse.cryptoParams)
    throw new Error('Crypto params not found');

  const iv = onesiePlayerResponse.cryptoParams.iv;
  const hmac = onesiePlayerResponse.cryptoParams.hmac;
  const encrypted = onesiePlayerResponse.data;

  const decryptedData = await decryptResponse(iv, hmac, encrypted, clientKeyData);
  const response = Protos.OnesieInnertubeResponse.decode(decryptedData);

  if (response.proxyStatus !== 1)
    throw new Error('Proxy status not OK');

  if (response.status !== 200)
    throw new Error('Status not OK');

  const playerResponse = Parser.parseResponse(JSON.parse(new TextDecoder().decode(response.body)));

  console.log('Player response:', playerResponse);
  console.log('Deciphered audio URL:', playerResponse.streaming_data?.adaptive_formats.find((fmt) => fmt.has_audio)?.decipher(innertube.session.player));
}
