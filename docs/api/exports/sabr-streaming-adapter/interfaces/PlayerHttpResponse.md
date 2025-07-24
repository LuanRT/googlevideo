[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / PlayerHttpResponse

# Interface: PlayerHttpResponse

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:75](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L75)

## Properties

### data?

> `optional` **data**: `ArrayBuffer` \| `ArrayBufferView`\<`ArrayBufferLike`\>

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:79](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L79)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:78](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L78)

***

### makeRequest()

> **makeRequest**: (`url`, `headers`) => `Promise`\<`Omit`\<`PlayerHttpResponse`, `"makeRequest"`\>\>

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:80](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L80)

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

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:77](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L77)

***

### url

> **url**: `string`

Defined in: [codeberg/googlevideo/src/types/sabrStreamingAdapterTypes.ts:76](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/types/sabrStreamingAdapterTypes.ts#L76)
