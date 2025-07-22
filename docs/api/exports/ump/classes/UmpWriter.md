[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpWriter

# Class: UmpWriter

Defined in: [src/core/UmpWriter.ts:3](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpWriter.ts#L3)

## Constructors

### Constructor

> **new UmpWriter**(`compositeBuffer`): `UmpWriter`

Defined in: [src/core/UmpWriter.ts:4](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpWriter.ts#L4)

#### Parameters

##### compositeBuffer

[`CompositeBuffer`](CompositeBuffer.md)

#### Returns

`UmpWriter`

## Methods

### write()

> **write**(`partType`, `partData`): `void`

Defined in: [src/core/UmpWriter.ts:13](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/UmpWriter.ts#L13)

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
