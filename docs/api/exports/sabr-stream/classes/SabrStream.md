[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [src/core/SabrStream.ts:106](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L106)

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

Defined in: [src/core/SabrStream.ts:194](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L194)

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

Defined in: [src/core/SabrStream.ts:270](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L270)

Aborts the download process, closing all streams and cleaning up resources.
Emits an 'abort' event.

#### Returns

`void`

***

### addEventListener()

> **addEventListener**(`type`, `callback`, `options?`): `void`

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:8303

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

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:8309

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

Defined in: [src/utils/EventEmitterLike.ts:29](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L29)

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

Defined in: [src/core/SabrStream.ts:292](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L292)

Returns a serializable state object that can be used to restore the stream later.

#### Returns

[`SabrStreamState`](../interfaces/SabrStreamState.md)

The current state of the stream.

#### Throws

If the main format is not initialized.

***

### off()

> **off**(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:59](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L59)

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

Defined in: [src/core/SabrStream.ts:185](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L185)

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

Defined in: [src/core/SabrStream.ts:186](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L186)

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

Defined in: [src/core/SabrStream.ts:187](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L187)

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

Defined in: [src/core/SabrStream.ts:188](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L188)

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

Defined in: [src/core/SabrStream.ts:189](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L189)

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

Defined in: [src/utils/EventEmitterLike.ts:67](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L67)

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

Defined in: node\_modules/typescript/lib/lib.dom.d.ts:8315

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

Defined in: [src/core/SabrStream.ts:262](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L262)

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

Defined in: [src/core/SabrStream.ts:238](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L238)

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

Defined in: [src/core/SabrStream.ts:221](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L221)

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

Defined in: [src/core/SabrStream.ts:229](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L229)

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

Defined in: [src/core/SabrStream.ts:246](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L246)

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

Defined in: [src/core/SabrStream.ts:254](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L254)

Sets the Ustreamer configuration string.

#### Parameters

##### config

`string`

The Ustreamer configuration.

#### Returns

`void`

***

### start()

> **start**(`options`): `Promise`\<\{ `audioStream`: `ReadableStream`\<`Uint8Array`\>; `selectedFormats`: `SelectedFormats`; `videoStream`: `ReadableStream`\<`Uint8Array`\>; \}\>

Defined in: [src/core/SabrStream.ts:327](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L327)

Initiates the streaming process for the selected formats.

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

Playback options, including format preferences and initial state.

#### Returns

`Promise`\<\{ `audioStream`: `ReadableStream`\<`Uint8Array`\>; `selectedFormats`: `SelectedFormats`; `videoStream`: `ReadableStream`\<`Uint8Array`\>; \}\>

A promise that resolves with the video/audio streams and selected formats.

#### Throws

If no suitable formats are found or streaming fails.

## Events

### on()

#### Call Signature

> **on**(`event`, `listener`): `void`

Defined in: [src/core/SabrStream.ts:160](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L160)

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

Defined in: [src/core/SabrStream.ts:165](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L165)

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

Defined in: [src/core/SabrStream.ts:170](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L170)

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

Defined in: [src/core/SabrStream.ts:175](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L175)

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

Defined in: [src/core/SabrStream.ts:180](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/SabrStream.ts#L180)

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
