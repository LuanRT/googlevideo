[googlevideo](../../../README.md) / [exports/utils](../README.md) / isGoogleVideoURL

# Function: isGoogleVideoURL()

> **isGoogleVideoURL**(`url`): `boolean`

Defined in: [src/utils/shared.ts:23](https://github.com/LuanRT/googlevideo/blob/5b84100979befab767d819a9606dde964d469341/src/utils/shared.ts#L23)

Determines if a given URL is a Google video URL, specifically for YouTube or SABR-related content.

## Parameters

### url

`string`

The URL to check.

The function checks the following conditions:
1. If the URL starts with the `sabr://` protocol, it is considered a Google video URL.
2. If the URL ends with `/videoplayback`, it parses the query parameters to check for specific keys
   (`source=youtube`, `sabr`, `lsig`, or `expire`) that indicate a Google video URL.
3. If the URL contains `/videoplayback/` (e.g., for live or post-live content), it checks the path
   segments for specific keywords (`videoplayback`, `sabr`, `lsig`, or `expire`).

## Returns

`boolean`
