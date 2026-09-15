[googlevideo](../../../README.md) / [exports/utils](../README.md) / CacheManager

# Class: CacheManager

Defined in: [src/utils/CacheManager.ts:14](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L14)

## Constructors

### Constructor

> **new CacheManager**(`maxSizeMB`, `maxAgeSeconds`): `CacheManager`

Defined in: [src/utils/CacheManager.ts:23](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L23)

#### Parameters

##### maxSizeMB

`number` = `50`

##### maxAgeSeconds

`number` = `600`

#### Returns

`CacheManager`

## Methods

### getCacheEntries()

> **getCacheEntries**(): `object`

Defined in: [src/utils/CacheManager.ts:29](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L29)

#### Returns

`object`

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `initSegmentCache` | `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\> | [src/utils/CacheManager.ts:30](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L30) |
| `segmentCache` | `Map`\<`string`, [`CacheEntry`](../interfaces/CacheEntry.md)\> | [src/utils/CacheManager.ts:31](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L31) |

***

### setInitSegment()

> **setInitSegment**(`key`, `data`): `void`

Defined in: [src/utils/CacheManager.ts:39](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L39)

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

Defined in: [src/utils/CacheManager.ts:54](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L54)

#### Parameters

##### key

`string`

##### data

`Uint8Array`

#### Returns

`void`

***

### getInitSegment()

> **getInitSegment**(`key`): `Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [src/utils/CacheManager.ts:66](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L66)

#### Parameters

##### key

`string`

#### Returns

`Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

***

### getSegment()

> **getSegment**(`key`): `Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

Defined in: [src/utils/CacheManager.ts:84](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L84)

#### Parameters

##### key

`string`

#### Returns

`Uint8Array`\<`ArrayBufferLike`\> \| `undefined`

***

### dispose()

> **dispose**(): `void`

Defined in: [src/utils/CacheManager.ts:159](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/CacheManager.ts#L159)

#### Returns

`void`
