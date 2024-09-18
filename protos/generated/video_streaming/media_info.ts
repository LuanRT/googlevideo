// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/media_info.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { MediaCapabilities } from "./media_capabilities.js";

export const protobufPackage = "video_streaming";

export interface MediaInfo {
  timeSinceLastManualFormatSelectionMs?: number | undefined;
  lastManualDirection?: number | undefined;
  quality?: number | undefined;
  detailedNetworkType?: number | undefined;
  maxWidth?: number | undefined;
  maxHeight?: number | undefined;
  iea?: number | undefined;
  r7?: number | undefined;
  startTimeMs?: number | undefined;
  timeSinceLastSeek?: number | undefined;
  visibility?: number | undefined;
  d8?: number | undefined;
  mediaCapabilities?: MediaCapabilities | undefined;
  lact?:
    | number
    | undefined;
  /** optional int32 Gw = 40; */
  mediaType?: MediaInfo_MediaType | undefined;
  playerState?: number | undefined;
  a8?: boolean | undefined;
  Jda?: number | undefined;
  qw?: number | undefined;
  Ky?: number | undefined;
  Eq?: number | undefined;
  l?: boolean | undefined;
  G7?: number | undefined;
  No?: boolean | undefined;
  qj?: number | undefined;
  Hx?: number | undefined;
  isPrefetch?: boolean | undefined;
  Iz?: number | undefined;
  sabrLicenseConstraint?: Uint8Array | undefined;
  allowProximaLiveLatency?: number | undefined;
  sabrForceProxima?: number | undefined;
  Tqb?: number | undefined;
  c?: number | undefined;
}

export enum MediaInfo_MediaType {
  MEDIA_TYPE_DEFAULT = 0,
  MEDIA_TYPE_AUDIO = 1,
  MEDIA_TYPE_VIDEO = 2,
  USE_SERVER_FORMAT_FILTER = 3,
  UNRECOGNIZED = -1,
}

export function mediaInfo_MediaTypeFromJSON(object: any): MediaInfo_MediaType {
  switch (object) {
    case 0:
    case "MEDIA_TYPE_DEFAULT":
      return MediaInfo_MediaType.MEDIA_TYPE_DEFAULT;
    case 1:
    case "MEDIA_TYPE_AUDIO":
      return MediaInfo_MediaType.MEDIA_TYPE_AUDIO;
    case 2:
    case "MEDIA_TYPE_VIDEO":
      return MediaInfo_MediaType.MEDIA_TYPE_VIDEO;
    case 3:
    case "USE_SERVER_FORMAT_FILTER":
      return MediaInfo_MediaType.USE_SERVER_FORMAT_FILTER;
    case -1:
    case "UNRECOGNIZED":
    default:
      return MediaInfo_MediaType.UNRECOGNIZED;
  }
}

