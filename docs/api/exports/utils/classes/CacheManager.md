[googlevideo](../../../README.md) / [exports/utils](../README.md) / CacheManager

# Class: CacheManager

Defined in: [src/utils/CacheManager.ts:14](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L14)

A "proper" cache for storing segments.

## Constructors

### Constructor

> **new CacheManager**(`maxSizeMB`, `maxAgeSeconds`): `CacheManager`

Defined in: [src/utils/CacheManager.ts:23](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L23)

#### Parameters

##### maxSizeMB

`number` = `50`

##### maxAgeSeconds

`number` = `600`

#### Returns

`CacheManager`

## Methods

### dispose()

> **dispose**(): `void`

Defined in: [src/utils/CacheManager.ts:156](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L156)

#### Returns

`void`

***

### getCacheEntries()

> **getCacheEntries**(): `object`

Defined in: [src/utils/CacheManager.ts:29](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L29)

#### Returns

`object`

##### initSegmentCache

> **initSegmentCache**: `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\>

##### segmentCache

> **segmentCache**: `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\>

***

### getInitSegment()

> **getInitSegment**(`key`): `undefined` \| `Uint8Array`

Defined in: [src/utils/CacheManager.ts:63](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L63)

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `Uint8Array`

***

### getSegment()

> **getSegment**(`key`): `undefined` \| `Uint8Array`

Defined in: [src/utils/CacheManager.ts:81](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L81)

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `Uint8Array`

***

### setInitSegment()

> **setInitSegment**(`key`, `data`): `void`

Defined in: [src/utils/CacheManager.ts:36](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L36)

#### Parameters

##### key

`string`

##### data

`Uint8Array`

#### Returns

`void`

***

### setSegment()

> **setSegment**(`key`, `data`): `void`

Defined in: [src/utils/CacheManager.ts:51](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/CacheManager.ts#L51)

#### Parameters

##### key

`string`

##### data

`Uint8Array`

#### Returns

`void`
