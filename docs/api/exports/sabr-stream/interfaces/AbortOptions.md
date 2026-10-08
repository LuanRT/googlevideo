[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AbortOptions

# Interface: AbortOptions

Defined in: [src/types/sabrStreamTypes.ts:201](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L201)

## Properties

### snapshot?

> `optional` **snapshot**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:207](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L207)

If true, a snapshot will be created before aborting the stream.

#### NOTE

To keep the snapshot accurate, `abort` will wait until the stream is idle before aborting the stream.
