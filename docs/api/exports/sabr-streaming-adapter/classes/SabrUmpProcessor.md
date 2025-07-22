[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrUmpProcessor

# Class: SabrUmpProcessor

Defined in: [src/core/SabrUmpProcessor.ts:47](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrUmpProcessor.ts#L47)

This class is responsible for reading a UMP stream, handling different part types
(like media headers, media data, and server directives), and populating a
metadata object with the extracted information. It is supposed to be used
in conjunction with a [`SabrPlayerAdapter`](../interfaces/SabrPlayerAdapter.md) in video player
implementations.

## Constructors

### Constructor

> **new SabrUmpProcessor**(`requestMetadata`, `cacheManager?`): `SabrUmpProcessor`

Defined in: [src/core/SabrUmpProcessor.ts:68](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrUmpProcessor.ts#L68)

#### Parameters

##### requestMetadata

[`SabrRequestMetadata`](../interfaces/SabrRequestMetadata.md)

##### cacheManager?

[`CacheManager`](../../utils/classes/CacheManager.md)

#### Returns

`SabrUmpProcessor`

## Properties

### partialPart?

> `optional` **partialPart**: [`Part`](../../../types/shared/type-aliases/Part.md)

Defined in: [src/core/SabrUmpProcessor.ts:48](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrUmpProcessor.ts#L48)

## Methods

### getSegmentInfo()

> **getSegmentInfo**(): `undefined` \| `Segment`

Defined in: [src/core/SabrUmpProcessor.ts:106](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrUmpProcessor.ts#L106)

#### Returns

`undefined` \| `Segment`

***

### processChunk()

> **processChunk**(`value`): `Promise`\<`undefined` \| [`UmpProcessingResult`](../interfaces/UmpProcessingResult.md)\>

Defined in: [src/core/SabrUmpProcessor.ts:78](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrUmpProcessor.ts#L78)

Processes a chunk of data from a UMP stream and updates the request context.

#### Parameters

##### value

`Uint8Array`

#### Returns

`Promise`\<`undefined` \| [`UmpProcessingResult`](../interfaces/UmpProcessingResult.md)\>

A promise that resolves with a processing result if a terminal part is found (e.g., MediaEnd), or undefined otherwise.
