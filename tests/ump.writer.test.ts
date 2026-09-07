import { describe, it, expect } from 'vitest';

import { concatenateChunks } from '../src/utils/uint8arrayUtils.js';
import { CompositeBuffer, UmpWriter } from '../src/exports/ump.js';

describe('UmpWriter', () => {
  it.each([
    [ 1, [ 1 ] ],
    [ 150, [ 0x96, 0x02 ] ],
    [ 20_000, [ 0xc0, 0x71, 0x02 ] ],
    [ 10_000_000, [ 0xe0, 0x68, 0x89, 0x09 ] ],
    [ 300_000_000, [ 0xf0, 0x00, 0xa3, 0xe1, 0x11 ] ]
  ])('should encode a %i-byte VarInt part type', (partType, encodedType) => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    writer.write(partType, new Uint8Array([ 42 ]));

    expect(concatenateChunks(buffer.chunks)).toEqual(
      new Uint8Array([ ...encodedType, 1, 42 ])
    );
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