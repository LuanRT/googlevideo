import type { CompositeBuffer } from './CompositeBuffer.js';

/**
 * A utility class for writing data in the UMP format.
 */
export class UmpWriter {
  constructor(
    private compositeBuffer: CompositeBuffer
  ) { }

  public write(type: number, data: Uint8Array): void {
    const partSize = data.length;
    this.writeVarInt(type);
    this.writeVarInt(partSize);
    this.compositeBuffer.append(data);
  }

  private writeVarInt(value: number): void {
    if (value < 0)
      throw new Error('VarInt value cannot be negative.');

    if (value < 128) {
      this.compositeBuffer.append(new Uint8Array([ value ]));
    } else if (value < 16384) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x3f) | 0x80,
        value >> 6
      ]));
    } else if (value < 2097152) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x1f) | 0xc0,
        (value >> 5) & 0xff,
        value >> 13
      ]));
    } else if (value < 268435456) {
      this.compositeBuffer.append(new Uint8Array([
        (value & 0x0f) | 0xe0,
        (value >> 4) & 0xff,
        (value >> 12) & 0xff,
        value >> 20
      ]));
    } else {
      const data = new Uint8Array(5);
      const view = new DataView(data.buffer);
      data[0] = 0xf0;
      view.setUint32(1, value, true);
      this.compositeBuffer.append(data);
    }
  }
}