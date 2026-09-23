[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrPlayerAdapter

# Interface: SabrPlayerAdapter

Defined in: [src/types/sabrStreamingAdapterTypes.ts:103](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L103)

## Methods

### initialize()

> **initialize**(`player`, `requestMetadataManager`, `cache`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:104](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L104)

#### Parameters

##### player

`any`

##### requestMetadataManager

[`RequestMetadataManager`](../../utils/classes/RequestMetadataManager.md)

##### cache

[`CacheManager`](../../utils/classes/CacheManager.md) | `null`

#### Returns

`void`

***

### getPlayerTime()

> **getPlayerTime**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:109](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L109)

#### Returns

`number`

***

### getPlaybackRate()

> **getPlaybackRate**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:110](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L110)

#### Returns

`number`

***

### getBandwidthEstimate()

> **getBandwidthEstimate**(): `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:111](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L111)

#### Returns

`number`

***

### getActiveTrackFormats()

> **getActiveTrackFormats**(`activeFormat`, `sabrFormats`): `object`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:112](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L112)

#### Parameters

##### activeFormat

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

##### sabrFormats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

#### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `audioFormat?` | [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) | [src/types/sabrStreamingAdapterTypes.ts:113](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L113) |
| `videoFormat?` | [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) | [src/types/sabrStreamingAdapterTypes.ts:114](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L114) |

***

### registerRequestInterceptor()

> **registerRequestInterceptor**(`interceptor`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:116](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L116)

#### Parameters

##### interceptor

[`RequestFilter`](../type-aliases/RequestFilter.md)

#### Returns

`void`

***

### registerResponseInterceptor()

> **registerResponseInterceptor**(`interceptor`): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:117](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L117)

#### Parameters

##### interceptor

[`ResponseFilter`](../type-aliases/ResponseFilter.md)

#### Returns

`void`

***

### dispose()

> **dispose**(): `void`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:118](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamingAdapterTypes.ts#L118)

#### Returns

`void`
