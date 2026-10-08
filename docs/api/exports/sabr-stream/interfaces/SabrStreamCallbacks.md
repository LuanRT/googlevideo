[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamCallbacks

# Interface: SabrStreamCallbacks

Defined in: [src/types/sabrStreamTypes.ts:50](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L50)

## Properties

### onCheckHeartbeat()?

> `optional` **onCheckHeartbeat**: (`innertubeRequestBody`) => `Promise`\<[`HeartbeatResponse`](HeartbeatResponse.md)\>

Defined in: [src/types/sabrStreamTypes.ts:51](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L51)

#### Parameters

##### innertubeRequestBody

[`HeartbeatRequest`](HeartbeatRequest.md)

#### Returns

`Promise`\<[`HeartbeatResponse`](HeartbeatResponse.md)\>

***

### onReloadPlayerResponse()?

> `optional` **onReloadPlayerResponse**: (`context`) => `Promise`\<[`ReloadResponse`](ReloadResponse.md)\>

Defined in: [src/types/sabrStreamTypes.ts:52](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L52)

#### Parameters

##### context

[`ReloadPlaybackContext`](../../protos/interfaces/ReloadPlaybackContext.md)

#### Returns

`Promise`\<[`ReloadResponse`](ReloadResponse.md)\>

***

### onMintPoToken()?

> `optional` **onMintPoToken**: () => `Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>

Defined in: [src/types/sabrStreamTypes.ts:53](https://github.com/LuanRT/googlevideo/blob/ce631b320a9c7ebeea096c18def2635a02e80b3c/src/types/sabrStreamTypes.ts#L53)

#### Returns

`Promise`\<`Uint8Array`\<`ArrayBufferLike`\>\>
