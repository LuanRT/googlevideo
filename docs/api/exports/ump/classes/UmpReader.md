[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpReader

# Class: UmpReader

Defined in: [src/core/UmpReader.ts:4](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L4)

## Constructors

### Constructor

> **new UmpReader**(`compositeBuffer`): `UmpReader`

Defined in: [src/core/UmpReader.ts:5](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L5)

#### Parameters

##### compositeBuffer

[`CompositeBuffer`](CompositeBuffer.md)

#### Returns

`UmpReader`

## Methods

### canReadFromCurrentChunk()

> **canReadFromCurrentChunk**(`offset`, `length`): `boolean`

Defined in: [src/core/UmpReader.ts:123](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L123)

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

Defined in: [src/core/UmpReader.ts:131](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L131)

Gets a DataView of the current chunk, creating it if necessary.

#### Returns

`DataView`

DataView for the current chunk.

***

### read()

> **read**(`handlePart`): `undefined` \| [`Part`](../../../types/shared/type-aliases/Part.md)

Defined in: [src/core/UmpReader.ts:12](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L12)

Parses parts from the buffer and calls the handler for each complete part.

#### Parameters

##### handlePart

(`part`) => `void`

Function called with each complete part.

#### Returns

`undefined` \| [`Part`](../../../types/shared/type-aliases/Part.md)

Partial part if parsing is incomplete, undefined otherwise.

***

### readVarInt()

> **readVarInt**(`offset`): \[`number`, `number`\]

Defined in: [src/core/UmpReader.ts:54](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpReader.ts#L54)

Reads a variable-length integer from the buffer.

#### Parameters

##### offset

`number`

Position to start reading from.

#### Returns

\[`number`, `number`\]

Tuple of [value, new offset] or [-1, offset] if incomplete.
