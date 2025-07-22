[googlevideo](../../../README.md) / [exports/utils](../README.md) / Logger

# Class: Logger

Defined in: [src/utils/Logger.ts:10](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L10)

## Constructors

### Constructor

> **new Logger**(): `Logger`

#### Returns

`Logger`

## Methods

### debug()

> **debug**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:82](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L82)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### error()

> **error**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:70](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L70)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### getLogLevels()

> **getLogLevels**(): `Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

Defined in: [src/utils/Logger.ts:46](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L46)

Gets the current set of active log levels.

#### Returns

`Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

A new Set containing the active LogLevel enums.

***

### info()

> **info**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:78](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L78)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### setLogLevels()

> **setLogLevels**(...`levels`): `void`

Defined in: [src/utils/Logger.ts:27](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L27)

Sets the active log levels.
Call with LogLevel.NONE or no arguments to turn off all logging.
Otherwise, specify one or more log levels to be active.
Use LogLevel.ALL to enable all log levels.

#### Parameters

##### levels

...[`LogLevel`](../enumerations/LogLevel.md)[]

#### Returns

`void`

***

### warn()

> **warn**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:74](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L74)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### getInstance()

> `static` **getInstance**(): `Logger`

Defined in: [src/utils/Logger.ts:14](https://github.com/LuanRT/googlevideo/blob/cc730b4dbadc5ae882d6aa28d716e442943577fa/src/utils/Logger.ts#L14)

#### Returns

`Logger`
