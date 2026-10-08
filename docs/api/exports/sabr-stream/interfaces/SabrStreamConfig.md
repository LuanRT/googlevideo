[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamConfig

# Interface: SabrStreamConfig

Defined in: [src/types/sabrStreamTypes.ts:15](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L15)

## Properties

### videoId

> **videoId**: `string`

Defined in: [src/types/sabrStreamTypes.ts:16](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L16)

***

### fetchFunction()?

> `optional` **fetchFunction**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/types/sabrStreamTypes.ts:21](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L21)

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

Defined in: [src/types/sabrStreamTypes.ts:22](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L22)

***

### videoPlaybackUstreamerConfig

> **videoPlaybackUstreamerConfig**: `string`

Defined in: [src/types/sabrStreamTypes.ts:23](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L23)

***

### heartbeatParams?

> `optional` **heartbeatParams**: [`HeartbeatParams`](HeartbeatParams.md)

Defined in: [src/types/sabrStreamTypes.ts:24](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L24)

***

### clientInfo

> **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamTypes.ts:25](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L25)

***

### poToken?

> `optional` **poToken**: `string`

Defined in: [src/types/sabrStreamTypes.ts:30](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L30)

Proof of Origin token. It is recommended to use [SabrStreamCallbacks.onMintPoToken](SabrStreamCallbacks.md#onmintpotoken) instead,
as the server may reject the provided token if it is expired or invalid.

***

### formats

> **formats**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

Defined in: [src/types/sabrStreamTypes.ts:31](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L31)

***

### callbacks?

> `optional` **callbacks**: [`SabrStreamCallbacks`](SabrStreamCallbacks.md)

Defined in: [src/types/sabrStreamTypes.ts:32](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L32)

***

### stripDuplicateInit?

> `optional` **stripDuplicateInit**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:37](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L37)

Whether to strip duplicate initialization headers (moov/EBML) from segments after the first one.

#### Default

```ts
true
```

***

### videoHighWaterMark?

> `optional` **videoHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:42](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L42)

#### Default

```ts
1024 * 1024 * 16
```

***

### audioHighWaterMark?

> `optional` **audioHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:47](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L47)

#### Default

```ts
1024 * 1024 * 2
```
