import type { UMPPartId } from '../utils/Protos.js';
import { CompositeBuffer } from './CompositeBuffer.js';

export interface UmpReaderCallbacks {
  /**
   * Called when a complete UMP part is available.
   */
  onPart(type: UMPPartId, data: CompositeBuffer): void | Promise<void>
  /**
   * Only use this if you wish to handle partial UMP parts yourself.
   */
  onPartialPart?(type: UMPPartId, chunk: CompositeBuffer, offset: number, totalSize: number): boolean;
}

/**
 * An efficient UMP reader.
 * @NOTE
 * Based on https://gist.github.com/LuanRT/7c8c79fa558f2430f0b85b09f8a9d818
 */
export class UmpReader {
  private compositeBuffer: CompositeBuffer;

  private pendingType?: number;
  private pendingOffset?: number;
  private pendingTotalSize?: number;

  constructor(private callbacks: UmpReaderCallbacks) {
    this.compositeBuffer = new CompositeBuffer();
  }

  public async feed(chunk: Uint8Array | CompositeBuffer): Promise<void> {
    this.compositeBuffer.append(chunk);
    return this.parse();
  }

  private async parse(): Promise<void> {
    // Resume any previously interrupted partial payload block.
    if (this.pendingType !== undefined) {
      if (this.compositeBuffer.totalLength === 0) return;

      const needed = this.pendingTotalSize! - this.pendingOffset!;
      const split = this.compositeBuffer.split(needed);

      if (!this.callbacks.onPartialPart) return;
      if (!this.callbacks.onPartialPart(this.pendingType, split.extractedBuffer, this.pendingOffset!, this.pendingTotalSize!)) {
        return;
      }

      this.pendingOffset! += split.extractedBuffer.totalLength;
      this.compositeBuffer = split.remainingBuffer;

      if (this.pendingOffset === this.pendingTotalSize) {
        this.pendingType = undefined;
        this.pendingTotalSize = undefined;
        this.pendingOffset = undefined;
      }
    }

    while (true) {
      let offset = 0;

      const [ partType, newOffset ] = this.readVarInt(offset);
      offset = newOffset;
      const [ partSize, finalOffset ] = this.readVarInt(offset);
      offset = finalOffset;

      if (partType < 0 || partSize < 0) {
        break;
      }

      // If we don't have the full payload available...
      if (!this.compositeBuffer.canReadBytes(offset, partSize)) {
        // If we can't read at least 1 byte of payload or don't have a paartial handler, wait for more data.
        if (!(this.callbacks.onPartialPart && this.compositeBuffer.canReadBytes(offset, 1))) {
          break;
        }

        const remainingBuff = this.compositeBuffer.split(offset).remainingBuffer;

        if (this.callbacks.onPartialPart(partType, remainingBuff, 0, partSize)) {
          this.pendingType = partType;
          this.pendingOffset = remainingBuff.totalLength;
          this.pendingTotalSize = partSize;
          this.compositeBuffer = new CompositeBuffer();
        }
        break;
      }

      // Full payload available.
      const payloadStart = this.compositeBuffer.split(offset).remainingBuffer;
      const finalSplit = payloadStart.split(partSize);

      await this.callbacks.onPart(partType, finalSplit.extractedBuffer);

      this.compositeBuffer = finalSplit.remainingBuffer;
    }
  }

  /**
   * Reads a specific varint from the current buffer offset.
   * @returns [decodedValue, updatedOffset] or [-1, originalOffset] if incomplete.
   */
  public readVarInt(offset: number): [number, number] {
    if (!this.compositeBuffer.canReadBytes(offset, 1)) {
      return [ -1, offset ];
    }

    const firstByte = this.compositeBuffer.getUint8(offset);
    const byteLength = firstByte < 128 ? 1
      : firstByte < 192 ? 2
        : firstByte < 224 ? 3
          : firstByte < 240 ? 4
            : 5;

    if (!this.compositeBuffer.canReadBytes(offset, byteLength)) {
      return [ -1, offset ];
    }

    let value = 0;

    switch (byteLength) {
      case 1:
        value = this.compositeBuffer.getUint8(offset++);
        break;

      case 2: {
        const b1 = this.compositeBuffer.getUint8(offset++);
        const b2 = this.compositeBuffer.getUint8(offset++);
        value = (b1 & 0x3f) | (b2 << 6);
        break;
      }

      case 3: {
        const b1 = this.compositeBuffer.getUint8(offset++);
        const b2 = this.compositeBuffer.getUint8(offset++);
        const b3 = this.compositeBuffer.getUint8(offset++);
        value = (b1 & 0x1f) | (b2 << 5) | (b3 << 13);
        break;
      }

      case 4: {
        const b1 = this.compositeBuffer.getUint8(offset++);
        const b2 = this.compositeBuffer.getUint8(offset++);
        const b3 = this.compositeBuffer.getUint8(offset++);
        const b4 = this.compositeBuffer.getUint8(offset++);
        value = (b1 & 0x0f) | (b2 << 4) | (b3 << 12) | (b4 << 20);
        break;
      }

      default: {
        const dataOffset = offset + 1;
        this.compositeBuffer.focus(dataOffset);

        if (this.canReadFromCurrentChunk(dataOffset, 4)) {
          const relativeOffset = dataOffset - this.compositeBuffer.currentChunkOffset;
          value = this.getCurrentDataView().getUint32(relativeOffset, true);
        } else {
          const b1 = this.compositeBuffer.getUint8(dataOffset);
          const b2 = this.compositeBuffer.getUint8(dataOffset + 1);
          const b3 = this.compositeBuffer.getUint8(dataOffset + 2);
          const b4 = this.compositeBuffer.getUint8(dataOffset + 3);
          value = (b1 | (b2 << 8) | (b3 << 16) | (b4 << 24)) >>> 0;
        }
        offset += 5;
        break;
      }
    }

    return [ value, offset ];
  }

  /**
   * Checks if the specified bytes can be read from the current chunk.
   * @param offset - Position to start reading from.
   * @param length - Number of bytes to read.
   * @returns True if bytes can be read from current chunk, false otherwise.
   */
  public canReadFromCurrentChunk(offset: number, length: number): boolean {
    const activeChunk = this.compositeBuffer.chunks[this.compositeBuffer.currentChunkIndex];
    return offset - this.compositeBuffer.currentChunkOffset + length <= activeChunk.length;
  }

  /**
   * Gets a DataView of the current chunk, creating it if necessary.
   * @returns DataView for the current chunk.
   */
  public getCurrentDataView(): DataView {
    if (!this.compositeBuffer.currentDataView) {
      const currentChunk = this.compositeBuffer.chunks[this.compositeBuffer.currentChunkIndex];
      this.compositeBuffer.currentDataView = new DataView(
        currentChunk.buffer,
        currentChunk.byteOffset,
        currentChunk.length
      );
    }
    return this.compositeBuffer.currentDataView;
  }

  public dispose(): void {
    this.compositeBuffer = new CompositeBuffer();
  }
}