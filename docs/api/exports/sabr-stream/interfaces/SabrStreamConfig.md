[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamConfig

# Interface: SabrStreamConfig

Defined in: [src/types/sabrStreamTypes.ts:6](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L6)

## Properties

### videoId

> **videoId**: `string`

Defined in: [src/types/sabrStreamTypes.ts:7](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L7)

***

### fetchFunction()?

> `optional` **fetchFunction**: (`input`, `init?`) => `Promise`\<`Response`\>

Defined in: [src/types/sabrStreamTypes.ts:12](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L12)

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

Defined in: [src/types/sabrStreamTypes.ts:13](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L13)

***

### videoPlaybackUstreamerConfig

> **videoPlaybackUstreamerConfig**: `string`

Defined in: [src/types/sabrStreamTypes.ts:14](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L14)

***

### heartbeatParams?

> `optional` **heartbeatParams**: [`HeartbeatParams`](HeartbeatParams.md)

Defined in: [src/types/sabrStreamTypes.ts:15](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L15)

***

### clientInfo

> **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamTypes.ts:16](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L16)

***

### poToken?

> `optional` **poToken**: `string`

Defined in: [src/types/sabrStreamTypes.ts:21](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L21)

Proof of Origin token. It is recommended to use [SabrStreamCallbacks.onMintPoToken](SabrStreamCallbacks.md#onmintpotoken) instead,
as the server may reject the provided token if it is expired or invalid.

***

### formats

> **formats**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

Defined in: [src/types/sabrStreamTypes.ts:22](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L22)

***

### callbacks?

> `optional` **callbacks**: [`SabrStreamCallbacks`](SabrStreamCallbacks.md)

Defined in: [src/types/sabrStreamTypes.ts:23](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L23)

***

### stripDuplicateInit?

> `optional` **stripDuplicateInit**: `boolean`

Defined in: [src/types/sabrStreamTypes.ts:28](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L28)

Whether to strip duplicate initialization headers (moov/EBML) from segments after the first one.

#### Default

```ts
true
```

***

### videoHighWaterMark?

> `optional` **videoHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:33](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L33)

#### Default

```ts
1024 * 1024 * 16
```

***

### audioHighWaterMark?

> `optional` **audioHighWaterMark**: `number`

Defined in: [src/types/sabrStreamTypes.ts:38](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L38)

#### Default

```ts
1024 * 1024 * 2
```
