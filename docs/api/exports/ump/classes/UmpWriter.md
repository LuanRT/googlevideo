[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpWriter

# Class: UmpWriter

Defined in: [codeberg/googlevideo/src/core/UmpWriter.ts:6](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/UmpWriter.ts#L6)

A serialization module that encodes data into the UMP binary format with proper type and size encoding.

## Constructors

### Constructor

> **new UmpWriter**(`compositeBuffer`): `UmpWriter`

Defined in: [codeberg/googlevideo/src/core/UmpWriter.ts:7](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/UmpWriter.ts#L7)

#### Parameters

##### compositeBuffer

[`CompositeBuffer`](CompositeBuffer.md)

#### Returns

`UmpWriter`

## Methods

### write()

> **write**(`partType`, `partData`): `void`

Defined in: [codeberg/googlevideo/src/core/UmpWriter.ts:16](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/core/UmpWriter.ts#L16)

Writes a part to the buffer.

#### Parameters

##### partType

`number`

The type of the part.

##### partData

`Uint8Array`

The data of the part.

#### Returns

`void`
