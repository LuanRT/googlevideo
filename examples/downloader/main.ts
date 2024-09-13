import type { WriteStream } from 'node:fs';
import { createWriteStream } from 'node:fs';
import { Innertube, UniversalCache } from 'youtubei.js';
import GoogleVideo, { MediaType } from '../../dist/src/index.js';

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

const audioFormat = info.chooseFormat({
  quality: 'best',
  format: 'webm',
  type: 'audio'
});

const videoFormat = info.chooseFormat({
  quality: '720p',
  format: 'mp4',
  type: 'video'
});

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
  server_abr_streaming_url: serverAbrStreamingUrl,
  video_playback_ustreamer_config: videoPlaybackUstreamerConfig,
  duration_ms: durationMs
});

serverAbrStream.on('data', (data) => {
  let progressText = '';

  for (const initializedFormat of data.initialized_formats) {
    const isVideo = initializedFormat.mime_type?.includes('video');
    const mediaFormat = info.streaming_data?.adaptive_formats.find((f) => f.itag === initializedFormat.format_id.itag);

    if (isVideo && initializedFormat.media_data) {
      if (!videoOutput)
        videoOutput = createWriteStream(`${sanitizedTitle}.${initializedFormat.format_id.itag}.${determineFileExtension(initializedFormat.mime_type || '')}`);

      if (initializedFormat.init_segment && !wroteVideoInitSegment) {
        videoOutput.write(initializedFormat.init_segment);
        wroteVideoInitSegment = true;
      }

      videoOutput.write(initializedFormat.media_data);
    } else if (initializedFormat.media_data) {
      if (!audioOutput)
        audioOutput = createWriteStream(`${sanitizedTitle}.${initializedFormat.format_id.itag}.${determineFileExtension(initializedFormat.mime_type || '')}`);

      if (initializedFormat.init_segment && !wroteAudioInitSegment) {
        audioOutput.write(initializedFormat.init_segment);
        wroteAudioInitSegment = true;
      }

      audioOutput.write(initializedFormat.media_data);
    }

    const fmtIdentifier = `${initializedFormat.format_id.itag}_${initializedFormat.mime_type?.split(';')[0]}`;

    const percentage = Math.round((initializedFormat.sequence_list.at(-1)?.start_data_range ?? 0) / (mediaFormat?.content_length ?? 0) * 100);

    if (percentage !== undefined)
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
  audio_formats: [ audioFormat ],
  video_formats: [ videoFormat ],
  media_info: {
    mediaType: MediaType.MEDIA_TYPE_DEFAULT,
    startTimeMs: 0
  }
});

process.stdout.write('Done!');

if (audioOutput)
  audioOutput.end();

if (videoOutput)
  videoOutput.end();