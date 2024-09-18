// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/streamer_context.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface StreamerContext {
  clientInfo?: StreamerContext_ClientInfo | undefined;
  poToken?: Uint8Array | undefined;
  playbackCookie?: Uint8Array | undefined;
  gp?: Uint8Array | undefined;
  field5: StreamerContext_Fqa[];
  field6: number[];
  field7?: string | undefined;
  field8?: StreamerContext_Gqa | undefined;
}

export enum StreamerContext_ClientFormFactor {
  UNKNOWN_FORM_FACTOR = 0,
  FORM_FACTOR_VAL1 = 1,
  FORM_FACTOR_VAL2 = 2,
  UNRECOGNIZED = -1,
}

export function streamerContext_ClientFormFactorFromJSON(object: any): StreamerContext_ClientFormFactor {
  switch (object) {
    case 0:
    case "UNKNOWN_FORM_FACTOR":
      return StreamerContext_ClientFormFactor.UNKNOWN_FORM_FACTOR;
    case 1:
    case "FORM_FACTOR_VAL1":
      return StreamerContext_ClientFormFactor.FORM_FACTOR_VAL1;
    case 2:
    case "FORM_FACTOR_VAL2":
      return StreamerContext_ClientFormFactor.FORM_FACTOR_VAL2;
    case -1:
    case "UNRECOGNIZED":
    default:
      return StreamerContext_ClientFormFactor.UNRECOGNIZED;
  }
}

