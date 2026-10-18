[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [src/core/SabrStream.ts:75](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L75)

## Extends

- [`EventEmitterLike`](../../utils/classes/EventEmitterLike.md)\<[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\>

## Constructors

### Constructor

> **new SabrStream**(`config`): `SabrStream`

Defined in: [src/core/SabrStream.ts:130](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L130)

#### Parameters

##### config

[`SabrStreamConfig`](../interfaces/SabrStreamConfig.md)

#### Returns

`SabrStream`

#### Overrides

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`constructor`](../../utils/classes/EventEmitterLike.md#constructor)

## Accessors

### isLive

#### Get Signature

> **get** **isLive**(): `boolean`

Defined in: [src/core/SabrStream.ts:155](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L155)

##### Returns

`boolean`

***

### isBusy

#### Get Signature

> **get** **isBusy**(): `boolean`

Defined in: [src/core/SabrStream.ts:159](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L159)

##### Returns

`boolean`

***

### isAborted

#### Get Signature

> **get** **isAborted**(): `boolean`

Defined in: [src/core/SabrStream.ts:163](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L163)

##### Returns

`boolean`

***

### isErrored

#### Get Signature

> **get** **isErrored**(): `boolean`

Defined in: [src/core/SabrStream.ts:167](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L167)

##### Returns

`boolean`

***

### videoEndTimeMs

#### Get Signature

> **get** **videoEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:171](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L171)

##### Returns

`number`

***

### audioEndTimeMs

#### Get Signature

> **get** **audioEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:175](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L175)

##### Returns

`number`

***

### livePlaybackLatencyMs

#### Get Signature

> **get** **livePlaybackLatencyMs**(): `number` \| `undefined`

Defined in: [src/core/SabrStream.ts:179](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L179)

##### Returns

`number` \| `undefined`

***

### streamingURL

#### Get Signature

> **get** **streamingURL**(): `URL`

Defined in: [src/core/SabrStream.ts:184](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L184)

##### Returns

`URL`

## Methods

### setStreamingURL()

> **setStreamingURL**(`url`): `void`

Defined in: [src/core/SabrStream.ts:189](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L189)

#### Parameters

##### url

`string` | `URL`

#### Returns

`void`

***

### setUstreamerConfig()

> **setUstreamerConfig**(`config`): `void`

Defined in: [src/core/SabrStream.ts:195](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L195)

#### Parameters

##### config

`string`

#### Returns

`void`

***

### waitForIdle()

> **waitForIdle**(): `Promise`\<`void`\>

Defined in: [src/core/SabrStream.ts:199](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L199)

#### Returns

`Promise`\<`void`\>

***

### snapshot()

> **snapshot**(): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

Defined in: [src/core/SabrStream.ts:205](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L205)

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

***

### abort()

> **abort**(`options`): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

Defined in: [src/core/SabrStream.ts:213](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L213)

#### Parameters

##### options

[`AbortOptions`](../interfaces/AbortOptions.md) = `{}`

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

***

### start()

> **start**(`options`): [`StreamStartResult`](../interfaces/StreamStartResult.md)

Defined in: [src/core/SabrStream.ts:230](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/core/SabrStream.ts#L230)

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

#### Returns

[`StreamStartResult`](../interfaces/StreamStartResult.md)

***

### emit()

> **emit**\<`K`\>(`type`, ...`args`): `void`

Defined in: [src/utils/EventEmitterLike.ts:7](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/utils/EventEmitterLike.ts#L7)

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

Defined in: [src/utils/EventEmitterLike.ts:17](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/utils/EventEmitterLike.ts#L17)

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

Defined in: [src/utils/EventEmitterLike.ts:28](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/utils/EventEmitterLike.ts#L28)

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

Defined in: [src/utils/EventEmitterLike.ts:45](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/utils/EventEmitterLike.ts#L45)

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

Defined in: [src/utils/EventEmitterLike.ts:70](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/utils/EventEmitterLike.ts#L70)

#### Parameters

##### type?

keyof SabrStreamEvents

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeAllListeners`](../../utils/classes/EventEmitterLike.md#removealllisteners)
