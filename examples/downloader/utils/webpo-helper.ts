import { BG, type BgConfig } from 'bgutils-js';
import { JSDOM } from 'jsdom';

export async function generateWebPoToken(visitorData: string) {
  const requestKey = 'O43z0dpjhgX20SCx4KAo';

  if (!visitorData)
    throw new Error('Could not get visitor data');

  const dom = new JSDOM();

  Object.assign(globalThis, {
    window: dom.window,
    document: dom.window.document
  });

  const bgConfig: BgConfig = {
    fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => fetch(input, init),
    globalObj: globalThis,
    identifier: visitorData,
    requestKey
  };

  const bgChallenge = await BG.Challenge.create(bgConfig);

  if (!bgChallenge)
    throw new Error('Could not get challenge');

  const interpreterJavascript = bgChallenge.interpreterJavascript.privateDoNotAccessOrElseSafeScriptWrappedValue;

  if (interpreterJavascript) {
    new Function(interpreterJavascript)();
  } else throw new Error('Could not load VM');

  const poTokenResult = await BG.PoToken.generate({
    program: bgChallenge.program,
    globalName: bgChallenge.globalName,
    bgConfig
  });

  const placeholderPoToken = BG.PoToken.generatePlaceholder(visitorData);

  return {
    visitorData,
    placeholderPoToken,
    poToken: poTokenResult.poToken,
  };
}