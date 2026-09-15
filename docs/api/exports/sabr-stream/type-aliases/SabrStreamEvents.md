[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamEvents

# Type Alias: SabrStreamEvents

> **SabrStreamEvents** = `object`

Defined in: [src/types/sabrStreamTypes.ts:59](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L59)

## Properties

### trackMetadataUpdate()

> **trackMetadataUpdate**: (`trackMetadata`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:60](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L60)

#### Parameters

##### trackMetadata

[`TrackMetadata`](../interfaces/TrackMetadata.md)

#### Returns

`void`

***

### formatInitialization()

> **formatInitialization**: (`track`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:61](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L61)

#### Parameters

##### track

[`TrackSegmentInfo`](../interfaces/TrackSegmentInfo.md)

#### Returns

`void`

***

### streamProtectionStatusUpdate()

> **streamProtectionStatusUpdate**: (`sps`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:62](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L62)

#### Parameters

##### sps

[`StreamProtectionStatus`](../../protos/interfaces/StreamProtectionStatus.md)

#### Returns

`void`

***

### liveMetadataUpdate()

> **liveMetadataUpdate**: (`liveMetadata`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:63](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L63)

#### Parameters

##### liveMetadata

[`SabrLiveMetadata`](../../protos/interfaces/SabrLiveMetadata.md)

#### Returns

`void`

***

### finish()

> **finish**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:64](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L64)

#### Returns

`void`

***

### abort()

> **abort**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:65](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L65)

#### Returns

`void`

***

### error()

> **error**: (`e`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:66](https://github.com/LuanRT/googlevideo/blob/480a1b05eace83e7d2a8cd7a5fcc07242319fddc/src/types/sabrStreamTypes.ts#L66)

#### Parameters

##### e

`Error`

#### Returns

`void`
