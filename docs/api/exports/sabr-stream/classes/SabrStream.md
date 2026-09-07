[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [src/core/SabrStream.ts:82](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L82)

## Extends

- [`EventEmitterLike`](../../utils/classes/EventEmitterLike.md)\<[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\>

## Constructors

### Constructor

> **new SabrStream**(`config`): `SabrStream`

Defined in: [src/core/SabrStream.ts:137](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L137)

#### Parameters

##### config

[`SabrStreamConfig`](../interfaces/SabrStreamConfig.md)

#### Returns

`SabrStream`

#### Overrides

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`constructor`](../../utils/classes/EventEmitterLike.md#constructor)

## Accessors

### isBusy

#### Get Signature

> **get** **isBusy**(): `boolean`

Defined in: [src/core/SabrStream.ts:163](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L163)

##### Returns

`boolean`

***

### isLive

#### Get Signature

> **get** **isLive**(): `boolean`

Defined in: [src/core/SabrStream.ts:167](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L167)

##### Returns

`boolean`

***

### isAborted

#### Get Signature

> **get** **isAborted**(): `boolean`

Defined in: [src/core/SabrStream.ts:171](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L171)

##### Returns

`boolean`

***

### hasErrored

#### Get Signature

> **get** **hasErrored**(): `boolean`

Defined in: [src/core/SabrStream.ts:175](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L175)

##### Returns

`boolean`

***

### videoEndTimeMs

#### Get Signature

> **get** **videoEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:179](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L179)

##### Returns

`number`

***

### audioEndTimeMs

#### Get Signature

> **get** **audioEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:183](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L183)

##### Returns

`number`

## Methods

### setStreamingURL()

> **setStreamingURL**(`url`): `void`

Defined in: [src/core/SabrStream.ts:187](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L187)

#### Parameters

##### url

`string`

#### Returns

`void`

***

### setUstreamerConfig()

> **setUstreamerConfig**(`config`): `void`

Defined in: [src/core/SabrStream.ts:192](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L192)

#### Parameters

##### config

`string`

#### Returns

`void`

***

### waitForIdle()

> **waitForIdle**(): `Promise`\<`void`\>

Defined in: [src/core/SabrStream.ts:196](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L196)

#### Returns

`Promise`\<`void`\>

***

### snapshot()

> **snapshot**(): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

Defined in: [src/core/SabrStream.ts:200](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L200)

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

***

### abort()

> **abort**(`options`): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

Defined in: [src/core/SabrStream.ts:209](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L209)

#### Parameters

##### options

[`AbortOptions`](../interfaces/AbortOptions.md) = `{}`

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

***

### start()

> **start**(`options`): [`StreamStartResult`](../interfaces/StreamStartResult.md)

Defined in: [src/core/SabrStream.ts:229](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/SabrStream.ts#L229)

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

#### Returns

[`StreamStartResult`](../interfaces/StreamStartResult.md)

***

### emit()

> **emit**\<`K`\>(`type`, ...`args`): `void`

Defined in: [src/utils/EventEmitterLike.ts:7](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/utils/EventEmitterLike.ts#L7)

#### Type Parameters

##### K

`K` *extends* keyof [`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)

#### Parameters

##### type

`K`

##### args

...`Parameters`\<[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\[`K`\]\>

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`emit`](../../utils/classes/EventEmitterLike.md#emit)

***

### on()

> **on**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:18](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/utils/EventEmitterLike.ts#L18)

#### Type Parameters

##### K

`K` *extends* keyof [`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)

#### Parameters

##### type

`K`

##### listener

[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\[`K`\]

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`on`](../../utils/classes/EventEmitterLike.md#on)

***

### once()

> **once**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:29](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/utils/EventEmitterLike.ts#L29)

#### Type Parameters

##### K

`K` *extends* keyof [`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)

#### Parameters

##### type

`K`

##### listener

[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\[`K`\]

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`once`](../../utils/classes/EventEmitterLike.md#once)

***

### off()

> **off**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:46](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/utils/EventEmitterLike.ts#L46)

#### Type Parameters

##### K

`K` *extends* keyof [`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)

#### Parameters

##### type

`K`

##### listener

[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\[`K`\]

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`off`](../../utils/classes/EventEmitterLike.md#off)

***

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [src/utils/EventEmitterLike.ts:72](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/utils/EventEmitterLike.ts#L72)

#### Parameters

##### type?

keyof SabrStreamEvents

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeAllListeners`](../../utils/classes/EventEmitterLike.md#removealllisteners)
