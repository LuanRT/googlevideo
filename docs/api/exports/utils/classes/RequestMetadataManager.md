[googlevideo](../../../README.md) / [exports/utils](../README.md) / RequestMetadataManager

# Class: RequestMetadataManager

Defined in: [src/utils/RequestMetadataManager.ts:6](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/RequestMetadataManager.ts#L6)

Manages request metadata objects.

## Constructors

### Constructor

> **new RequestMetadataManager**(): `RequestMetadataManager`

Defined in: [src/utils/RequestMetadataManager.ts:12](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/RequestMetadataManager.ts#L12)

#### Returns

`RequestMetadataManager`

## Properties

### metadataMap

> **metadataMap**: `Map`\<`string`, [`SabrRequestMetadata`](../../sabr-streaming-adapter/interfaces/SabrRequestMetadata.md)\>

Defined in: [src/utils/RequestMetadataManager.ts:7](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/RequestMetadataManager.ts#L7)

## Methods

### getRequestMetadata()

> **getRequestMetadata**(`url`, `del`): `undefined` \| [`SabrRequestMetadata`](../../sabr-streaming-adapter/interfaces/SabrRequestMetadata.md)

Defined in: [src/utils/RequestMetadataManager.ts:17](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/RequestMetadataManager.ts#L17)

#### Parameters

##### url

`string`

##### del

`boolean` = `false`

#### Returns

`undefined` \| [`SabrRequestMetadata`](../../sabr-streaming-adapter/interfaces/SabrRequestMetadata.md)

***

### setRequestMetadata()

> **setRequestMetadata**(`url`, `context`): `void`

Defined in: [src/utils/RequestMetadataManager.ts:37](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/RequestMetadataManager.ts#L37)

#### Parameters

##### url

`string`

##### context

[`SabrRequestMetadata`](../../sabr-streaming-adapter/interfaces/SabrRequestMetadata.md)

#### Returns

`void`
