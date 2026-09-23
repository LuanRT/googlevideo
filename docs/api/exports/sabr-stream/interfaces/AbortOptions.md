[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AbortOptions

# Interface: AbortOptions

Defined in: [src/types/sabrStreamTypes.ts:193](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L193)

## Properties

### snapshot?

> `optional` **snapshot**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:199](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L199)

If true, a snapshot will be created before aborting the stream.

#### NOTE

To keep the snapshot accurate, `abort` will wait until the stream is idle before aborting the stream.
