[googlevideo](../../../README.md) / [exports/utils](../README.md) / EventEmitterLike

# Class: EventEmitterLike

Defined in: [src/utils/EventEmitterLike.ts:22](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L22)

## Extends

- `EventTarget`

## Extended by

- [`SabrStream`](../../sabr-stream/classes/SabrStream.md)

## Constructors

### Constructor

> **new EventEmitterLike**(): `EventEmitterLike`

Defined in: [src/utils/EventEmitterLike.ts:25](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L25)

#### Returns

`EventEmitterLike`

#### Overrides

`EventTarget.constructor`

## Methods

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

`EventTarget.addEventListener`

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

`EventTarget.dispatchEvent`

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

***

### on()

> **on**(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:34](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L34)

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`void`

***

### once()

> **once**(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:46](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L46)

#### Parameters

##### type

`string`

##### listener

(...`args`) => `void`

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [src/utils/EventEmitterLike.ts:67](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/EventEmitterLike.ts#L67)

#### Parameters

##### type?

`string`

#### Returns

`void`

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

`EventTarget.removeEventListener`
