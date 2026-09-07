[googlevideo](../../../README.md) / [exports/ump](../README.md) / CompositeBuffer

# Class: CompositeBuffer

Defined in: [src/core/CompositeBuffer.ts:6](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L6)

A memory efficient buffer that manages discontinuous chunks as a single stream.

## NOTE

Based on https://gist.github.com/LuanRT/02d7eab589fb4080cd16e97f6dccf06f

## Constructors

### Constructor

> **new CompositeBuffer**(`chunks`): `CompositeBuffer`

Defined in: [src/core/CompositeBuffer.ts:13](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L13)

#### Parameters

##### chunks

`Uint8Array`\<`ArrayBufferLike`\>[] = `[]`

#### Returns

`CompositeBuffer`

## Properties

### chunks

> **chunks**: `Uint8Array`\<`ArrayBufferLike`\>[]

Defined in: [src/core/CompositeBuffer.ts:7](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L7)

***

### currentChunkOffset

> **currentChunkOffset**: `number`

Defined in: [src/core/CompositeBuffer.ts:8](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L8)

***

### currentChunkIndex

> **currentChunkIndex**: `number`

Defined in: [src/core/CompositeBuffer.ts:9](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L9)

***

### currentDataView?

> `optional` **currentDataView**: `DataView`\<`ArrayBufferLike`\>

Defined in: [src/core/CompositeBuffer.ts:10](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L10)

***

### totalLength

> **totalLength**: `number`

Defined in: [src/core/CompositeBuffer.ts:11](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L11)

## Methods

### append()

> **append**(`chunk`): `void`

Defined in: [src/core/CompositeBuffer.ts:26](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L26)

Appends a chunk or all chunks from another CompositeBuffer to this buffer.
Chunks using the same `ArrayBuffer` are merged into a single `Uint8Array` to reduce memory usage and keep the number of chunks low.

#### Parameters

##### chunk

A `Uint8Array` to append, or another `CompositeBuffer` whose chunks will be appended individually.

`CompositeBuffer` | `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### split()

> **split**(`position`): `object`

Defined in: [src/core/CompositeBuffer.ts:50](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L50)

Splits this buffer at a specified position.

#### Parameters

##### position

`number`

Offset at which to split the buffer.

#### Returns

`object`

Obj containing the bytes before `position` as `extractedBuffer` and the bytes from `position` onward as `remainingBuffer`.

##### extractedBuffer

> **extractedBuffer**: `CompositeBuffer`

##### remainingBuffer

> **remainingBuffer**: `CompositeBuffer`

***

### getLength()

> **getLength**(): `number`

Defined in: [src/core/CompositeBuffer.ts:72](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L72)

#### Returns

`number`

***

### canReadBytes()

> **canReadBytes**(`position`, `length`): `boolean`

Defined in: [src/core/CompositeBuffer.ts:76](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L76)

#### Parameters

##### position

`number`

##### length

`number`

#### Returns

`boolean`

***

### getUint8()

> **getUint8**(`position`): `number`

Defined in: [src/core/CompositeBuffer.ts:83](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L83)

Reads a single unsigned byte at the given position.

#### Parameters

##### position

`number`

#### Returns

`number`

***

### focus()

> **focus**(`position`): `void`

Defined in: [src/core/CompositeBuffer.ts:93](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L93)

Moves the internal focus to the chunk containing the specified position.
If the position is before the currently focused chunk, focus is reset first.
Cached `currentDataView` is also invalidated.

#### Parameters

##### position

`number`

#### Returns

`void`

***

### isFocused()

> **isFocused**(`position`): `boolean`

Defined in: [src/core/CompositeBuffer.ts:111](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/core/CompositeBuffer.ts#L111)

Checks whether the internal focus already covers the specified position.

#### Parameters

##### position

`number`

#### Returns

`boolean`

`true` if `position` is within the currently focused chunk.
