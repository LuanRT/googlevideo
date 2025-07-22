# Changelog

## [4.0.1](https://github.com/LuanRT/googlevideo/compare/googlevideo-v4.0.0...googlevideo-v4.0.1) (2025-07-22)


### Miscellaneous Chores

* **docs:** Add more tsdoc to make jsr happy ([5b84100](https://github.com/LuanRT/googlevideo/commit/5b84100979befab767d819a9606dde964d469341))

## [4.0.0](https://github.com/LuanRT/googlevideo/compare/googlevideo-v3.0.0...googlevideo-v4.0.0) (2025-07-22)


### ⚠ BREAKING CHANGES

* rework library ([#27](https://github.com/LuanRT/googlevideo/issues/27))

### Features

* rework library ([#27](https://github.com/LuanRT/googlevideo/issues/27)) ([a744d6a](https://github.com/LuanRT/googlevideo/commit/a744d6af0a09d9771780c2fcf490441c5cadea2a))

## [3.0.0](https://github.com/LuanRT/googlevideo/compare/googlevideo-v2.0.0...googlevideo-v3.0.0) (2025-03-23)


### ⚠ BREAKING CHANGES

* **protos:** Remove the fromJSON, toJSON, create and fromPartial functions ([#19](https://github.com/LuanRT/googlevideo/issues/19))

### Features

* Add support for unencrypted onesie requests & responses ([418898f](https://github.com/LuanRT/googlevideo/commit/418898faa91967ff8d60ab009d32ee49b6649ea5))
* **protos:** Add `LiveMetadata` protobuf ([#18](https://github.com/LuanRT/googlevideo/issues/18)) ([d389d24](https://github.com/LuanRT/googlevideo/commit/d389d242ab21450b750dd694889334f6a37ef4ca))
* **UMP:** Add support for partial parts ([d12432c](https://github.com/LuanRT/googlevideo/commit/d12432c0e5737f440abb75c42c7c430819751cdc))


### Code Refactoring

* **protos:** Remove the fromJSON, toJSON, create and fromPartial functions ([#19](https://github.com/LuanRT/googlevideo/issues/19)) ([c5c81a8](https://github.com/LuanRT/googlevideo/commit/c5c81a81edcd6640368ee9f09dfa4043a42ee0e7))

## [2.0.0](https://github.com/LuanRT/googlevideo/compare/googlevideo-v1.1.0...googlevideo-v2.0.0) (2024-11-02)


### ⚠ BREAKING CHANGES

* drop `cjs` support

### Code Refactoring

* drop `cjs` support ([ec64dd5](https://github.com/LuanRT/googlevideo/commit/ec64dd5183cd4ca755d9ea5efae3ffeade875f75))

## 1.1.0 (2024-10-24)


### Features

* init repo ([a508925](https://github.com/LuanRT/googlevideo/commit/a508925216a7fa0b71ae1e122d0e0f77ded1c819))
* **protos:** Add remaining onesie protos ([c352067](https://github.com/LuanRT/googlevideo/commit/c35206761a36d6188d3bf40d952db5f9255ab3bc))


### Bug Fixes

* **examples:** stop progress bars on completion ([5549a97](https://github.com/LuanRT/googlevideo/commit/5549a971736b7669fda71d6c3a4b3be6825c1e7f))
* **onesie-request:** clone session context to prevent original modification ([fbef7bd](https://github.com/LuanRT/googlevideo/commit/fbef7bd4171737366a31ecf94b9302970c58ca1f))
* **sabr:** Video-only playback is no longer supported ([3ab569c](https://github.com/LuanRT/googlevideo/commit/3ab569c63724b4efe264b1fe47ff8344e5d85fbe))
* **ServerAbrStream:** Ignore duplicate sequences ([d9fb943](https://github.com/LuanRT/googlevideo/commit/d9fb9431ed1b10858b3aef8a23b67e61880a8d99))
* **ServerAbrStream:** use optional chaining for `sequenceNumber` access ([48ef9be](https://github.com/LuanRT/googlevideo/commit/48ef9be26b3e9f1cf49fa7e02cccf79bbe4a551f))
* **ServerAbrStream:** validate server response ([e2e885b](https://github.com/LuanRT/googlevideo/commit/e2e885bf09ca498d1fd9137b0e8daf9270eacc27))


### Miscellaneous Chores

* release 1.1.0 ([4cd1877](https://github.com/LuanRT/googlevideo/commit/4cd18770bad86f95c65cf8f4073fd9456fb91eb8))
