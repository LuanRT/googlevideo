[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / PlayerHttpResponse

# Interface: PlayerHttpResponse

Defined in: [src/types/sabrStreamingAdapterTypes.ts:75](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L75)

## Properties

### data?

> `optional` **data**: `ArrayBuffer` \| `ArrayBufferView`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:79](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L79)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [src/types/sabrStreamingAdapterTypes.ts:78](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L78)

***

### makeRequest()

> **makeRequest**: (`url`, `headers`) => `Promise`\<`Omit`\<`PlayerHttpResponse`, `"makeRequest"`\>\>

Defined in: [src/types/sabrStreamingAdapterTypes.ts:80](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L80)

#### Parameters

##### url

`string`

##### headers

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`Omit`\<`PlayerHttpResponse`, `"makeRequest"`\>\>

***

### method

> **method**: `string`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:77](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L77)

***

### url

> **url**: `string`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:76](https://github.com/LuanRT/googlevideo/blob/d9eb9db82e3516a9a277a77a3d25342e9c5bf127/src/types/sabrStreamingAdapterTypes.ts#L76)
