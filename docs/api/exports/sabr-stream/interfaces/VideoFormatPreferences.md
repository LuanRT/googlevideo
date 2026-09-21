[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / VideoFormatPreferences

# Interface: VideoFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:146](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L146)

## Properties

### quality?

> `optional` **quality**: `string`

Defined in: [src/types/sabrStreamTypes.ts:153](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L153)

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

Defined in: [src/types/sabrStreamTypes.ts:158](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L158)

Required container format.

#### Default

```ts
undefined
```

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec**: `"h264"` \| `"vp9"` \| `"av1"`

Defined in: [src/types/sabrStreamTypes.ts:163](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L163)

Video codec to prefer when available.

#### Default

```ts
undefined
```

***

### superResolution?

> `optional` **superResolution**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:164](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L164)
