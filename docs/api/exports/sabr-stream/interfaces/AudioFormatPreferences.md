[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AudioFormatPreferences

# Interface: AudioFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:176](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L176)

## Properties

### quality?

> `optional` **quality**: `"AUDIO_QUALITY_ULTRALOW"` \| `"AUDIO_QUALITY_LOW"` \| `"AUDIO_QUALITY_MEDIUM"` \| `"AUDIO_QUALITY_HIGH"`

Defined in: [src/types/sabrStreamTypes.ts:182](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L182)

Quality label.
If not provided, the highest quality format will be selected.

#### Default

```ts
undefined
```

***

### language?

> `optional` **language**: `string`

Defined in: [src/types/sabrStreamTypes.ts:187](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L187)

***

### container?

> `optional` **container**: `"webm"` \| `"mp4"`

Defined in: [src/types/sabrStreamTypes.ts:192](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L192)

Required container format.

#### Default

```ts
undefined
```

***

### preferredAudioCodec?

> `optional` **preferredAudioCodec**: `"aac"` \| `"opus"`

Defined in: [src/types/sabrStreamTypes.ts:197](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L197)

Audio codec to prefer when available.

#### Default

```ts
undefined
```

***

### voiceBoost?

> `optional` **voiceBoost**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:198](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L198)

***

### dynamicRangeCompression?

> `optional` **dynamicRangeCompression**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:199](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/types/sabrStreamTypes.ts#L199)
