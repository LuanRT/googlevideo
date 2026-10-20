[googlevideo](../../../README.md) / [exports/utils](../README.md) / chooseFormat

# Function: chooseFormat()

> **chooseFormat**(`formats`, `formatOption`, `preferences`): [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/utils/formatUtils.ts:29](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/formatUtils.ts#L29)

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

#### hdr?

`boolean`

#### isAudio

`boolean`

## Returns

[`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`
