[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrPlaybackConfig

# Interface: SabrPlaybackConfig

Defined in: [src/types/sabrStreamTypes.ts:116](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L116)

## Properties

### videoFormat?

> `optional` **videoFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:120](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L120)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### audioFormat?

> `optional` **audioFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:124](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L124)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### videoPreferences?

> `optional` **videoPreferences**: [`VideoFormatPreferences`](VideoFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:125](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L125)

***

### audioPreferences?

> `optional` **audioPreferences**: [`AudioFormatPreferences`](AudioFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:126](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L126)

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [src/types/sabrStreamTypes.ts:131](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L131)

Maximum number of retries for failed requests.

#### Default

```ts
10
```

***

### stallDetectionMs?

> `optional` **stallDetectionMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:136](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L136)

Duration in milliseconds after which a stall is detected if no progress is made.

#### Default

```ts
30_000
```

***

### enabledTrackTypes?

> `optional` **enabledTrackTypes**: [`EnabledTrackTypes`](../../utils/enumerations/EnabledTrackTypes.md)

Defined in: [src/types/sabrStreamTypes.ts:137](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L137)

***

### startTimeMs?

> `optional` **startTimeMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:138](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L138)

***

### isPostLiveDvr

> **isPostLiveDvr**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:139](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L139)

***

### snapshot?

> `optional` **snapshot**: [`SabrSnapshot`](SabrSnapshot.md)

Defined in: [src/types/sabrStreamTypes.ts:143](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/types/sabrStreamTypes.ts#L143)

If provided, the stream will attempt to continue from the given snapshot.
