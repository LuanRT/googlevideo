[googlevideo](../../../README.md) / [exports/utils](../README.md) / EventEmitterLike

# Class: EventEmitterLike\<Events\>

Defined in: [src/utils/EventEmitterLike.ts:3](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L3)

## Extended by

- [`SabrStream`](../../sabr-stream/classes/SabrStream.md)

## Type Parameters

### Events

`Events` *extends* `Record`\<`string`, `Listener`\>

## Constructors

### Constructor

> **new EventEmitterLike**\<`Events`\>(): `EventEmitterLike`\<`Events`\>

#### Returns

`EventEmitterLike`\<`Events`\>

## Methods

### emit()

> **emit**\<`K`\>(`type`, ...`args`): `void`

Defined in: [src/utils/EventEmitterLike.ts:7](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L7)

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`K`

##### args

...`Parameters`\<`Events`\[`K`\]\>

#### Returns

`void`

***

### on()

> **on**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:18](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L18)

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`K`

##### listener

`Events`\[`K`\]

#### Returns

`void`

***

### once()

> **once**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:29](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L29)

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`K`

##### listener

`Events`\[`K`\]

#### Returns

`void`

***

### off()

> **off**\<`K`\>(`type`, `listener`): `void`

Defined in: [src/utils/EventEmitterLike.ts:46](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L46)

#### Type Parameters

##### K

`K` *extends* `string` \| `number` \| `symbol`

#### Parameters

##### type

`K`

##### listener

`Events`\[`K`\]

#### Returns

`void`

***

### removeAllListeners()

> **removeAllListeners**(`type?`): `void`

Defined in: [src/utils/EventEmitterLike.ts:72](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/utils/EventEmitterLike.ts#L72)

#### Parameters

##### type?

keyof `Events`

#### Returns

`void`
