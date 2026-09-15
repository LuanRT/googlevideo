[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrStreamingAdapter

# Class: SabrStreamingAdapter

Defined in: [src/core/SabrStreamingAdapter.ts:76](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L76)

Adapter class that handles YouTube SABR integration with media players (e.g., Shaka Player).

What it does:
- Sets up request/response interceptors so proper SABR requests can be sent (UMP response parsing must be done in the player adapter).
- Keeps track of initialized formats and their metadata.
- Handles SABR-specific things, such as redirects, context updates, and playback cookies.

## Constructors

### Constructor

> **new SabrStreamingAdapter**(`options`): `SabrStreamingAdapter`

Defined in: [src/core/SabrStreamingAdapter.ts:128](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L128)

#### Parameters

##### options

[`SabrOptions`](../interfaces/SabrOptions.md)

Configuration options for the adapter.

#### Returns

`SabrStreamingAdapter`

#### Throws

SabrAdapterError if a player adapter is not provided.

## Properties

### isDisposed

> **isDisposed**: `boolean` = `false`

Defined in: [src/core/SabrStreamingAdapter.ts:99](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L99)

## Methods

### onSnackbarMessage()

> **onSnackbarMessage**(`cb`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:104](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L104)

Registers a callback function to handle snackbar messages.

#### Parameters

##### cb

[`OnSnackbarMessageCb`](../type-aliases/OnSnackbarMessageCb.md)

#### Returns

`void`

***

### onReloadPlayerResponse()

> **onReloadPlayerResponse**(`cb`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:112](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L112)

Handles server requests to reload the player with new parameters.

#### Parameters

##### cb

[`OnReloadPlayerResponseCb`](../type-aliases/OnReloadPlayerResponseCb.md)

#### Returns

`void`

***

### onMintPoToken()

> **onMintPoToken**(`cb`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:120](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L120)

Registers a callback function to mint a new PoToken.

#### Parameters

##### cb

[`OnMintPoTokenCallback`](../type-aliases/OnMintPoTokenCallback.md)

#### Returns

`void`

***

### attach()

> **attach**(`player`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:152](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L152)

Initializes the player adapter and sets up request/response interceptors.

#### Parameters

##### player

`any`

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### setStreamingURL()

> **setStreamingURL**(`url?`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:162](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L162)

Sets the initial server abr streaming URL.

#### Parameters

##### url?

`string`

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### setUstreamerConfig()

> **setUstreamerConfig**(`ustreamerConfig?`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:171](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L171)

Sets the ustreamer configuration for SABR requests.

#### Parameters

##### ustreamerConfig?

`string`

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### setServerAbrFormats()

> **setServerAbrFormats**(`sabrFormats`): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:180](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L180)

Sets the available SABR formats for streaming.

#### Parameters

##### sabrFormats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### getCacheManager()

> **getCacheManager**(): [`CacheManager`](../../utils/classes/CacheManager.md) \| `null`

Defined in: [src/core/SabrStreamingAdapter.ts:188](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L188)

Returns the cache manager instance, if caching is enabled.

#### Returns

[`CacheManager`](../../utils/classes/CacheManager.md) \| `null`

***

### dispose()

> **dispose**(): `void`

Defined in: [src/core/SabrStreamingAdapter.ts:637](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/core/SabrStreamingAdapter.ts#L637)

Releases resources and cleans up the adapter instance.
After calling dispose, the adapter can no longer be used.

#### Returns

`void`
