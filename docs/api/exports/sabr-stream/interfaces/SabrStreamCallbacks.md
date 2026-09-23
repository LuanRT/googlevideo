[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamCallbacks

# Interface: SabrStreamCallbacks

Defined in: [src/types/sabrStreamTypes.ts:42](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L42)

## Properties

### onCheckHeartbeat()?

> `optional` **onCheckHeartbeat**: (`innertubeRequestBody`) => `Promise`\<[`HeartbeatResponse`](HeartbeatResponse.md)\>

Defined in: [src/types/sabrStreamTypes.ts:43](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L43)

#### Parameters

##### innertubeRequestBody

[`HeartbeatRequest`](HeartbeatRequest.md)

#### Returns

`Promise`\<[`HeartbeatResponse`](HeartbeatResponse.md)\>

***

### onReloadPlayerResponse()?

> `optional` **onReloadPlayerResponse**: (`context`) => `Promise`\<[`ReloadResponse`](ReloadResponse.md)\>

Defined in: [src/types/sabrStreamTypes.ts:44](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L44)

#### Parameters

##### context

[`ReloadPlaybackContext`](../../protos/interfaces/ReloadPlaybackContext.md)

#### Returns

`Promise`\<[`ReloadResponse`](ReloadResponse.md)\>

***

### onMintPoToken()?

> `optional` **onMintPoToken**: () => `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [src/types/sabrStreamTypes.ts:45](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/types/sabrStreamTypes.ts#L45)

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>
