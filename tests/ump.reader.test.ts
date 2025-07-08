import { describe, it, expect, vi } from 'vitest';

import { concatenateChunks } from '../src/utils/index.js';
import { Part } from '../src/types/shared.js';
import { CompositeBuffer, UmpReader, UmpWriter } from '../src/exports/ump.js';


describe('UmpReader', () => {
  it('should read a single small part correctly', () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 1;
    const partData = new Uint8Array([ 10, 20, 30 ]);
    writer.write(partType, partData);

    const reader = new UmpReader(buffer);
    const handlePart = vi.fn();

    const incompletePart = reader.read(handlePart);
    const receivedPart = handlePart.mock.calls[0][0];

    expect(handlePart).toHaveBeenCalledOnce();
    expect(receivedPart.type).toBe(partType);
    expect(receivedPart.size).toBe(partData.length);
    expect(concatenateChunks(receivedPart.data.chunks)).toEqual(partData);
    expect(incompletePart).toBeUndefined();
  });

  it('should read multiple parts sequentially', () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partsToWrite = [
      { type: 20, data: new Uint8Array([ 1, 2 ]) },
      { type: 21, data: new Uint8Array([ 3, 4, 5 ]) },
      { type: 150, data: new Uint8Array([ 6, 7, 8, 9 ]) }
    ];

    for (const part of partsToWrite) {
      writer.write(part.type, part.data);
    }

    const reader = new UmpReader(buffer);
    const receivedParts: Part[] = [];
    
    const handlePart = (part: Part) => {
      receivedParts.push(part);
    };

    const incompletePart = reader.read(handlePart);

    expect(receivedParts.length).toBe(partsToWrite.length);

    for (let i = 0; i < partsToWrite.length; i++) {
      expect(receivedParts[i].type).toBe(partsToWrite[i].type);
      expect(receivedParts[i].size).toBe(partsToWrite[i].data.length);
      expect(concatenateChunks(receivedParts[i].data.chunks)).toEqual(partsToWrite[i].data);
    }

    expect(incompletePart).toBeUndefined();
  });

  it('should return an incomplete part if data is not fully available', () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 5;
    const partData = new Uint8Array(100);
    writer.write(partType, partData);

    const headerSize = 2;
    const partialBuffer = buffer.split(headerSize + 50).extractedBuffer;

    const reader = new UmpReader(partialBuffer);
    const handlePart = vi.fn();

    const incompletePart = reader.read(handlePart);

    expect(handlePart).not.toHaveBeenCalled();
    expect(incompletePart).toBeDefined();
    expect(incompletePart?.type).toBe(partType);
    expect(incompletePart?.size).toBe(partData.length);
  });

  it('should return undefined if the buffer is empty', () => {
    const buffer = new CompositeBuffer();
    const reader = new UmpReader(buffer);
    const handlePart = vi.fn();

    const incompletePart = reader.read(handlePart);

    expect(handlePart).not.toHaveBeenCalled();
    expect(incompletePart).toBeUndefined();
  });

  it('should return undefined if part header is incomplete', () => {
    const buffer = new CompositeBuffer();
    buffer.append(new Uint8Array([ 0x96 ]));

    const reader = new UmpReader(buffer);
    const handlePart = vi.fn();

    const incompletePart = reader.read(handlePart);

    expect(handlePart).not.toHaveBeenCalled();
    expect(incompletePart).toBeUndefined();
  });

  it('should correctly read a part with a 5-byte VarInt size', () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 15;
    const partData = new Uint8Array(300000000);
    writer.write(partType, partData);

    const reader = new UmpReader(buffer);
    const handlePart = vi.fn();

    const incompletePart = reader.read(handlePart);

    expect(handlePart).toHaveBeenCalledOnce();
    const receivedPart = handlePart.mock.calls[0][0];

    expect(receivedPart.type).toBe(partType);
    expect(receivedPart.size).toBe(partData.length);
    expect(incompletePart).toBeUndefined();
  });

  it('should handle reading from multiple chunks', () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 1;
    const partData = new Uint8Array([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]);
    writer.write(partType, partData);

    // Re-create the buffer from multiple smaller chunks.
    const chunk1 = new Uint8Array([ 1, 10, 1, 2, 3 ]); // type, size, data...
    const chunk2 = new Uint8Array([ 4, 5, 6 ]); // ...data...
    const chunk3 = new Uint8Array([ 7, 8, 9, 10 ]); // ...data
    const chunkedBuffer = new CompositeBuffer([ chunk1, chunk2, chunk3 ]);

    const reader = new UmpReader(chunkedBuffer);
    const handlePart = vi.fn();

    reader.read(handlePart);

    expect(handlePart).toHaveBeenCalledOnce();
    const receivedPart = handlePart.mock.calls[0][0];

    expect(receivedPart.type).toBe(partType);
    expect(receivedPart.size).toBe(partData.length);
    expect(concatenateChunks(receivedPart.data.chunks)).toEqual(partData);
  });
});