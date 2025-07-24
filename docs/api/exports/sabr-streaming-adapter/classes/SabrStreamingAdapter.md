[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrStreamingAdapter

# Class: SabrStreamingAdapter

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:74](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L74)

Adapter class that handles YouTube SABR integration with media players (e.g., Shaka Player).

What it does:
- Sets up request/response interceptors so we can send proper SABR requests (UMP response parsing must be done in the player adapter).
- Keeps track of initialized formats and their metadata.
- Handles SABR-specific things, such as redirects, context updates, and playback cookies.

## Constructors

### Constructor

> **new SabrStreamingAdapter**(`options`): `SabrStreamingAdapter`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:125](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L125)

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

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:96](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L96)

## Methods

### attach()

> **attach**(`player`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:149](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L149)

Initializes the player adapter and sets up request/response interceptors.

#### Parameters

##### player

`any`

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### dispose()

> **dispose**(): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:624](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L624)

Releases resources and cleans up the adapter instance.
After calling dispose, the adapter can no longer be used.

#### Returns

`void`

***

### getCacheManager()

> **getCacheManager**(): `null` \| [`CacheManager`](../../utils/classes/CacheManager.md)

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:185](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L185)

Returns the cache manager instance, if caching is enabled.

#### Returns

`null` \| [`CacheManager`](../../utils/classes/CacheManager.md)

***

### onMintPoToken()

> **onMintPoToken**(`cb`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:117](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L117)

Registers a callback function to mint a new PoToken.

#### Parameters

##### cb

`OnMintPoTokenCallback`

#### Returns

`void`

***

### onReloadPlayerResponse()

> **onReloadPlayerResponse**(`cb`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:109](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L109)

Handles server requests to reload the player with new parameters.

#### Parameters

##### cb

`OnReloadPlayerResponseCb`

#### Returns

`void`

***

### onSnackbarMessage()

> **onSnackbarMessage**(`cb`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:101](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L101)

Registers a callback function to handle snackbar messages.

#### Parameters

##### cb

`OnSnackbarMessageCb`

#### Returns

`void`

***

### setServerAbrFormats()

> **setServerAbrFormats**(`sabrFormats`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:177](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L177)

Sets the available SABR formats for streaming.

#### Parameters

##### sabrFormats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.

***

### setStreamingURL()

> **setStreamingURL**(`url?`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:159](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L159)

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

Defined in: [codeberg/googlevideo/src/core/SabrStreamingAdapter.ts:168](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStreamingAdapter.ts#L168)

Sets the ustreamer configuration for SABR requests.

#### Parameters

##### ustreamerConfig?

`string`

#### Returns

`void`

#### Throws

SabrAdapterError if the adapter has been disposed.
