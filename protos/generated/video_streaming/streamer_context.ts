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
    poToken: new Uint8Array(0),
    playbackCookie: new Uint8Array(0),
    gp: new Uint8Array(0),
    field5: [],
    field6: [],
    field7: "",
    field8: undefined,
  };
}

export const StreamerContext: MessageFns<StreamerContext> = {
  encode(message: StreamerContext, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.clientInfo !== undefined) {
      StreamerContext_ClientInfo.encode(message.clientInfo, writer.uint32(10).fork()).join();
    }
    if (message.poToken !== undefined && message.poToken.length !== 0) {
      writer.uint32(18).bytes(message.poToken);
    }
    if (message.playbackCookie !== undefined && message.playbackCookie.length !== 0) {
      writer.uint32(26).bytes(message.playbackCookie);
    }
    if (message.gp !== undefined && message.gp.length !== 0) {
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
    if (message.field7 !== undefined && message.field7 !== "") {
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
};

function createBaseStreamerContext_ClientInfo(): StreamerContext_ClientInfo {
  return {
    deviceMake: "",
    deviceModel: "",
    clientName: 0,
    clientVersion: "",
    osName: "",
    osVersion: "",
    acceptLanguage: "",
    acceptRegion: "",
    screenWidthPoints: 0,
    screenHeightPoints: 0,
    screenWidthInches: 0,
    screenHeightInches: 0,
    screenPixelDensity: 0,
    clientFormFactor: 0,
    gmscoreVersionCode: 0,
    windowWidthPoints: 0,
    windowHeightPoints: 0,
    androidSdkVersion: 0,
    screenDensityFloat: 0,
    utcOffsetMinutes: 0,
    timeZone: "",
    chipset: "",
    glDeviceInfo: undefined,
  };
}

export const StreamerContext_ClientInfo: MessageFns<StreamerContext_ClientInfo> = {
  encode(message: StreamerContext_ClientInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.deviceMake !== undefined && message.deviceMake !== "") {
      writer.uint32(98).string(message.deviceMake);
    }
    if (message.deviceModel !== undefined && message.deviceModel !== "") {
      writer.uint32(106).string(message.deviceModel);
    }
    if (message.clientName !== undefined && message.clientName !== 0) {
      writer.uint32(128).int32(message.clientName);
    }
    if (message.clientVersion !== undefined && message.clientVersion !== "") {
      writer.uint32(138).string(message.clientVersion);
    }
    if (message.osName !== undefined && message.osName !== "") {
      writer.uint32(146).string(message.osName);
    }
    if (message.osVersion !== undefined && message.osVersion !== "") {
      writer.uint32(154).string(message.osVersion);
    }
    if (message.acceptLanguage !== undefined && message.acceptLanguage !== "") {
      writer.uint32(170).string(message.acceptLanguage);
    }
    if (message.acceptRegion !== undefined && message.acceptRegion !== "") {
      writer.uint32(178).string(message.acceptRegion);
    }
    if (message.screenWidthPoints !== undefined && message.screenWidthPoints !== 0) {
      writer.uint32(296).int32(message.screenWidthPoints);
    }
    if (message.screenHeightPoints !== undefined && message.screenHeightPoints !== 0) {
      writer.uint32(304).int32(message.screenHeightPoints);
    }
    if (message.screenWidthInches !== undefined && message.screenWidthInches !== 0) {
      writer.uint32(317).float(message.screenWidthInches);
    }
    if (message.screenHeightInches !== undefined && message.screenHeightInches !== 0) {
      writer.uint32(325).float(message.screenHeightInches);
    }
    if (message.screenPixelDensity !== undefined && message.screenPixelDensity !== 0) {
      writer.uint32(328).int32(message.screenPixelDensity);
    }
    if (message.clientFormFactor !== undefined && message.clientFormFactor !== 0) {
      writer.uint32(368).int32(message.clientFormFactor);
    }
    if (message.gmscoreVersionCode !== undefined && message.gmscoreVersionCode !== 0) {
      writer.uint32(400).int32(message.gmscoreVersionCode);
    }
    if (message.windowWidthPoints !== undefined && message.windowWidthPoints !== 0) {
      writer.uint32(440).int32(message.windowWidthPoints);
    }
    if (message.windowHeightPoints !== undefined && message.windowHeightPoints !== 0) {
      writer.uint32(448).int32(message.windowHeightPoints);
    }
    if (message.androidSdkVersion !== undefined && message.androidSdkVersion !== 0) {
      writer.uint32(512).int32(message.androidSdkVersion);
    }
    if (message.screenDensityFloat !== undefined && message.screenDensityFloat !== 0) {
      writer.uint32(525).float(message.screenDensityFloat);
    }
    if (message.utcOffsetMinutes !== undefined && message.utcOffsetMinutes !== 0) {
      writer.uint32(536).int64(message.utcOffsetMinutes);
    }
    if (message.timeZone !== undefined && message.timeZone !== "") {
      writer.uint32(642).string(message.timeZone);
    }
    if (message.chipset !== undefined && message.chipset !== "") {
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
};

function createBaseStreamerContext_GLDeviceInfo(): StreamerContext_GLDeviceInfo {
  return { glRenderer: "", glEsVersionMajor: 0, glEsVersionMinor: 0 };
}

export const StreamerContext_GLDeviceInfo: MessageFns<StreamerContext_GLDeviceInfo> = {
  encode(message: StreamerContext_GLDeviceInfo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.glRenderer !== undefined && message.glRenderer !== "") {
      writer.uint32(10).string(message.glRenderer);
    }
    if (message.glEsVersionMajor !== undefined && message.glEsVersionMajor !== 0) {
      writer.uint32(16).int32(message.glEsVersionMajor);
    }
    if (message.glEsVersionMinor !== undefined && message.glEsVersionMinor !== 0) {
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
};

function createBaseStreamerContext_Fqa(): StreamerContext_Fqa {
  return { type: 0, value: new Uint8Array(0) };
}

export const StreamerContext_Fqa: MessageFns<StreamerContext_Fqa> = {
  encode(message: StreamerContext_Fqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.type !== undefined && message.type !== 0) {
      writer.uint32(8).int32(message.type);
    }
    if (message.value !== undefined && message.value.length !== 0) {
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
};

function createBaseStreamerContext_Gqa(): StreamerContext_Gqa {
  return { field1: new Uint8Array(0), field2: undefined };
}

export const StreamerContext_Gqa: MessageFns<StreamerContext_Gqa> = {
  encode(message: StreamerContext_Gqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.field1 !== undefined && message.field1.length !== 0) {
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
};

function createBaseStreamerContext_Gqa_Hqa(): StreamerContext_Gqa_Hqa {
  return { code: 0, message: "" };
}

export const StreamerContext_Gqa_Hqa: MessageFns<StreamerContext_Gqa_Hqa> = {
  encode(message: StreamerContext_Gqa_Hqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.code !== undefined && message.code !== 0) {
      writer.uint32(8).int32(message.code);
    }
    if (message.message !== undefined && message.message !== "") {
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
