import type { Part } from '../index.js';
import type { ChunkedDataBuffer } from './ChunkedDataBuffer.js';

export class UMP {
  private chunkedDataBuffer: ChunkedDataBuffer;

  /**
   * Creates a new UMP parser.
   * @param chunkedDataBuffer - Buffer containing UMP format data.
   */
  constructor(chunkedDataBuffer: ChunkedDataBuffer) {
    this.chunkedDataBuffer = chunkedDataBuffer;
  }

  /**
   * Parses parts from the buffer and calls the handler for each complete part.
   * @param handlePart - Function called with each complete part.
   * @returns Partial part if parsing is incomplete, undefined otherwise.
   */
  public parse(handlePart: (part: Part) => void): Part | undefined {
    while (true) {
      let offset = 0;

      const [ partType, newOffset ] = this.readVarInt(offset);
      offset = newOffset;

      const [ partSize, finalOffset ] = this.readVarInt(offset);
      offset = finalOffset;

      if (partType < 0 || partSize < 0)
        break;

      if (!this.chunkedDataBuffer.canReadBytes(offset, partSize)) {
        if (!this.chunkedDataBuffer.canReadBytes(offset, 1))
          break;
        
        return {
          type: partType,
          size: partSize,
          data: this.chunkedDataBuffer
        };
      }

      const splitResult = this.chunkedDataBuffer.split(offset).remainingBuffer.split(partSize);
      offset = 0;

      handlePart({
        type: partType,
        size: partSize,
        data: splitResult.extractedBuffer
      });

      this.chunkedDataBuffer = splitResult.remainingBuffer;
    }
  }

  /**
   * Reads a variable-length integer from the buffer.
   * @param offset - Position to start reading from.
   * @returns Tuple of [value, new offset] or [-1, offset] if incomplete.
   */
  public readVarInt(offset: number): [number, number] {
    let byteLength: number;

    // Determine the length of the val
    if (this.chunkedDataBuffer.canReadBytes(offset, 1)) {
      const firstByte = this.chunkedDataBuffer.getUint8(offset);
      byteLength = firstByte < 128 ? 1 : firstByte < 192 ? 2 : firstByte < 224 ? 3 : firstByte < 240 ? 4 : 5;
    } else {
      byteLength = 0;
    }

    if (byteLength < 1 || !this.chunkedDataBuffer.canReadBytes(offset, byteLength)) {
      return [ -1, offset ];
    }

    let value: number;

    // Now read it based on the length
    switch (byteLength) {
      case 1:
        value = this.chunkedDataBuffer.getUint8(offset++);
        break;
      case 2: {
        const byte1 = this.chunkedDataBuffer.getUint8(offset++);
        const byte2 = this.chunkedDataBuffer.getUint8(offset++);
        value = (byte1 & 0x3f) + 64 * byte2;
        break;
      }
      case 3: {
        const byte1 = this.chunkedDataBuffer.getUint8(offset++);
        const byte2 = this.chunkedDataBuffer.getUint8(offset++);
        const byte3 = this.chunkedDataBuffer.getUint8(offset++);
        value = (byte1 & 0x1f) + 32 * (byte2 + 256 * byte3);
        break;
      }
      case 4: {
        const byte1 = this.chunkedDataBuffer.getUint8(offset++);
        const byte2 = this.chunkedDataBuffer.getUint8(offset++);
        const byte3 = this.chunkedDataBuffer.getUint8(offset++);
        const byte4 = this.chunkedDataBuffer.getUint8(offset++);
        value = (byte1 & 0x0f) + 16 * (byte2 + 256 * (byte3 + 256 * byte4));
        break;
      }
      default: {
        const tempOffset = offset + 1;
        this.chunkedDataBuffer.focus(tempOffset);

        if (this.canReadFromCurrentChunk(tempOffset, 4)) {
          value = this.getCurrentDataView().getUint32(tempOffset - this.chunkedDataBuffer.currentChunkOffset, true);
        } else {
          const byte3 = this.chunkedDataBuffer.getUint8(tempOffset + 2) + 256 * this.chunkedDataBuffer.getUint8(tempOffset + 3);
          value =
            this.chunkedDataBuffer.getUint8(tempOffset) +
            256 * (this.chunkedDataBuffer.getUint8(tempOffset + 1) + 256 * byte3);
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
    return offset - this.chunkedDataBuffer.currentChunkOffset + length <= this.chunkedDataBuffer.chunks[this.chunkedDataBuffer.currentChunkIndex].length;
  }

  /**
   * Gets a DataView of the current chunk, creating it if necessary.
   * @returns DataView for the current chunk.
   */
  public getCurrentDataView(): DataView {
    if (!this.chunkedDataBuffer.currentDataView) {
      const currentChunk = this.chunkedDataBuffer.chunks[this.chunkedDataBuffer.currentChunkIndex];
      this.chunkedDataBuffer.currentDataView = new DataView(currentChunk.buffer, currentChunk.byteOffset, currentChunk.length);
    }
    return this.chunkedDataBuffer.currentDataView;
  }
}