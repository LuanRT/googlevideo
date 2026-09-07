[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrOptions

# Interface: SabrOptions

Defined in: [src/types/sabrStreamingAdapterTypes.ts:47](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L47)

## Properties

### enableCaching?

> `optional` **enableCaching**: `boolean`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:52](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L52)

Whether to enable caching of SABR segments.

#### Default

```ts
true
```

***

### enableVerboseRequestLogging?

> `optional` **enableVerboseRequestLogging**: `boolean`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:58](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L58)

Enables verbose logging of all SABR requests made by the player.
@NOTE: `DEBUG` level logging must be enabled for this to take effect.

#### Default

```ts
false
```

***

### maxCacheSizeMB?

> `optional` **maxCacheSizeMB**: `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:63](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L63)

Maximum size of the segment cache in megabytes.

#### Default

```ts
3
```

***

### maxCacheAgeSeconds?

> `optional` **maxCacheAgeSeconds**: `number`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:68](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L68)

Maximum age of cached segments in seconds.

#### Default

```ts
300 (5 minutes)
```

***

### playerAdapter?

> `optional` **playerAdapter**: [`SabrPlayerAdapter`](SabrPlayerAdapter.md)

Defined in: [src/types/sabrStreamingAdapterTypes.ts:72](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L72)

Player adapter to use for SABR streaming.

***

### clientInfo?

> `optional` **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamingAdapterTypes.ts:76](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamingAdapterTypes.ts#L76)

Client information to send with SABR requests.
