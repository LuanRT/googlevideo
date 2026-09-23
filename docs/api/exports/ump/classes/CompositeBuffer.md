[googlevideo](../../../README.md) / [exports/ump](../README.md) / CompositeBuffer

# Class: CompositeBuffer

Defined in: [src/core/CompositeBuffer.ts:6](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L6)

A memory efficient buffer that manages discontinuous chunks as a single stream.

## NOTE

Based on https://gist.github.com/LuanRT/02d7eab589fb4080cd16e97f6dccf06f

## Constructors

### Constructor

> **new CompositeBuffer**(`chunks`): `CompositeBuffer`

Defined in: [src/core/CompositeBuffer.ts:13](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L13)

#### Parameters

##### chunks

`Uint8Array`\<`ArrayBufferLike`\>[] = `[]`

#### Returns

`CompositeBuffer`

## Properties

### chunks

> **chunks**: `Uint8Array`\<`ArrayBufferLike`\>[]

Defined in: [src/core/CompositeBuffer.ts:7](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L7)

***

### currentChunkOffset

> **currentChunkOffset**: `number`

Defined in: [src/core/CompositeBuffer.ts:8](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L8)

***

### currentChunkIndex

> **currentChunkIndex**: `number`

Defined in: [src/core/CompositeBuffer.ts:9](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L9)

***

### currentDataView?

> `optional` **currentDataView**: `DataView`\<`ArrayBufferLike`\>

Defined in: [src/core/CompositeBuffer.ts:10](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L10)

***

### totalLength

> **totalLength**: `number`

Defined in: [src/core/CompositeBuffer.ts:11](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L11)

## Methods

### append()

> **append**(`data`): `void`

Defined in: [src/core/CompositeBuffer.ts:28](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L28)

Appends a chunk or all chunks from another CompositeBuffer to this buffer.
Chunks using the same `ArrayBuffer` are merged into a single `Uint8Array` to reduce memory usage and keep the number of chunks low.

#### Parameters

##### data

A `Uint8Array` to append, or another `CompositeBuffer` whose chunks will be appended individually.

`CompositeBuffer` | `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`void`

***

### split()

> **split**(`position`): `object`

Defined in: [src/core/CompositeBuffer.ts:51](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L51)

Splits this buffer at a specified position.

#### Parameters

##### position

`number`

Offset at which to split the buffer.

#### Returns

`object`

Obj containing the bytes before `position` as `extractedBuffer` and the bytes from `position` onward as `remainingBuffer`.

| Name | Type | Defined in |
| ------ | ------ | ------ |
| `extractedBuffer` | `CompositeBuffer` | [src/core/CompositeBuffer.ts:51](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L51) |
| `remainingBuffer` | `CompositeBuffer` | [src/core/CompositeBuffer.ts:51](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L51) |

***

### getLength()

> **getLength**(): `number`

Defined in: [src/core/CompositeBuffer.ts:71](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L71)

#### Returns

`number`

***

### canReadBytes()

> **canReadBytes**(`position`, `length`): `boolean`

Defined in: [src/core/CompositeBuffer.ts:75](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L75)

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

Defined in: [src/core/CompositeBuffer.ts:82](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L82)

Reads a single unsigned byte at the given position.

#### Parameters

##### position

`number`

#### Returns

`number`

***

### focus()

> **focus**(`position`): `void`

Defined in: [src/core/CompositeBuffer.ts:92](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L92)

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

Defined in: [src/core/CompositeBuffer.ts:110](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/core/CompositeBuffer.ts#L110)

Checks whether the internal focus already covers the specified position.

#### Parameters

##### position

`number`

#### Returns

`boolean`

`true` if `position` is within the currently focused chunk.
