import { describe, it, expect } from 'vitest';

import { concatenateChunks } from '../src/utils/shared.js';
import { CompositeBuffer, UmpWriter } from '../src/exports/ump.js';

describe('UmpWriter', () => {
  it('should write a small part correctly', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);
   
    const partData = new Uint8Array([ 10, 20, 30 ]);
    umpWriter.write(1, partData);

    const expected = new Uint8Array([
      1, // part type.
      3, // part size.
      10, 20, 30 // the data.
    ]);

    expect(concatenateChunks(buffer.chunks)).toEqual(expected);
  });

  it('should handle a part type that requires 2-byte VarInt', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);
    
    const partData = new Uint8Array([ 1, 2 ]);
    umpWriter.write(150, partData);

    const expected = new Uint8Array([
      0x96, 0x02,
      2,
      1, 2
    ]);
    
    expect(concatenateChunks(buffer.chunks)).toEqual(expected);
  });

  it('should handle a part size that requires 3-byte VarInt', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    const partData = new Uint8Array(20000);
    umpWriter.write(5, partData);

    const expectedHeader = new Uint8Array([
      5, 
      0xC0, 0x71, 0x02 
    ]);

    expect(concatenateChunks(buffer.split(4).extractedBuffer.chunks)).toEqual(expectedHeader);
    expect(buffer.getLength()).toBe(4 + partData.length);
  });

  it('should handle a part size that requires 4-byte VarInt', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    const partData = new Uint8Array(10000000);
    umpWriter.write(10, partData);

    const expectedHeader = new Uint8Array([
      10,
      0xE0, 0x68, 0x89, 0x09 
    ]);

    expect(concatenateChunks(buffer.split(5).extractedBuffer.chunks)).toEqual(expectedHeader);
    expect(buffer.getLength()).toBe(5 + partData.length);
  });

  it('should handle a part size that requires 5-byte VarInt', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    const partData = new Uint8Array(300000000);
    umpWriter.write(15, partData);

    const expectedHeader = new Uint8Array([
      15, 
      0xF0, 0x00, 0xA3, 0xE1, 0x11 
    ]);

    expect(concatenateChunks(buffer.split(6).extractedBuffer.chunks)).toEqual(expectedHeader);
    expect(buffer.getLength()).toBe(6 + partData.length);
  });

  it('should write multiple parts sequentially', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);

    const partType1 = 1;
    const partData1 = new Uint8Array([ 1, 2 ]);
    umpWriter.write(partType1, partData1);

    const partType2 = 2;
    const partData2 = new Uint8Array([ 3, 4, 5 ]);
    umpWriter.write(partType2, partData2);
    
    const partType3 = 3;
    const partData3 = new Uint8Array([ 6, 7, 8, 9 ]);
    umpWriter.write(partType3, partData3);

    const expected = new Uint8Array([
      // Part 1
      1,
      2,
      1, 2,
      // Part 2
      2,
      3,
      3, 4, 5,
      // Part 3
      3,
      4,
      6, 7, 8, 9
    ]);

    expect(concatenateChunks(buffer.chunks)).toEqual(expected);
  });

  it('should throw an error for negative VarInt value', () => {
    const buffer = new CompositeBuffer();
    const umpWriter = new UmpWriter(buffer);
    expect(() => umpWriter.write(-1, new Uint8Array())).toThrow('VarInt value cannot be negative.');
  });
});