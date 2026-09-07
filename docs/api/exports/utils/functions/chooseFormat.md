[googlevideo](../../../README.md) / [exports/utils](../README.md) / chooseFormat

# Function: chooseFormat()

> **chooseFormat**(`formats`, `formatOption`, `preferences`): [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: src/utils/formatUtils.ts:31

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
