# What Is This?
This is a collection of utilities for working with Google Video APIs, with a primary focus on UMP.

* [Video Streaming Protos](./protos/video_streaming/)
* [UMP (Parser)](./src/core/UMP.ts)
* [ServerAbrStream (SABR Client)](./src/core/ServerAbrStream.ts)
* [ChunkedDataBuffer (Buffer Manager)](./src/core/ChunkedDataBuffer.ts)

The protobuf definitions were extracted from YouTube's Android and iOS clients, and the UMP parser and buffer manager are based on the implementation currently found on youtube.com.

Usage examples can be found [here](./examples/).

## Installation

```bash
npm install googlevideo
```

## Basic Usage

```typescript
import GoogleVideo, { PART, Protos } from 'googlevideo';

const streamingUrl = 'https://abcd--a.googlevideo.com/videoplayback?...';

const response = await fetch(streamingUrl, { method: 'POST' });

const arrayBuffer = await response.arrayBuffer();

const dataBuffer = new GoogleVideo.ChunkedDataBuffer();
dataBuffer.append(new Uint8Array(arrayBuffer));

const googUmp = new GoogleVideo.UMP(dataBuffer);

googUmp.parse((part) => {
  switch (part.type) {
    case PART.MEDIA_HEADER: {
      console.log('[MediaHeader]:', Protos.MediaHeader.decode(part.data.chunks[0]));
      break;
    }
    case PART.MEDIA: {
      const headerId = part.data.getUint8(0);
      const streamData = part.data.split(1).remainingBuffer;
      console.log('[Media]:', `Header ID: ${headerId}`, `length: ${streamData.getLength()}`);
      break;
    }
    case PART.MEDIA_END: {
      const headerId = part.data.getUint8(0);
      console.log('[MediaEnd]:', `Header ID: ${headerId}`);
      break;
    }
    default:
      console.log('Unhandled part:', part.type);
      break;
  }
});
```

For more advanced examples, including scenarios beyond just parsing responses, check out the [examples](./examples/).

## License
Distributed under the [MIT](./LICENSE) License.

<p align="right">
(<a href="#top">back to top</a>)
</p>
