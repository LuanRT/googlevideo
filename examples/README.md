**NOTE:**
Build the library first before running the examples!

```bash
npm run build
```

## Browser Example

```bash
cd examples/browser/web
npm install
npm run dev

# Proxy server
deno run --allow-net --allow-read examples/browser/proxy/deno.ts
```

## Downloader Example

```bash
cd examples/downloader
npm install
npx tsx main.ts

## Example with ffmpeg
npx tsx ffmpeg-example.ts
```