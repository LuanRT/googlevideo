[googlevideo](../../../README.md) / [exports/sabr-stream](../README.md) / SabrStreamEvents

# Type Alias: SabrStreamEvents

> **SabrStreamEvents** = `object`

Defined in: [src/types/sabrStreamTypes.ts:67](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L67)

## Properties

### trackStateUpdate()

> **trackStateUpdate**: (`trackCollection`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:68](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L68)

#### Parameters

##### trackCollection

`TrackCollection`

#### Returns

`void`

***

### formatInitialization()

> **formatInitialization**: (`track`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:69](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L69)

#### Parameters

##### track

`Track`

#### Returns

`void`

***

### streamProtectionStatusUpdate()

> **streamProtectionStatusUpdate**: (`sps`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:70](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L70)

#### Parameters

##### sps

[`StreamProtectionStatus`](../../protos/interfaces/StreamProtectionStatus.md)

#### Returns

`void`

***

### liveMetadataUpdate()

> **liveMetadataUpdate**: (`liveMetadata`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:71](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L71)

#### Parameters

##### liveMetadata

[`SabrLiveMetadata`](../../protos/interfaces/SabrLiveMetadata.md)

#### Returns

`void`

***

### finish()

> **finish**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:72](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L72)

#### Returns

`void`

***

### abort()

> **abort**: () => `void`

Defined in: [src/types/sabrStreamTypes.ts:73](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L73)

#### Returns

`void`

***

### error()

> **error**: (`e`) => `void`

Defined in: [src/types/sabrStreamTypes.ts:74](https://github.com/LuanRT/googlevideo/blob/ff7eba6766cd0262c5179da378beb8f2c9e2fccd/src/types/sabrStreamTypes.ts#L74)

#### Parameters

##### e

`Error`

#### Returns

`void`
