import { describe, it, expect, vi } from 'vitest';

import { concatenateChunks } from '../src/utils/uint8arrayUtils.js';
import { CompositeBuffer, UmpReader, UmpWriter } from '../src/exports/ump.js';
import type { UMPPartId } from '../src/utils/Protos.js';

describe('UmpReader', () => {
  it('should read a single small part correctly', async () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 1;
    const partData = new Uint8Array([ 10, 20, 30 ]);
    writer.write(partType, partData);

    const onPart = vi.fn();

    const reader = new UmpReader({ onPart });

    await reader.feed(buffer);

    expect(onPart).toHaveBeenCalledOnce();
    const [ receivedPartType, receivedPartData ] = onPart.mock.calls[0];
    expect(receivedPartType).toBe(partType);
    expect(receivedPartData.getLength()).toBe(partData.length);
    expect(concatenateChunks(receivedPartData.chunks)).toEqual(partData);
  });

  it('should read multiple parts sequentially', async () => {
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

    const onPart = vi.fn();
    const reader = new UmpReader({ onPart });

    await reader.feed(buffer);

    expect(onPart).toHaveBeenCalledTimes(partsToWrite.length);

    for (let i = 0; i < partsToWrite.length; i++) {
      const [ type, data ] = onPart.mock.calls[i];
      expect(type).toBe(partsToWrite[i].type);
      expect(data.getLength()).toBe(partsToWrite[i].data.length);
      expect(concatenateChunks(data.chunks)).toEqual(partsToWrite[i].data);
    }
  });

  it('should buffer incomplete payloads until they are complete', async () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 5;
    const partData = new Uint8Array(100).fill(42);
    writer.write(partType, partData);

    const headerSize = 2;
    const firstChunk = buffer.split(headerSize + 50);
    const onPart = vi.fn();

    const reader = new UmpReader({ onPart });

    await reader.feed(firstChunk.extractedBuffer);
    expect(onPart).not.toHaveBeenCalled();

    await reader.feed(firstChunk.remainingBuffer);
    expect(onPart).toHaveBeenCalledOnce();
    const [ receivedPartType, receivedPartData ] = onPart.mock.calls[0];
    expect(receivedPartType).toBe(partType);
    expect(concatenateChunks(receivedPartData.chunks)).toEqual(partData);
  });

  it('should wait for an incomplete header', async () => {
    const onPart = vi.fn();
    const reader = new UmpReader({ onPart });

    await reader.feed(new Uint8Array());
    await reader.feed(new Uint8Array([ 0x96 ]));
    expect(onPart).not.toHaveBeenCalled();

    await reader.feed(new Uint8Array([ 0x02, 1, 42 ]));
    expect(onPart).toHaveBeenCalledOnce();
    const [ type, data ] = onPart.mock.calls[0];
    expect(type).toBe(150);
    expect(concatenateChunks(data.chunks)).toEqual(new Uint8Array([ 42 ]));
  });

  it('should report a partial part with a 5-byte VarInt size', async () => {
    const onPartialPart = vi.fn<(type: UMPPartId, data: CompositeBuffer, offset: number, totalSize: number) => boolean>(() => false);
    const reader = new UmpReader({
      onPart: vi.fn(),
      onPartialPart
    });

    await reader.feed(new Uint8Array([ 15, 0xF0, 0x00, 0xA3, 0xE1, 0x11, 42 ]));

    expect(onPartialPart).toHaveBeenCalledOnce();
    const [ type, data, offset, totalSize ] = onPartialPart.mock.calls[0];
    expect(type).toBe(15);
    expect(concatenateChunks(data.chunks)).toEqual(new Uint8Array([ 42 ]));
    expect(offset).toBe(0);
    expect(totalSize).toBe(300000000);
  });

  it('should handle reading from multiple chunks', async () => {
    const buffer = new CompositeBuffer();
    const writer = new UmpWriter(buffer);

    const partType = 1;
    const partData = new Uint8Array([ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]);
    writer.write(partType, partData);

    // Re-create the buffer from multiple smaller chunks.
    const chunk1 = new Uint8Array([ 1, 10, 1, 2, 3 ]); // type, size, data...
    const chunk2 = new Uint8Array([ 4, 5, 6 ]); // ...data...
    const chunk3 = new Uint8Array([ 7, 8, 9, 10 ]); // ...data
    const compositeBuffer = new CompositeBuffer([ chunk1, chunk2, chunk3 ]);

    const onPart = vi.fn();
    const reader = new UmpReader({ onPart });

    await reader.feed(compositeBuffer);

    expect(onPart).toHaveBeenCalledOnce();
    const receivedPartType = onPart.mock.calls[0][0];
    const receivedPartData = onPart.mock.calls[0][1];

    expect(receivedPartType).toBe(partType);
    expect(receivedPartData.getLength()).toBe(partData.length);
    expect(concatenateChunks(receivedPartData.chunks)).toEqual(partData);
  });
});