export function stripMp4Init(segment: Uint8Array, isFirstSegment: boolean): Uint8Array {
  if (isFirstSegment) return segment;

  const view = new DataView(segment.buffer, segment.byteOffset, segment.byteLength);
  let offset = 0;

  while (offset < segment.length - 8) {
    const size = view.getUint32(offset, false);

    const type = String.fromCharCode(
      segment[offset + 4],
      segment[offset + 5],
      segment[offset + 6],
      segment[offset + 7]
    );

    if (type === 'moof' || type === 'mdat') {
      return segment.subarray(offset);
    }

    if (size === 0) break;

    offset += size;
  }

  return segment;
}

export function stripWebmInit(segment: Uint8Array, isFirstSegment: boolean): Uint8Array {
  if (isFirstSegment) return segment;

  for (let i = 0; i < segment.length - 3; i++) {
    if (
      segment[i] === 0x1F &&
      segment[i + 1] === 0x43 &&
      segment[i + 2] === 0xB6 &&
      segment[i + 3] === 0x75
    ) {
      return segment.subarray(i);
    }
  }

  return segment;
}