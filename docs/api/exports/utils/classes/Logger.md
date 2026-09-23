[googlevideo](../../../README.md) / [exports/utils](../README.md) / Logger

# Class: Logger

Defined in: [src/utils/Logger.ts:19](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L19)

Logger utility.

## Example

```ts
const logger = Logger.getInstance();
logger.setLogLevels(LogLevel.ERROR, LogLevel.INFO);
logger.error('MyTag', 'An error occurred');
```

## Constructors

### Constructor

> **new Logger**(): `Logger`

#### Returns

`Logger`

## Methods

### getInstance()

> `static` **getInstance**(): `Logger`

Defined in: [src/utils/Logger.ts:23](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L23)

#### Returns

`Logger`

***

### setLogLevels()

> **setLogLevels**(...`levels`): `void`

Defined in: [src/utils/Logger.ts:35](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L35)

Sets the active log levels.
Call with [LogLevel.NONE](../enumerations/LogLevel.md#none) or no arguments to turn off all logging.
Otherwise, specify one or more log levels to be active.
Use [LogLevel.ALL](../enumerations/LogLevel.md#all) to enable all log levels.

#### Parameters

##### levels

...[`LogLevel`](../enumerations/LogLevel.md)[]

#### Returns

`void`

***

### getLogLevels()

> **getLogLevels**(): `Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

Defined in: [src/utils/Logger.ts:52](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L52)

Gets the current set of active log levels.

#### Returns

`Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

A new Set containing the active LogLevel enums.

***

### error()

> **error**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:76](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L76)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### warn()

> **warn**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:80](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L80)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### info()

> **info**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:84](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L84)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`

***

### debug()

> **debug**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:88](https://github.com/LuanRT/googlevideo/blob/3cfeff043facb734c178a5b2ef1d8152ffb46bb4/src/utils/Logger.ts#L88)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`
