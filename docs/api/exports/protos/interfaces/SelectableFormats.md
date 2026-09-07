[googlevideo](../../../README.md) / [exports/protos](../README.md) / SelectableFormats

# Interface: SelectableFormats

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:13

## Properties

### selectableVideoFormatIds

> **selectableVideoFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:14

***

### selectableAudioFormatIds

> **selectableAudioFormatIds**: [`FormatId`](FormatId.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:15

***

### videoId?

> `optional` **videoId**: `string`

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:16

***

### selectableVideoFormats

> **selectableVideoFormats**: [`SelectableFormats_SelectableFormat`](SelectableFormats_SelectableFormat.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:20

@NOTE: On iOS, this uses its own message (SelectableVideoFormat) instead of single SelectableFormat, should probably check if there are any differences at some point.

***

### selectableAudioFormats

> **selectableAudioFormats**: [`SelectableFormats_SelectableFormat`](SelectableFormats_SelectableFormat.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:21

***

### selectableCaptionFormats

> **selectableCaptionFormats**: [`SelectableFormats_SelectableFormat`](SelectableFormats_SelectableFormat.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:22

***

### restrictedFormats

> **restrictedFormats**: [`SelectableFormats_SelectableFormat`](SelectableFormats_SelectableFormat.md)[]

Defined in: protos/generated/video\_streaming/selectable\_formats.ts:23
