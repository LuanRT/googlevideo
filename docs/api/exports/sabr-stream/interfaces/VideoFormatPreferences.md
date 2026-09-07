[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / VideoFormatPreferences

# Interface: VideoFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:144](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L144)

## Properties

### quality?

> `optional` **quality**: `string`

Defined in: [src/types/sabrStreamTypes.ts:151](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L151)

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

Defined in: [src/types/sabrStreamTypes.ts:156](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L156)

Required container format.

#### Default

```ts
undefined
```

***

### preferredVideoCodec?

> `optional` **preferredVideoCodec**: `"h264"` \| `"vp9"` \| `"av1"`

Defined in: [src/types/sabrStreamTypes.ts:161](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L161)

Video codec to prefer when available.

#### Default

```ts
undefined
```

***

### superResolution?

> `optional` **superResolution**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:162](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L162)
