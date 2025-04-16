// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: misc/common.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "misc";

export enum AudioQuality {
  UNKNOWN = 0,
  ULTRALOW = 5,
  LOW = 10,
  MEDIUM = 20,
  HIGH = 30,
  UNRECOGNIZED = -1,
}

export enum VideoQualitySetting {
  UNKNOWN = 0,
  HIGHER_QUALITY = 1,
  DATA_SAVER = 2,
  ADVANCED_MENU = 3,
  UNRECOGNIZED = -1,
}

export enum PlaybackAudioRouteOutputType {
  UNKNOWN = 0,
  LINE_OUT = 1,
  HEADPHONES = 2,
  BLUETOOTH_A2DP = 3,
  BUILT_IN_RECEIVER = 4,
  BUILT_IN_SPEAKER = 5,
  HDMI = 6,
  AIR_PLAY = 7,
  BLUETOOTH_LE = 8,
  BLUETOOTH_HFP = 9,
  USB_AUDIO = 10,
  CAR_PLAY = 11,
  ANDROID_AUDIO = 12,
  UNRECOGNIZED = -1,
}

export enum NetworkMeteredState {
  UNKNOWN = 0,
  UNMETERED = 1,
  METERED = 2,
  UNRECOGNIZED = -1,
}

export enum SeekSource {
  UNKNOWN = 0,
  TIMESTAMP_IN_COMMENTS = 1,
  TIMESTAMP_IN_DESCRIPTION = 2,
  MACRO_MARKER_LIST_ITEM = 3,
  DOUBLE_TAP_TO_SEEK = 4,
  DOUBLE_TAP_TO_SKIP_CHAPTER = 5,
  PICK_UP_PLAY_HEAD = 6,
  SLIDE_ON_SCRUBBER_BAR = 7,
  SLIDE_ON_PLAYER = 8,
  SABR_PARTIAL_CHUNK = 9,
  SABR_SEEK_TO_HEAD = 10,
  SABR_LIVE_DVR_USER_SEEK = 11,
  SABR_SEEK_TO_DVR_LOWER_BOUND = 12,
  SABR_SEEK_TO_DVR_UPPER_BOUND = 13,
  SSDAI_INTERNAL = 14,
  START_PLAYBACK = 15,
  SABR_ACCURATE_SEEK = 17,
  START_PLAYBACK_SEEK_TO_END = 18,
  IOS_PLAYER_REMOVED_SEGMENTS = 19,
  IOS_PLAYER_SEGMENT_LIST = 20,
  IOS_PLAYER_ITEM_SEEK = 21,
  IOS_PLAYER_ITEM_SEEK_TO_END = 22,
  IOS_PLAYER_SEEK_TO_END_TO_RESYNC = 23,
  IOS_SEEK_ACCESSIBILITY_BUTTON = 24,
  FINE_SCRUBBER_SLIDE_ON_FILMSTRIP = 25,
  FINE_SCRUBBER_TAP_ON_FILMSTRIP = 26,
  FINE_SCRUBBER_SLIDE_ON_SCRUBBER_BAR = 27,
  SEEK_BUTTON_ON_PLAYER_CONTROL = 28,
  SABR_INGESTION_WALL_TIME_SEEK = 29,
  PLAYER_VIEW_REPARENT_INTERNAL = 30,
  PRESS_REWIND_PLAY_BACK_CONTROL = 31,
  PRESS_FAST_FORWARD_PLAY_BACK_CONTROL = 32,
  PRESS_LIVE_SYNC_ICON = 33,
  PEG_TO_LIVE = 34,
  ANDROID_MEDIA_SESSION = 35,
  TAP_ON_REPLAY_ACTION = 36,
  AUTOMATIC_REPLAY_ACTION = 37,
  NON_USER_SEEK_TO_PREVIOUS = 38,
  NON_USER_SEEK_TO_NEXT = 39,
  HIGHLIGHTS_TAP_PREVIOUS_PLAY = 66,
  HIGHLIGHTS_TAP_NEXT_PLAY = 40,
  HIGHLIGHTS_TAP_HIDDEN_NEXT_PLAY = 41,
  HIGHLIGHTS_TAP_LIST_ITEM = 42,
  HIGHLIGHTS_AUTOMATIC_NEXT_PLAY = 43,
  HIGHLIGHTS_SEEK_TO_FIRST_PLAY = 44,
  HIGHLIGHTS_SEEK_TO_END = 45,
  SEGMENTS_TAP_LIST_ITEM = 46,
  PIP_FAST_FORWARD_BUTTON = 47,
  PIP_REWIND_BUTTON = 48,
  PIP_RESUME_ON_HEAD = 49,
  MOVING_CLIP_FRAME = 50,
  RESUME_CLIP_PREVIOUS_POSITION = 51,
  SEEK_TO_NEXT_CHAPTER = 52,
  SEEK_TO_PREVIOUS_CHAPTER = 53,
  IOS_SHAREPLAY_PAUSE = 54,
  IOS_SHAREPLAY_SEEK = 55,
  IOS_SHAREPLAY_SYNC_RESPONSE = 56,
  SEEK_TO_HEAD_IMMERSIVE_LIVE_VIDEO = 57,
  SEEK_TO_START_OF_LOOPING_RANGE_OF_SHORTS = 58,
  SABR_SEEK_TO_CLOSEST_KEYFRAME = 59,
  SEEK_TO_END_OF_LOOPING_RANGE_OF_SHORTS = 60,
  CLIP_SLIDE_ON_FLIMSTRIP = 61,
  PICK_UP_CLIP_SLIDER = 62,
  FINE_SCRUBBER_CANCELLED = 63,
  INLINE_PLAYER_SEEK_CHAPTER = 64,
  INLINE_PLAYER_SEEK_SECONDS = 65,
  HIGHLIGHTS_PLAYER_EXIT_FULLSCREEN = 67,
  LARGE_CONTROLS_FORWARD_BUTTON = 68,
  LARGE_CONTROLS_REWIND_BUTTON = 69,
  LARGE_CONTROLS_SCRUBBER_BAR = 70,
  SEEK_BACKWARD_5S = 71,
  SEEK_FORWARD_5S = 72,
  SEEK_BACKWARD_10S = 73,
  SEEK_FORWARD_10S = 74,
  SEEK_FORWARD_60S = 75,
  SEEK_BACKWARD_60S = 76,
  SEEK_TO_NEXT_FRAME = 77,
  SEEK_TO_PREV_FRAME = 78,
  KEYBOARD_SEEK_TO_BEGINNING = 79,
  KEYBOARD_SEEK_TO_END = 80,
  SEEK_PERCENT_OF_VIDEO = 81,
  HIDDEN_FAST_FORWARD_BUTTON = 82,
  HIDDEN_REWIND_BUTTON = 83,
  TIMESTAMP = 84,
  LR_MEDIA_SESSION_SEEK = 87,
  MIDROLLS_WITH_TIME_RANGE = 88,
  SKIP_AD = 89,
  SEEK_TO_PREVIOUS = 90,
  SEEK_TO_NEXT = 91,
  LR_QUICK_SEEK = 92,
  ONESIE_LIVE = 93,
  LR_PLAYER_CONTROL_ACTION = 94,
  UNPLUGGED_LENS_START_CLIP = 95,
  LR_KEY_PLAYS = 96,
  SSAP_AD_FMT_FATAL = 97,
  TVHTML5_INPUT_SOURCE_KEY_EVENT = 98,
  TVHTML5_INPUT_SOURCE_CONTROLS = 99,
  TVHTML5_INPUT_SOURCE_TOUCH = 100,
  TVHTML5_INPUT_SOURCE_TOUCHPAD = 101,
  SEEK_TO_HEAD = 102,
  AUTOMATIC_PREVIEW_REPLAY_ACTION = 103,
  H5_MEDIA_ELEMENT_EVENT = 104,
  H5_WORKAROUND_SEEK = 105,
  MINIPLAYER_REWIND_BUTTON = 106,
  MINIPLAYER_FAST_FORWARD_BUTTON = 107,
  SABR_RELOAD_PLAYER_RESPONSE_TOKEN_SEEK = 108,
  SLIDE_ON_SCRUBBER_BAR_CHAPTER = 109,
  ANDROID_CLEAR_BUFFER = 110,
  UNRECOGNIZED = -1,
}

