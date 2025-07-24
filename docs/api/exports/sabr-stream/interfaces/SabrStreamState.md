[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamState

# Interface: SabrStreamState

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:63](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L63)

## Properties

### activeSabrContexts

> **activeSabrContexts**: `number`[]

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:67](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L67)

***

### cachedBufferedRanges

> **cachedBufferedRanges**: [`BufferedRange`](../../protos/interfaces/BufferedRange.md)[]

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:70](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L70)

***

### durationMs

> **durationMs**: `number`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:64](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L64)

***

### formatToDiscard?

> `optional` **formatToDiscard**: `string`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:69](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L69)

***

### initializedFormats

> **initializedFormats**: `object`[]

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:72](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L72)

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

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:71](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L71)

***

### playerTimeMs

> **playerTimeMs**: `number`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:66](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L66)

***

### requestNumber

> **requestNumber**: `number`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:65](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L65)

***

### sabrContextUpdates

> **sabrContextUpdates**: \[`number`, [`SabrContextUpdate`](../../protos/interfaces/SabrContextUpdate.md)\][]

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:68](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L68)
