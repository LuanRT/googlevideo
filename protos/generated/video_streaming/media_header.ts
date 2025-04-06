// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/media_header.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { FormatId } from "../misc/common.js";
import { TimeRange } from "./time_range.js";

export const protobufPackage = "video_streaming";

export interface MediaHeader {
  headerId?: number | undefined;
  videoId?: string | undefined;
  itag?: number | undefined;
  lmt?: number | undefined;
  xtags?: string | undefined;
  startRange?: number | undefined;
  compressionAlgorithm?: MediaHeader_CompressionAlgorithm | undefined;
  isInitSeg?: boolean | undefined;
  sequenceNumber?: number | undefined;
  field10?: number | undefined;
  startMs?: number | undefined;
  durationMs?: number | undefined;
  formatId?: FormatId | undefined;
  contentLength?: number | undefined;
  timeRange?: TimeRange | undefined;
}

export enum MediaHeader_CompressionAlgorithm {
  UNKNOWN = 0,
  NONE = 1,
  GZIP = 2,
  UNRECOGNIZED = -1,
}

export function mediaHeader_CompressionAlgorithmFromJSON(object: any): MediaHeader_CompressionAlgorithm {
  switch (object) {
    case 0:
    case "UNKNOWN":
      return MediaHeader_CompressionAlgorithm.UNKNOWN;
    case 1:
    case "NONE":
      return MediaHeader_CompressionAlgorithm.NONE;
    case 2:
    case "GZIP":
      return MediaHeader_CompressionAlgorithm.GZIP;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MediaHeader_CompressionAlgorithm.UNRECOGNIZED;
  }
}

