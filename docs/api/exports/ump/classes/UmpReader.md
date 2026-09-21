[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpReader

# Class: UmpReader

Defined in: [src/core/UmpReader.ts:20](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L20)

An efficient UMP reader.

## NOTE

Based on https://gist.github.com/LuanRT/7c8c79fa558f2430f0b85b09f8a9d818

## Constructors

### Constructor

> **new UmpReader**(`callbacks`): `UmpReader`

Defined in: [src/core/UmpReader.ts:27](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L27)

#### Parameters

##### callbacks

[`UmpReaderCallbacks`](../interfaces/UmpReaderCallbacks.md)

#### Returns

`UmpReader`

## Methods

### feed()

> **feed**(`chunk`): `Promise`\<`void`\>

Defined in: [src/core/UmpReader.ts:31](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L31)

#### Parameters

##### chunk

[`CompositeBuffer`](CompositeBuffer.md) | `Uint8Array`\<`ArrayBufferLike`\>

#### Returns

`Promise`\<`void`\>

***

### readVarInt()

> **readVarInt**(`offset`): \[`number`, `number`\]

Defined in: [src/core/UmpReader.ts:103](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L103)

Reads a specific varint from the current buffer offset.

#### Parameters

##### offset

`number`

#### Returns

\[`number`, `number`\]

[decodedValue, updatedOffset] or [-1, originalOffset] if incomplete.

***

### canReadFromCurrentChunk()

> **canReadFromCurrentChunk**(`offset`, `length`): `boolean`

Defined in: [src/core/UmpReader.ts:178](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L178)

Checks if the specified bytes can be read from the current chunk.

#### Parameters

##### offset

`number`

Position to start reading from.

##### length

`number`

Number of bytes to read.

#### Returns

`boolean`

True if bytes can be read from current chunk, false otherwise.

***

### getCurrentDataView()

> **getCurrentDataView**(): `DataView`

Defined in: [src/core/UmpReader.ts:187](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L187)

Gets a DataView of the current chunk, creating it if necessary.

#### Returns

`DataView`

DataView for the current chunk.

***

### dispose()

> **dispose**(): `void`

Defined in: [src/core/UmpReader.ts:199](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L199)

#### Returns

`void`
