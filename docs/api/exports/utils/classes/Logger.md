[googlevideo](../../../README.md) / [exports/utils](../README.md) / Logger

# Class: Logger

Defined in: [src/utils/Logger.ts:19](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L19)

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

Defined in: [src/utils/Logger.ts:23](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L23)

#### Returns

`Logger`

***

### setLogLevels()

> **setLogLevels**(...`levels`): `void`

Defined in: [src/utils/Logger.ts:36](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L36)

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

Defined in: [src/utils/Logger.ts:55](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L55)

Gets the current set of active log levels.

#### Returns

`Set`\<[`LogLevel`](../enumerations/LogLevel.md)\>

A new Set containing the active LogLevel enums.

***

### error()

> **error**(`tag`, ...`messages`): `void`

Defined in: [src/utils/Logger.ts:79](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L79)

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

Defined in: [src/utils/Logger.ts:83](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L83)

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

Defined in: [src/utils/Logger.ts:87](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L87)

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

Defined in: [src/utils/Logger.ts:91](https://github.com/LuanRT/googlevideo/blob/475f6c24e5c811c3ea09ef0888fab75cdca6db7b/src/utils/Logger.ts#L91)

#### Parameters

##### tag

`string`

##### messages

...`any`[]

#### Returns

`void`
