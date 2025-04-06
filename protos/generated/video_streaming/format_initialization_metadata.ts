// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/format_initialization_metadata.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { FormatId, IndexRange, InitRange } from "../misc/common.js";

export const protobufPackage = "video_streaming";

export interface FormatInitializationMetadata {
  videoId?: string | undefined;
  formatId?: FormatId | undefined;
  endTimeMs?: number | undefined;
  endSegmentNumber?: number | undefined;
  mimeType?: string | undefined;
  initRange?: InitRange | undefined;
  indexRange?: IndexRange | undefined;
  field8?: number | undefined;
  durationMs?: number | undefined;
  field10?: number | undefined;
}

function createBaseFormatInitializationMetadata(): FormatInitializationMetadata {
  return {
    videoId: "",
    formatId: undefined,
    endTimeMs: 0,
    endSegmentNumber: 0,
    mimeType: "",
    initRange: undefined,
    indexRange: undefined,
    field8: 0,
    durationMs: 0,
    field10: 0,
  };
}

export const FormatInitializationMetadata: MessageFns<FormatInitializationMetadata> = {
  encode(message: FormatInitializationMetadata, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.videoId !== undefined && message.videoId !== "") {
      writer.uint32(10).string(message.videoId);
    }
    if (message.formatId !== undefined) {
      FormatId.encode(message.formatId, writer.uint32(18).fork()).join();
    }
    if (message.endTimeMs !== undefined && message.endTimeMs !== 0) {
      writer.uint32(24).int32(message.endTimeMs);
    }
    if (message.endSegmentNumber !== undefined && message.endSegmentNumber !== 0) {
      writer.uint32(32).int64(message.endSegmentNumber);
    }
    if (message.mimeType !== undefined && message.mimeType !== "") {
      writer.uint32(42).string(message.mimeType);
    }
    if (message.initRange !== undefined) {
      InitRange.encode(message.initRange, writer.uint32(50).fork()).join();
    }
    if (message.indexRange !== undefined) {
      IndexRange.encode(message.indexRange, writer.uint32(58).fork()).join();
    }
    if (message.field8 !== undefined && message.field8 !== 0) {
      writer.uint32(64).int32(message.field8);
    }
    if (message.durationMs !== undefined && message.durationMs !== 0) {
      writer.uint32(72).int32(message.durationMs);
    }
    if (message.field10 !== undefined && message.field10 !== 0) {
      writer.uint32(80).int32(message.field10);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): FormatInitializationMetadata {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseFormatInitializationMetadata();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.videoId = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.formatId = FormatId.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.endTimeMs = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.endSegmentNumber = longToNumber(reader.int64());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.mimeType = reader.string();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.initRange = InitRange.decode(reader, reader.uint32());
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.indexRange = IndexRange.decode(reader, reader.uint32());
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.field8 = reader.int32();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.durationMs = reader.int32();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.field10 = reader.int32();
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