export function mediaHeader_CompressionAlgorithmToJSON(object: MediaHeader_CompressionAlgorithm): string {
  switch (object) {
    case MediaHeader_CompressionAlgorithm.UNKNOWN:
      return "UNKNOWN";
    case MediaHeader_CompressionAlgorithm.NONE:
      return "NONE";
    case MediaHeader_CompressionAlgorithm.GZIP:
      return "GZIP";
    case MediaHeader_CompressionAlgorithm.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseMediaHeader(): MediaHeader {
  return {
    headerId: 0,
    videoId: "",
    itag: 0,
    lmt: 0,
    xtags: "",
    startRange: 0,
    compressionAlgorithm: 0,
    isInitSeg: false,
    sequenceNumber: 0,
    field10: 0,
    startMs: 0,
    durationMs: 0,
    formatId: undefined,
    contentLength: 0,
    timeRange: undefined,
  };
}

export const MediaHeader: MessageFns<MediaHeader> = {
  encode(message: MediaHeader, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.headerId !== undefined && message.headerId !== 0) {
      writer.uint32(8).uint32(message.headerId);
    }
    if (message.videoId !== undefined && message.videoId !== "") {
      writer.uint32(18).string(message.videoId);
    }
    if (message.itag !== undefined && message.itag !== 0) {
      writer.uint32(24).int32(message.itag);
    }
    if (message.lmt !== undefined && message.lmt !== 0) {
      writer.uint32(32).uint64(message.lmt);
    }
    if (message.xtags !== undefined && message.xtags !== "") {
      writer.uint32(42).string(message.xtags);
    }
    if (message.startRange !== undefined && message.startRange !== 0) {
      writer.uint32(48).int64(message.startRange);
    }
    if (message.compressionAlgorithm !== undefined && message.compressionAlgorithm !== 0) {
      writer.uint32(56).int32(message.compressionAlgorithm);
    }
    if (message.isInitSeg !== undefined && message.isInitSeg !== false) {
      writer.uint32(64).bool(message.isInitSeg);
    }
    if (message.sequenceNumber !== undefined && message.sequenceNumber !== 0) {
      writer.uint32(72).int64(message.sequenceNumber);
    }
    if (message.field10 !== undefined && message.field10 !== 0) {
      writer.uint32(80).int64(message.field10);
    }
    if (message.startMs !== undefined && message.startMs !== 0) {
      writer.uint32(88).int64(message.startMs);
    }
    if (message.durationMs !== undefined && message.durationMs !== 0) {
      writer.uint32(96).int64(message.durationMs);
    }
    if (message.formatId !== undefined) {
      FormatId.encode(message.formatId, writer.uint32(106).fork()).join();
    }
    if (message.contentLength !== undefined && message.contentLength !== 0) {
      writer.uint32(112).int64(message.contentLength);
    }
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(122).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MediaHeader {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaHeader();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.headerId = reader.uint32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.videoId = reader.string();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.itag = reader.int32();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.lmt = longToNumber(reader.uint64());
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.xtags = reader.string();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.startRange = longToNumber(reader.int64());
          continue;
        case 7:
          if (tag !== 56) {
            break;
          }

          message.compressionAlgorithm = reader.int32() as any;
          continue;
        case 8:
          if (tag !== 64) {
            break;
          }

          message.isInitSeg = reader.bool();
          continue;
        case 9:
          if (tag !== 72) {
            break;
          }

          message.sequenceNumber = longToNumber(reader.int64());
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.field10 = longToNumber(reader.int64());
          continue;
        case 11:
          if (tag !== 88) {
            break;
          }

          message.startMs = longToNumber(reader.int64());
          continue;
        case 12:
          if (tag !== 96) {
            break;
          }

          message.durationMs = longToNumber(reader.int64());
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.formatId = FormatId.decode(reader, reader.uint32());
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.contentLength = longToNumber(reader.int64());
          continue;
        case 15:
          if (tag !== 122) {
            break;
          }

          message.timeRange = TimeRange.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MediaHeader {
    return {
      headerId: isSet(object.headerId) ? globalThis.Number(object.headerId) : 0,
      videoId: isSet(object.videoId) ? globalThis.String(object.videoId) : "",
      itag: isSet(object.itag) ? globalThis.Number(object.itag) : 0,
      lmt: isSet(object.lmt) ? globalThis.Number(object.lmt) : 0,
      xtags: isSet(object.xtags) ? globalThis.String(object.xtags) : "",
      startRange: isSet(object.startRange) ? globalThis.Number(object.startRange) : 0,
      compressionAlgorithm: isSet(object.compressionAlgorithm)
        ? mediaHeader_CompressionAlgorithmFromJSON(object.compressionAlgorithm)
        : 0,
      isInitSeg: isSet(object.isInitSeg) ? globalThis.Boolean(object.isInitSeg) : false,
      sequenceNumber: isSet(object.sequenceNumber) ? globalThis.Number(object.sequenceNumber) : 0,
      field10: isSet(object.field10) ? globalThis.Number(object.field10) : 0,
      startMs: isSet(object.startMs) ? globalThis.Number(object.startMs) : 0,
      durationMs: isSet(object.durationMs) ? globalThis.Number(object.durationMs) : 0,
      formatId: isSet(object.formatId) ? FormatId.fromJSON(object.formatId) : undefined,
      contentLength: isSet(object.contentLength) ? globalThis.Number(object.contentLength) : 0,
      timeRange: isSet(object.timeRange) ? TimeRange.fromJSON(object.timeRange) : undefined,
    };
  },

  toJSON(message: MediaHeader): unknown {
    const obj: any = {};
    if (message.headerId !== undefined && message.headerId !== 0) {
      obj.headerId = Math.round(message.headerId);
    }
    if (message.videoId !== undefined && message.videoId !== "") {
      obj.videoId = message.videoId;
    }
    if (message.itag !== undefined && message.itag !== 0) {
      obj.itag = Math.round(message.itag);
    }
    if (message.lmt !== undefined && message.lmt !== 0) {
      obj.lmt = Math.round(message.lmt);
    }
    if (message.xtags !== undefined && message.xtags !== "") {
      obj.xtags = message.xtags;
    }
    if (message.startRange !== undefined && message.startRange !== 0) {
      obj.startRange = Math.round(message.startRange);
    }
    if (message.compressionAlgorithm !== undefined && message.compressionAlgorithm !== 0) {
      obj.compressionAlgorithm = mediaHeader_CompressionAlgorithmToJSON(message.compressionAlgorithm);
    }
    if (message.isInitSeg !== undefined && message.isInitSeg !== false) {
      obj.isInitSeg = message.isInitSeg;
    }
    if (message.sequenceNumber !== undefined && message.sequenceNumber !== 0) {
      obj.sequenceNumber = Math.round(message.sequenceNumber);
    }
    if (message.field10 !== undefined && message.field10 !== 0) {
      obj.field10 = Math.round(message.field10);
    }
    if (message.startMs !== undefined && message.startMs !== 0) {
      obj.startMs = Math.round(message.startMs);
    }
    if (message.durationMs !== undefined && message.durationMs !== 0) {
      obj.durationMs = Math.round(message.durationMs);
    }
    if (message.formatId !== undefined) {
      obj.formatId = FormatId.toJSON(message.formatId);
    }
    if (message.contentLength !== undefined && message.contentLength !== 0) {
      obj.contentLength = Math.round(message.contentLength);
    }
    if (message.timeRange !== undefined) {
      obj.timeRange = TimeRange.toJSON(message.timeRange);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MediaHeader>, I>>(base?: I): MediaHeader {
    return MediaHeader.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MediaHeader>, I>>(object: I): MediaHeader {
    const message = createBaseMediaHeader();
    message.headerId = object.headerId ?? 0;
    message.videoId = object.videoId ?? "";
    message.itag = object.itag ?? 0;
    message.lmt = object.lmt ?? 0;
    message.xtags = object.xtags ?? "";
    message.startRange = object.startRange ?? 0;
    message.compressionAlgorithm = object.compressionAlgorithm ?? 0;
    message.isInitSeg = object.isInitSeg ?? false;
    message.sequenceNumber = object.sequenceNumber ?? 0;
    message.field10 = object.field10 ?? 0;
    message.startMs = object.startMs ?? 0;
    message.durationMs = object.durationMs ?? 0;
    message.formatId = (object.formatId !== undefined && object.formatId !== null)
      ? FormatId.fromPartial(object.formatId)
      : undefined;
    message.contentLength = object.contentLength ?? 0;
    message.timeRange = (object.timeRange !== undefined && object.timeRange !== null)
      ? TimeRange.fromPartial(object.timeRange)
      : undefined;
    return message;
  },
};

type Builtin = Date | Function | Uint8Array | string | number | boolean | undefined;

export type DeepPartial<T> = T extends Builtin ? T
  : T extends globalThis.Array<infer U> ? globalThis.Array<DeepPartial<U>>
  : T extends ReadonlyArray<infer U> ? ReadonlyArray<DeepPartial<U>>
  : T extends {} ? { [K in keyof T]?: DeepPartial<T[K]> }
  : Partial<T>;

type KeysOfUnion<T> = T extends T ? keyof T : never;
export type Exact<P, I extends P> = P extends Builtin ? P
  : P & { [K in keyof P]: Exact<P[K], I[K]> } & { [K in Exclude<keyof I, KeysOfUnion<P>>]: never };

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

function isSet(value: any): boolean {
  return value !== null && value !== undefined;
}

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
  fromJSON(object: any): T;
  toJSON(message: T): unknown;
  create<I extends Exact<DeepPartial<T>, I>>(base?: I): T;
  fromPartial<I extends Exact<DeepPartial<T>, I>>(object: I): T;
}
