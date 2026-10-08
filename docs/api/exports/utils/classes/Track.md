[googlevideo](../../../README.md) / [exports/utils](../README.md) / Track

# Class: Track

Defined in: [src/utils/Track.ts:17](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L17)

## Constructors

### Constructor

> **new Track**(`type`): `Track`

Defined in: [src/utils/Track.ts:30](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L30)

#### Parameters

##### type

`"audio"` | `"video"`

#### Returns

`Track`

## Properties

### formatId?

> `optional` **formatId**: [`FormatId`](../../protos/interfaces/FormatId.md)

Defined in: [src/utils/Track.ts:18](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L18)

***

### mimeType?

> `optional` **mimeType**: `string`

Defined in: [src/utils/Track.ts:19](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L19)

***

### endSegmentNum?

> `optional` **endSegmentNum**: `number`

Defined in: [src/utils/Track.ts:20](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L20)

***

### endTimeTicks?

> `optional` **endTimeTicks**: `number`

Defined in: [src/utils/Track.ts:21](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L21)

***

### endTimescale?

> `optional` **endTimescale**: `number`

Defined in: [src/utils/Track.ts:22](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L22)

***

### targetDurationSec?

> `optional` **targetDurationSec**: `number`

Defined in: [src/utils/Track.ts:23](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L23)

***

### trackedSegments

> **trackedSegments**: `Map`\<`number`, [`CompletedSegment`](../../sabr-stream/interfaces/CompletedSegment.md)\>

Defined in: [src/utils/Track.ts:24](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L24)

***

### bufferedRangeSummary?

> `optional` **bufferedRangeSummary**: [`BufferedRangeSummary`](../../sabr-stream/interfaces/BufferedRangeSummary.md)

Defined in: [src/utils/Track.ts:25](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L25)

***

### emsgSegmentMetadata?

> `optional` **emsgSegmentMetadata**: `EmsgSegmentMetadata`

Defined in: [src/utils/Track.ts:26](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L26)

***

### type

> `readonly` **type**: `"audio"` \| `"video"`

Defined in: [src/utils/Track.ts:30](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L30)

## Accessors

### output

#### Get Signature

> **get** **output**(): [`TrackOutput`](../../sabr-stream/interfaces/TrackOutput.md)

Defined in: [src/utils/Track.ts:36](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L36)

##### Returns

[`TrackOutput`](../../sabr-stream/interfaces/TrackOutput.md)

#### Set Signature

> **set** **output**(`value`): `void`

Defined in: [src/utils/Track.ts:32](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L32)

##### Parameters

###### value

[`TrackOutput`](../../sabr-stream/interfaces/TrackOutput.md)

##### Returns

`void`

***

### streamLocked

#### Get Signature

> **get** **streamLocked**(): `boolean`

Defined in: [src/utils/Track.ts:40](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L40)

##### Returns

`boolean`

***

### streamDesiredSize

#### Get Signature

> **get** **streamDesiredSize**(): `number`

Defined in: [src/utils/Track.ts:44](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L44)

##### Returns

`number`

***

### streamController

#### Get Signature

> **get** **streamController**(): `ReadableStreamDefaultController`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [src/utils/Track.ts:48](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L48)

##### Returns

`ReadableStreamDefaultController`\<`Uint8Array`\<`ArrayBufferLike`\>\>

***

### streamFull

#### Get Signature

> **get** **streamFull**(): `boolean`

Defined in: [src/utils/Track.ts:52](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L52)

##### Returns

`boolean`

***

### endTimeMs

#### Get Signature

> **get** **endTimeMs**(): `number`

Defined in: [src/utils/Track.ts:56](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L56)

##### Returns

`number`

***

### endOfStreamReached

#### Get Signature

> **get** **endOfStreamReached**(): `boolean`

Defined in: [src/utils/Track.ts:61](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L61)

##### Returns

`boolean`

***

### latencyMs

#### Get Signature

> **get** **latencyMs**(): `number`

Defined in: [src/utils/Track.ts:69](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L69)

##### Returns

`number`

## Methods

### update()

> **update**(`state`): `this`

Defined in: [src/utils/Track.ts:73](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L73)

#### Parameters

##### state

[`TrackState`](../../sabr-stream/interfaces/TrackState.md)

#### Returns

`this`

***

### snapshot()

> **snapshot**(): [`TrackState`](../../sabr-stream/interfaces/TrackState.md)

Defined in: [src/utils/Track.ts:101](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L101)

#### Returns

[`TrackState`](../../sabr-stream/interfaces/TrackState.md)

***

### recordCompletedSegment()

> **recordCompletedSegment**(`info`, `emsgMetadata?`): `void`

Defined in: [src/utils/Track.ts:114](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L114)

#### Parameters

##### info

[`SegmentInfo`](../../sabr-stream/interfaces/SegmentInfo.md)

##### emsgMetadata?

`EmsgSegmentMetadata`

#### Returns

`void`
