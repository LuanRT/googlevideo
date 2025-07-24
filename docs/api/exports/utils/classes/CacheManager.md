[googlevideo](../../../README.md) / [exports/utils](../README.md) / CacheManager

# Class: CacheManager

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:14](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L14)

A "proper" cache for storing segments.

## Constructors

### Constructor

> **new CacheManager**(`maxSizeMB`, `maxAgeSeconds`): `CacheManager`

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:23](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L23)

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

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:159](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L159)

#### Returns

`void`

***

### getCacheEntries()

> **getCacheEntries**(): `object`

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:29](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L29)

#### Returns

`object`

##### initSegmentCache

> **initSegmentCache**: `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\>

##### segmentCache

> **segmentCache**: `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\>

***

### getInitSegment()

> **getInitSegment**(`key`): `undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:66](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L66)

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

***

### getSegment()

> **getSegment**(`key`): `undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:84](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L84)

#### Parameters

##### key

`string`

#### Returns

`undefined` \| `Uint8Array`\<`ArrayBufferLike`\>

***

### setInitSegment()

> **setInitSegment**(`key`, `data`): `void`

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:39](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L39)

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

Defined in: [codeberg/googlevideo/src/utils/CacheManager.ts:54](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/CacheManager.ts#L54)

#### Parameters

##### key

`string`

##### data

`Uint8Array`

#### Returns

`void`
