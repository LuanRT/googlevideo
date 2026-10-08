[googlevideo](../../../README.md) / [exports/utils](../README.md) / TrackCollection

# Class: TrackCollection

Defined in: [src/utils/TrackCollection.ts:6](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L6)

## Constructors

### Constructor

> **new TrackCollection**(): `TrackCollection`

#### Returns

`TrackCollection`

## Properties

### video

> `readonly` **video**: [`Track`](Track.md)

Defined in: [src/utils/TrackCollection.ts:7](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L7)

***

### audio

> `readonly` **audio**: [`Track`](Track.md)

Defined in: [src/utils/TrackCollection.ts:8](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L8)

***

### initializedTracksMap

> `readonly` **initializedTracksMap**: `Map`\<`string`, [`Track`](Track.md)\>

Defined in: [src/utils/TrackCollection.ts:9](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L9)

## Accessors

### needsDrain

#### Get Signature

> **get** **needsDrain**(): `boolean`

Defined in: [src/utils/TrackCollection.ts:11](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L11)

##### Returns

`boolean`

***

### buffered

#### Get Signature

> **get** **buffered**(): `number`

Defined in: [src/utils/TrackCollection.ts:15](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L15)

##### Returns

`number`

***

### bufferedRanges

#### Get Signature

> **get** **bufferedRanges**(): [`BufferedRange`](../../protos/interfaces/BufferedRange.md)[]

Defined in: [src/utils/TrackCollection.ts:27](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L27)

##### Returns

[`BufferedRange`](../../protos/interfaces/BufferedRange.md)[]

***

### initializedTracks

#### Get Signature

> **get** **initializedTracks**(): `MapIterator`\<[`Track`](Track.md)\>

Defined in: [src/utils/TrackCollection.ts:51](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L51)

##### Returns

`MapIterator`\<[`Track`](Track.md)\>

***

### initializationFormatIds

#### Get Signature

> **get** **initializationFormatIds**(): [`FormatId`](../../protos/interfaces/FormatId.md)[]

Defined in: [src/utils/TrackCollection.ts:55](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L55)

##### Returns

[`FormatId`](../../protos/interfaces/FormatId.md)[]

***

### livePlaybackLatencyMs

#### Get Signature

> **get** **livePlaybackLatencyMs**(): `number` \| `undefined`

Defined in: [src/utils/TrackCollection.ts:62](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L62)

##### Returns

`number` \| `undefined`

## Methods

### initialize()

> **initialize**(`type`, `metadata`): `void`

Defined in: [src/utils/TrackCollection.ts:72](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L72)

#### Parameters

##### type

`"audio"` | `"video"`

##### metadata

[`TrackState`](../../sabr-stream/interfaces/TrackState.md)

#### Returns

`void`

***

### getInitializedTrack()

> **getInitializedTrack**(`formatKey`): [`Track`](Track.md) \| `undefined`

Defined in: [src/utils/TrackCollection.ts:78](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L78)

#### Parameters

##### formatKey

`string`

#### Returns

[`Track`](Track.md) \| `undefined`

***

### endOfStreamReached()

> **endOfStreamReached**(`enabledTrackTypes`): `boolean`

Defined in: [src/utils/TrackCollection.ts:82](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L82)

#### Parameters

##### enabledTrackTypes

[`EnabledTrackTypes`](../enumerations/EnabledTrackTypes.md)

#### Returns

`boolean`

***

### snapshot()

> **snapshot**(): [`TrackState`](../../sabr-stream/interfaces/TrackState.md)[]

Defined in: [src/utils/TrackCollection.ts:91](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L91)

#### Returns

[`TrackState`](../../sabr-stream/interfaces/TrackState.md)[]

***

### error()

> **error**(`err?`): `void`

Defined in: [src/utils/TrackCollection.ts:100](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L100)

#### Parameters

##### err?

`string` | `Error`

#### Returns

`void`

***

### close()

> **close**(): `void`

Defined in: [src/utils/TrackCollection.ts:107](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/TrackCollection.ts#L107)

#### Returns

`void`
