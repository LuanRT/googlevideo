[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [src/core/SabrStream.ts:77](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L77)

## Extends

- [`EventEmitterLike`](../../utils/classes/EventEmitterLike.md)\<[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\>

## Constructors

### Constructor

> **new SabrStream**(`config`): `SabrStream`

Defined in: [src/core/SabrStream.ts:131](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L131)

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

Defined in: [src/core/SabrStream.ts:157](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L157)

##### Returns

`boolean`

***

### isLive

#### Get Signature

> **get** **isLive**(): `boolean`

Defined in: [src/core/SabrStream.ts:161](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L161)

##### Returns

`boolean`

***

### isAborted

#### Get Signature

> **get** **isAborted**(): `boolean`

Defined in: [src/core/SabrStream.ts:165](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L165)

##### Returns

`boolean`

***

### hasErrored

#### Get Signature

> **get** **hasErrored**(): `boolean`

Defined in: [src/core/SabrStream.ts:169](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L169)

##### Returns

`boolean`

***

### videoEndTimeMs

#### Get Signature

> **get** **videoEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:173](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L173)

##### Returns

`number`

***

### audioEndTimeMs

#### Get Signature

> **get** **audioEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:177](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L177)

##### Returns

`number`

***

### livePlaybackLatencyMs

#### Get Signature

> **get** **livePlaybackLatencyMs**(): `number` \| `undefined`

Defined in: [src/core/SabrStream.ts:181](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L181)

##### Returns

`number` \| `undefined`

## Methods

### setStreamingURL()

> **setStreamingURL**(`url`): `void`

Defined in: [src/core/SabrStream.ts:191](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L191)

#### Parameters

##### url

`string`

#### Returns

`void`

***

### setUstreamerConfig()

> **setUstreamerConfig**(`config`): `void`

Defined in: [src/core/SabrStream.ts:196](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L196)

#### Parameters

##### config

`string`

#### Returns

`void`

***

### waitForIdle()

> **waitForIdle**(): `Promise`\<`void`\>

Defined in: [src/core/SabrStream.ts:200](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L200)

#### Returns

`Promise`\<`void`\>

***

### snapshot()

> **snapshot**(): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

Defined in: [src/core/SabrStream.ts:204](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L204)

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

***

### abort()

> **abort**(`options`): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

Defined in: [src/core/SabrStream.ts:213](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L213)

#### Parameters

##### options

[`AbortOptions`](../interfaces/AbortOptions.md) = `{}`

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

***

### start()

> **start**(`options`): [`StreamStartResult`](../interfaces/StreamStartResult.md)

Defined in: [src/core/SabrStream.ts:233](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/SabrStream.ts#L233)

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

#### Returns

[`StreamStartResult`](../interfaces/StreamStartResult.md)

***

### emit()

> **emit**\<`K`\>(`type`, ...`args`): `void`

Defined in: [src/utils/EventEmitterLike.ts:7](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/EventEmitterLike.ts#L7)

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

Defined in: [src/utils/EventEmitterLike.ts:17](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/EventEmitterLike.ts#L17)

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

Defined in: [src/utils/EventEmitterLike.ts:28](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/EventEmitterLike.ts#L28)

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

Defined in: [src/utils/EventEmitterLike.ts:45](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/EventEmitterLike.ts#L45)

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

Defined in: [src/utils/EventEmitterLike.ts:70](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/EventEmitterLike.ts#L70)

#### Parameters

##### type?

keyof SabrStreamEvents

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeAllListeners`](../../utils/classes/EventEmitterLike.md#removealllisteners)
