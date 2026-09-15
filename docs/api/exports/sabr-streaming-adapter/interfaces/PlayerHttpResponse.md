[googlevideo](../../../README.md) / [exports/sabr-streaming-adapter](../README.md) / PlayerHttpResponse

# Interface: PlayerHttpResponse

Defined in: [src/types/sabrStreamingAdapterTypes.ts:79](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L79)

## Properties

### url

> **url**: `string`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:80](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L80)

***

### method

> **method**: `string`

Defined in: [src/types/sabrStreamingAdapterTypes.ts:81](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L81)

***

### headers

> **headers**: `Record`\<`string`, `string`\>

Defined in: [src/types/sabrStreamingAdapterTypes.ts:82](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L82)

***

### data?

> `optional` **data**: `ArrayBuffer` \| `ArrayBufferView`\<`ArrayBufferLike`\>

Defined in: [src/types/sabrStreamingAdapterTypes.ts:83](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L83)

***

### makeRequest()

> **makeRequest**: (`url`, `headers`) => `Promise`\<`Omit`\<`PlayerHttpResponse`, `"makeRequest"`\>\>

Defined in: [src/types/sabrStreamingAdapterTypes.ts:84](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamingAdapterTypes.ts#L84)

#### Parameters

##### url

`string`

##### headers

`Record`\<`string`, `string`\>

#### Returns

`Promise`\<`Omit`\<`PlayerHttpResponse`, `"makeRequest"`\>\>
