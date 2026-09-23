[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / TrackState

# Interface: TrackState

Defined in: [src/types/sabrStreamTypes.ts:228](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L228)

## Extends

- `Omit`\<[`TrackSegmentInfo`](TrackSegmentInfo.md), `"trackedSegments"`\>

## Properties

### formatId?

> `optional` **formatId**: [`FormatId`](../../protos/interfaces/FormatId.md)

Defined in: [src/types/sabrStreamTypes.ts:213](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L213)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`formatId`](TrackSegmentInfo.md#formatid)

***

### mimeType?

> `optional` **mimeType**: `string`

Defined in: [src/types/sabrStreamTypes.ts:214](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L214)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`mimeType`](TrackSegmentInfo.md#mimetype)

***

### endSegmentNum?

> `optional` **endSegmentNum**: `number`

Defined in: [src/types/sabrStreamTypes.ts:215](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L215)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endSegmentNum`](TrackSegmentInfo.md#endsegmentnum)

***

### endTimeTicks?

> `optional` **endTimeTicks**: `number`

Defined in: [src/types/sabrStreamTypes.ts:216](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L216)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endTimeTicks`](TrackSegmentInfo.md#endtimeticks)

***

### endTimescale?

> `optional` **endTimescale**: `number`

Defined in: [src/types/sabrStreamTypes.ts:217](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L217)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`endTimescale`](TrackSegmentInfo.md#endtimescale)

***

### targetDurationSec?

> `optional` **targetDurationSec**: `number`

Defined in: [src/types/sabrStreamTypes.ts:218](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L218)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`targetDurationSec`](TrackSegmentInfo.md#targetdurationsec)

***

### bufferedRangeSummary?

> `optional` **bufferedRangeSummary**: `BufferedRangeSummary`

Defined in: [src/types/sabrStreamTypes.ts:220](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L220)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`bufferedRangeSummary`](TrackSegmentInfo.md#bufferedrangesummary)

***

### emsgSegmentMetadata?

> `optional` **emsgSegmentMetadata**: `EmsgSegmentMetadata`

Defined in: [src/types/sabrStreamTypes.ts:221](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L221)

#### Inherited from

[`TrackSegmentInfo`](TrackSegmentInfo.md).[`emsgSegmentMetadata`](TrackSegmentInfo.md#emsgsegmentmetadata)

***

### trackedSegments

> **trackedSegments**: \[`number`, `CompletedSegment`\][]

Defined in: [src/types/sabrStreamTypes.ts:229](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L229)
