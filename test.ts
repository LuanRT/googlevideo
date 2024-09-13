import Innertube, { UniversalCache } from 'youtubei.js';
import { GoogleVideo, Protos } from './dist/src/index.js';

const pot = 'MogByekTEuMCHffJ1fWU29jibLXb2em_4I0sBL3WX8kzmtnI2VOVIlJJjZ7mCf1E-4DaRwrPPqBXdL2ECFrjdNt2vIdAiTgbN44Q1asvZdjBr0bWFJsIzQRXUSXBRZDPq0IRZHTNc_B8ItbgV6yx7kJ4FOgkDsqj-_lubvsyWHjnq85WqGxEut11eQ==';

const innertube = await Innertube.create({
  cache: new UniversalCache(true),
  po_token: pot,
  visitor_data: 'CgtHelk0ajJwY185SSi91OO2BjIKCgJCUhIEGgAgZzoKILKg8r3TybrsZg%3D%3D',
});

const info = await innertube.getBasicInfo('nVSXA2t3F0U');

const audioFormat = info.chooseFormat({
  quality: "best",
  format: "mp4",
  type: 'audio',
});

const url = audioFormat.decipher(innertube.session.player);

const response = await fetch(url + `&range=4583871-5785063&ump=1&srfvp=1`, {
  method: 'POST',
});

const data = await response.arrayBuffer();

let dataBuffer = new GoogleVideo.ChunkedDataBuffer([new Uint8Array(data)]);

const ump = new GoogleVideo.UMP(dataBuffer);

ump.parse((part) => {
  console.log(part);
}); 