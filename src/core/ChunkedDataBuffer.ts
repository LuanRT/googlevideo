export class ChunkedDataBuffer {
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

  getLength(): number {
    return this.totalLength;
  }

  append(chunk: Uint8Array): void {
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
  }

  split(position: number): { extractedBuffer: ChunkedDataBuffer; remainingBuffer: ChunkedDataBuffer } {
    const extractedBuffer = new ChunkedDataBuffer();
    const remainingBuffer = new ChunkedDataBuffer();
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

  isFocused(position: number): boolean {
    return position >= this.currentChunkOffset && position < this.currentChunkOffset + this.chunks[this.currentChunkIndex].length;
  }

  focus(position: number): void {
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

  canReadBytes(position: number, length: number): boolean {
    return position + length <= this.totalLength;
  }

  getUint8(position: number): number {
    this.focus(position);
    return this.chunks[this.currentChunkIndex][position - this.currentChunkOffset];
  }

  private canMergeWithLastChunk(chunk: Uint8Array): boolean {
    if (this.chunks.length === 0) return false;
    const lastChunk = this.chunks[this.chunks.length - 1];
    return (
      lastChunk.buffer === chunk.buffer &&
      lastChunk.byteOffset + lastChunk.length === chunk.byteOffset
    );
  }

  private resetFocus(): void {
    this.currentDataView = undefined;
    this.currentChunkIndex = 0;
    this.currentChunkOffset = 0;
  }
}