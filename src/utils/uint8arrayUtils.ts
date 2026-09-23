export function u8ToBase64(u8: Uint8Array): string {
  return btoa(String.fromCharCode.apply(null, Array.from(u8)));
}

export function base64ToU8(base64: string): Uint8Array {
  const standardBase64 = base64.replace(/-/g, '+').replace(/_/g, '/');
  const paddedBase64 = standardBase64.padEnd(standardBase64.length + (4 - standardBase64.length % 4) % 4, '=');
  return new Uint8Array(atob(paddedBase64).split('').map((char) => char.charCodeAt(0)));
}

export function concatenateChunks(chunks: Uint8Array[]): Uint8Array {
  let totalLength = 0;

  const chunkCount = chunks.length;

  for (let i = 0; i < chunkCount; i++)
    totalLength += chunks[i].length;

  const result = new Uint8Array(totalLength);

  let offset = 0;

  for (let i = 0; i < chunkCount; i++) {
    const chunk = chunks[i];
    result.set(chunk, offset);
    offset += chunk.length;
  }

  return result;
}

export function decodePart<T>(chunks: Uint8Array[], decoder: { decode: (data: Uint8Array) => T }): T | undefined {
  if (!chunks.length)
    return undefined;

  try {
    return decoder.decode(concatenateChunks(chunks));
  } catch {
    return undefined;
  }
}