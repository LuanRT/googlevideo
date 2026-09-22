/**
 * A memory efficient buffer that manages discontinuous chunks as a single stream.
 * @NOTE
 * Based on https://gist.github.com/LuanRT/02d7eab589fb4080cd16e97f6dccf06f
 */
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

    for (const chunk of chunks)
      this.append(chunk);
  }

  /**
   * Appends a chunk or all chunks from another {@link CompositeBuffer} to this buffer.
   * Chunks using the same `ArrayBuffer` are merged into a single `Uint8Array` to reduce memory usage and keep the number of chunks low.
   * @param data - A `Uint8Array` to append, or another `CompositeBuffer` whose chunks will be appended individually.
   */
  public append(data: Uint8Array | CompositeBuffer): void {
    if (data instanceof Uint8Array) {
      if (this.canMergeWithLastChunk(data)) {
        const lastChunk = this.chunks[this.chunks.length - 1];
        this.chunks[this.chunks.length - 1] = new Uint8Array(
          lastChunk.buffer,
          lastChunk.byteOffset,
          lastChunk.length + data.length
        );
        this.resetFocus();
      } else this.chunks.push(data);
      this.totalLength += data.length;
    } else {
      for (const chunk of data.chunks)
        this.append(chunk);
    }
  }

  /**
   * Splits this buffer at a specified position.
   * @param position - Offset at which to split the buffer.
   * @returns Obj containing the bytes before `position` as `extractedBuffer` and the bytes from `position` onward as `remainingBuffer`.
   */
  public split(position: number): { extractedBuffer: CompositeBuffer; remainingBuffer: CompositeBuffer } {
    const extractedBuffer = new CompositeBuffer();
    const remainingBuffer = new CompositeBuffer();

    for (const chunk of this.chunks) {
      if (position >= chunk.length) {
        extractedBuffer.append(chunk);
        position -= chunk.length;
      } else if (position > 0) {
        extractedBuffer.append(new Uint8Array(chunk.buffer, chunk.byteOffset, position));
        remainingBuffer.append(
          new Uint8Array(chunk.buffer, chunk.byteOffset + position, chunk.length - position)
        );
        position = 0;
      } else remainingBuffer.append(chunk);
    }

    return { extractedBuffer, remainingBuffer };
  }

  public getLength(): number {
    return this.totalLength;
  }

  public canReadBytes(position: number, length: number): boolean {
    return position + length <= this.totalLength;
  }

  /**
   * Reads a single unsigned byte at the given position.
   */
  public getUint8(position: number): number {
    this.focus(position);
    return this.chunks[this.currentChunkIndex][position - this.currentChunkOffset];
  }

  /**
   * Moves the internal focus to the chunk containing the specified position.
   * If the position is before the currently focused chunk, focus is reset first.
   * Cached `currentDataView` is also invalidated.
   */
  public focus(position: number): void {
    if (!this.isFocused(position)) {
      for (position < this.currentChunkOffset && this.resetFocus();
        this.currentChunkOffset + this.chunks[this.currentChunkIndex].length <= position &&
        this.currentChunkIndex < this.chunks.length;
      ) {
        this.currentChunkOffset += this.chunks[this.currentChunkIndex].length;
        this.currentChunkIndex += 1;
      }

      this.currentDataView = undefined;
    }
  }

  /**
   * Checks whether the internal focus already covers the specified position.
   * @returns `true` if `position` is within the currently focused chunk.
   */
  public isFocused(position: number): boolean {
    return (
      position >= this.currentChunkOffset &&
      position < this.currentChunkOffset + this.chunks[this.currentChunkIndex].length
    );
  }

  /**
   * Resets the internal focus to the beginning of the buffer.
   */
  private resetFocus(): void {
    this.currentDataView = undefined;
    this.currentChunkIndex = 0;
    this.currentChunkOffset = 0;
  }

  /**
   * Determines whether the given chunk can be merged with the last chunk.
   * Merging is possible when both reference the same buffer and the
   * new chunk starts exactly where the current last chunk ends.
   */
  private canMergeWithLastChunk(chunk: Uint8Array): boolean {
    if (this.chunks.length === 0) return false;
    const lastChunk = this.chunks[this.chunks.length - 1];
    return (
      lastChunk.buffer === chunk.buffer &&
      lastChunk.byteOffset + lastChunk.length === chunk.byteOffset
    );
  }
}