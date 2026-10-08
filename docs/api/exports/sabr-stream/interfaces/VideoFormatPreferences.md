[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / VideoFormatPreferences

# Interface: VideoFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:154](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L154)

## Properties

### quality?

> `optional` **quality**: `string`

Defined in: [src/types/sabrStreamTypes.ts:161](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L161)

Quality label.
If not provided, the highest quality format will be selected.

#### Example

```ts
'1080p', '720p', '480p', '360p', '240p', '144p'
```

#### Default

```ts
undefined
```

***

### container?

> `optional` **container**: `"webm"` \| `"mp4"`

Defined in: [src/types/sabrStreamTypes.ts:166](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L166)

Required container format.

#### Default

```ts
undefined
```

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec**: `"h264"` \| `"vp9"` \| `"av1"`

Defined in: [src/types/sabrStreamTypes.ts:171](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L171)

Video codec to prefer when available.

#### Default

```ts
undefined
```

***

### superResolution?

> `optional` **superResolution**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:172](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L172)