export enum OnesieRequestTarget {
  UNKNOWN = 0,
  ENCRYPTED_PLAYER_SERVICE = 1,
  ENCRYPTED_WATCH_SERVICE_DEPRECATED = 2,
  ENCRYPTED_WATCH_SERVICE = 3,
  INNERTUBE_ENCRYPTED_SERVICE = 4,
  UNRECOGNIZED = -1,
}

export interface HttpHeader {
  name?: string | undefined;
  value?: string | undefined;
}

export interface FormatId {
  itag?: number | undefined;
  lastModified?: number | undefined;
  xtags?: string | undefined;
}

export interface InitRange {
  start?: number | undefined;
  end?: number | undefined;
}

export interface IndexRange {
  start?: number | undefined;
  end?: number | undefined;
}

export interface KeyValuePair {
  key?: string | undefined;
  value?: string | undefined;
}

function createBaseHttpHeader(): HttpHeader {
  return { name: "", value: "" };
}

export const HttpHeader: MessageFns<HttpHeader> = {
  encode(message: HttpHeader, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.name !== undefined && message.name !== "") {
      writer.uint32(10).string(message.name);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): HttpHeader {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseHttpHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.name = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function createBaseFormatId(): FormatId {
  return { itag: 0, lastModified: 0, xtags: "" };
}

export const FormatId: MessageFns<FormatId> = {
  encode(message: FormatId, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.itag !== undefined && message.itag !== 0) {
      writer.uint32(8).int32(message.itag);
    }
    if (message.lastModified !== undefined && message.lastModified !== 0) {
      writer.uint32(16).uint64(message.lastModified);
    }
    if (message.xtags !== undefined && message.xtags !== "") {
      writer.uint32(26).string(message.xtags);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): FormatId {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormatId();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.itag = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.lastModified = longToNumber(reader.uint64());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.xtags = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function createBaseInitRange(): InitRange {
  return { start: 0, end: 0 };
}

export const InitRange: MessageFns<InitRange> = {
  encode(message: InitRange, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.start !== undefined && message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== undefined && message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): InitRange {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseInitRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function createBaseIndexRange(): IndexRange {
  return { start: 0, end: 0 };
}

export const IndexRange: MessageFns<IndexRange> = {
  encode(message: IndexRange, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.start !== undefined && message.start !== 0) {
      writer.uint32(8).int32(message.start);
    }
    if (message.end !== undefined && message.end !== 0) {
      writer.uint32(16).int32(message.end);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): IndexRange {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndexRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.start = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.end = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function createBaseKeyValuePair(): KeyValuePair {
  return { key: "", value: "" };
}

export const KeyValuePair: MessageFns<KeyValuePair> = {
  encode(message: KeyValuePair, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.key !== undefined && message.key !== "") {
      writer.uint32(10).string(message.key);
    }
    if (message.value !== undefined && message.value !== "") {
      writer.uint32(18).string(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): KeyValuePair {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKeyValuePair();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.key = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },
};

function longToNumber(int64: { toString(): string }): number {
  const num = globalThis.Number(int64.toString());
  if (num > globalThis.Number.MAX_SAFE_INTEGER) {
    throw new globalThis.Error("Value is larger than Number.MAX_SAFE_INTEGER");
  }
  if (num < globalThis.Number.MIN_SAFE_INTEGER) {
    throw new globalThis.Error("Value is smaller than Number.MIN_SAFE_INTEGER");
  }
  return num;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
