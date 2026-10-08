[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStream

# Class: SabrStream

Defined in: [src/core/SabrStream.ts:74](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L74)

## Extends

- [`EventEmitterLike`](../../utils/classes/EventEmitterLike.md)\<[`SabrStreamEvents`](../type-aliases/SabrStreamEvents.md)\>

## Constructors

### Constructor

> **new SabrStream**(`config`): `SabrStream`

Defined in: [src/core/SabrStream.ts:124](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L124)

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

Defined in: [src/core/SabrStream.ts:148](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L148)

##### Returns

`boolean`

***

### isLive

#### Get Signature

> **get** **isLive**(): `boolean`

Defined in: [src/core/SabrStream.ts:152](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L152)

##### Returns

`boolean`

***

### isAborted

#### Get Signature

> **get** **isAborted**(): `boolean`

Defined in: [src/core/SabrStream.ts:156](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L156)

##### Returns

`boolean`

***

### isErrored

#### Get Signature

> **get** **isErrored**(): `boolean`

Defined in: [src/core/SabrStream.ts:160](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L160)

##### Returns

`boolean`

***

### videoEndTimeMs

#### Get Signature

> **get** **videoEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:164](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L164)

##### Returns

`number`

***

### audioEndTimeMs

#### Get Signature

> **get** **audioEndTimeMs**(): `number`

Defined in: [src/core/SabrStream.ts:168](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L168)

##### Returns

`number`

***

### livePlaybackLatencyMs

#### Get Signature

> **get** **livePlaybackLatencyMs**(): `number` \| `undefined`

Defined in: [src/core/SabrStream.ts:172](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L172)

##### Returns

`number` \| `undefined`

## Methods

### setStreamingURL()

> **setStreamingURL**(`url`): `void`

Defined in: [src/core/SabrStream.ts:177](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L177)

#### Parameters

##### url

`string`

#### Returns

`void`

***

### setUstreamerConfig()

> **setUstreamerConfig**(`config`): `void`

Defined in: [src/core/SabrStream.ts:182](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L182)

#### Parameters

##### config

`string`

#### Returns

`void`

***

### waitForIdle()

> **waitForIdle**(): `Promise`\<`void`\>

Defined in: [src/core/SabrStream.ts:186](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L186)

#### Returns

`Promise`\<`void`\>

***

### snapshot()

> **snapshot**(): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

Defined in: [src/core/SabrStream.ts:190](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L190)

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md)\>

***

### abort()

> **abort**(`options`): `Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

Defined in: [src/core/SabrStream.ts:198](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L198)

#### Parameters

##### options

[`AbortOptions`](../interfaces/AbortOptions.md) = `{}`

#### Returns

`Promise`\<[`SabrSnapshot`](../interfaces/SabrSnapshot.md) \| `undefined`\>

***

### start()

> **start**(`options`): [`StreamStartResult`](../interfaces/StreamStartResult.md)

Defined in: [src/core/SabrStream.ts:215](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/core/SabrStream.ts#L215)

#### Parameters

##### options

[`SabrPlaybackOptions`](../interfaces/SabrPlaybackOptions.md)

#### Returns

[`StreamStartResult`](../interfaces/StreamStartResult.md)

***

### emit()

> **emit**\<`K`\>(`type`, ...`args`): `void`

Defined in: [src/utils/EventEmitterLike.ts:7](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/EventEmitterLike.ts#L7)

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

Defined in: [src/utils/EventEmitterLike.ts:17](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/EventEmitterLike.ts#L17)

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

Defined in: [src/utils/EventEmitterLike.ts:28](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/EventEmitterLike.ts#L28)

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

Defined in: [src/utils/EventEmitterLike.ts:45](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/EventEmitterLike.ts#L45)

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

Defined in: [src/utils/EventEmitterLike.ts:70](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/utils/EventEmitterLike.ts#L70)

#### Parameters

##### type?

keyof SabrStreamEvents

#### Returns

`void`

#### Inherited from

[`EventEmitterLike`](../../utils/classes/EventEmitterLike.md).[`removeAllListeners`](../../utils/classes/EventEmitterLike.md#removealllisteners)
