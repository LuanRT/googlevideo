[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AbortOptions

# Interface: AbortOptions

Defined in: [src/types/sabrStreamTypes.ts:201](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L201)

## Properties

### snapshot?

> `optional` **snapshot**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:207](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L207)

If true, a snapshot will be created before aborting the stream.

#### NOTE

To keep the snapshot accurate, `abort` will wait until the stream is idle before aborting the stream.
