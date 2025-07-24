[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:110](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L110)

Manages the download and processing of YouTube's Server-Adaptive Bitrate (SABR) streams.

This class handles the entire lifecycle of a SABR stream:
- Selecting appropriate video and audio formats.
- Making network requests to fetch media segments.
- Processing UMP parts in real-time.
- Handling server-side directives like redirects, context updates, and backoff policies.
- Emitting events for key stream updates, such as format initialization and errors.
- Providing separate `ReadableStream` instances for video and audio data.

## Extends

- [`EventEmitterLike`](../../utils/classes/EventEmitterLike.md)

## Constructors

### Constructor

> **new SabrStream**(`config`): `SabrStream`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:198](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L198)

#### Parameters

##### config

[`SabrStreamConfig`](../interfaces/SabrStreamConfig.md) = `{}`

#### Returns

`SabrStream`

#### Overrides

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`constructor`](../../utils/classes/EventEmitterLike.md#constructor)

## Methods

### abort()

> **abort**(): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:274](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L274)

Aborts the download process, closing all streams and cleaning up resources.
Emits an 'abort' event.

#### Returns

`void`

***

### addEventListener()

> **addEventListener**(`type`, `callback`, `options?`): `void`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.dom.d.ts:8876

Appends an event listener for events whose type attribute value is type. The callback argument sets the callback that will be invoked when the event is dispatched.

The options argument sets listener-specific options. For compatibility this can be a boolean, in which case the method behaves exactly as if the value was specified as options's capture.

When set to true, options's capture prevents callback from being invoked when the event's eventPhase attribute value is BUBBLING_PHASE. When false (or not present), callback will not be invoked when event's eventPhase attribute value is CAPTURING_PHASE. Either way, callback will be invoked if event's eventPhase attribute value is AT_TARGET.

When set to true, options's passive indicates that the callback will not cancel the event by invoking preventDefault(). This is used to enable performance optimizations described in § 2.8 Observing event listeners.

When set to true, options's once indicates that the callback will only be invoked once after which the event listener will be removed.

If an AbortSignal is passed for options's signal, then the event listener will be removed when signal is aborted.

The event listener is appended to target's event listener list and is not appended if it has the same type, callback, and capture.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/addEventListener)

#### Parameters

##### type

`string`

##### callback

`null` | `EventListenerOrEventListenerObject`

##### options?

`boolean` | `AddEventListenerOptions`

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`addEventListener`](../../utils/classes/EventEmitterLike.md#addeventlistener)

***

### dispatchEvent()

> **dispatchEvent**(`event`): `boolean`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.dom.d.ts:8882

Dispatches a synthetic event event to target and returns true if either event's cancelable attribute value is false or its preventDefault() method was not invoked, and false otherwise.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/dispatchEvent)

#### Parameters

##### event

`Event`

#### Returns

`boolean`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`dispatchEvent`](../../utils/classes/EventEmitterLike.md#dispatchevent)

***

### emit()

> **emit**(`type`, ...`args`): `void`

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:29](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L29)

#### Parameters

##### type

`string`

##### args

...`any`[]

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`emit`](../../utils/classes/EventEmitterLike.md#emit)

***

### getState()

> **getState**(): [`SabrStreamState`](../interfaces/SabrStreamState.md)

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:296](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L296)

Returns a serializable state object that can be used to restore the stream later.

#### Returns

[`SabrStreamState`](../interfaces/SabrStreamState.md)

The current state of the stream.

#### Throws

If the main format is not initialized.

***

### off()

> **off**(`type`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:59](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L59)

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`off`](../../utils/classes/EventEmitterLike.md#off)

***

### once()

#### Call Signature

> **once**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:189](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L189)

##### Parameters

###### event

`"formatInitialization"`

###### listener

(`initializedFormat`) => `void`

##### Returns

`void`

##### Overrides

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`once`](../../utils/classes/EventEmitterLike.md#once)

#### Call Signature

> **once**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:190](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L190)

##### Parameters

###### event

`"streamProtectionStatusUpdate"`

###### listener

(`data`) => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.once`

#### Call Signature

> **once**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:191](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L191)

##### Parameters

###### event

`"reloadPlayerResponse"`

###### listener

(`reloadPlaybackContext`) => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.once`

