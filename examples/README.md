## SABR/UMP Player
See [sabr-shaka-example/README.md](./sabr-shaka-example/README.md).

## Downloader Example

### Install deps & build:
```bash
npm install
npm run build
cd examples/downloader
npm install
```

```bash
# VOD download example
npx tsx vod-example.ts
```

```bash
# VOD download example with ffmpeg
npx tsx vod-ffmpeg-example.ts
```

```bash
# Live stream download example (ffmpeg required)
npx tsx livestream-example.ts
```

```bash
# Streaming to MPV player
npx tsx mpv-example.ts
```

## "Onesie" (/initplayback) Example

```bash
cd examples/onesie-request
npm install
npx tsx main.ts
```