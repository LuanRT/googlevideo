# GoogleVideo
[![JSR](https://jsr.io/badges/@luanrt/googlevideo)](https://jsr.io/@luanrt/googlevideo)
[![NPM](https://img.shields.io/npm/v/googlevideo)](https://www.npmjs.com/package/googlevideo)
[![License](https://img.shields.io/github/license/LuanRT/googlevideo)](./LICENSE)

A collection of modules for working with YouTube's proprietary video streaming protocols (UMP/SABR). It can be used to build clients or to integrate with existing media players (e.g., [Shaka Player](https://shaka-player-demo.appspot.com/docs/api/index.html)).

[API Reference →](https://ytjs.dev/googlevideo/api)

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
Below is a basic example using the UMP modules to create a buffer, write parts, and process them:

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
Media Header: { ... }
Media Part (Associated Header ID: 0): 827609 bytes
Media Part (Associated Header ID: 0): 136357 bytes
Media End Part (Associated Header ID: 0): 0 bytes
```

## License
Distributed under the [MIT](./LICENSE) License.

<p align="right">
(<a href="#top">back to top</a>)
</p>
