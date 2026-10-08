[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / TrackState

# Interface: TrackState

Defined in: [src/types/sabrStreamTypes.ts:231](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L231)

## Extends

- `TrackStateFields`

## Properties

### trackedSegments?

> `optional` **trackedSegments**: \[`number`, [`CompletedSegment`](CompletedSegment.md)\][]

Defined in: [src/types/sabrStreamTypes.ts:232](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L232)

***

### formatId?

> `optional` **formatId**: [`FormatId`](../../protos/interfaces/FormatId.md)

Defined in: [src/utils/Track.ts:18](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L18)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`formatId`](../../utils/classes/Track.md#formatid)

***

### mimeType?

> `optional` **mimeType**: `string`

Defined in: [src/utils/Track.ts:19](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L19)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`mimeType`](../../utils/classes/Track.md#mimetype)

***

### endSegmentNum?

> `optional` **endSegmentNum**: `number`

Defined in: [src/utils/Track.ts:20](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L20)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`endSegmentNum`](../../utils/classes/Track.md#endsegmentnum)

***

### endTimeTicks?

> `optional` **endTimeTicks**: `number`

Defined in: [src/utils/Track.ts:21](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L21)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`endTimeTicks`](../../utils/classes/Track.md#endtimeticks)

***

### endTimescale?

> `optional` **endTimescale**: `number`

Defined in: [src/utils/Track.ts:22](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L22)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`endTimescale`](../../utils/classes/Track.md#endtimescale)

***

### targetDurationSec?

> `optional` **targetDurationSec**: `number`

Defined in: [src/utils/Track.ts:23](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L23)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`targetDurationSec`](../../utils/classes/Track.md#targetdurationsec)

***

### bufferedRangeSummary?

> `optional` **bufferedRangeSummary**: [`BufferedRangeSummary`](BufferedRangeSummary.md)

Defined in: [src/utils/Track.ts:25](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/utils/Track.ts#L25)

#### Inherited from

[`Track`](../../utils/classes/Track.md).[`bufferedRangeSummary`](../../utils/classes/Track.md#bufferedrangesummary)
