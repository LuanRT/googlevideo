import type { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { Innertube, UniversalCache } from 'youtubei.js';
import GoogleVideo, { type Format, MediaType } from '../../dist/src/index.js';

const innertube = await Innertube.create({ cache: new UniversalCache(true) });

const determineFileExtension = (mimeType: string) => {
  if (mimeType.includes('video'))
    return mimeType.includes('webm') ? 'webm' : 'mp4';
  else if (mimeType.includes('audio'))
    return mimeType.includes('webm') ? 'webm' : 'm4a';
};

const info = await innertube.getBasicInfo('qQ_-toSu29Q');

console.log('\n');
console.info(`Title: ${info.basic_info.title}`);
console.info(`Duration: ${info.basic_info.duration}`);
console.info(`Views: ${info.basic_info.view_count}`);
console.info(`Author: ${info.basic_info.author}`);
console.info(`Video ID: ${info.basic_info.id}`);

const sanitizedTitle = info.basic_info.title?.replace(/[^a-z0-9]/gi, '_');

let wroteAudioInitSegment = false;
let wroteVideoInitSegment = false;

let audioOutput: WriteStream | undefined;
let videoOutput: WriteStream | undefined;

const durationMs = info.basic_info?.duration ? info.basic_info.duration * 1000 : 0;

const audioFormat = info.chooseFormat({ quality: 'best', format: 'webm', type: 'audio' });
const videoFormat = info.chooseFormat({ quality: '720p', format: 'webm', type: 'video' });

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

console.info(`Selected audio format: ${audioFormat.itag} (${audioFormat.audio_quality})`);
console.info(`Selected video format: ${videoFormat.itag} (${videoFormat.quality_label})`);
console.log('\n');

const videoPlaybackUstreamerConfig = info.page[0].player_config?.media_common_config.media_ustreamer_request_config?.video_playback_ustreamer_config;

if (!videoPlaybackUstreamerConfig)
  throw new Error('ustreamerConfig not found');

const serverAbrStreamingUrl = innertube.session.player?.decipher(info.page[0].streaming_data?.server_abr_streaming_url);

if (!serverAbrStreamingUrl)
  throw new Error('serverAbrStreamingUrl not found');

const serverAbrStream = new GoogleVideo.ServerAbrStream({
  fetch: innertube.session.http.fetch_function,
  serverAbrStreamingUrl,
  videoPlaybackUstreamerConfig: videoPlaybackUstreamerConfig,
  durationMs
});

serverAbrStream.on('data', (data) => {
  let progressText = '';

  for (const initializedFormat of data.initializedFormats) {
    const isVideo = initializedFormat.mimeType?.includes('video');
    const mediaFormat = info.streaming_data?.adaptive_formats.find((f) => f.itag === initializedFormat.formatId.itag);

    if (isVideo && initializedFormat.mediaData) {
      if (!videoOutput)
        videoOutput = createWriteStream(`${sanitizedTitle}.${initializedFormat.formatId.itag}.${determineFileExtension(initializedFormat.mimeType || '')}`);

      if (initializedFormat.initSegment && !wroteVideoInitSegment) {
        videoOutput.write(initializedFormat.initSegment);
        wroteVideoInitSegment = true;
      }

      videoOutput.write(initializedFormat.mediaData);
    } else if (initializedFormat.mediaData) {
      if (!audioOutput)
        audioOutput = createWriteStream(`${sanitizedTitle}.${initializedFormat.formatId.itag}.${determineFileExtension(initializedFormat.mimeType || '')}`);

      if (initializedFormat.initSegment && !wroteAudioInitSegment) {
        audioOutput.write(initializedFormat.initSegment);
        wroteAudioInitSegment = true;
      }

      audioOutput.write(initializedFormat.mediaData);
    }

    const fmtIdentifier = `${initializedFormat.formatId.itag}_${initializedFormat.mimeType?.split(';')[0]}`;

    const percentage = Math.round((initializedFormat.sequenceList.at(-1)?.startDataRange ?? 0) / (mediaFormat?.content_length ?? 0) * 100);

    if (percentage)
      progressText += `${fmtIdentifier}: ${percentage}% | `;
  }

  process.stdout.clearLine(0);
  process.stdout.cursorTo(0);
  process.stdout.write(progressText);
});

serverAbrStream.on('error', (error) => {
  console.error(error);
});

await serverAbrStream.init({
  audioFormats: [ selectedAudioFormat ],
  videoFormats: [ selectedVideoFormat ],
  mediaInfo: {
    /**
     * MEDIA_TYPE_DEFAULT = 0,
     * MEDIA_TYPE_AUDIO = 1,
     * MEDIA_TYPE_VIDEO = 2,
     */
    mediaType: MediaType.MEDIA_TYPE_DEFAULT,
    startTimeMs: 0
  }
});

process.stdout.write('Done!');

if (audioOutput)
  audioOutput.end();

if (videoOutput)
  videoOutput.end();