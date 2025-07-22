[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrPlaybackOptions

# Interface: SabrPlaybackOptions

Defined in: [src/types/sabrStreamTypes.ts:48](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L48)

## Properties

### audioFormat?

> `optional` **audioFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => `undefined` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

Defined in: [src/types/sabrStreamTypes.ts:59](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L59)

Audio format selection, can be a format ID number, a SabrFormat object,
or a function that selects a format from the available formats array.

***

### audioLanguage?

> `optional` **audioLanguage**: `string`

Defined in: [src/types/sabrStreamTypes.ts:79](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L79)

Preferred audio language code.

***

### audioQuality?

> `optional` **audioQuality**: `string`

Defined in: [src/types/sabrStreamTypes.ts:69](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L69)

Preferred audio quality (e.g., "high", "medium").

***

### enabledTrackTypes?

> `optional` **enabledTrackTypes**: [`EnabledTrackTypes`](../../utils/enumerations/EnabledTrackTypes.md)

Defined in: [src/types/sabrStreamTypes.ts:117](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L117)

Enabled track types for streaming (audio only, video only, or both).

#### See

EnabledTrackTypes

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [src/types/sabrStreamTypes.ts:105](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L105)

Maximum number of retry attempts when fetching segments.
Default is 10.

***

### preferH264?

> `optional` **preferH264**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:94](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L94)

Whether to prefer H.264 video codec.

***

### preferMP4?

> `optional` **preferMP4**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:89](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L89)

Whether to prefer MP4 container format.

***

### preferOpus?

> `optional` **preferOpus**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:99](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L99)

Whether to prefer Opus audio codec.

***

### preferWebM?

> `optional` **preferWebM**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:84](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L84)

Whether to prefer WebM container format.

***

### stallDetectionMs?

> `optional` **stallDetectionMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:111](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L111)

Duration in milliseconds after which a stall is detected if no progress is made.
Default is 30000 (30 seconds).

***

### state?

> `optional` **state**: [`SabrStreamState`](SabrStreamState.md)

Defined in: [src/types/sabrStreamTypes.ts:122](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L122)

Previously saved state to resume a download.

***

### videoFormat?

> `optional` **videoFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => `undefined` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)

Defined in: [src/types/sabrStreamTypes.ts:53](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L53)

Video format selection, can be a format ID number, a SabrFormat object,
or a function that selects a format from the available formats array.

***

### videoLanguage?

> `optional` **videoLanguage**: `string`

Defined in: [src/types/sabrStreamTypes.ts:74](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L74)

Preferred video language code.

***

### videoQuality?

> `optional` **videoQuality**: `string`

Defined in: [src/types/sabrStreamTypes.ts:64](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/types/sabrStreamTypes.ts#L64)

Preferred video quality (e.g., "1080p", "720p").
