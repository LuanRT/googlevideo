[googlevideo](../../../README.md) / [exports/protos](../README.md) / VideoPlaybackAbrRequest

# Interface: VideoPlaybackAbrRequest

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:18](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L18)

## Properties

### clientAbrState?

> `optional` **clientAbrState**: [`ClientAbrState`](ClientAbrState.md)

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:19](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L19)

***

### initializationFormatIds

> **initializationFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:20](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L20)

***

### bufferedRanges

> **bufferedRanges**: [`BufferedRange`](BufferedRange.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:21](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L21)

***

### mediaStartTimeMs?

> `optional` **mediaStartTimeMs**: `string`

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:22](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L22)

***

### videoPlaybackUstreamerConfig?

> `optional` **videoPlaybackUstreamerConfig**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:23](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L23)

***

### field6?

> `optional` **field6**: `UnknownMessage1`

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:24](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L24)

***

### selectedAudioFormatIds

> **selectedAudioFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:28](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L28)

@NOTE: This is the same as preferred_audio_format_ids (pai) on onesie reqs

***

### selectedVideoFormatIds

> **selectedVideoFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:30](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L30)

@NOTE: This is the same as preferred_video_format_ids (pvi) on onesie reqs

***

### selectedCaptionFormatIds

> **selectedCaptionFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:32](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L32)

@TODO: Check if onesie has an equivalent field for this

***

### streamerContext?

> `optional` **streamerContext**: [`StreamerContext`](StreamerContext.md)

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:33](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L33)

***

### serverStitchedDaiInfo?

> `optional` **serverStitchedDaiInfo**: [`ServerStitchedDaiInfo`](ServerStitchedDaiInfo.md)

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:34](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L34)

***

### lastVideoItag?

> `optional` **lastVideoItag**: `number`

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:35](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L35)

***

### lastAudioItag?

> `optional` **lastAudioItag**: `number`

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:36](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L36)

***

### ssapPlaybackInfos

> **ssapPlaybackInfos**: [`ServerStitchedDaiInfo`](ServerStitchedDaiInfo.md)[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:37](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L37)

***

### unusedBloatSizeBytes?

> `optional` **unusedBloatSizeBytes**: `Uint8Array`\<`ArrayBufferLike`\>

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:39](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L39)

@NOTE: What even is this? On web, it's only set if exp html5_sabr_unused_bloat_size_bytes > 0 (as `new Uint8Array(value_of_html5_sabr_unused_bloat_size_bytes_here)`)

***

### field1000

> **field1000**: `UnknownMessage2`[]

Defined in: [protos/generated/video\_streaming/video\_playback\_abr\_request.ts:40](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/protos/generated/video_streaming/video_playback_abr_request.ts#L40)
