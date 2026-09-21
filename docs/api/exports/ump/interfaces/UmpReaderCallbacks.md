[googlevideo](../../../README.md) / [exports/ump](../README.md) / UmpReaderCallbacks

# Interface: UmpReaderCallbacks

Defined in: [src/core/UmpReader.ts:4](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L4)

## Methods

### onPart()

> **onPart**(`type`, `data`): `void` \| `Promise`\<`void`\>

Defined in: [src/core/UmpReader.ts:8](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L8)

Called when a complete UMP part is available.

#### Parameters

##### type

[`UMPPartId`](../../protos/enumerations/UMPPartId.md)

##### data

[`CompositeBuffer`](../classes/CompositeBuffer.md)

#### Returns

`void` \| `Promise`\<`void`\>

***

### onPartialPart()?

> `optional` **onPartialPart**(`type`, `chunk`, `offset`, `totalSize`): `boolean`

Defined in: [src/core/UmpReader.ts:12](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/core/UmpReader.ts#L12)

Only use this if you wish to handle partial UMP parts yourself.

#### Parameters

##### type

[`UMPPartId`](../../protos/enumerations/UMPPartId.md)

##### chunk

[`CompositeBuffer`](../classes/CompositeBuffer.md)

##### offset

`number`

##### totalSize

`number`

#### Returns

`boolean`
