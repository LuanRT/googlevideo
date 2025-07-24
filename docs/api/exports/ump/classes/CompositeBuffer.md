[googlevideo](../../../README.md) / [exports/ump](../README.md) / CompositeBuffer

# Class: CompositeBuffer

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:4](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L4)

A memory-efficient buffer that manages discontinuous chunks as a single logical stream.

## Constructors

### Constructor

> **new CompositeBuffer**(`chunks`): `CompositeBuffer`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:11](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L11)

#### Parameters

##### chunks

`Uint8Array`\<`ArrayBufferLike`\>[] = `[]`

#### Returns

`CompositeBuffer`

## Properties

### chunks

> **chunks**: `Uint8Array`\<`ArrayBufferLike`\>[]

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:5](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L5)

***

### currentChunkIndex

> **currentChunkIndex**: `number`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:7](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L7)

***

### currentChunkOffset

> **currentChunkOffset**: `number`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:6](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L6)

***

### currentDataView?

> `optional` **currentDataView**: `DataView`\<`ArrayBufferLike`\>

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:8](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L8)

***

### totalLength

> **totalLength**: `number`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:9](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L9)

## Methods

### append()

> **append**(`chunk`): `void`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:19](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L19)

#### Parameters

##### chunk

`CompositeBuffer` | `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### canReadBytes()

> **canReadBytes**(`position`, `length`): `boolean`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:68](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L68)

#### Parameters

##### position

`number`

##### length

`number`

#### Returns

`boolean`

***

### focus()

> **focus**(`position`): `void`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:77](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L77)

#### Parameters

##### position

`number`

#### Returns

`void`

***

### getLength()

> **getLength**(): `number`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:64](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L64)

#### Returns

`number`

***

### getUint8()

> **getUint8**(`position`): `number`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:72](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L72)

#### Parameters

##### position

`number`

#### Returns

`number`

***

### isFocused()

> **isFocused**(`position`): `boolean`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:93](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L93)

#### Parameters

##### position

`number`

#### Returns

`boolean`

***

### split()

> **split**(`position`): `object`

Defined in: [codeberg/googlevideo/src/core/CompositeBuffer.ts:38](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/CompositeBuffer.ts#L38)

#### Parameters

##### position

`number`

#### Returns

`object`

##### extractedBuffer

> **extractedBuffer**: `CompositeBuffer`

##### remainingBuffer

> **remainingBuffer**: `CompositeBuffer`
