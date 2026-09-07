[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / TrackState

# Interface: TrackState

Defined in: [src/types/sabrStreamTypes.ts:220](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L220)

## Extends

- `Omit`\<[`TrackSegmentInfo`](TrackSegmentInfo.md), `"trackedSegments"`\>

## Properties

### formatId?

> `optional` **formatId**: [`FormatId`](../../protos/interfaces/FormatId.md)

Defined in: [src/types/sabrStreamTypes.ts:206](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L206)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`formatId`](TrackSegmentInfo.md#formatid)

***

### mimeType?

> `optional` **mimeType**: `string`

Defined in: [src/types/sabrStreamTypes.ts:207](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L207)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`mimeType`](TrackSegmentInfo.md#mimetype)

***

### endSegmentNum?

> `optional` **endSegmentNum**: `number`

Defined in: [src/types/sabrStreamTypes.ts:208](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L208)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endSegmentNum`](TrackSegmentInfo.md#endsegmentnum)

***

### endTimeTicks?

> `optional` **endTimeTicks**: `number`

Defined in: [src/types/sabrStreamTypes.ts:209](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L209)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endTimeTicks`](TrackSegmentInfo.md#endtimeticks)

***

### endTimescale?

> `optional` **endTimescale**: `number`

Defined in: [src/types/sabrStreamTypes.ts:210](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L210)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endTimescale`](TrackSegmentInfo.md#endtimescale)

***

### targetDurationSec?

> `optional` **targetDurationSec**: `number`

Defined in: [src/types/sabrStreamTypes.ts:211](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L211)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`targetDurationSec`](TrackSegmentInfo.md#targetdurationsec)

***

### bufferedRangeSummary?

> `optional` **bufferedRangeSummary**: `BufferedRangeSummary`

Defined in: [src/types/sabrStreamTypes.ts:213](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L213)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`bufferedRangeSummary`](TrackSegmentInfo.md#bufferedrangesummary)

***

### trackedSegments

> **trackedSegments**: \[`number`, `CompletedSegment`\][]

Defined in: [src/types/sabrStreamTypes.ts:221](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L221)
