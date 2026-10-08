[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / AudioFormatPreferences

# Interface: AudioFormatPreferences

Defined in: [src/types/sabrStreamTypes.ts:175](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L175)

## Properties

### quality?

> `optional` **quality**: `"AUDIO_QUALITY_ULTRALOW"` \| `"AUDIO_QUALITY_LOW"` \| `"AUDIO_QUALITY_MEDIUM"` \| `"AUDIO_QUALITY_HIGH"`

Defined in: [src/types/sabrStreamTypes.ts:181](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L181)

Quality label.
If not provided, the highest quality format will be selected.

#### Default

```ts
undefined
```

***

### language?

> `optional` **language**: `string`

Defined in: [src/types/sabrStreamTypes.ts:186](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L186)

***

### container?

> `optional` **container**: `"webm"` \| `"mp4"`

Defined in: [src/types/sabrStreamTypes.ts:191](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L191)

Required container format.

#### Default

```ts
undefined
```

***

### preferredAudioCodec?

> `optional` **preferredAudioCodec**: `"aac"` \| `"opus"`

Defined in: [src/types/sabrStreamTypes.ts:196](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L196)

Audio codec to prefer when available.

#### Default

```ts
undefined
```

***

### voiceBoost?

> `optional` **voiceBoost**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:197](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L197)

***

### dynamicRangeCompression?

> `optional` **dynamicRangeCompression**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:198](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L198)
