import type { CompositeBuffer } from './CompositeBuffer.js';

/**
 * A serialization module that encodes data into the UMP binary format with proper type and size encoding.
 */
export class UmpWriter {
  constructor(
    private compositeBuffer: CompositeBuffer
  ) { }

  /**
   * Writes a part to the buffer.
   * @param partType - The type of the part.
   * @param partData - The data of the part.
   */
  public write(partType: number, partData: Uint8Array): void {
    const partSize = partData.length;
    this.writeVarInt(partType);
    this.writeVarInt(partSize);
    this.compositeBuffer.append(partData);
  }

  /**
   * Writes a variable-length integer to the buffer.
   * @param value - The integer to write.
   */
  private writeVarInt(value: number): void {
    if (value < 0)
      throw new Error('VarInt value cannot be negative.');

    if (value < 128) {
      this.compositeBuffer.append(new Uint8Array([ value ]));
    } else if (value < 16384) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x3F) | 0x80,
        value >> 6
      ]));
    } else if (value < 2097152) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x1F) | 0xC0,
        (value >> 5) & 0xFF,
        value >> 13
      ]));
    } else if (value < 268435456) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x0F) | 0xE0,
        (value >> 4) & 0xFF,
        (value >> 12) & 0xFF,
        value >> 20
      ]));
    } else {
      const data = new Uint8Array(5);
      const view = new DataView(data.buffer);
      data[0] = 0xF0;
      view.setUint32(1, value, true);
      this.compositeBuffer.append(data);
    }
  }
}