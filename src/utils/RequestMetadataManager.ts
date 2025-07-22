import type { SabrRequestMetadata } from '../types/sabrStreamingAdapterTypes.js';

/**
 * Manages request metadata objects.
 */
export class RequestMetadataManager {
  public metadataMap: Map<string, SabrRequestMetadata>;
  private lastCleanup: number;
  private readonly CLEANUP_INTERVAL = 30000;
  private readonly ENTRY_EXPIRATION_TIME = 1000 * 60 * 3;

  constructor() {
    this.metadataMap = new Map<string, SabrRequestMetadata>();
    this.lastCleanup = Date.now();
  }

  public getRequestMetadata(url: string, del = false): SabrRequestMetadata | undefined {
    const requestNumber = new URL(url).searchParams.get('rn') || '';

    const streamingContext = this.metadataMap.get(requestNumber);

    // Check if this specific entry is expired.
    if (streamingContext && Date.now() - streamingContext.timestamp > this.ENTRY_EXPIRATION_TIME) {
      this.metadataMap.delete(requestNumber);
      return undefined;
    }

    if (del) {
      this.metadataMap.delete(requestNumber);
    }

    this.conditionalCleanUp();

    return streamingContext;
  }

  public setRequestMetadata(url: string, context: SabrRequestMetadata) {
    const requestNumber = new URL(url).searchParams.get('rn');
    if (requestNumber) {
      this.metadataMap.set(requestNumber, context);
      this.conditionalCleanUp();
    }
  }

  private conditionalCleanUp() {
    const now = Date.now();
    if (now - this.lastCleanup > this.CLEANUP_INTERVAL) {
      this.cleanUp();
      this.lastCleanup = now;
    }
  }

  private cleanUp() {
    // Should rarely run. This is only for requests that fail and never get handled (e.g., network errors).
    for (const [ key, context ] of this.metadataMap.entries()) {
      if (Date.now() - context.timestamp > this.ENTRY_EXPIRATION_TIME) {
        this.metadataMap.delete(key);
      }
    }
  }
}
