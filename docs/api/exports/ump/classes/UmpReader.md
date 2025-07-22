[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpReader

# Class: UmpReader

Defined in: [src/core/UmpReader.ts:7](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L7)

A parser that efficiently processes chunked UMP binary data.

## Constructors

### Constructor

> **new UmpReader**(`compositeBuffer`): `UmpReader`

Defined in: [src/core/UmpReader.ts:8](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L8)

#### Parameters

##### compositeBuffer

[`CompositeBuffer`](CompositeBuffer.md)

#### Returns

`UmpReader`

## Methods

### canReadFromCurrentChunk()

> **canReadFromCurrentChunk**(`offset`, `length`): `boolean`

Defined in: [src/core/UmpReader.ts:126](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L126)

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

Defined in: [src/core/UmpReader.ts:134](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L134)

Gets a DataView of the current chunk, creating it if necessary.

#### Returns

`DataView`

DataView for the current chunk.

***

### read()

> **read**(`handlePart`): `undefined` \| [`Part`](../../../types/shared/type-aliases/Part.md)

Defined in: [src/core/UmpReader.ts:15](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L15)

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

Defined in: [src/core/UmpReader.ts:57](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/core/UmpReader.ts#L57)

Reads a variable-length integer from the buffer.

#### Parameters

##### offset

`number`

Position to start reading from.

#### Returns

\[`number`, `number`\]

Tuple of [value, new offset] or [-1, offset] if incomplete.
