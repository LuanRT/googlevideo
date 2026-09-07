[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrUmpProcessor

# Class: SabrUmpProcessor

Defined in: [src/core/SabrUmpProcessor.ts:48](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrUmpProcessor.ts#L48)

This class is responsible for reading a UMP stream and populating a metadata object
with the extracted information. It is supposed to be used in conjunction with a 
[`SabrPlayerAdapter`](../interfaces/SabrPlayerAdapter.md) in video player implementations.

## Constructors

### Constructor

> **new SabrUmpProcessor**(`requestMetadata`, `cacheManager?`): `SabrUmpProcessor`

Defined in: [src/core/SabrUmpProcessor.ts:75](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrUmpProcessor.ts#L75)

#### Parameters

##### requestMetadata

[`SabrRequestMetadata`](../interfaces/SabrRequestMetadata.md)

##### cacheManager?

[`CacheManager`](../../utils/classes/CacheManager.md)

#### Returns

`SabrUmpProcessor`

## Methods

### processChunk()

> **processChunk**(`value`): `Promise`\<[`UmpProcessingResult`](../interfaces/UmpProcessingResult.md) \| `undefined`\>

Defined in: [src/core/SabrUmpProcessor.ts:98](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrUmpProcessor.ts#L98)

Processes a chunk of data from a UMP stream and updates the request context.

#### Parameters

##### value

`Uint8Array`

#### Returns

`Promise`\<[`UmpProcessingResult`](../interfaces/UmpProcessingResult.md) \| `undefined`\>

A promise that resolves with a processing result if a terminal part is found (e.g., MediaEnd), or undefined otherwise.

***

### getSegmentInfo()

> **getSegmentInfo**(): `Segment` \| `undefined`

Defined in: [src/core/SabrUmpProcessor.ts:104](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrUmpProcessor.ts#L104)

#### Returns

`Segment` \| `undefined`

***

### dispose()

> **dispose**(): `void`

Defined in: [src/core/SabrUmpProcessor.ts:318](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrUmpProcessor.ts#L318)

#### Returns

`void`
