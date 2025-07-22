[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrPlayerAdapter

# Interface: SabrPlayerAdapter

Defined in: [src/types/sabrStreamingAdapterTypes.ts:99](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L99)

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:114](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L114)

#### Returns

`void`

***

### getActiveTrackFormats()

> **getActiveTrackFormats**(`activeFormat`, `sabrFormats`): `object`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:108](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L108)

#### Parameters

##### activeFormat

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

##### sabrFormats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

#### Returns

`object`

##### audioFormat?

> `optional` **audioFormat**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

##### videoFormat?

> `optional` **videoFormat**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

***

### getBandwidthEstimate()

> **getBandwidthEstimate**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:107](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L107)

#### Returns

`number`

***

### getPlaybackRate()

> **getPlaybackRate**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:106](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L106)

#### Returns

`number`

***

### getPlayerTime()

> **getPlayerTime**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:105](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L105)

#### Returns

`number`

***

### initialize()

> **initialize**(`player`, `requestMetadataManager`, `cache`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:100](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L100)

#### Parameters

##### player

`any`

##### requestMetadataManager

[`RequestMetadataManager`](../../utils/classes/RequestMetadataManager.md)

##### cache

`null` | [`CacheManager`](../../utils/classes/CacheManager.md)

#### Returns

`void`

***

### registerRequestInterceptor()

> **registerRequestInterceptor**(`interceptor`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:112](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L112)

#### Parameters

##### interceptor

[`RequestFilter`](../type-aliases/RequestFilter.md)

#### Returns

`void`

***

### registerResponseInterceptor()

> **registerResponseInterceptor**(`interceptor`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:113](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L113)

#### Parameters

##### interceptor

[`ResponseFilter`](../type-aliases/ResponseFilter.md)

#### Returns

`void`
