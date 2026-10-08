[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / TrackState

# Interface: TrackState

Defined in: [src/types/sabrStreamTypes.ts:231](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L231)

## Extends

- `TrackStateFields`

## Properties

### trackedSegments?

> `optional` **trackedSegments**: \[`number`, [`CompletedSegment`](CompletedSegment.md)\][]

Defined in: [src/types/sabrStreamTypes.ts:232](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L232)

***

### formatId?

> `optional` **formatId**: [`FormatId`](../../protos/interfaces/FormatId.md)

Defined in: [src/utils/Track.ts:18](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L18)

#### Inherited from

`TrackStateFields.formatId`

***

### mimeType?

> `optional` **mimeType**: `string`

Defined in: [src/utils/Track.ts:19](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L19)

#### Inherited from

`TrackStateFields.mimeType`

***

### endSegmentNum?

> `optional` **endSegmentNum**: `number`

Defined in: [src/utils/Track.ts:20](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L20)

#### Inherited from

`TrackStateFields.endSegmentNum`

***

### endTimeTicks?

> `optional` **endTimeTicks**: `number`

Defined in: [src/utils/Track.ts:21](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L21)

#### Inherited from

`TrackStateFields.endTimeTicks`

***

### endTimescale?

> `optional` **endTimescale**: `number`

Defined in: [src/utils/Track.ts:22](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L22)

#### Inherited from

`TrackStateFields.endTimescale`

***

### targetDurationSec?

> `optional` **targetDurationSec**: `number`

Defined in: [src/utils/Track.ts:23](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L23)

#### Inherited from

`TrackStateFields.targetDurationSec`

***

### bufferedRangeSummary?

> `optional` **bufferedRangeSummary**: [`BufferedRangeSummary`](BufferedRangeSummary.md)

Defined in: [src/utils/Track.ts:25](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/Track.ts#L25)

#### Inherited from

`TrackStateFields.bufferedRangeSummary`