export function mediaInfo_MediaTypeToJSON(object: MediaInfo_MediaType): string {
  switch (object) {
    case MediaInfo_MediaType.MEDIA_TYPE_DEFAULT:
      return "MEDIA_TYPE_DEFAULT";
    case MediaInfo_MediaType.MEDIA_TYPE_AUDIO:
      return "MEDIA_TYPE_AUDIO";
    case MediaInfo_MediaType.MEDIA_TYPE_VIDEO:
      return "MEDIA_TYPE_VIDEO";
    case MediaInfo_MediaType.USE_SERVER_FORMAT_FILTER:
      return "USE_SERVER_FORMAT_FILTER";
    case MediaInfo_MediaType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseMediaInfo(): MediaInfo {
  return {
    timeSinceLastManualFormatSelectionMs: undefined,
    lastManualDirection: undefined,
    quality: undefined,
    detailedNetworkType: undefined,
    maxWidth: undefined,
    maxHeight: undefined,
    iea: undefined,
    r7: undefined,
    startTimeMs: undefined,
    timeSinceLastSeek: undefined,
    visibility: undefined,
    d8: undefined,
    mediaCapabilities: undefined,
    lact: undefined,
    mediaType: undefined,
    playerState: undefined,
    a8: undefined,
    Jda: undefined,
    qw: undefined,
    Ky: undefined,
    Eq: undefined,
    l: undefined,
    G7: undefined,
    No: undefined,
    qj: undefined,
    Hx: undefined,
    isPrefetch: undefined,
    Iz: undefined,
    sabrLicenseConstraint: undefined,
    allowProximaLiveLatency: undefined,
    sabrForceProxima: undefined,
    Tqb: undefined,
    c: undefined,
  };
}

export const MediaInfo: MessageFns<MediaInfo> = {
  encode(message: MediaInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.timeSinceLastManualFormatSelectionMs !== undefined) {
      writer.uint32(104).int32(message.timeSinceLastManualFormatSelectionMs);
    }
    if (message.lastManualDirection !== undefined) {
      writer.uint32(112).int32(message.lastManualDirection);
    }
    if (message.quality !== undefined) {
      writer.uint32(128).int32(message.quality);
    }
    if (message.detailedNetworkType !== undefined) {
      writer.uint32(136).int32(message.detailedNetworkType);
    }
    if (message.maxWidth !== undefined) {
      writer.uint32(144).int32(message.maxWidth);
    }
    if (message.maxHeight !== undefined) {
      writer.uint32(152).int32(message.maxHeight);
    }
    if (message.iea !== undefined) {
      writer.uint32(168).int32(message.iea);
    }
    if (message.r7 !== undefined) {
      writer.uint32(184).int32(message.r7);
    }
    if (message.startTimeMs !== undefined) {
      writer.uint32(224).int64(message.startTimeMs);
    }
    if (message.timeSinceLastSeek !== undefined) {
      writer.uint32(232).int64(message.timeSinceLastSeek);
    }
    if (message.visibility !== undefined) {
      writer.uint32(272).int32(message.visibility);
    }
    if (message.d8 !== undefined) {
      writer.uint32(288).int64(message.d8);
    }
    if (message.mediaCapabilities !== undefined) {
      MediaCapabilities.encode(message.mediaCapabilities, writer.uint32(306).fork()).join();
    }
    if (message.lact !== undefined) {
      writer.uint32(312).int32(message.lact);
    }
    if (message.mediaType !== undefined) {
      writer.uint32(320).int32(message.mediaType);
    }
    if (message.playerState !== undefined) {
      writer.uint32(352).int32(message.playerState);
    }
    if (message.a8 !== undefined) {
      writer.uint32(368).bool(message.a8);
    }
    if (message.Jda !== undefined) {
      writer.uint32(384).int32(message.Jda);
    }
    if (message.qw !== undefined) {
      writer.uint32(400).int32(message.qw);
    }
    if (message.Ky !== undefined) {
      writer.uint32(408).int32(message.Ky);
    }
    if (message.Eq !== undefined) {
      writer.uint32(432).int32(message.Eq);
    }
    if (message.l !== undefined) {
      writer.uint32(448).bool(message.l);
    }
    if (message.G7 !== undefined) {
      writer.uint32(456).int32(message.G7);
    }
    if (message.No !== undefined) {
      writer.uint32(464).bool(message.No);
    }
    if (message.qj !== undefined) {
      writer.uint32(472).int32(message.qj);
    }
    if (message.Hx !== undefined) {
      writer.uint32(480).int32(message.Hx);
    }
    if (message.isPrefetch !== undefined) {
      writer.uint32(488).bool(message.isPrefetch);
    }
    if (message.Iz !== undefined) {
      writer.uint32(496).int32(message.Iz);
    }
    if (message.sabrLicenseConstraint !== undefined) {
      writer.uint32(506).bytes(message.sabrLicenseConstraint);
    }
    if (message.allowProximaLiveLatency !== undefined) {
      writer.uint32(512).int32(message.allowProximaLiveLatency);
    }
    if (message.sabrForceProxima !== undefined) {
      writer.uint32(528).int32(message.sabrForceProxima);
    }
    if (message.Tqb !== undefined) {
      writer.uint32(536).int32(message.Tqb);
    }
    if (message.c !== undefined) {
      writer.uint32(544).int32(message.c);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): MediaInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMediaInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 13:
          if (tag !== 104) {
            break;
          }

          message.timeSinceLastManualFormatSelectionMs = reader.int32();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.lastManualDirection = reader.int32();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.quality = reader.int32();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.detailedNetworkType = reader.int32();
          continue;
        case 18:
          if (tag !== 144) {
            break;
          }

          message.maxWidth = reader.int32();
          continue;
        case 19:
          if (tag !== 152) {
            break;
          }

          message.maxHeight = reader.int32();
          continue;
        case 21:
          if (tag !== 168) {
            break;
          }

          message.iea = reader.int32();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.r7 = reader.int32();
          continue;
        case 28:
          if (tag !== 224) {
            break;
          }

          message.startTimeMs = longToNumber(reader.int64());
          continue;
        case 29:
          if (tag !== 232) {
            break;
          }

          message.timeSinceLastSeek = longToNumber(reader.int64());
          continue;
        case 34:
          if (tag !== 272) {
            break;
          }

          message.visibility = reader.int32();
          continue;
        case 36:
          if (tag !== 288) {
            break;
          }

          message.d8 = longToNumber(reader.int64());
          continue;
        case 38:
          if (tag !== 306) {
            break;
          }

          message.mediaCapabilities = MediaCapabilities.decode(reader, reader.uint32());
          continue;
        case 39:
          if (tag !== 312) {
            break;
          }

          message.lact = reader.int32();
          continue;
        case 40:
          if (tag !== 320) {
            break;
          }

          message.mediaType = reader.int32() as any;
          continue;
        case 44:
          if (tag !== 352) {
            break;
          }

          message.playerState = reader.int32();
          continue;
        case 46:
          if (tag !== 368) {
            break;
          }

          message.a8 = reader.bool();
          continue;
        case 48:
          if (tag !== 384) {
            break;
          }

          message.Jda = reader.int32();
          continue;
        case 50:
          if (tag !== 400) {
            break;
          }

          message.qw = reader.int32();
          continue;
        case 51:
          if (tag !== 408) {
            break;
          }

          message.Ky = reader.int32();
          continue;
        case 54:
          if (tag !== 432) {
            break;
          }

          message.Eq = reader.int32();
          continue;
        case 56:
          if (tag !== 448) {
            break;
          }

          message.l = reader.bool();
          continue;
        case 57:
          if (tag !== 456) {
            break;
          }

          message.G7 = reader.int32();
          continue;
        case 58:
          if (tag !== 464) {
            break;
          }

          message.No = reader.bool();
          continue;
        case 59:
          if (tag !== 472) {
            break;
          }

          message.qj = reader.int32();
          continue;
        case 60:
          if (tag !== 480) {
            break;
          }

          message.Hx = reader.int32();
          continue;
        case 61:
          if (tag !== 488) {
            break;
          }

          message.isPrefetch = reader.bool();
          continue;
        case 62:
          if (tag !== 496) {
            break;
          }

          message.Iz = reader.int32();
          continue;
        case 63:
          if (tag !== 506) {
            break;
          }

          message.sabrLicenseConstraint = reader.bytes();
          continue;
        case 64:
          if (tag !== 512) {
            break;
          }

          message.allowProximaLiveLatency = reader.int32();
          continue;
        case 66:
          if (tag !== 528) {
            break;
          }

          message.sabrForceProxima = reader.int32();
          continue;
        case 67:
          if (tag !== 536) {
            break;
          }

          message.Tqb = reader.int32();
          continue;
        case 68:
          if (tag !== 544) {
            break;
          }

          message.c = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): MediaInfo {
    return {
      timeSinceLastManualFormatSelectionMs: isSet(object.timeSinceLastManualFormatSelectionMs)
        ? globalThis.Number(object.timeSinceLastManualFormatSelectionMs)
        : undefined,
      lastManualDirection: isSet(object.lastManualDirection)
        ? globalThis.Number(object.lastManualDirection)
        : undefined,
      quality: isSet(object.quality) ? globalThis.Number(object.quality) : undefined,
      detailedNetworkType: isSet(object.detailedNetworkType)
        ? globalThis.Number(object.detailedNetworkType)
        : undefined,
      maxWidth: isSet(object.maxWidth) ? globalThis.Number(object.maxWidth) : undefined,
      maxHeight: isSet(object.maxHeight) ? globalThis.Number(object.maxHeight) : undefined,
      iea: isSet(object.iea) ? globalThis.Number(object.iea) : undefined,
      r7: isSet(object.r7) ? globalThis.Number(object.r7) : undefined,
      startTimeMs: isSet(object.startTimeMs) ? globalThis.Number(object.startTimeMs) : undefined,
      timeSinceLastSeek: isSet(object.timeSinceLastSeek) ? globalThis.Number(object.timeSinceLastSeek) : undefined,
      visibility: isSet(object.visibility) ? globalThis.Number(object.visibility) : undefined,
      d8: isSet(object.d8) ? globalThis.Number(object.d8) : undefined,
      mediaCapabilities: isSet(object.mediaCapabilities)
        ? MediaCapabilities.fromJSON(object.mediaCapabilities)
        : undefined,
      lact: isSet(object.lact) ? globalThis.Number(object.lact) : undefined,
      mediaType: isSet(object.mediaType) ? mediaInfo_MediaTypeFromJSON(object.mediaType) : undefined,
      playerState: isSet(object.playerState) ? globalThis.Number(object.playerState) : undefined,
      a8: isSet(object.a8) ? globalThis.Boolean(object.a8) : undefined,
      Jda: isSet(object.Jda) ? globalThis.Number(object.Jda) : undefined,
      qw: isSet(object.qw) ? globalThis.Number(object.qw) : undefined,
      Ky: isSet(object.Ky) ? globalThis.Number(object.Ky) : undefined,
      Eq: isSet(object.Eq) ? globalThis.Number(object.Eq) : undefined,
      l: isSet(object.l) ? globalThis.Boolean(object.l) : undefined,
      G7: isSet(object.G7) ? globalThis.Number(object.G7) : undefined,
      No: isSet(object.No) ? globalThis.Boolean(object.No) : undefined,
      qj: isSet(object.qj) ? globalThis.Number(object.qj) : undefined,
      Hx: isSet(object.Hx) ? globalThis.Number(object.Hx) : undefined,
      isPrefetch: isSet(object.isPrefetch) ? globalThis.Boolean(object.isPrefetch) : undefined,
      Iz: isSet(object.Iz) ? globalThis.Number(object.Iz) : undefined,
      sabrLicenseConstraint: isSet(object.sabrLicenseConstraint)
        ? bytesFromBase64(object.sabrLicenseConstraint)
        : undefined,
      allowProximaLiveLatency: isSet(object.allowProximaLiveLatency)
        ? globalThis.Number(object.allowProximaLiveLatency)
        : undefined,
      sabrForceProxima: isSet(object.sabrForceProxima) ? globalThis.Number(object.sabrForceProxima) : undefined,
      Tqb: isSet(object.Tqb) ? globalThis.Number(object.Tqb) : undefined,
      c: isSet(object.c) ? globalThis.Number(object.c) : undefined,
    };
  },

  toJSON(message: MediaInfo): unknown {
    const obj: any = {};
    if (message.timeSinceLastManualFormatSelectionMs !== undefined) {
      obj.timeSinceLastManualFormatSelectionMs = Math.round(message.timeSinceLastManualFormatSelectionMs);
    }
    if (message.lastManualDirection !== undefined) {
      obj.lastManualDirection = Math.round(message.lastManualDirection);
    }
    if (message.quality !== undefined) {
      obj.quality = Math.round(message.quality);
    }
    if (message.detailedNetworkType !== undefined) {
      obj.detailedNetworkType = Math.round(message.detailedNetworkType);
    }
    if (message.maxWidth !== undefined) {
      obj.maxWidth = Math.round(message.maxWidth);
    }
    if (message.maxHeight !== undefined) {
      obj.maxHeight = Math.round(message.maxHeight);
    }
    if (message.iea !== undefined) {
      obj.iea = Math.round(message.iea);
    }
    if (message.r7 !== undefined) {
      obj.r7 = Math.round(message.r7);
    }
    if (message.startTimeMs !== undefined) {
      obj.startTimeMs = Math.round(message.startTimeMs);
    }
    if (message.timeSinceLastSeek !== undefined) {
      obj.timeSinceLastSeek = Math.round(message.timeSinceLastSeek);
    }
    if (message.visibility !== undefined) {
      obj.visibility = Math.round(message.visibility);
    }
    if (message.d8 !== undefined) {
      obj.d8 = Math.round(message.d8);
    }
    if (message.mediaCapabilities !== undefined) {
      obj.mediaCapabilities = MediaCapabilities.toJSON(message.mediaCapabilities);
    }
    if (message.lact !== undefined) {
      obj.lact = Math.round(message.lact);
    }
    if (message.mediaType !== undefined) {
      obj.mediaType = mediaInfo_MediaTypeToJSON(message.mediaType);
    }
    if (message.playerState !== undefined) {
      obj.playerState = Math.round(message.playerState);
    }
    if (message.a8 !== undefined) {
      obj.a8 = message.a8;
    }
    if (message.Jda !== undefined) {
      obj.Jda = Math.round(message.Jda);
    }
    if (message.qw !== undefined) {
      obj.qw = Math.round(message.qw);
    }
    if (message.Ky !== undefined) {
      obj.Ky = Math.round(message.Ky);
    }
    if (message.Eq !== undefined) {
      obj.Eq = Math.round(message.Eq);
    }
    if (message.l !== undefined) {
      obj.l = message.l;
    }
    if (message.G7 !== undefined) {
      obj.G7 = Math.round(message.G7);
    }
    if (message.No !== undefined) {
      obj.No = message.No;
    }
    if (message.qj !== undefined) {
      obj.qj = Math.round(message.qj);
    }
    if (message.Hx !== undefined) {
      obj.Hx = Math.round(message.Hx);
    }
    if (message.isPrefetch !== undefined) {
      obj.isPrefetch = message.isPrefetch;
    }
    if (message.Iz !== undefined) {
      obj.Iz = Math.round(message.Iz);
    }
    if (message.sabrLicenseConstraint !== undefined) {
      obj.sabrLicenseConstraint = base64FromBytes(message.sabrLicenseConstraint);
    }
    if (message.allowProximaLiveLatency !== undefined) {
      obj.allowProximaLiveLatency = Math.round(message.allowProximaLiveLatency);
    }
    if (message.sabrForceProxima !== undefined) {
      obj.sabrForceProxima = Math.round(message.sabrForceProxima);
    }
    if (message.Tqb !== undefined) {
      obj.Tqb = Math.round(message.Tqb);
    }
    if (message.c !== undefined) {
      obj.c = Math.round(message.c);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<MediaInfo>, I>>(base?: I): MediaInfo {
    return MediaInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<MediaInfo>, I>>(object: I): MediaInfo {
    const message = createBaseMediaInfo();
    message.timeSinceLastManualFormatSelectionMs = object.timeSinceLastManualFormatSelectionMs ?? undefined;
    message.lastManualDirection = object.lastManualDirection ?? undefined;
    message.quality = object.quality ?? undefined;
    message.detailedNetworkType = object.detailedNetworkType ?? undefined;
    message.maxWidth = object.maxWidth ?? undefined;
    message.maxHeight = object.maxHeight ?? undefined;
    message.iea = object.iea ?? undefined;
    message.r7 = object.r7 ?? undefined;
    message.startTimeMs = object.startTimeMs ?? undefined;
    message.timeSinceLastSeek = object.timeSinceLastSeek ?? undefined;
    message.visibility = object.visibility ?? undefined;
    message.d8 = object.d8 ?? undefined;
    message.mediaCapabilities = (object.mediaCapabilities !== undefined && object.mediaCapabilities !== null)
      ? MediaCapabilities.fromPartial(object.mediaCapabilities)
      : undefined;
    message.lact = object.lact ?? undefined;
    message.mediaType = object.mediaType ?? undefined;
    message.playerState = object.playerState ?? undefined;
    message.a8 = object.a8 ?? undefined;
    message.Jda = object.Jda ?? undefined;
    message.qw = object.qw ?? undefined;
    message.Ky = object.Ky ?? undefined;
    message.Eq = object.Eq ?? undefined;
    message.l = object.l ?? undefined;
    message.G7 = object.G7 ?? undefined;
    message.No = object.No ?? undefined;
    message.qj = object.qj ?? undefined;
    message.Hx = object.Hx ?? undefined;
    message.isPrefetch = object.isPrefetch ?? undefined;
    message.Iz = object.Iz ?? undefined;
    message.sabrLicenseConstraint = object.sabrLicenseConstraint ?? undefined;
    message.allowProximaLiveLatency = object.allowProximaLiveLatency ?? undefined;
    message.sabrForceProxima = object.sabrForceProxima ?? undefined;
    message.Tqb = object.Tqb ?? undefined;
    message.c = object.c ?? undefined;
    return message;
  },
};

function bytesFromBase64(b64: string): Uint8Array {
  const bin = globalThis.atob(b64);
  const arr = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; ++i) {
    arr[i] = bin.charCodeAt(i);
  }
  return arr;
}

function base64FromBytes(arr: Uint8Array): string {
  const bin: string[] = [];
  arr.forEach((byte) => {
    bin.push(globalThis.String.fromCharCode(byte));
  });
  return globalThis.btoa(bin.join(""));
}

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
