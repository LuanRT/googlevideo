export class CompositeBuffer {
  public chunks: Uint8Array[];
  public currentChunkOffset: number;
  public currentChunkIndex: number;
  public currentDataView?: DataView;
  public totalLength: number;

  constructor(chunks: Uint8Array[] = []) {
    this.chunks = [];
    this.currentChunkOffset = this.currentChunkIndex = 0;
    this.currentDataView = undefined;
    this.totalLength = 0;
    chunks.forEach((chunk) => {
      this.append(chunk);
    });
  }

  public append(chunk: Uint8Array | CompositeBuffer): void {
    if (chunk instanceof Uint8Array) {
      if (this.canMergeWithLastChunk(chunk)) {
        const lastChunk = this.chunks[this.chunks.length - 1];
        this.chunks[this.chunks.length - 1] = new Uint8Array(
          lastChunk.buffer,
          lastChunk.byteOffset,
          lastChunk.length + chunk.length
        );
        this.resetFocus();
      } else {
        this.chunks.push(chunk);
      }
      this.totalLength += chunk.length;
    } else {
      chunk.chunks.forEach((c) => this.append(c));
    }
  }

  public split(position: number): { extractedBuffer: CompositeBuffer; remainingBuffer: CompositeBuffer } {
    const extractedBuffer = new CompositeBuffer();
    const remainingBuffer = new CompositeBuffer();
    const iterator = this.chunks[Symbol.iterator]();
    let item = iterator.next();

    while (!item.done) {
      const chunk = item.value;
      if (position >= chunk.length) {
        extractedBuffer.append(chunk);
        position -= chunk.length;
      } else if (position > 0) {
        extractedBuffer.append(new Uint8Array(chunk.buffer, chunk.byteOffset, position));
        remainingBuffer.append(
          new Uint8Array(chunk.buffer, chunk.byteOffset + position, chunk.length - position)
        );
        position = 0;
      } else {
        remainingBuffer.append(chunk);
      }
      item = iterator.next();
    }

    return { extractedBuffer, remainingBuffer };
  }

  public getLength(): number {
    return this.totalLength;
  }

  public canReadBytes(position: number, length: number): boolean {
    return position + length <= this.totalLength;
  }

  public getUint8(position: number): number {
    this.focus(position);
    return this.chunks[this.currentChunkIndex][position - this.currentChunkOffset];
  }

  public focus(position: number): void {
    if (!this.isFocused(position)) {
      if (position < this.currentChunkOffset) this.resetFocus();

      while (
        this.currentChunkOffset + this.chunks[this.currentChunkIndex].length <= position &&
        this.currentChunkIndex < this.chunks.length - 1
      ) {
        this.currentChunkOffset += this.chunks[this.currentChunkIndex].length;
        this.currentChunkIndex += 1;
      }

      this.currentDataView = undefined;
    }
  }

  public isFocused(position: number): boolean {
    return (
      position >= this.currentChunkOffset &&
      position < this.currentChunkOffset + this.chunks[this.currentChunkIndex].length
    );
  }

  private resetFocus(): void {
    this.currentDataView = undefined;
    this.currentChunkIndex = 0;
    this.currentChunkOffset = 0;
  }

  private canMergeWithLastChunk(chunk: Uint8Array): boolean {
    if (this.chunks.length === 0) return false;
    const lastChunk = this.chunks[this.chunks.length - 1];
    return (
      lastChunk.buffer === chunk.buffer &&
      lastChunk.byteOffset + lastChunk.length === chunk.byteOffset
    );
  }
}