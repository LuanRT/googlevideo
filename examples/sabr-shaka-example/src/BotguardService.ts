import { fetchFunction } from './helpers.js';
import type { DescrambledChallenge, WebPoSignalOutput } from 'bgutils-js';
import { BG, buildURL, GOOG_API_KEY } from 'bgutils-js';

export class BotguardService {
  private readonly waaRequestKey = 'O43z0dpjhgX20SCx4KAo';

  public botguardClient?: BG.BotGuardClient;
  public initializationPromise?: Promise<BG.BotGuardClient | undefined> | null = null;
  public integrityTokenBasedMinter?: BG.WebPoMinter;
  public bgChallenge?: DescrambledChallenge & { challenge?: string, interpreterUrl?: string };

  async init() {
    if (this.initializationPromise) {
      return await this.initializationPromise;
    }

    return this.setup();
  }

  private async setup() {
    if (this.initializationPromise)
      return await this.initializationPromise;

    this.initializationPromise = this._initBotguard();

    try {
      this.botguardClient = await this.initializationPromise;
      return this.botguardClient;
    } finally {
      this.initializationPromise = null;
    }
  }

  private async _initBotguard() {
    const challengeResponse = await fetch(buildURL('Create', true), {
      method: 'POST',
      headers: {
        'content-type': 'application/json+protobuf',
        'x-goog-api-key': GOOG_API_KEY,
        'x-user-agent': 'grpc-web-javascript/0.1'
      },
      body: JSON.stringify([ this.waaRequestKey ])
    });

    const challengeResponseData = await challengeResponse.json();
    this.bgChallenge = BG.Challenge.parseChallengeData(challengeResponseData);

    if (!this.bgChallenge)
      return;

    const interpreterJavascript = this.bgChallenge.interpreterJavascript.privateDoNotAccessOrElseSafeScriptWrappedValue;

    if (!interpreterJavascript) {
      console.error('[BotguardService]', 'Could not get interpreter javascript. Interpreter Hash:', this.bgChallenge.interpreterHash);
      return;
    }

    if (!document.getElementById(this.bgChallenge.interpreterHash)) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.id = this.bgChallenge.interpreterHash;
      script.textContent = interpreterJavascript;
      document.head.appendChild(script);
    }

    this.botguardClient = await BG.BotGuardClient.create({
      globalObj: globalThis,
      globalName: this.bgChallenge.globalName,
      program: this.bgChallenge.program
    });

    if (this.bgChallenge) {
      const webPoSignalOutput: WebPoSignalOutput = [];
      const botguardResponse = await this.botguardClient.snapshot({ webPoSignalOutput });

      const integrityTokenResponse = await fetchFunction(buildURL('GenerateIT', true), {
        method: 'POST',
        headers: {
          'content-type': 'application/json+protobuf',
          'x-goog-api-key': GOOG_API_KEY,
          'x-user-agent': 'grpc-web-javacript/0.1'
        },
        body: JSON.stringify([ this.waaRequestKey, botguardResponse ])
      });

      const integrityTokenResponseData = await integrityTokenResponse.json();
      const integrityToken = integrityTokenResponseData[0] as string | undefined;

      if (!integrityToken) {
        console.error('[BotguardService]', 'Could not get integrity token. Interpreter Hash:', this.bgChallenge.interpreterHash);
        return;
      }

      this.integrityTokenBasedMinter = await BG.WebPoMinter.create({ integrityToken }, webPoSignalOutput);
    }

    return this.botguardClient;
  }

  public mintColdStartToken(contentBinding: string) {
    return BG.PoToken.generateColdStartToken(contentBinding);
  }

  public isInitialized() {
    return !!this.botguardClient && !!this.integrityTokenBasedMinter;
  }

  public dispose() {
    if (this.botguardClient && this.bgChallenge) {
      this.botguardClient.shutdown();
      this.botguardClient = undefined;
      this.integrityTokenBasedMinter = undefined;

      const script = document.getElementById(this.bgChallenge.interpreterHash);
      if (script) {
        script.remove();
      }
    }
  }

  public async reinit() {
    if (this.initializationPromise)
      return this.initializationPromise;
    this.dispose();
    return this.setup();
  }
}

export const botguardService = new BotguardService();