export function streamerContext_ClientFormFactorToJSON(object: StreamerContext_ClientFormFactor): string {
  switch (object) {
    case StreamerContext_ClientFormFactor.UNKNOWN_FORM_FACTOR:
      return "UNKNOWN_FORM_FACTOR";
    case StreamerContext_ClientFormFactor.FORM_FACTOR_VAL1:
      return "FORM_FACTOR_VAL1";
    case StreamerContext_ClientFormFactor.FORM_FACTOR_VAL2:
      return "FORM_FACTOR_VAL2";
    case StreamerContext_ClientFormFactor.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

export interface StreamerContext_ClientInfo {
  deviceMake?: string | undefined;
  deviceModel?: string | undefined;
  clientName?: number | undefined;
  clientVersion?: string | undefined;
  osName?: string | undefined;
  osVersion?: string | undefined;
  acceptLanguage?: string | undefined;
  acceptRegion?: string | undefined;
  screenWidthPoints?: number | undefined;
  screenHeightPoints?: number | undefined;
  screenWidthInches?: number | undefined;
  screenHeightInches?: number | undefined;
  screenPixelDensity?: number | undefined;
  clientFormFactor?:
    | StreamerContext_ClientFormFactor
    | undefined;
  /** e.g. 243731017 */
  gmscoreVersionCode?: number | undefined;
  windowWidthPoints?: number | undefined;
  windowHeightPoints?: number | undefined;
  androidSdkVersion?: number | undefined;
  screenDensityFloat?: number | undefined;
  utcOffsetMinutes?: number | undefined;
  timeZone?:
    | string
    | undefined;
  /** e.g. "qcom;taro" */
  chipset?: string | undefined;
  glDeviceInfo?: StreamerContext_GLDeviceInfo | undefined;
}

export interface StreamerContext_GLDeviceInfo {
  glRenderer?: string | undefined;
  glEsVersionMajor?: number | undefined;
  glEsVersionMinor?: number | undefined;
}

export interface StreamerContext_Fqa {
  type?: number | undefined;
  value?: Uint8Array | undefined;
}

export interface StreamerContext_Gqa {
  field1?: Uint8Array | undefined;
  field2?: StreamerContext_Gqa_Hqa | undefined;
}

export interface StreamerContext_Gqa_Hqa {
  code?: number | undefined;
  message?: string | undefined;
}

function createBaseStreamerContext(): StreamerContext {
  return {
    clientInfo: undefined,
    poToken: undefined,
    playbackCookie: undefined,
    gp: undefined,
    field5: [],
    field6: [],
    field7: undefined,
    field8: undefined,
  };
}

export const StreamerContext: MessageFns<StreamerContext> = {
  encode(message: StreamerContext, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.clientInfo !== undefined) {
      StreamerContext_ClientInfo.encode(message.clientInfo, writer.uint32(10).fork()).join();
    }
    if (message.poToken !== undefined) {
      writer.uint32(18).bytes(message.poToken);
    }
    if (message.playbackCookie !== undefined) {
      writer.uint32(26).bytes(message.playbackCookie);
    }
    if (message.gp !== undefined) {
      writer.uint32(34).bytes(message.gp);
    }
    for (const v of message.field5) {
      StreamerContext_Fqa.encode(v!, writer.uint32(42).fork()).join();
    }
    writer.uint32(50).fork();
    for (const v of message.field6) {
      writer.int32(v);
    }
    writer.join();
    if (message.field7 !== undefined) {
      writer.uint32(58).string(message.field7);
    }
    if (message.field8 !== undefined) {
      StreamerContext_Gqa.encode(message.field8, writer.uint32(66).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientInfo = StreamerContext_ClientInfo.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.poToken = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.playbackCookie = reader.bytes();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.gp = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.field5.push(StreamerContext_Fqa.decode(reader, reader.uint32()));
          continue;
        case 6:
          if (tag === 48) {
            message.field6.push(reader.int32());

            continue;
          }

          if (tag === 50) {
            const end2 = reader.uint32() + reader.pos;
            while (reader.pos < end2) {
              message.field6.push(reader.int32());
            }

            continue;
          }

          break;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.field7 = reader.string();
          continue;
        case 8:
          if (tag !== 66) {
            break;
          }

          message.field8 = StreamerContext_Gqa.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext {
    return {
      clientInfo: isSet(object.clientInfo) ? StreamerContext_ClientInfo.fromJSON(object.clientInfo) : undefined,
      poToken: isSet(object.poToken) ? bytesFromBase64(object.poToken) : undefined,
      playbackCookie: isSet(object.playbackCookie) ? bytesFromBase64(object.playbackCookie) : undefined,
      gp: isSet(object.gp) ? bytesFromBase64(object.gp) : undefined,
      field5: globalThis.Array.isArray(object?.field5)
        ? object.field5.map((e: any) => StreamerContext_Fqa.fromJSON(e))
        : [],
      field6: globalThis.Array.isArray(object?.field6) ? object.field6.map((e: any) => globalThis.Number(e)) : [],
      field7: isSet(object.field7) ? globalThis.String(object.field7) : undefined,
      field8: isSet(object.field8) ? StreamerContext_Gqa.fromJSON(object.field8) : undefined,
    };
  },

  toJSON(message: StreamerContext): unknown {
    const obj: any = {};
    if (message.clientInfo !== undefined) {
      obj.clientInfo = StreamerContext_ClientInfo.toJSON(message.clientInfo);
    }
    if (message.poToken !== undefined) {
      obj.poToken = base64FromBytes(message.poToken);
    }
    if (message.playbackCookie !== undefined) {
      obj.playbackCookie = base64FromBytes(message.playbackCookie);
    }
    if (message.gp !== undefined) {
      obj.gp = base64FromBytes(message.gp);
    }
    if (message.field5?.length) {
      obj.field5 = message.field5.map((e) => StreamerContext_Fqa.toJSON(e));
    }
    if (message.field6?.length) {
      obj.field6 = message.field6.map((e) => Math.round(e));
    }
    if (message.field7 !== undefined) {
      obj.field7 = message.field7;
    }
    if (message.field8 !== undefined) {
      obj.field8 = StreamerContext_Gqa.toJSON(message.field8);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext>, I>>(base?: I): StreamerContext {
    return StreamerContext.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext>, I>>(object: I): StreamerContext {
    const message = createBaseStreamerContext();
    message.clientInfo = (object.clientInfo !== undefined && object.clientInfo !== null)
      ? StreamerContext_ClientInfo.fromPartial(object.clientInfo)
      : undefined;
    message.poToken = object.poToken ?? undefined;
    message.playbackCookie = object.playbackCookie ?? undefined;
    message.gp = object.gp ?? undefined;
    message.field5 = object.field5?.map((e) => StreamerContext_Fqa.fromPartial(e)) || [];
    message.field6 = object.field6?.map((e) => e) || [];
    message.field7 = object.field7 ?? undefined;
    message.field8 = (object.field8 !== undefined && object.field8 !== null)
      ? StreamerContext_Gqa.fromPartial(object.field8)
      : undefined;
    return message;
  },
};

function createBaseStreamerContext_ClientInfo(): StreamerContext_ClientInfo {
  return {
    deviceMake: undefined,
    deviceModel: undefined,
    clientName: undefined,
    clientVersion: undefined,
    osName: undefined,
    osVersion: undefined,
    acceptLanguage: undefined,
    acceptRegion: undefined,
    screenWidthPoints: undefined,
    screenHeightPoints: undefined,
    screenWidthInches: undefined,
    screenHeightInches: undefined,
    screenPixelDensity: undefined,
    clientFormFactor: undefined,
    gmscoreVersionCode: undefined,
    windowWidthPoints: undefined,
    windowHeightPoints: undefined,
    androidSdkVersion: undefined,
    screenDensityFloat: undefined,
    utcOffsetMinutes: undefined,
    timeZone: undefined,
    chipset: undefined,
    glDeviceInfo: undefined,
  };
}

export const StreamerContext_ClientInfo: MessageFns<StreamerContext_ClientInfo> = {
  encode(message: StreamerContext_ClientInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.deviceMake !== undefined) {
      writer.uint32(98).string(message.deviceMake);
    }
    if (message.deviceModel !== undefined) {
      writer.uint32(106).string(message.deviceModel);
    }
    if (message.clientName !== undefined) {
      writer.uint32(128).int32(message.clientName);
    }
    if (message.clientVersion !== undefined) {
      writer.uint32(138).string(message.clientVersion);
    }
    if (message.osName !== undefined) {
      writer.uint32(146).string(message.osName);
    }
    if (message.osVersion !== undefined) {
      writer.uint32(154).string(message.osVersion);
    }
    if (message.acceptLanguage !== undefined) {
      writer.uint32(170).string(message.acceptLanguage);
    }
    if (message.acceptRegion !== undefined) {
      writer.uint32(178).string(message.acceptRegion);
    }
    if (message.screenWidthPoints !== undefined) {
      writer.uint32(296).int32(message.screenWidthPoints);
    }
    if (message.screenHeightPoints !== undefined) {
      writer.uint32(304).int32(message.screenHeightPoints);
    }
    if (message.screenWidthInches !== undefined) {
      writer.uint32(317).float(message.screenWidthInches);
    }
    if (message.screenHeightInches !== undefined) {
      writer.uint32(325).float(message.screenHeightInches);
    }
    if (message.screenPixelDensity !== undefined) {
      writer.uint32(328).int32(message.screenPixelDensity);
    }
    if (message.clientFormFactor !== undefined) {
      writer.uint32(368).int32(message.clientFormFactor);
    }
    if (message.gmscoreVersionCode !== undefined) {
      writer.uint32(400).int32(message.gmscoreVersionCode);
    }
    if (message.windowWidthPoints !== undefined) {
      writer.uint32(440).int32(message.windowWidthPoints);
    }
    if (message.windowHeightPoints !== undefined) {
      writer.uint32(448).int32(message.windowHeightPoints);
    }
    if (message.androidSdkVersion !== undefined) {
      writer.uint32(512).int32(message.androidSdkVersion);
    }
    if (message.screenDensityFloat !== undefined) {
      writer.uint32(525).float(message.screenDensityFloat);
    }
    if (message.utcOffsetMinutes !== undefined) {
      writer.uint32(536).int64(message.utcOffsetMinutes);
    }
    if (message.timeZone !== undefined) {
      writer.uint32(642).string(message.timeZone);
    }
    if (message.chipset !== undefined) {
      writer.uint32(738).string(message.chipset);
    }
    if (message.glDeviceInfo !== undefined) {
      StreamerContext_GLDeviceInfo.encode(message.glDeviceInfo, writer.uint32(818).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext_ClientInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext_ClientInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 12:
          if (tag !== 98) {
            break;
          }

          message.deviceMake = reader.string();
          continue;
        case 13:
          if (tag !== 106) {
            break;
          }

          message.deviceModel = reader.string();
          continue;
        case 16:
          if (tag !== 128) {
            break;
          }

          message.clientName = reader.int32();
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.clientVersion = reader.string();
          continue;
        case 18:
          if (tag !== 146) {
            break;
          }

          message.osName = reader.string();
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.osVersion = reader.string();
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.acceptLanguage = reader.string();
          continue;
        case 22:
          if (tag !== 178) {
            break;
          }

          message.acceptRegion = reader.string();
          continue;
        case 37:
          if (tag !== 296) {
            break;
          }

          message.screenWidthPoints = reader.int32();
          continue;
        case 38:
          if (tag !== 304) {
            break;
          }

          message.screenHeightPoints = reader.int32();
          continue;
        case 39:
          if (tag !== 317) {
            break;
          }

          message.screenWidthInches = reader.float();
          continue;
        case 40:
          if (tag !== 325) {
            break;
          }

          message.screenHeightInches = reader.float();
          continue;
        case 41:
          if (tag !== 328) {
            break;
          }

          message.screenPixelDensity = reader.int32();
          continue;
        case 46:
          if (tag !== 368) {
            break;
          }

          message.clientFormFactor = reader.int32() as any;
          continue;
        case 50:
          if (tag !== 400) {
            break;
          }

          message.gmscoreVersionCode = reader.int32();
          continue;
        case 55:
          if (tag !== 440) {
            break;
          }

          message.windowWidthPoints = reader.int32();
          continue;
        case 56:
          if (tag !== 448) {
            break;
          }

          message.windowHeightPoints = reader.int32();
          continue;
        case 64:
          if (tag !== 512) {
            break;
          }

          message.androidSdkVersion = reader.int32();
          continue;
        case 65:
          if (tag !== 525) {
            break;
          }

          message.screenDensityFloat = reader.float();
          continue;
        case 67:
          if (tag !== 536) {
            break;
          }

          message.utcOffsetMinutes = longToNumber(reader.int64());
          continue;
        case 80:
          if (tag !== 642) {
            break;
          }

          message.timeZone = reader.string();
          continue;
        case 92:
          if (tag !== 738) {
            break;
          }

          message.chipset = reader.string();
          continue;
        case 102:
          if (tag !== 818) {
            break;
          }

          message.glDeviceInfo = StreamerContext_GLDeviceInfo.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext_ClientInfo {
    return {
      deviceMake: isSet(object.deviceMake) ? globalThis.String(object.deviceMake) : undefined,
      deviceModel: isSet(object.deviceModel) ? globalThis.String(object.deviceModel) : undefined,
      clientName: isSet(object.clientName) ? globalThis.Number(object.clientName) : undefined,
      clientVersion: isSet(object.clientVersion) ? globalThis.String(object.clientVersion) : undefined,
      osName: isSet(object.osName) ? globalThis.String(object.osName) : undefined,
      osVersion: isSet(object.osVersion) ? globalThis.String(object.osVersion) : undefined,
      acceptLanguage: isSet(object.acceptLanguage) ? globalThis.String(object.acceptLanguage) : undefined,
      acceptRegion: isSet(object.acceptRegion) ? globalThis.String(object.acceptRegion) : undefined,
      screenWidthPoints: isSet(object.screenWidthPoints) ? globalThis.Number(object.screenWidthPoints) : undefined,
      screenHeightPoints: isSet(object.screenHeightPoints) ? globalThis.Number(object.screenHeightPoints) : undefined,
      screenWidthInches: isSet(object.screenWidthInches) ? globalThis.Number(object.screenWidthInches) : undefined,
      screenHeightInches: isSet(object.screenHeightInches) ? globalThis.Number(object.screenHeightInches) : undefined,
      screenPixelDensity: isSet(object.screenPixelDensity) ? globalThis.Number(object.screenPixelDensity) : undefined,
      clientFormFactor: isSet(object.clientFormFactor)
        ? streamerContext_ClientFormFactorFromJSON(object.clientFormFactor)
        : undefined,
      gmscoreVersionCode: isSet(object.gmscoreVersionCode) ? globalThis.Number(object.gmscoreVersionCode) : undefined,
      windowWidthPoints: isSet(object.windowWidthPoints) ? globalThis.Number(object.windowWidthPoints) : undefined,
      windowHeightPoints: isSet(object.windowHeightPoints) ? globalThis.Number(object.windowHeightPoints) : undefined,
      androidSdkVersion: isSet(object.androidSdkVersion) ? globalThis.Number(object.androidSdkVersion) : undefined,
      screenDensityFloat: isSet(object.screenDensityFloat) ? globalThis.Number(object.screenDensityFloat) : undefined,
      utcOffsetMinutes: isSet(object.utcOffsetMinutes) ? globalThis.Number(object.utcOffsetMinutes) : undefined,
      timeZone: isSet(object.timeZone) ? globalThis.String(object.timeZone) : undefined,
      chipset: isSet(object.chipset) ? globalThis.String(object.chipset) : undefined,
      glDeviceInfo: isSet(object.glDeviceInfo) ? StreamerContext_GLDeviceInfo.fromJSON(object.glDeviceInfo) : undefined,
    };
  },

  toJSON(message: StreamerContext_ClientInfo): unknown {
    const obj: any = {};
    if (message.deviceMake !== undefined) {
      obj.deviceMake = message.deviceMake;
    }
    if (message.deviceModel !== undefined) {
      obj.deviceModel = message.deviceModel;
    }
    if (message.clientName !== undefined) {
      obj.clientName = Math.round(message.clientName);
    }
    if (message.clientVersion !== undefined) {
      obj.clientVersion = message.clientVersion;
    }
    if (message.osName !== undefined) {
      obj.osName = message.osName;
    }
    if (message.osVersion !== undefined) {
      obj.osVersion = message.osVersion;
    }
    if (message.acceptLanguage !== undefined) {
      obj.acceptLanguage = message.acceptLanguage;
    }
    if (message.acceptRegion !== undefined) {
      obj.acceptRegion = message.acceptRegion;
    }
    if (message.screenWidthPoints !== undefined) {
      obj.screenWidthPoints = Math.round(message.screenWidthPoints);
    }
    if (message.screenHeightPoints !== undefined) {
      obj.screenHeightPoints = Math.round(message.screenHeightPoints);
    }
    if (message.screenWidthInches !== undefined) {
      obj.screenWidthInches = message.screenWidthInches;
    }
    if (message.screenHeightInches !== undefined) {
      obj.screenHeightInches = message.screenHeightInches;
    }
    if (message.screenPixelDensity !== undefined) {
      obj.screenPixelDensity = Math.round(message.screenPixelDensity);
    }
    if (message.clientFormFactor !== undefined) {
      obj.clientFormFactor = streamerContext_ClientFormFactorToJSON(message.clientFormFactor);
    }
    if (message.gmscoreVersionCode !== undefined) {
      obj.gmscoreVersionCode = Math.round(message.gmscoreVersionCode);
    }
    if (message.windowWidthPoints !== undefined) {
      obj.windowWidthPoints = Math.round(message.windowWidthPoints);
    }
    if (message.windowHeightPoints !== undefined) {
      obj.windowHeightPoints = Math.round(message.windowHeightPoints);
    }
    if (message.androidSdkVersion !== undefined) {
      obj.androidSdkVersion = Math.round(message.androidSdkVersion);
    }
    if (message.screenDensityFloat !== undefined) {
      obj.screenDensityFloat = message.screenDensityFloat;
    }
    if (message.utcOffsetMinutes !== undefined) {
      obj.utcOffsetMinutes = Math.round(message.utcOffsetMinutes);
    }
    if (message.timeZone !== undefined) {
      obj.timeZone = message.timeZone;
    }
    if (message.chipset !== undefined) {
      obj.chipset = message.chipset;
    }
    if (message.glDeviceInfo !== undefined) {
      obj.glDeviceInfo = StreamerContext_GLDeviceInfo.toJSON(message.glDeviceInfo);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext_ClientInfo>, I>>(base?: I): StreamerContext_ClientInfo {
    return StreamerContext_ClientInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext_ClientInfo>, I>>(object: I): StreamerContext_ClientInfo {
    const message = createBaseStreamerContext_ClientInfo();
    message.deviceMake = object.deviceMake ?? undefined;
    message.deviceModel = object.deviceModel ?? undefined;
    message.clientName = object.clientName ?? undefined;
    message.clientVersion = object.clientVersion ?? undefined;
    message.osName = object.osName ?? undefined;
    message.osVersion = object.osVersion ?? undefined;
    message.acceptLanguage = object.acceptLanguage ?? undefined;
    message.acceptRegion = object.acceptRegion ?? undefined;
    message.screenWidthPoints = object.screenWidthPoints ?? undefined;
    message.screenHeightPoints = object.screenHeightPoints ?? undefined;
    message.screenWidthInches = object.screenWidthInches ?? undefined;
    message.screenHeightInches = object.screenHeightInches ?? undefined;
    message.screenPixelDensity = object.screenPixelDensity ?? undefined;
    message.clientFormFactor = object.clientFormFactor ?? undefined;
    message.gmscoreVersionCode = object.gmscoreVersionCode ?? undefined;
    message.windowWidthPoints = object.windowWidthPoints ?? undefined;
    message.windowHeightPoints = object.windowHeightPoints ?? undefined;
    message.androidSdkVersion = object.androidSdkVersion ?? undefined;
    message.screenDensityFloat = object.screenDensityFloat ?? undefined;
    message.utcOffsetMinutes = object.utcOffsetMinutes ?? undefined;
    message.timeZone = object.timeZone ?? undefined;
    message.chipset = object.chipset ?? undefined;
    message.glDeviceInfo = (object.glDeviceInfo !== undefined && object.glDeviceInfo !== null)
      ? StreamerContext_GLDeviceInfo.fromPartial(object.glDeviceInfo)
      : undefined;
    return message;
  },
};

function createBaseStreamerContext_GLDeviceInfo(): StreamerContext_GLDeviceInfo {
  return { glRenderer: undefined, glEsVersionMajor: undefined, glEsVersionMinor: undefined };
}

export const StreamerContext_GLDeviceInfo: MessageFns<StreamerContext_GLDeviceInfo> = {
  encode(message: StreamerContext_GLDeviceInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.glRenderer !== undefined) {
      writer.uint32(10).string(message.glRenderer);
    }
    if (message.glEsVersionMajor !== undefined) {
      writer.uint32(16).int32(message.glEsVersionMajor);
    }
    if (message.glEsVersionMinor !== undefined) {
      writer.uint32(24).int32(message.glEsVersionMinor);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext_GLDeviceInfo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext_GLDeviceInfo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.glRenderer = reader.string();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.glEsVersionMajor = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.glEsVersionMinor = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext_GLDeviceInfo {
    return {
      glRenderer: isSet(object.glRenderer) ? globalThis.String(object.glRenderer) : undefined,
      glEsVersionMajor: isSet(object.glEsVersionMajor) ? globalThis.Number(object.glEsVersionMajor) : undefined,
      glEsVersionMinor: isSet(object.glEsVersionMinor) ? globalThis.Number(object.glEsVersionMinor) : undefined,
    };
  },

  toJSON(message: StreamerContext_GLDeviceInfo): unknown {
    const obj: any = {};
    if (message.glRenderer !== undefined) {
      obj.glRenderer = message.glRenderer;
    }
    if (message.glEsVersionMajor !== undefined) {
      obj.glEsVersionMajor = Math.round(message.glEsVersionMajor);
    }
    if (message.glEsVersionMinor !== undefined) {
      obj.glEsVersionMinor = Math.round(message.glEsVersionMinor);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext_GLDeviceInfo>, I>>(base?: I): StreamerContext_GLDeviceInfo {
    return StreamerContext_GLDeviceInfo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext_GLDeviceInfo>, I>>(object: I): StreamerContext_GLDeviceInfo {
    const message = createBaseStreamerContext_GLDeviceInfo();
    message.glRenderer = object.glRenderer ?? undefined;
    message.glEsVersionMajor = object.glEsVersionMajor ?? undefined;
    message.glEsVersionMinor = object.glEsVersionMinor ?? undefined;
    return message;
  },
};

function createBaseStreamerContext_Fqa(): StreamerContext_Fqa {
  return { type: undefined, value: undefined };
}

export const StreamerContext_Fqa: MessageFns<StreamerContext_Fqa> = {
  encode(message: StreamerContext_Fqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== undefined) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== undefined) {
      writer.uint32(18).bytes(message.value);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext_Fqa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext_Fqa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.type = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.value = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext_Fqa {
    return {
      type: isSet(object.type) ? globalThis.Number(object.type) : undefined,
      value: isSet(object.value) ? bytesFromBase64(object.value) : undefined,
    };
  },

  toJSON(message: StreamerContext_Fqa): unknown {
    const obj: any = {};
    if (message.type !== undefined) {
      obj.type = Math.round(message.type);
    }
    if (message.value !== undefined) {
      obj.value = base64FromBytes(message.value);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext_Fqa>, I>>(base?: I): StreamerContext_Fqa {
    return StreamerContext_Fqa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext_Fqa>, I>>(object: I): StreamerContext_Fqa {
    const message = createBaseStreamerContext_Fqa();
    message.type = object.type ?? undefined;
    message.value = object.value ?? undefined;
    return message;
  },
};

function createBaseStreamerContext_Gqa(): StreamerContext_Gqa {
  return { field1: undefined, field2: undefined };
}

export const StreamerContext_Gqa: MessageFns<StreamerContext_Gqa> = {
  encode(message: StreamerContext_Gqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.field1 !== undefined) {
      writer.uint32(10).bytes(message.field1);
    }
    if (message.field2 !== undefined) {
      StreamerContext_Gqa_Hqa.encode(message.field2, writer.uint32(18).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext_Gqa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext_Gqa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field1 = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field2 = StreamerContext_Gqa_Hqa.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext_Gqa {
    return {
      field1: isSet(object.field1) ? bytesFromBase64(object.field1) : undefined,
      field2: isSet(object.field2) ? StreamerContext_Gqa_Hqa.fromJSON(object.field2) : undefined,
    };
  },

  toJSON(message: StreamerContext_Gqa): unknown {
    const obj: any = {};
    if (message.field1 !== undefined) {
      obj.field1 = base64FromBytes(message.field1);
    }
    if (message.field2 !== undefined) {
      obj.field2 = StreamerContext_Gqa_Hqa.toJSON(message.field2);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext_Gqa>, I>>(base?: I): StreamerContext_Gqa {
    return StreamerContext_Gqa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext_Gqa>, I>>(object: I): StreamerContext_Gqa {
    const message = createBaseStreamerContext_Gqa();
    message.field1 = object.field1 ?? undefined;
    message.field2 = (object.field2 !== undefined && object.field2 !== null)
      ? StreamerContext_Gqa_Hqa.fromPartial(object.field2)
      : undefined;
    return message;
  },
};

function createBaseStreamerContext_Gqa_Hqa(): StreamerContext_Gqa_Hqa {
  return { code: undefined, message: undefined };
}

export const StreamerContext_Gqa_Hqa: MessageFns<StreamerContext_Gqa_Hqa> = {
  encode(message: StreamerContext_Gqa_Hqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.code !== undefined) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== undefined) {
      writer.uint32(18).string(message.message);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamerContext_Gqa_Hqa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamerContext_Gqa_Hqa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.code = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.message = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamerContext_Gqa_Hqa {
    return {
      code: isSet(object.code) ? globalThis.Number(object.code) : undefined,
      message: isSet(object.message) ? globalThis.String(object.message) : undefined,
    };
  },

  toJSON(message: StreamerContext_Gqa_Hqa): unknown {
    const obj: any = {};
    if (message.code !== undefined) {
      obj.code = Math.round(message.code);
    }
    if (message.message !== undefined) {
      obj.message = message.message;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamerContext_Gqa_Hqa>, I>>(base?: I): StreamerContext_Gqa_Hqa {
    return StreamerContext_Gqa_Hqa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamerContext_Gqa_Hqa>, I>>(object: I): StreamerContext_Gqa_Hqa {
    const message = createBaseStreamerContext_Gqa_Hqa();
    message.code = object.code ?? undefined;
    message.message = object.message ?? undefined;
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
