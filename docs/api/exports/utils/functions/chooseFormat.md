[googlevideo](../../../README.md) / [exports/utils](../README.md) / chooseFormat

# Function: chooseFormat()

> **chooseFormat**(`formats`, `formatOption`, `preferences`): [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/utils/formatUtils.ts:28](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/utils/formatUtils.ts#L28)

## Parameters

### formats

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

### formatOption

`number` | [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) | (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined` | `undefined`

### preferences

#### quality?

`string`

#### language?

`string`

#### container?

`"webm"` \| `"mp4"`

#### preferredVideoCodec?

`"h264"` \| `"vp9"` \| `"av1"`

#### preferredAudioCodec?

`"aac"` \| `"opus"`

#### voiceBoost?

`boolean`

#### dynamicRangeCompression?

`boolean`

#### superResolution?

`boolean`

#### isAudio

`boolean`

## Returns

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`
