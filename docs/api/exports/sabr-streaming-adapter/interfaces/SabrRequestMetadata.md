[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / SabrRequestMetadata

# Interface: SabrRequestMetadata

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:19](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L19)

## Properties

### byteRange?

> `optional` **byteRange**: `object`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:20](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L20)

#### end

> **end**: `number`

#### start

> **start**: `number`

***

### error?

> `optional` **error**: `object`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:37](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L37)

#### sabrError?

> `optional` **sabrError**: [`SabrError`](../../protos/interfaces/SabrError.md)

***

### format?

> `optional` **format**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:21](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L21)

***

### isInit?

> `optional` **isInit**: `boolean`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:22](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L22)

***

### isSABR?

> `optional` **isSABR**: `boolean`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:24](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L24)

***

### isUMP?

> `optional` **isUMP**: `boolean`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:23](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L23)

***

### streamInfo?

> `optional` **streamInfo**: `object`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:25](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L25)

#### formatInitMetadata?

> `optional` **formatInitMetadata**: [`FormatInitializationMetadata`](../../protos/interfaces/FormatInitializationMetadata.md)[]

#### mediaHeader?

> `optional` **mediaHeader**: [`MediaHeader`](../../protos/interfaces/MediaHeader.md)

#### nextRequestPolicy?

> `optional` **nextRequestPolicy**: [`NextRequestPolicy`](../../protos/interfaces/NextRequestPolicy.md)

#### playbackCookie?

> `optional` **playbackCookie**: [`PlaybackCookie`](../../protos/interfaces/PlaybackCookie.md)

#### redirect?

> `optional` **redirect**: [`SabrRedirect`](../../protos/interfaces/SabrRedirect.md)

#### reloadPlaybackContext?

> `optional` **reloadPlaybackContext**: [`ReloadPlaybackContext`](../../protos/interfaces/ReloadPlaybackContext.md)

#### sabrContextSendingPolicy?

> `optional` **sabrContextSendingPolicy**: [`SabrContextSendingPolicy`](../../protos/interfaces/SabrContextSendingPolicy.md)

#### sabrContextUpdate?

> `optional` **sabrContextUpdate**: [`SabrContextUpdate`](../../protos/interfaces/SabrContextUpdate.md)

#### snackbarMessage?

> `optional` **snackbarMessage**: [`SnackbarMessage`](../../protos/interfaces/SnackbarMessage.md)

#### streamProtectionStatus?

> `optional` **streamProtectionStatus**: [`StreamProtectionStatus`](../../protos/interfaces/StreamProtectionStatus.md)

***

### timestamp

> **timestamp**: `number`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:40](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L40)
