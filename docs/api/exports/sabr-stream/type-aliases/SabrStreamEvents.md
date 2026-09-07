[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamEvents

# Type Alias: SabrStreamEvents

> **SabrStreamEvents** = `object`

Defined in: [src/types/sabrStreamTypes.ts:58](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L58)

## Properties

### formatInitialization()

> **formatInitialization**: (`track`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:59](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L59)

#### Parameters

##### track

[`TrackSegmentInfo`](../interfaces/TrackSegmentInfo.md)

#### Returns

`void`

***

### streamProtectionStatusUpdate()

> **streamProtectionStatusUpdate**: (`sps`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:60](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L60)

#### Parameters

##### sps

[`StreamProtectionStatus`](../../protos/interfaces/StreamProtectionStatus.md)

#### Returns

`void`

***

### liveMetadataUpdate()

> **liveMetadataUpdate**: (`liveMetadata`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:61](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L61)

#### Parameters

##### liveMetadata

[`SabrLiveMetadata`](../../protos/interfaces/SabrLiveMetadata.md)

#### Returns

`void`

***

### finish()

> **finish**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:62](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L62)

#### Returns

`void`

***

### abort()

> **abort**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:63](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L63)

#### Returns

`void`

***

### error()

> **error**: (`e`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:64](https://github.com/LuanRT/googlevideo/blob/58f92b7ba8fc252a510963f003088279a00d4ab0/src/types/sabrStreamTypes.ts#L64)

#### Parameters

##### e

`Error`

#### Returns

`void`
