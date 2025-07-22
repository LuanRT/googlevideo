import type { CompositeBuffer } from './CompositeBuffer.js';
import type { Part } from '../types/shared.js';

/**
 * A parser that efficiently processes chunked UMP binary data.
 */
export class UmpReader {
  constructor(private compositeBuffer: CompositeBuffer) { }

  /**
   * Parses parts from the buffer and calls the handler for each complete part.
   * @param handlePart - Function called with each complete part.
   * @returns Partial part if parsing is incomplete, undefined otherwise.
   */
  public read(handlePart: (part: Part) => void): Part | undefined {
    while (true) {
      let offset = 0;

      const [ partType, newOffset ] = this.readVarInt(offset);
      offset = newOffset;

      const [ partSize, finalOffset ] = this.readVarInt(offset);
      offset = finalOffset;

      if (partType < 0 || partSize < 0)
        break;

      if (!this.compositeBuffer.canReadBytes(offset, partSize)) {
        if (!this.compositeBuffer.canReadBytes(offset, 1))
          break;
        
        return {
          type: partType,
          size: partSize,
          data: this.compositeBuffer
        };
      }

      const splitResult = this.compositeBuffer.split(offset).remainingBuffer.split(partSize);
      offset = 0;

      handlePart({
        type: partType,
        size: partSize,
        data: splitResult.extractedBuffer
      });

      this.compositeBuffer = splitResult.remainingBuffer;
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
    if (this.compositeBuffer.canReadBytes(offset, 1)) {
      const firstByte = this.compositeBuffer.getUint8(offset);
      byteLength = firstByte < 128 ? 1 : firstByte < 192 ? 2 : firstByte < 224 ? 3 : firstByte < 240 ? 4 : 5;
    } else {
      byteLength = 0;
    }

    if (byteLength < 1 || !this.compositeBuffer.canReadBytes(offset, byteLength)) {
      return [ -1, offset ];
    }

    let value: number;

    // Now read it based on the length
    switch (byteLength) {
      case 1:
        value = this.compositeBuffer.getUint8(offset++);
        break;
      case 2: {
        const byte1 = this.compositeBuffer.getUint8(offset++);
        const byte2 = this.compositeBuffer.getUint8(offset++);
        value = (byte1 & 0x3f) + 64 * byte2;
        break;
      }
      case 3: {
        const byte1 = this.compositeBuffer.getUint8(offset++);
        const byte2 = this.compositeBuffer.getUint8(offset++);
        const byte3 = this.compositeBuffer.getUint8(offset++);
        value = (byte1 & 0x1f) + 32 * (byte2 + 256 * byte3);
        break;
      }
      case 4: {
        const byte1 = this.compositeBuffer.getUint8(offset++);
        const byte2 = this.compositeBuffer.getUint8(offset++);
        const byte3 = this.compositeBuffer.getUint8(offset++);
        const byte4 = this.compositeBuffer.getUint8(offset++);
        value = (byte1 & 0x0f) + 16 * (byte2 + 256 * (byte3 + 256 * byte4));
        break;
      }
      default: {
        const tempOffset = offset + 1;
        this.compositeBuffer.focus(tempOffset);

        if (this.canReadFromCurrentChunk(tempOffset, 4)) {
          value = this.getCurrentDataView().getUint32(tempOffset - this.compositeBuffer.currentChunkOffset, true);
        } else {
          const byte3 = this.compositeBuffer.getUint8(tempOffset + 2) + 256 * this.compositeBuffer.getUint8(tempOffset + 3);
          value =
            this.compositeBuffer.getUint8(tempOffset) +
            256 * (this.compositeBuffer.getUint8(tempOffset + 1) + 256 * byte3);
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
    return offset - this.compositeBuffer.currentChunkOffset + length <= this.compositeBuffer.chunks[this.compositeBuffer.currentChunkIndex].length;
  }

  /**
   * Gets a DataView of the current chunk, creating it if necessary.
   * @returns DataView for the current chunk.
   */
  public getCurrentDataView(): DataView {
    if (!this.compositeBuffer.currentDataView) {
      const currentChunk = this.compositeBuffer.chunks[this.compositeBuffer.currentChunkIndex];
      this.compositeBuffer.currentDataView = new DataView(currentChunk.buffer, currentChunk.byteOffset, currentChunk.length);
    }
    return this.compositeBuffer.currentDataView;
  }
}