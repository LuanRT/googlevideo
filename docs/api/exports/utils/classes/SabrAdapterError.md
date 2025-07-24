[googlevideo](../../../README.md) / [exports/utils](../README.md) / SabrAdapterError

# Class: SabrAdapterError

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:15](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L15)

## Extends

- `Error`

## Constructors

### Constructor

> **new SabrAdapterError**(`message`, `code?`): `SabrAdapterError`

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:16](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L16)

#### Parameters

##### message

`string`

##### code?

`string`

#### Returns

`SabrAdapterError`

#### Overrides

`Error.constructor`

## Properties

### code?

> `optional` **code**: `string`

Defined in: [codeberg/googlevideo/src/utils/EventEmitterLike.ts:16](https://github.com/LuanRT/googlevideo/blob/19854137cadaf49fd755394883dfd7fe5fdaba20/src/utils/EventEmitterLike.ts#L16)

***

### message

> **message**: `string`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.es5.d.ts:1077

#### Inherited from

`Error.message`

***

### name

> **name**: `string`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.es5.d.ts:1076

#### Inherited from

`Error.name`

***

### stack?

> `optional` **stack**: `string`

Defined in: codeberg/googlevideo/node\_modules/typescript/lib/lib.es5.d.ts:1078

#### Inherited from

`Error.stack`

***

### prepareStackTrace()?

> `static` `optional` **prepareStackTrace**: (`err`, `stackTraces`) => `any`

Defined in: node\_modules/@types/node/globals.d.ts:29

Optional override for formatting stack traces

#### Parameters

##### err

`Error`

##### stackTraces

`CallSite`[]

#### Returns

`any`

#### See

https://v8.dev/docs/stack-trace-api#customizing-stack-traces

#### Inherited from

`Error.prepareStackTrace`

***

### stackTraceLimit

> `static` **stackTraceLimit**: `number`

Defined in: node\_modules/@types/node/globals.d.ts:31

#### Inherited from

`Error.stackTraceLimit`

## Methods

### captureStackTrace()

> `static` **captureStackTrace**(`targetObject`, `constructorOpt?`): `void`

Defined in: node\_modules/@types/node/globals.d.ts:22

Create .stack property on a target object

#### Parameters

##### targetObject

`object`

##### constructorOpt?

`Function`

#### Returns

`void`

#### Inherited from

`Error.captureStackTrace`
