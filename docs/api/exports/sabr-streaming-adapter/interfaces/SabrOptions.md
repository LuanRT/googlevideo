[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrOptions

# Interface: SabrOptions

Defined in: [src/types/sabrStreamingAdapterTypes.ts:43](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L43)

## Properties

### clientInfo?

> `optional` **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamingAdapterTypes.ts:72](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L72)

Client information to send with SABR requests.

***

### enableCaching?

> `optional` **enableCaching**: `boolean`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:48](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L48)

Whether to enable caching of SABR segments.

#### Default

```ts
true
```

***

### enableVerboseRequestLogging?

> `optional` **enableVerboseRequestLogging**: `boolean`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:54](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L54)

Enables verbose logging of all SABR requests made by the player.
@NOTE: `DEBUG` level logging must be enabled for this to take effect.

#### Default

```ts
false
```

***

### maxCacheAgeSeconds?

> `optional` **maxCacheAgeSeconds**: `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:64](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L64)

Maximum age of cached segments in seconds.

#### Default

```ts
300 (5 minutes)
```

***

### maxCacheSizeMB?

> `optional` **maxCacheSizeMB**: `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:59](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L59)

Maximum size of the segment cache in megabytes.

#### Default

```ts
3
```

***

### playerAdapter?

> `optional` **playerAdapter**: [`SabrPlayerAdapter`](SabrPlayerAdapter.md)

Defined in: [src/types/sabrStreamingAdapterTypes.ts:68](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamingAdapterTypes.ts#L68)

Player adapter to use for SABR streaming.
