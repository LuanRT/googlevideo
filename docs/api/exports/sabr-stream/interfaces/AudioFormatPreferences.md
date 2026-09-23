[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AudioFormatPreferences

# Interface: AudioFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:167](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L167)

## Properties

### quality?

> `optional` **quality**: `"AUDIO_QUALITY_ULTRALOW"` \| `"AUDIO_QUALITY_LOW"` \| `"AUDIO_QUALITY_MEDIUM"` \| `"AUDIO_QUALITY_HIGH"`

Defined in: [src/types/sabrStreamTypes.ts:173](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L173)

Quality label.
If not provided, the highest quality format will be selected.

#### Default

```ts
undefined
```

***

### language?

> `optional` **language**: `string`

Defined in: [src/types/sabrStreamTypes.ts:178](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L178)

***

### container?

> `optional` **container**: `"webm"` \| `"mp4"`

Defined in: [src/types/sabrStreamTypes.ts:183](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L183)

Required container format.

#### Default

```ts
undefined
```

***

### preferredAudioCodec?

> `optional` **preferredAudioCodec**: `"aac"` \| `"opus"`

Defined in: [src/types/sabrStreamTypes.ts:188](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L188)

Audio codec to prefer when available.

#### Default

```ts
undefined
```

***

### voiceBoost?

> `optional` **voiceBoost**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:189](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L189)

***

### dynamicRangeCompression?

> `optional` **dynamicRangeCompression**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:190](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L190)
