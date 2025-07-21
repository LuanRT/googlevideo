[googlevideo](../../../../../README.md) / [exports/utils](../../../README.md) / [FormatKeyUtils](../README.md) / createSegmentCacheKey

# Function: createSegmentCacheKey()

> **createSegmentCacheKey**(`mediaHeader`, `format?`): `string`

Defined in: [src/utils/formatKeyUtils.ts:47](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/utils/formatKeyUtils.ts#L47)

Creates a segment cache key.

## Parameters

### mediaHeader

[`MediaHeader`](../../../../protos/interfaces/MediaHeader.md)

The MediaHeader object.

### format?

[`SabrFormat`](../../../../../types/shared/interfaces/SabrFormat.md)

Format object (needed for init segments.)

## Returns

`string`

A string key for caching segments.
