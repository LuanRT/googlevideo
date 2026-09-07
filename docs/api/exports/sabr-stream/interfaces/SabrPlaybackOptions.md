[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrPlaybackOptions

# Interface: SabrPlaybackOptions

Defined in: [src/types/sabrStreamTypes.ts:114](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L114)

## Properties

### videoFormat?

> `optional` **videoFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:118](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L118)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### audioFormat?

> `optional` **audioFormat**: `number` \| [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| (`formats`) => [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md) \| `undefined`

Defined in: [src/types/sabrStreamTypes.ts:122](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L122)

Can be a format ID number, a SabrFormat object, or a function that selects a format from the available formats array.

***

### videoPreferences?

> `optional` **videoPreferences**: [`VideoFormatPreferences`](VideoFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:123](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L123)

***

### audioPreferences?

> `optional` **audioPreferences**: [`AudioFormatPreferences`](AudioFormatPreferences.md)

Defined in: [src/types/sabrStreamTypes.ts:124](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L124)

***

### maxRetries?

> `optional` **maxRetries**: `number`

Defined in: [src/types/sabrStreamTypes.ts:129](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L129)

Maximum number of retries for failed requests.

#### Default

```ts
10
```

***

### stallDetectionMs?

> `optional` **stallDetectionMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:134](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L134)

Duration in milliseconds after which a stall is detected if no progress is made.

#### Default

```ts
30_000
```

***

### enabledTrackTypes?

> `optional` **enabledTrackTypes**: [`EnabledTrackTypes`](../../utils/enumerations/EnabledTrackTypes.md)

Defined in: [src/types/sabrStreamTypes.ts:135](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L135)

***

### startTimeMs?

> `optional` **startTimeMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:136](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L136)

***

### isPostLiveDvr

> **isPostLiveDvr**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:137](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L137)

***

### snapshot?

> `optional` **snapshot**: [`SabrSnapshot`](SabrSnapshot.md)

Defined in: [src/types/sabrStreamTypes.ts:141](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L141)

If provided, the stream will attempt to continue from the given snapshot.
