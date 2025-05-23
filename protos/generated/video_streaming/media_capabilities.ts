// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/media_capabilities.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface MediaCapabilities {
  videoFormatCapabilities: MediaCapabilities_VideoFormatCapability[];
  audioFormatCapabilities: MediaCapabilities_AudioFormatCapability[];
  hdrModeBitmask?: number | undefined;
}

export interface MediaCapabilities_VideoFormatCapability {
  videoCodec?: number | undefined;
  maxHeight?: number | undefined;
  maxWidth?: number | undefined;
  maxFramerate?: number | undefined;
  maxBitrateBps?: number | undefined;
  is10BitSupported?: boolean | undefined;
}

export interface MediaCapabilities_AudioFormatCapability {
  audioCodec?: number | undefined;
  numChannels?: number | undefined;
  maxBitrateBps?: number | undefined;
  spatialCapabilityBitmask?: number | undefined;
}

function createBaseMediaCapabilities(): MediaCapabilities {
  return { videoFormatCapabilities: [], audioFormatCapabilities: [], hdrModeBitmask: 0 };
}

export const MediaCapabilities: MessageFns<MediaCapabilities> = {
  encode(message: MediaCapabilities, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.videoFormatCapabilities) {
      MediaCapabilities_VideoFormatCapability.encode(v!, writer.uint32(10).fork()).join();
    }
    for (const v of message.audioFormatCapabilities) {
      MediaCapabilities_AudioFormatCapability.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.hdrModeBitmask !== undefined && message.hdrModeBitmask !== 0) {
      writer.uint32(40).int32(message.hdrModeBitmask);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MediaCapabilities {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaCapabilities();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoFormatCapabilities.push(MediaCapabilities_VideoFormatCapability.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.audioFormatCapabilities.push(MediaCapabilities_AudioFormatCapability.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.hdrModeBitmask = reader.int32();
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

function createBaseMediaCapabilities_VideoFormatCapability(): MediaCapabilities_VideoFormatCapability {
  return { videoCodec: 0, maxHeight: 0, maxWidth: 0, maxFramerate: 0, maxBitrateBps: 0, is10BitSupported: false };
}

export const MediaCapabilities_VideoFormatCapability: MessageFns<MediaCapabilities_VideoFormatCapability> = {
  encode(message: MediaCapabilities_VideoFormatCapability, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.videoCodec !== undefined && message.videoCodec !== 0) {
      writer.uint32(8).int32(message.videoCodec);
    }
    if (message.maxHeight !== undefined && message.maxHeight !== 0) {
      writer.uint32(24).int32(message.maxHeight);
    }
    if (message.maxWidth !== undefined && message.maxWidth !== 0) {
      writer.uint32(32).int32(message.maxWidth);
    }
    if (message.maxFramerate !== undefined && message.maxFramerate !== 0) {
      writer.uint32(88).int32(message.maxFramerate);
    }
    if (message.maxBitrateBps !== undefined && message.maxBitrateBps !== 0) {
      writer.uint32(96).int32(message.maxBitrateBps);
    }
    if (message.is10BitSupported !== undefined && message.is10BitSupported !== false) {
      writer.uint32(120).bool(message.is10BitSupported);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MediaCapabilities_VideoFormatCapability {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaCapabilities_VideoFormatCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.videoCodec = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxHeight = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.maxWidth = reader.int32();
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.maxFramerate = reader.int32();
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.maxBitrateBps = reader.int32();
          continue;
        case 15:
          if (tag !== 120) {
            break;
          }

          message.is10BitSupported = reader.bool();
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

function createBaseMediaCapabilities_AudioFormatCapability(): MediaCapabilities_AudioFormatCapability {
  return { audioCodec: 0, numChannels: 0, maxBitrateBps: 0, spatialCapabilityBitmask: 0 };
}

export const MediaCapabilities_AudioFormatCapability: MessageFns<MediaCapabilities_AudioFormatCapability> = {
  encode(message: MediaCapabilities_AudioFormatCapability, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.audioCodec !== undefined && message.audioCodec !== 0) {
      writer.uint32(8).int32(message.audioCodec);
    }
    if (message.numChannels !== undefined && message.numChannels !== 0) {
      writer.uint32(16).int32(message.numChannels);
    }
    if (message.maxBitrateBps !== undefined && message.maxBitrateBps !== 0) {
      writer.uint32(24).int32(message.maxBitrateBps);
    }
    if (message.spatialCapabilityBitmask !== undefined && message.spatialCapabilityBitmask !== 0) {
      writer.uint32(48).int32(message.spatialCapabilityBitmask);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MediaCapabilities_AudioFormatCapability {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaCapabilities_AudioFormatCapability();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.audioCodec = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.numChannels = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.maxBitrateBps = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.spatialCapabilityBitmask = reader.int32();
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

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
