[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrPlaybackOptions

# Interface: SabrPlaybackOptions

Defined in: [src/types/sabrStreamTypes.ts:124](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L124)

## Properties

### videoFormat?

> `optional` **videoFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:128](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L128)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### audioFormat?

> `optional` **audioFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:132](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L132)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### videoPreferences?

> `optional` **videoPreferences**: [`VideoFormatPreferences`](VideoFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:133](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L133)

***

### audioPreferences?

> `optional` **audioPreferences**: [`AudioFormatPreferences`](AudioFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:134](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L134)

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [src/types/sabrStreamTypes.ts:139](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L139)

Maximum number of retries for failed requests.

#### Default

```ts
10
```

***

### stallDetectionMs?

> `optional` **stallDetectionMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:144](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L144)

Duration in milliseconds after which a stall is detected if no progress is made.

#### Default

```ts
30_000
```

***

### enabledTrackTypes?

> `optional` **enabledTrackTypes**: [`EnabledTrackTypes`](../../utils/enumerations/EnabledTrackTypes.md)

Defined in: [src/types/sabrStreamTypes.ts:145](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L145)

***

### startTimeMs?

> `optional` **startTimeMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:146](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L146)

***

### isPostLiveDvr

> **isPostLiveDvr**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:147](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L147)

***

### snapshot?

> `optional` **snapshot**: [`SabrSnapshot`](SabrSnapshot.md)

Defined in: [src/types/sabrStreamTypes.ts:151](https://github.com/LuanRT/googlevideo/blob/0f94d39365204d13c853e2b8137b0a320832a4d2/src/types/sabrStreamTypes.ts#L151)

If provided, the stream will attempt to continue from the given snapshot.
