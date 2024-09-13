import type { Part } from '../index.js';
import type { ChunkedDataBuffer } from './ChunkedDataBuffer.js';

export class UMP {
  private chunkedDataBuffer: ChunkedDataBuffer;

  constructor(chunkedDataBuffer: ChunkedDataBuffer) {
    this.chunkedDataBuffer = chunkedDataBuffer;
  }

  public parse(handlePart: (part: Part) => void) {
    while (true) {
      let offset = 0;

      const [ partType, newOffset ] = this.readVarInt(offset);
      offset = newOffset;

      const [ partSize, finalOffset ] = this.readVarInt(offset);
      offset = finalOffset;

      if (partType < 0 || partSize < 0)
        break;

      // Note that we don't handle cases like this YET..
      if (!this.chunkedDataBuffer.canReadBytes(offset, partSize))
        break;

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

  public readVarInt(offset: number): [ number, number ] {
    let byteLength: number;

    if (this.chunkedDataBuffer.canReadBytes(offset, 1)) {
      const firstByte = this.chunkedDataBuffer.getUint8(offset);

      // Determine the length of the val
      if (firstByte < 128) {
        byteLength = 1;
      } else if (firstByte < 192) {
        byteLength = 2;
      } else if (firstByte < 224) {
        byteLength = 3;
      } else if (firstByte < 240) {
        byteLength = 4;
      } else {
        byteLength = 5;
      }
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

  public canReadFromCurrentChunk(offset: number, length: number): boolean {
    this.chunkedDataBuffer.isFocused(offset);
    return offset - this.chunkedDataBuffer.currentChunkOffset + length <= this.chunkedDataBuffer.chunks[this.chunkedDataBuffer.currentChunkIndex].length;
  }

  public getCurrentDataView(): DataView {
    if (!this.chunkedDataBuffer.currentDataView) {
      const currentChunk = this.chunkedDataBuffer.chunks[this.chunkedDataBuffer.currentChunkIndex];
      this.chunkedDataBuffer.currentDataView = new DataView(currentChunk.buffer, currentChunk.byteOffset, currentChunk.length);
    }
    return this.chunkedDataBuffer.currentDataView;
  }
}