#### Call Signature

> **once**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:192](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L192)

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.once`

#### Call Signature

> **once**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:193](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L193)

##### Parameters

###### event

`"abort"`

###### listener

() => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.once`

***

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:67](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L67)

#### Parameters

##### type?

`string`

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeAllListeners`](../../utils/classes/EventEmitterLike.md#removealllisteners)

***

### removeEventListener()

> **removeEventListener**(`type`, `callback`, `options?`): `void`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.dom.d.ts:8888

Removes the event listener in target's event listener list with the same type, callback, and options.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/EventTarget/removeEventListener)

#### Parameters

##### type

`string`

##### callback

`null` | `EventListenerOrEventListenerObject`

##### options?

`boolean` | `EventListenerOptions`

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeEventListener`](../../utils/classes/EventEmitterLike.md#removeeventlistener)

***

### setClientInfo()

> **setClientInfo**(`clientInfo`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:266](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L266)

Sets the client information used in SABR requests.

#### Parameters

##### clientInfo

[`ClientInfo`](../../protos/interfaces/ClientInfo.md)

The client information object.

#### Returns

`void`

***

### setDurationMs()

> **setDurationMs**(`durationMs`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:242](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L242)

Sets the total duration of the stream in milliseconds.
This is optional as duration is often determined automatically from format metadata.

#### Parameters

##### durationMs

`number`

The duration in milliseconds.

#### Returns

`void`

***

### setPoToken()

> **setPoToken**(`poToken`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:225](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L225)

Sets Proof of Origin (PO) token.

#### Parameters

##### poToken

`string`

The base64-encoded token string.

#### Returns

`void`

***

### setServerAbrFormats()

> **setServerAbrFormats**(`formats`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:233](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L233)

Sets the available server ABR formats.

#### Parameters

##### formats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

An array of available SabrFormat objects.

#### Returns

`void`

***

### setStreamingURL()

> **setStreamingURL**(`url`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:250](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L250)

Sets the server ABR streaming URL for media requests.

#### Parameters

##### url

`string`

The streaming URL.

#### Returns

`void`

***

### setUstreamerConfig()

> **setUstreamerConfig**(`config`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:258](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L258)

Sets the Ustreamer configuration string.

#### Parameters

##### config

`string`

The Ustreamer configuration.

#### Returns

`void`

***

### start()

> **start**(`options`): `Promise`\<\{ `audioStream`: `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>; `selectedFormats`: `SelectedFormats`; `videoStream`: `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>; \}\>

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:331](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L331)

Initiates the streaming process for the selected formats.

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

Playback options, including format preferences and initial state.

#### Returns

`Promise`\<\{ `audioStream`: `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>; `selectedFormats`: `SelectedFormats`; `videoStream`: `ReadableStream`\<`Uint8Array`\<`ArrayBufferLike`\>\>; \}\>

A promise that resolves with the video/audio streams and selected formats.

#### Throws

If no suitable formats are found or streaming fails.

## Events

### on()

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:164](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L164)

Fired when the server sends initialization metadata for a media format.

##### Parameters

###### event

`"formatInitialization"`

###### listener

(`initializedFormat`) => `void`

##### Returns

`void`

##### Overrides

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`on`](../../utils/classes/EventEmitterLike.md#on)

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:169](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L169)

Fired when the server provides an update on the stream's content protection status.

##### Parameters

###### event

`"streamProtectionStatusUpdate"`

###### listener

(`data`) => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.on`

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:174](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L174)

Fired when the server directs the client to reload the player, usually indicating the current session is invalid.

##### Parameters

###### event

`"reloadPlayerResponse"`

###### listener

(`reloadPlaybackContext`) => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.on`

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:179](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L179)

Fired when the entire stream has been successfully downloaded.

##### Parameters

###### event

`"finish"`

###### listener

() => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.on`

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [codeberg/googlevideo/src/core/SabrStream.ts:184](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/SabrStream.ts#L184)

Fired when the download process is manually aborted via the `abort()` method.

##### Parameters

###### event

`"abort"`

###### listener

() => `void`

##### Returns

`void`

##### Overrides

`EventEmitterLike.on`
