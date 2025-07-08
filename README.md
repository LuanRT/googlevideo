# GoogleVideo
[![JSR](https://jsr.io/badges/@luanrt/googlevideo)](https://jsr.io/@luanrt/googlevideo)
[![NPM](https://img.shields.io/npm/v/googlevideo)](https://www.npmjs.com/package/googlevideo)
[![License](https://img.shields.io/github/license/LuanRT/googlevideo)](./LICENSE)

A collection of modules for working with YouTube's proprietary video streaming protocols (UMP/SABR). It can be used to build clients or to integrate with existing media players (e.g., [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)).

#### UMP:
* [UmpReader](src/core/UmpReader.ts) - A parser that efficiently processes chunked UMP binary data.
* [UmpWriter](src/core/UmpWriter.ts) - A serialization module that encodes data into the UMP binary format with proper type and size encoding.
* [CompositeBuffer](src/core/CompositeBuffer.ts) - A memory-efficient buffer abstraction that manages discontinuous chunks as a logical continuous stream.

#### SABR:
* [SabrStream](src/core/SabrStream.ts) - A robust client for downloading SABR streams. Provides separate video and audio data via [ReadableStreams](https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream).
* [SabrStreamingAdapter](src/core/SabrStreamingAdapter.ts) - A bridge between SABR protocol and media players that intercepts network requests, handles context updates, and manages format selection.
* [SabrUmpProcessor](src/core/SabrUmpProcessor.ts) - A UMP processor for player implementations that use [SabrStreamingAdapter](src/core/SabrStreamingAdapter.ts).

## Installation

```bash
# NPM
npm install googlevideo

# JSR / Deno
npx jsr add @luanrt/googlevideo
deno add jsr:@luanrt/googlevideo

# GitHub
npm install LuanRT/googlevideo
```

## Basic Usage
The following example demonstrates basic usage of the UMP modules. It covers creating a UMP data buffer, writing various parts, and then reading and processing these parts with corresponding handlers.

> [!NOTE] 
> More advanced usage examples can be found in the [/examples](./examples/) directory.

```typescript
import { CompositeBuffer, UmpReader, UmpWriter } from 'googlevideo/ump';
import { MediaHeader, UMPPartId } from 'googlevideo/protos';
import { concatenateChunks } from 'googlevideo/utils';
import { Part } from 'googlevideo/shared-types';

function handleMediaHeader(part: Part) {
  const mediaHeader = MediaHeader.decode(concatenateChunks(part.data.chunks));
  console.log('Media Header:', mediaHeader);
}

function handleMedia(part: Part) {
  const headerId = part.data.getUint8(0);
  console.log(`Media Part (Associated Header ID: ${headerId}):`, part.data.split(1).remainingBuffer.getLength(), 'bytes');
}

function handleMediaEnd(part: Part) {
  const headerId = part.data.getUint8(0);
  console.log(`Media End Part (Associated Header ID: ${headerId}):`, part.data.split(1).remainingBuffer.getLength(), 'bytes');
}

const umpPartHandlers = new Map<UMPPartId, (part: Part) => void>([
  [ UMPPartId.MEDIA_HEADER, handleMediaHeader ],
  [ UMPPartId.MEDIA, handleMedia ],
  [ UMPPartId.MEDIA_END, handleMediaEnd ]
]);

const buffer = mockUmpData();
const reader = new UmpReader(buffer);

reader.read((part) => {
  const handler = umpPartHandlers.get(part.type);
  if (handler) {
    handler(part);
  } else {
    console.warn(`No handler for part type: ${part.type}`);
  }
});

/**
 * Generates a mock UMP data buffer containing a MEDIA_HEADER, and respective MEDIA and MEDIA_END parts.
 * This group represents a single audio segment, which is what you would typically see
 * in a real UMP stream.
 */
function mockUmpData(): CompositeBuffer {
  const buffer = new CompositeBuffer();
  const writer = new UmpWriter(buffer);

  const audioHeaderId = 0;

  const partsToWrite: [UMPPartId, Uint8Array][] = [
    [
      UMPPartId.MEDIA_HEADER,
      MediaHeader.encode({
        headerId: audioHeaderId,
        videoId: "sOa4VVlI9tE",
        itag: 141,
        lmt: 1645502668395260,
        xtags: "",
        startRange: 5463800,
        isInitSeg: false,
        sequenceNumber: 0,
        durationMs: 0,
        formatId: {
          itag: 141,
          lastModified: 1645502668395260,
          xtags: ""
        },
        contentLength: 963966,
      }).finish()
    ],
    [ UMPPartId.MEDIA, new Uint8Array([ audioHeaderId, ...new Uint8Array(827609).fill(0) ]) ],
    [ UMPPartId.MEDIA, new Uint8Array([ audioHeaderId, ...new Uint8Array(136357).fill(0) ]) ],
    [ UMPPartId.MEDIA_END, new Uint8Array([ audioHeaderId ]) ]
  ];

  for (const [type, data] of partsToWrite) {
    writer.write(type, data);
  }

  return buffer;
}
```

Expected output:
```
Media Header: {
  headerId: 0,
  videoId: 'sOa4VVlI9tE',
  itag: 141,
  lmt: 1645502668395260,
  xtags: '',
  startRange: 5463800,
  compressionAlgorithm: 0,
  isInitSeg: false,
  sequenceNumber: 0,
  bitrateBps: 0,
  startMs: 0,
  durationMs: 0,
  formatId: { itag: 141, lastModified: 1645502668395260, xtags: '' },
  contentLength: 963966,
  timeRange: undefined,
  sequenceLmt: 0
}
Media Part (Associated Header ID: 0): 827609 bytes
Media Part (Associated Header ID: 0): 136357 bytes
Media End Part (Associated Header ID: 0): 0 bytes
```

## License
Distributed under the [MIT](./LICENSE) License.

<p align="right">
(<a href="#top">back to top</a>)
</p>
