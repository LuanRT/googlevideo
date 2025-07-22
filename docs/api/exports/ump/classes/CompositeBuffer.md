[googlevideo](../../../README.md) / [exports/ump](../README.md) / CompositeBuffer

# Class: CompositeBuffer

Defined in: [src/core/CompositeBuffer.ts:1](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L1)

## Constructors

### Constructor

> **new CompositeBuffer**(`chunks`): `CompositeBuffer`

Defined in: [src/core/CompositeBuffer.ts:8](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L8)

#### Parameters

##### chunks

`Uint8Array`[] = `[]`

#### Returns

`CompositeBuffer`

## Properties

### chunks

> **chunks**: `Uint8Array`[]

Defined in: [src/core/CompositeBuffer.ts:2](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L2)

***

### currentChunkIndex

> **currentChunkIndex**: `number`

Defined in: [src/core/CompositeBuffer.ts:4](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L4)

***

### currentChunkOffset

> **currentChunkOffset**: `number`

Defined in: [src/core/CompositeBuffer.ts:3](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L3)

***

### currentDataView?

> `optional` **currentDataView**: `DataView`

Defined in: [src/core/CompositeBuffer.ts:5](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L5)

***

### totalLength

> **totalLength**: `number`

Defined in: [src/core/CompositeBuffer.ts:6](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L6)

## Methods

### append()

> **append**(`chunk`): `void`

Defined in: [src/core/CompositeBuffer.ts:16](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L16)

#### Parameters

##### chunk

`CompositeBuffer` | `Uint8Array`

#### Returns

`void`

***

### canReadBytes()

> **canReadBytes**(`position`, `length`): `boolean`

Defined in: [src/core/CompositeBuffer.ts:65](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L65)

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

Defined in: [src/core/CompositeBuffer.ts:74](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L74)

#### Parameters

##### position

`number`

#### Returns

`void`

***

### getLength()

> **getLength**(): `number`

Defined in: [src/core/CompositeBuffer.ts:61](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L61)

#### Returns

`number`

***

### getUint8()

> **getUint8**(`position`): `number`

Defined in: [src/core/CompositeBuffer.ts:69](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L69)

#### Parameters

##### position

`number`

#### Returns

`number`

***

### isFocused()

> **isFocused**(`position`): `boolean`

Defined in: [src/core/CompositeBuffer.ts:90](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L90)

#### Parameters

##### position

`number`

#### Returns

`boolean`

***

### split()

> **split**(`position`): `object`

Defined in: [src/core/CompositeBuffer.ts:35](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/core/CompositeBuffer.ts#L35)

#### Parameters

##### position

`number`

#### Returns

`object`

##### extractedBuffer

> **extractedBuffer**: `CompositeBuffer`

##### remainingBuffer

> **remainingBuffer**: `CompositeBuffer`
