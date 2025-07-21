[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamConfig

# Interface: SabrStreamConfig

Defined in: [src/types/sabrStreamTypes.ts:6](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L6)

## Properties

### clientInfo?

> `optional` **clientInfo**: [`ClientInfo`](../../protos/interfaces/ClientInfo.md)

Defined in: [src/types/sabrStreamTypes.ts:29](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L29)

Client information used to identify the requesting device/app.
Contains details like client name, version, and capabilities.

***

### durationMs?

> `optional` **durationMs**: `number`

Defined in: [src/types/sabrStreamTypes.ts:40](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L40)

Total duration of the media content in milliseconds.
If not provided, will be determined from format metadata.

***

### fetch()?

> `optional` **fetch**: \{(`input`, `init?`): `Promise`\<`Response`\>; (`input`, `init?`): `Promise`\<`Response`\>; \}

Defined in: [src/types/sabrStreamTypes.ts:11](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L11)

Custom fetch implementation to use for HTTP requests.
If not provided, the global `fetch` function will be used.

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

##### Parameters

###### input

`URL` | `RequestInfo`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

#### Call Signature

> (`input`, `init?`): `Promise`\<`Response`\>

[MDN Reference](https://developer.mozilla.org/docs/Web/API/fetch)

##### Parameters

###### input

`string` | `URL` | `Request`

###### init?

`RequestInit`

##### Returns

`Promise`\<`Response`\>

***

### formats?

> `optional` **formats**: [`SabrFormat`](../../../types/shared/interfaces/SabrFormat.md)[]

Defined in: [src/types/sabrStreamTypes.ts:45](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L45)

Array of available streaming formats obtained from the player response.

***

### poToken?

> `optional` **poToken**: `string`

Defined in: [src/types/sabrStreamTypes.ts:34](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L34)

Proof of Origin token for content protection verification.

***

### serverAbrStreamingUrl?

> `optional` **serverAbrStreamingUrl**: `string`

Defined in: [src/types/sabrStreamTypes.ts:17](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L17)

The URL endpoint for server-side ABR streaming requests.
This is typically obtained from the initial player response.

***

### videoPlaybackUstreamerConfig?

> `optional` **videoPlaybackUstreamerConfig**: `string`

Defined in: [src/types/sabrStreamTypes.ts:23](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/types/sabrStreamTypes.ts#L23)

Base64-encoded Ustreamer configuration obtained from the player response.
Required for authorizing and configuring the streaming session.
