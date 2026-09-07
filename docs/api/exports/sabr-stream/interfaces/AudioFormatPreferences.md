[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AudioFormatPreferences

# Interface: AudioFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:165](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L165)

## Properties

### quality?

> `optional` **quality**: `"AUDIO_QUALITY_ULTRALOW"` \| `"AUDIO_QUALITY_LOW"` \| `"AUDIO_QUALITY_MEDIUM"` \| `"AUDIO_QUALITY_HIGH"`

Defined in: [src/types/sabrStreamTypes.ts:171](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L171)

Quality label.
If not provided, the highest quality format will be selected.

#### Default

```ts
undefined
```

***

### language?

> `optional` **language**: `string`

Defined in: [src/types/sabrStreamTypes.ts:176](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L176)

***

### container?

> `optional` **container**: `"webm"` \| `"mp4"`

Defined in: [src/types/sabrStreamTypes.ts:181](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L181)

Required container format.

#### Default

```ts
undefined
```

***

### preferredAudioCodec?

> `optional` **preferredAudioCodec**: `"aac"` \| `"opus"`

Defined in: [src/types/sabrStreamTypes.ts:186](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L186)

Audio codec to prefer when available.

#### Default

```ts
undefined
```

***

### voiceBoost?

> `optional` **voiceBoost**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:187](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L187)

***

### dynamicRangeCompression?

> `optional` **dynamicRangeCompression**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:188](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L188)
