[googlevideo](../../../README.md) / [exports/utils](../README.md) / Logger

# Class: Logger

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:23](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L23)

Singleton logger utility.

Allows enabling or disabling specific log levels (`ERROR`, `WARN`, `INFO`, `DEBUG`)
at runtime. Supports logging with tags and message arguments.

Usage:
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

### debug()

> **debug**(`tag`, ...`messages`): `void`

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:95](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L95)

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

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:83](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L83)

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

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:59](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L59)

Gets the current set of active log levels.

#### Returns

`Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

A new Set containing the active LogLevel enums.

***

### info()

> **info**(`tag`, ...`messages`): `void`

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:91](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L91)

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

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:40](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L40)

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

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:87](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L87)

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

Defined in: [codeberg/googlevideo/src/utils/Logger.ts:27](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/Logger.ts#L27)

#### Returns

`Logger`
