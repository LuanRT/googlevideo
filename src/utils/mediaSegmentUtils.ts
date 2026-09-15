import { EMSG_BOX_TYPE, findBox, parseEmsgBody, parseHeaderBlock, EmsgSegmentMetadata } from './EmsgSegmentMetadata.js';

export function stripMp4Init(segment: Uint8Array): Uint8Array {
  const view = new DataView(segment.buffer, segment.byteOffset, segment.byteLength);
  let offset = 0;

  while (offset < segment.length - 8) {
    let size = view.getUint32(offset, false);

    const type = String.fromCharCode(
      segment[offset + 4],
      segment[offset + 5],
      segment[offset + 6],
      segment[offset + 7]
    );

    if (type === 'moof' || type === 'mdat') {
      return segment.subarray(offset);
    }

    if (size === 1) {
      if (offset + 16 > segment.length) {
        break;
      }
      size = Number(view.getBigUint64(offset + 8, false));
    } else if (size === 0) {
      // extends to the end of the seg
      break;
    }

    offset += size;
  }

  return segment;
}

export function stripWebmInit(segment: Uint8Array): Uint8Array {
  let offset = 0;

  while (offset < segment.length) {
    //#region Read Element ID
    let firstByte = segment[offset];
    let idLength = 1;
    let mask = 0x80;

    while (idLength <= 4 && !(firstByte & mask)) {
      idLength++;
      mask >>= 1;
    }

    if (idLength > 4 || offset + idLength >= segment.length) break;

    let id = 0;
    for (let i = 0; i < idLength; i++)
      id = (id * 256) + segment[offset + i];

    // Found Cluster ID
    if (id === 0x1F43B675)
      return segment.subarray(offset);

    offset += idLength;
    //#endregion

    //#region Read Element Size
    firstByte = segment[offset];
    let sizeLength = 1;
    mask = 0x80;

    while (sizeLength <= 8 && !(firstByte & mask)) {
      sizeLength++;
      mask >>= 1;
    }

    if (sizeLength > 8 || offset + sizeLength > segment.length) break;

    let size = firstByte & ~mask;
    let isUnknown = firstByte === (mask | (mask - 1));

    for (let i = 1; i < sizeLength; i++) {
      const b = segment[offset + i];
      size = (size * 256) + b;
      if (b !== 0xFF) isUnknown = false;
    }

    offset += sizeLength;
    //#endregion

    if (id === 0x18538067)
      continue;

    // Can't skip safely if size is unknown or it's not a seg
    if (isUnknown)
      break;

    offset += size;
  }

  return segment;
}

export function parseEmsgSegmentMetadata(buffer: Uint8Array): EmsgSegmentMetadata | undefined {
  const view = new DataView(buffer.buffer, buffer.byteOffset, buffer.byteLength);

  const firstBox = findBox(view, 0, EMSG_BOX_TYPE);
  if (!firstBox) return;

  const firstBody = parseEmsgBody(firstBox);
  
  let headers = parseHeaderBlock(firstBody.messageData);

  const secondBox = findBox(view, firstBox.offset + firstBox.size, EMSG_BOX_TYPE);
  if (secondBox) {
    const secondBody = parseEmsgBody(secondBox);
    const secondHeaders = parseHeaderBlock(secondBody.messageData);
    if (headers && secondHeaders) {
      headers = { ...headers, ...secondHeaders };
    }
  }

  if (headers)
    return new EmsgSegmentMetadata(headers, firstBody.schemeIdUri);
}