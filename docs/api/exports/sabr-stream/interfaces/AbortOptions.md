[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AbortOptions

# Interface: AbortOptions

Defined in: [src/types/sabrStreamTypes.ts:202](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/types/sabrStreamTypes.ts#L202)

## Properties

### snapshot?

> `optional` **snapshot**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:208](https://github.com/LuanRT/googlevideo/blob/96d1418984d00ac2797a1dafe4625d1368b5b9aa/src/types/sabrStreamTypes.ts#L208)

If true, a snapshot will be created before aborting the stream.

#### NOTE

To keep the snapshot accurate, `abort` will wait until the stream is idle before aborting the stream.
