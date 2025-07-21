[googlevideo](../../../../../README.md) / [exports/utils](../../../README.md) / [FormatKeyUtils](../README.md) / createSegmentCacheKey

# Function: createSegmentCacheKey()

> **createSegmentCacheKey**(`mediaHeader`, `format?`): `string`

Defined in: [src/utils/formatKeyUtils.ts:47](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/formatKeyUtils.ts#L47)

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
