[googlevideo](../../../README.md) / [exports/utils](../README.md) / BandwidthEstimator

# Class: BandwidthEstimator

Defined in: [src/utils/BandwidthEstimator.ts:9](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/BandwidthEstimator.ts#L9)

## Constructors

### Constructor

> **new BandwidthEstimator**(`options`): `BandwidthEstimator`

Defined in: [src/utils/BandwidthEstimator.ts:22](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/BandwidthEstimator.ts#L22)

#### Parameters

##### options

[`BandwidthEstimatorOptions`](../interfaces/BandwidthEstimatorOptions.md) = `{}`

#### Returns

`BandwidthEstimator`

## Methods

### reset()

> **reset**(): `void`

Defined in: [src/utils/BandwidthEstimator.ts:30](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/BandwidthEstimator.ts#L30)

#### Returns

`void`

***

### add()

> **add**(`bytes`, `seconds`): `void`

Defined in: [src/utils/BandwidthEstimator.ts:39](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/BandwidthEstimator.ts#L39)

Bytes received, and the seconds the network made us wait for them.

#### Parameters

##### bytes

`number`

##### seconds

`number`

#### Returns

`void`

***

### get()

> **get**(): `number`

Defined in: [src/utils/BandwidthEstimator.ts:65](https://github.com/LuanRT/googlevideo/blob/ea3179379410422390a41f237ef950f38869c4cf/src/utils/BandwidthEstimator.ts#L65)

Returns bytes/sec.
@NOTE: 0 until there's data...

#### Returns

`number`
