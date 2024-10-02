import ffmpeg from 'fluent-ffmpeg';
import cliProgress from 'cli-progress';
import type { WriteStream } from 'node:fs';
import { createWriteStream, unlink } from 'node:fs';
import { Innertube, UniversalCache } from 'youtubei.js';
import GoogleVideo, { type Format, Protos } from '../../dist/src/index.js';

const progressBars = new cliProgress.MultiBar({
  stopOnComplete: true,
  hideCursor: true
}, cliProgress.Presets.rect);

const formatProgressBars = new Map<string, cliProgress.SingleBar>();

const innertube = await Innertube.create({ cache: new UniversalCache(true) });
const info = await innertube.getBasicInfo('wRNnMQEKo7o');

console.info(`
  Title: ${info.basic_info.title}
  Duration: ${info.basic_info.duration}
  Views: ${info.basic_info.view_count}
  Author: ${info.basic_info.author}
  Video ID: ${info.basic_info.id}
`);

const durationMs = (info.basic_info?.duration ?? 0) * 1000;
const sanitizedTitle = info.basic_info.title?.replace(/[^a-z0-9]/gi, '_');

let audioOutput: WriteStream | undefined;
let videoOutput: WriteStream | undefined;
let audioOutputFilename: string | undefined;
let videoOutputFilename: string | undefined;

const audioFormat = info.chooseFormat({ quality: 'best', format: 'webm', type: 'audio' });
const videoFormat = info.chooseFormat({ quality: '1080p', format: 'webm', type: 'video' });

const selectedAudioFormat: Format = {
  itag: audioFormat.itag,
  lastModified: audioFormat.last_modified_ms,
  xtags: audioFormat.xtags
};

const selectedVideoFormat: Format = {
  itag: videoFormat.itag,
  lastModified: videoFormat.last_modified_ms,
  width: videoFormat.width,
  height: videoFormat.height,
  xtags: videoFormat.xtags
};

const serverAbrStreamingUrl = innertube.session.player?.decipher(info.page[0].streaming_data?.server_abr_streaming_url);
const videoPlaybackUstreamerConfig = info.page[0].player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config;

if (!videoPlaybackUstreamerConfig)
  throw new Error('ustreamerConfig not found');

if (!serverAbrStreamingUrl)
  throw new Error('serverAbrStreamingUrl not found');

const serverAbrStream = new GoogleVideo.ServerAbrStream({
  fetch: innertube.session.http.fetch_function,
  serverAbrStreamingUrl,
  videoPlaybackUstreamerConfig: videoPlaybackUstreamerConfig,
  durationMs
});

let downloadedBytesAudio = 0;
let downloadedBytesVideo = 0;

serverAbrStream.on('data', (streamData) => {
  for (const formatData of streamData.initializedFormats) {
    const isVideo = formatData.mimeType?.includes('video');
    const mediaFormat = info.streaming_data?.adaptive_formats.find((f) => f.itag === formatData.formatId.itag);
    const formatKey = formatData.formatKey;

    let bar = formatProgressBars.get(formatKey);

    if (!bar) {
      bar = progressBars.create(100, 0, undefined, { format: `${isVideo ? 'video' : 'audio'} (${formatData.formatId.itag}) [{bar}] {percentage}% | ETA: {eta}s` });
      formatProgressBars.set(formatKey, bar);
    }

    const mediaChunks = formatData.mediaChunks;

    if (isVideo && mediaChunks.length) {
      if (!videoOutput) {
        videoOutputFilename = `${sanitizedTitle}.${formatData.formatId.itag}.webm`;
        videoOutput = createWriteStream(videoOutputFilename);
      }

      for (const chunk of mediaChunks) {
        downloadedBytesVideo += chunk.length;
        videoOutput.write(chunk);
      }
    } else if (mediaChunks.length) {
      if (!audioOutput) {
        audioOutputFilename = `${sanitizedTitle}.${formatData.formatId.itag}.webm`;
        audioOutput = createWriteStream(audioOutputFilename);
      }
      for (const chunk of mediaChunks) {
        downloadedBytesAudio += chunk.length;
        audioOutput.write(chunk);
      }
    }

    const contentLength = mediaFormat?.content_length ?? 0;
    const downloadedBytes = isVideo ? downloadedBytesVideo : downloadedBytesAudio;

    if (contentLength > 0) {
      const percentage = (downloadedBytes / contentLength) * 100;
      bar.update(percentage);
    }
  }
});

serverAbrStream.on('error', (error) => {
  console.error(error);
});

await serverAbrStream.init({
  audioFormats: [ selectedAudioFormat ],
  videoFormats: [ selectedVideoFormat ],
  clientAbrState: {
    mediaType: Protos.MediaType.MEDIA_TYPE_DEFAULT,
    startTimeMs: 0
  }
});

if (audioOutput)
  audioOutput.end();

if (videoOutput)
  videoOutput.end();

progressBars.stop();

const outputFilename = `${sanitizedTitle}_final.webm`;

await new Promise<void>((resolve, reject) => {
  if (!videoOutputFilename || !audioOutputFilename)
    return reject(new Error('No video or audio output filename'));

  ffmpeg()
    .input(videoOutputFilename)
    .input(audioOutputFilename)
    .videoCodec('copy')
    .audioCodec('copy')
    .on('end', () => {
      if (videoOutputFilename) {
        unlink(videoOutputFilename, (err) => {
          if (err) console.error(`Error deleting video temp file: ${err}`);
        });
      }
      if (audioOutputFilename) {
        unlink(audioOutputFilename, (err) => {
          if (err) console.error(`Error deleting audio temp file: ${err}`);
        });
      }
      resolve();
    })
    .on('error', (err: Error) => {
      console.error('Error processing video:', err);
      reject(err);
    })
    .save(outputFilename);
});