[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamConfig

# Interface: SabrStreamConfig

Defined in: [src/types/sabrStreamTypes.ts:7](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L7)

## Properties

### videoId

> **videoId**: `string`

Defined in: [src/types/sabrStreamTypes.ts:8](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L8)

***

### fetchFunction()?

> `optional` **fetchFunction**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/types/sabrStreamTypes.ts:13](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L13)

Custom fetch implementation to use for HTTP requests.
If not provided, the global `fetch` function will be used.

[MDN Reference](https://developer.mozilla.org/docs/Web/API/Window/fetch)

#### Parameters

##### input

`URL` | `RequestInfo`

##### init?

`RequestInit`

#### Returns

`Promise`\<`Response`\>

***

### serverAbrStreamingUrl

> **serverAbrStreamingUrl**: `string`

Defined in: [src/types/sabrStreamTypes.ts:14](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L14)

***

### videoPlaybackUstreamerConfig

> **videoPlaybackUstreamerConfig**: `string`

Defined in: [src/types/sabrStreamTypes.ts:15](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L15)

***

### heartbeatParams?

> `optional` **heartbeatParams**: [`HeartbeatParams`](HeartbeatParams.md)

Defined in: [src/types/sabrStreamTypes.ts:16](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L16)

***

### clientInfo

> **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamTypes.ts:17](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L17)

***

### poToken?

> `optional` **poToken**: `string`

Defined in: [src/types/sabrStreamTypes.ts:22](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L22)

Proof of Origin token. It is recommended to use [SabrStreamCallbacks.onMintPoToken](SabrStreamCallbacks.md#onmintpotoken) instead,
as the server may reject the provided token if it is expired or invalid.

***

### formats

> **formats**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

Defined in: [src/types/sabrStreamTypes.ts:23](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L23)

***

### callbacks?

> `optional` **callbacks**: [`SabrStreamCallbacks`](SabrStreamCallbacks.md)

Defined in: [src/types/sabrStreamTypes.ts:24](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L24)

***

### stripDuplicateInit?

> `optional` **stripDuplicateInit**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:29](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L29)

Whether to strip duplicate initialization headers (moov/EBML) from segments after the first one.

#### Default

```ts
true
```

***

### videoHighWaterMark?

> `optional` **videoHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:34](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L34)

#### Default

```ts
1024 * 1024 * 16
```

***

### audioHighWaterMark?

> `optional` **audioHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:39](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L39)

#### Default

```ts
1024 * 1024 * 2
```
