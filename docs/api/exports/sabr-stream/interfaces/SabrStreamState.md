[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamState

# Interface: SabrStreamState

Defined in: [src/core/SabrStream.ts:59](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L59)

## Properties

### activeSabrContexts

> **activeSabrContexts**: `number`[]

Defined in: [src/core/SabrStream.ts:63](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L63)

***

### cachedBufferedRanges

> **cachedBufferedRanges**: [`BufferedRange`](../../protos/interfaces/BufferedRange.md)[]

Defined in: [src/core/SabrStream.ts:66](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L66)

***

### durationMs

> **durationMs**: `number`

Defined in: [src/core/SabrStream.ts:60](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L60)

***

### formatToDiscard?

> `optional` **formatToDiscard**: `string`

Defined in: [src/core/SabrStream.ts:65](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L65)

***

### initializedFormats

> **initializedFormats**: `object`[]

Defined in: [src/core/SabrStream.ts:68](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L68)

#### downloadedSegments

> **downloadedSegments**: \[`number`, `Segment`\][]

#### formatInitializationMetadata

> **formatInitializationMetadata**: [`FormatInitializationMetadata`](../../protos/interfaces/FormatInitializationMetadata.md)

#### formatKey

> **formatKey**: `string`

#### lastMediaHeaders

> **lastMediaHeaders**: [`MediaHeader`](../../protos/interfaces/MediaHeader.md)[]

***

### nextRequestPolicy?

> `optional` **nextRequestPolicy**: [`NextRequestPolicy`](../../protos/interfaces/NextRequestPolicy.md)

Defined in: [src/core/SabrStream.ts:67](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L67)

***

### playerTimeMs

> **playerTimeMs**: `number`

Defined in: [src/core/SabrStream.ts:62](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L62)

***

### requestNumber

> **requestNumber**: `number`

Defined in: [src/core/SabrStream.ts:61](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L61)

***

### sabrContextUpdates

> **sabrContextUpdates**: \[`number`, [`SabrContextUpdate`](../../protos/interfaces/SabrContextUpdate.md)\][]

Defined in: [src/core/SabrStream.ts:64](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/SabrStream.ts#L64)
