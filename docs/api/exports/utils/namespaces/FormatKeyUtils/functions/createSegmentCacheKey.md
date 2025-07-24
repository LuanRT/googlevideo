[googlevideo](../../../../../README.md) / [exports/utils](../../../README.md) / [FormatKeyUtils](../README.md) / createSegmentCacheKey

# Function: createSegmentCacheKey()

> **createSegmentCacheKey**(`mediaHeader`, `format?`): `string`

Defined in: [codeberg/googlevideo/src/utils/formatKeyUtils.ts:47](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/formatKeyUtils.ts#L47)

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
