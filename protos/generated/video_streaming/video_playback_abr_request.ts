// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/video_playback_abr_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { FormatId } from "../misc/common.js";
import { ClientAbrState } from "./client_abr_state.js";
import { StreamerContext } from "./streamer_context.js";
import { TimeRange } from "./time_range.js";

export const protobufPackage = "video_streaming";

export interface VideoPlaybackAbrRequest {
  clientAbrState?: ClientAbrState | undefined;
  selectedFormats: FormatId[];
  bufferedRange: BufferedRange[];
  videoPlaybackUstreamerConfig?: Uint8Array | undefined;
  lo?: Lo | undefined;
  audioFormats: FormatId[];
  videoFormats: FormatId[];
  streamerContext?: StreamerContext | undefined;
  field21?: OQa | undefined;
  field22?: number | undefined;
  field23?: number | undefined;
  field1000: Pqa[];
}

export interface Lo {
  formatId?: FormatId | undefined;
  Lj?: number | undefined;
  sequenceNumber?: number | undefined;
  field4?: Lo_Field4 | undefined;
  MZ?: number | undefined;
}

export interface Lo_Field4 {
  field1?: number | undefined;
  field2?: number | undefined;
  field3?: number | undefined;
}

export interface Kob {
  EW: Kob_Pa[];
}

export interface Kob_Pa {
  videoId?: string | undefined;
  lmt?: number | undefined;
}

export interface YPa {
  field1?: number | undefined;
  field2?: number | undefined;
  field3?: number | undefined;
}

export interface BufferedRange {
  formatId: FormatId | undefined;
  startTimeMs: number;
  durationMs: number;
  startSegmentIndex: number;
  endSegmentIndex: number;
  timeRange?: TimeRange | undefined;
  field9?: Kob | undefined;
  field11?: YPa | undefined;
  field12?: YPa | undefined;
}

export interface OQa {
  field1: string[];
  field2?: Uint8Array | undefined;
  field3?: string | undefined;
  field4?: number | undefined;
  field5?: number | undefined;
  field6?: string | undefined;
}

export interface Pqa {
  formats: FormatId[];
  ud: BufferedRange[];
  clipId?: string | undefined;
}

function createBaseVideoPlaybackAbrRequest(): VideoPlaybackAbrRequest {
  return {
    clientAbrState: undefined,
    selectedFormats: [],
    bufferedRange: [],
    videoPlaybackUstreamerConfig: new Uint8Array(0),
    lo: undefined,
    audioFormats: [],
    videoFormats: [],
    streamerContext: undefined,
    field21: undefined,
    field22: 0,
    field23: 0,
    field1000: [],
  };
}

export const VideoPlaybackAbrRequest: MessageFns<VideoPlaybackAbrRequest> = {
  encode(message: VideoPlaybackAbrRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.clientAbrState !== undefined) {
      ClientAbrState.encode(message.clientAbrState, writer.uint32(10).fork()).join();
    }
    for (const v of message.selectedFormats) {
      FormatId.encode(v!, writer.uint32(18).fork()).join();
    }
    for (const v of message.bufferedRange) {
      BufferedRange.encode(v!, writer.uint32(26).fork()).join();
    }
    if (message.videoPlaybackUstreamerConfig !== undefined && message.videoPlaybackUstreamerConfig.length !== 0) {
      writer.uint32(42).bytes(message.videoPlaybackUstreamerConfig);
    }
    if (message.lo !== undefined) {
      Lo.encode(message.lo, writer.uint32(50).fork()).join();
    }
    for (const v of message.audioFormats) {
      FormatId.encode(v!, writer.uint32(130).fork()).join();
    }
    for (const v of message.videoFormats) {
      FormatId.encode(v!, writer.uint32(138).fork()).join();
    }
    if (message.streamerContext !== undefined) {
      StreamerContext.encode(message.streamerContext, writer.uint32(154).fork()).join();
    }
    if (message.field21 !== undefined) {
      OQa.encode(message.field21, writer.uint32(170).fork()).join();
    }
    if (message.field22 !== undefined && message.field22 !== 0) {
      writer.uint32(176).int32(message.field22);
    }
    if (message.field23 !== undefined && message.field23 !== 0) {
      writer.uint32(184).int32(message.field23);
    }
    for (const v of message.field1000) {
      Pqa.encode(v!, writer.uint32(8002).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): VideoPlaybackAbrRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseVideoPlaybackAbrRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.clientAbrState = ClientAbrState.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.selectedFormats.push(FormatId.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.bufferedRange.push(BufferedRange.decode(reader, reader.uint32()));
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.videoPlaybackUstreamerConfig = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.lo = Lo.decode(reader, reader.uint32());
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.audioFormats.push(FormatId.decode(reader, reader.uint32()));
          continue;
        case 17:
          if (tag !== 138) {
            break;
          }

          message.videoFormats.push(FormatId.decode(reader, reader.uint32()));
          continue;
        case 19:
          if (tag !== 154) {
            break;
          }

          message.streamerContext = StreamerContext.decode(reader, reader.uint32());
          continue;
        case 21:
          if (tag !== 170) {
            break;
          }

          message.field21 = OQa.decode(reader, reader.uint32());
          continue;
        case 22:
          if (tag !== 176) {
            break;
          }

          message.field22 = reader.int32();
          continue;
        case 23:
          if (tag !== 184) {
            break;
          }

          message.field23 = reader.int32();
          continue;
        case 1000:
          if (tag !== 8002) {
            break;
          }

          message.field1000.push(Pqa.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): VideoPlaybackAbrRequest {
    return {
      clientAbrState: isSet(object.clientAbrState) ? ClientAbrState.fromJSON(object.clientAbrState) : undefined,
      selectedFormats: globalThis.Array.isArray(object?.selectedFormats)
        ? object.selectedFormats.map((e: any) => FormatId.fromJSON(e))
        : [],
      bufferedRange: globalThis.Array.isArray(object?.bufferedRange)
        ? object.bufferedRange.map((e: any) => BufferedRange.fromJSON(e))
        : [],
      videoPlaybackUstreamerConfig: isSet(object.videoPlaybackUstreamerConfig)
        ? bytesFromBase64(object.videoPlaybackUstreamerConfig)
        : new Uint8Array(0),
      lo: isSet(object.lo) ? Lo.fromJSON(object.lo) : undefined,
      audioFormats: globalThis.Array.isArray(object?.audioFormats)
        ? object.audioFormats.map((e: any) => FormatId.fromJSON(e))
        : [],
      videoFormats: globalThis.Array.isArray(object?.videoFormats)
        ? object.videoFormats.map((e: any) => FormatId.fromJSON(e))
        : [],
      streamerContext: isSet(object.streamerContext) ? StreamerContext.fromJSON(object.streamerContext) : undefined,
      field21: isSet(object.field21) ? OQa.fromJSON(object.field21) : undefined,
      field22: isSet(object.field22) ? globalThis.Number(object.field22) : 0,
      field23: isSet(object.field23) ? globalThis.Number(object.field23) : 0,
      field1000: globalThis.Array.isArray(object?.field1000) ? object.field1000.map((e: any) => Pqa.fromJSON(e)) : [],
    };
  },

  toJSON(message: VideoPlaybackAbrRequest): unknown {
    const obj: any = {};
    if (message.clientAbrState !== undefined) {
      obj.clientAbrState = ClientAbrState.toJSON(message.clientAbrState);
    }
    if (message.selectedFormats?.length) {
      obj.selectedFormats = message.selectedFormats.map((e) => FormatId.toJSON(e));
    }
    if (message.bufferedRange?.length) {
      obj.bufferedRange = message.bufferedRange.map((e) => BufferedRange.toJSON(e));
    }
    if (message.videoPlaybackUstreamerConfig !== undefined && message.videoPlaybackUstreamerConfig.length !== 0) {
      obj.videoPlaybackUstreamerConfig = base64FromBytes(message.videoPlaybackUstreamerConfig);
    }
    if (message.lo !== undefined) {
      obj.lo = Lo.toJSON(message.lo);
    }
    if (message.audioFormats?.length) {
      obj.audioFormats = message.audioFormats.map((e) => FormatId.toJSON(e));
    }
    if (message.videoFormats?.length) {
      obj.videoFormats = message.videoFormats.map((e) => FormatId.toJSON(e));
    }
    if (message.streamerContext !== undefined) {
      obj.streamerContext = StreamerContext.toJSON(message.streamerContext);
    }
    if (message.field21 !== undefined) {
      obj.field21 = OQa.toJSON(message.field21);
    }
    if (message.field22 !== undefined && message.field22 !== 0) {
      obj.field22 = Math.round(message.field22);
    }
    if (message.field23 !== undefined && message.field23 !== 0) {
      obj.field23 = Math.round(message.field23);
    }
    if (message.field1000?.length) {
      obj.field1000 = message.field1000.map((e) => Pqa.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<VideoPlaybackAbrRequest>, I>>(base?: I): VideoPlaybackAbrRequest {
    return VideoPlaybackAbrRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<VideoPlaybackAbrRequest>, I>>(object: I): VideoPlaybackAbrRequest {
    const message = createBaseVideoPlaybackAbrRequest();
    message.clientAbrState = (object.clientAbrState !== undefined && object.clientAbrState !== null)
      ? ClientAbrState.fromPartial(object.clientAbrState)
      : undefined;
    message.selectedFormats = object.selectedFormats?.map((e) => FormatId.fromPartial(e)) || [];
    message.bufferedRange = object.bufferedRange?.map((e) => BufferedRange.fromPartial(e)) || [];
    message.videoPlaybackUstreamerConfig = object.videoPlaybackUstreamerConfig ?? new Uint8Array(0);
    message.lo = (object.lo !== undefined && object.lo !== null) ? Lo.fromPartial(object.lo) : undefined;
    message.audioFormats = object.audioFormats?.map((e) => FormatId.fromPartial(e)) || [];
    message.videoFormats = object.videoFormats?.map((e) => FormatId.fromPartial(e)) || [];
    message.streamerContext = (object.streamerContext !== undefined && object.streamerContext !== null)
      ? StreamerContext.fromPartial(object.streamerContext)
      : undefined;
    message.field21 = (object.field21 !== undefined && object.field21 !== null)
      ? OQa.fromPartial(object.field21)
      : undefined;
    message.field22 = object.field22 ?? 0;
    message.field23 = object.field23 ?? 0;
    message.field1000 = object.field1000?.map((e) => Pqa.fromPartial(e)) || [];
    return message;
  },
};

function createBaseLo(): Lo {
  return { formatId: undefined, Lj: 0, sequenceNumber: 0, field4: undefined, MZ: 0 };
}

export const Lo: MessageFns<Lo> = {
  encode(message: Lo, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.formatId !== undefined) {
      FormatId.encode(message.formatId, writer.uint32(10).fork()).join();
    }
    if (message.Lj !== undefined && message.Lj !== 0) {
      writer.uint32(16).int32(message.Lj);
    }
    if (message.sequenceNumber !== undefined && message.sequenceNumber !== 0) {
      writer.uint32(24).int32(message.sequenceNumber);
    }
    if (message.field4 !== undefined) {
      Lo_Field4.encode(message.field4, writer.uint32(34).fork()).join();
    }
    if (message.MZ !== undefined && message.MZ !== 0) {
      writer.uint32(40).int32(message.MZ);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Lo {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLo();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.formatId = FormatId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.Lj = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.sequenceNumber = reader.int32();
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.field4 = Lo_Field4.decode(reader, reader.uint32());
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.MZ = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Lo {
    return {
      formatId: isSet(object.formatId) ? FormatId.fromJSON(object.formatId) : undefined,
      Lj: isSet(object.Lj) ? globalThis.Number(object.Lj) : 0,
      sequenceNumber: isSet(object.sequenceNumber) ? globalThis.Number(object.sequenceNumber) : 0,
      field4: isSet(object.field4) ? Lo_Field4.fromJSON(object.field4) : undefined,
      MZ: isSet(object.MZ) ? globalThis.Number(object.MZ) : 0,
    };
  },

  toJSON(message: Lo): unknown {
    const obj: any = {};
    if (message.formatId !== undefined) {
      obj.formatId = FormatId.toJSON(message.formatId);
    }
    if (message.Lj !== undefined && message.Lj !== 0) {
      obj.Lj = Math.round(message.Lj);
    }
    if (message.sequenceNumber !== undefined && message.sequenceNumber !== 0) {
      obj.sequenceNumber = Math.round(message.sequenceNumber);
    }
    if (message.field4 !== undefined) {
      obj.field4 = Lo_Field4.toJSON(message.field4);
    }
    if (message.MZ !== undefined && message.MZ !== 0) {
      obj.MZ = Math.round(message.MZ);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Lo>, I>>(base?: I): Lo {
    return Lo.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Lo>, I>>(object: I): Lo {
    const message = createBaseLo();
    message.formatId = (object.formatId !== undefined && object.formatId !== null)
      ? FormatId.fromPartial(object.formatId)
      : undefined;
    message.Lj = object.Lj ?? 0;
    message.sequenceNumber = object.sequenceNumber ?? 0;
    message.field4 = (object.field4 !== undefined && object.field4 !== null)
      ? Lo_Field4.fromPartial(object.field4)
      : undefined;
    message.MZ = object.MZ ?? 0;
    return message;
  },
};

function createBaseLo_Field4(): Lo_Field4 {
  return { field1: 0, field2: 0, field3: 0 };
}

export const Lo_Field4: MessageFns<Lo_Field4> = {
  encode(message: Lo_Field4, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.field1 !== undefined && message.field1 !== 0) {
      writer.uint32(8).int32(message.field1);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      writer.uint32(16).int32(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== 0) {
      writer.uint32(24).int32(message.field3);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Lo_Field4 {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseLo_Field4();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field1 = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.field2 = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.field3 = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Lo_Field4 {
    return {
      field1: isSet(object.field1) ? globalThis.Number(object.field1) : 0,
      field2: isSet(object.field2) ? globalThis.Number(object.field2) : 0,
      field3: isSet(object.field3) ? globalThis.Number(object.field3) : 0,
    };
  },

  toJSON(message: Lo_Field4): unknown {
    const obj: any = {};
    if (message.field1 !== undefined && message.field1 !== 0) {
      obj.field1 = Math.round(message.field1);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      obj.field2 = Math.round(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== 0) {
      obj.field3 = Math.round(message.field3);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Lo_Field4>, I>>(base?: I): Lo_Field4 {
    return Lo_Field4.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Lo_Field4>, I>>(object: I): Lo_Field4 {
    const message = createBaseLo_Field4();
    message.field1 = object.field1 ?? 0;
    message.field2 = object.field2 ?? 0;
    message.field3 = object.field3 ?? 0;
    return message;
  },
};

function createBaseKob(): Kob {
  return { EW: [] };
}

export const Kob: MessageFns<Kob> = {
  encode(message: Kob, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.EW) {
      Kob_Pa.encode(v!, writer.uint32(10).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Kob {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKob();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.EW.push(Kob_Pa.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Kob {
    return { EW: globalThis.Array.isArray(object?.EW) ? object.EW.map((e: any) => Kob_Pa.fromJSON(e)) : [] };
  },

  toJSON(message: Kob): unknown {
    const obj: any = {};
    if (message.EW?.length) {
      obj.EW = message.EW.map((e) => Kob_Pa.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Kob>, I>>(base?: I): Kob {
    return Kob.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Kob>, I>>(object: I): Kob {
    const message = createBaseKob();
    message.EW = object.EW?.map((e) => Kob_Pa.fromPartial(e)) || [];
    return message;
  },
};

function createBaseKob_Pa(): Kob_Pa {
  return { videoId: "", lmt: 0 };
}

export const Kob_Pa: MessageFns<Kob_Pa> = {
  encode(message: Kob_Pa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.videoId !== undefined && message.videoId !== "") {
      writer.uint32(10).string(message.videoId);
    }
    if (message.lmt !== undefined && message.lmt !== 0) {
      writer.uint32(16).uint64(message.lmt);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Kob_Pa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseKob_Pa();
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
          if (tag !== 16) {
            break;
          }

          message.lmt = longToNumber(reader.uint64());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Kob_Pa {
    return {
      videoId: isSet(object.videoId) ? globalThis.String(object.videoId) : "",
      lmt: isSet(object.lmt) ? globalThis.Number(object.lmt) : 0,
    };
  },

  toJSON(message: Kob_Pa): unknown {
    const obj: any = {};
    if (message.videoId !== undefined && message.videoId !== "") {
      obj.videoId = message.videoId;
    }
    if (message.lmt !== undefined && message.lmt !== 0) {
      obj.lmt = Math.round(message.lmt);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Kob_Pa>, I>>(base?: I): Kob_Pa {
    return Kob_Pa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Kob_Pa>, I>>(object: I): Kob_Pa {
    const message = createBaseKob_Pa();
    message.videoId = object.videoId ?? "";
    message.lmt = object.lmt ?? 0;
    return message;
  },
};

function createBaseYPa(): YPa {
  return { field1: 0, field2: 0, field3: 0 };
}

export const YPa: MessageFns<YPa> = {
  encode(message: YPa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.field1 !== undefined && message.field1 !== 0) {
      writer.uint32(8).int32(message.field1);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      writer.uint32(16).int32(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== 0) {
      writer.uint32(24).int32(message.field3);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): YPa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseYPa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.field1 = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.field2 = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.field3 = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): YPa {
    return {
      field1: isSet(object.field1) ? globalThis.Number(object.field1) : 0,
      field2: isSet(object.field2) ? globalThis.Number(object.field2) : 0,
      field3: isSet(object.field3) ? globalThis.Number(object.field3) : 0,
    };
  },

  toJSON(message: YPa): unknown {
    const obj: any = {};
    if (message.field1 !== undefined && message.field1 !== 0) {
      obj.field1 = Math.round(message.field1);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      obj.field2 = Math.round(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== 0) {
      obj.field3 = Math.round(message.field3);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<YPa>, I>>(base?: I): YPa {
    return YPa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<YPa>, I>>(object: I): YPa {
    const message = createBaseYPa();
    message.field1 = object.field1 ?? 0;
    message.field2 = object.field2 ?? 0;
    message.field3 = object.field3 ?? 0;
    return message;
  },
};

function createBaseBufferedRange(): BufferedRange {
  return {
    formatId: undefined,
    startTimeMs: 0,
    durationMs: 0,
    startSegmentIndex: 0,
    endSegmentIndex: 0,
    timeRange: undefined,
    field9: undefined,
    field11: undefined,
    field12: undefined,
  };
}

export const BufferedRange: MessageFns<BufferedRange> = {
  encode(message: BufferedRange, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.formatId !== undefined) {
      FormatId.encode(message.formatId, writer.uint32(10).fork()).join();
    }
    if (message.startTimeMs !== 0) {
      writer.uint32(16).int64(message.startTimeMs);
    }
    if (message.durationMs !== 0) {
      writer.uint32(24).int64(message.durationMs);
    }
    if (message.startSegmentIndex !== 0) {
      writer.uint32(32).int32(message.startSegmentIndex);
    }
    if (message.endSegmentIndex !== 0) {
      writer.uint32(40).int32(message.endSegmentIndex);
    }
    if (message.timeRange !== undefined) {
      TimeRange.encode(message.timeRange, writer.uint32(50).fork()).join();
    }
    if (message.field9 !== undefined) {
      Kob.encode(message.field9, writer.uint32(74).fork()).join();
    }
    if (message.field11 !== undefined) {
      YPa.encode(message.field11, writer.uint32(90).fork()).join();
    }
    if (message.field12 !== undefined) {
      YPa.encode(message.field12, writer.uint32(98).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): BufferedRange {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBufferedRange();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.formatId = FormatId.decode(reader, reader.uint32());
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.startTimeMs = longToNumber(reader.int64());
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.durationMs = longToNumber(reader.int64());
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.startSegmentIndex = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.endSegmentIndex = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.timeRange = TimeRange.decode(reader, reader.uint32());
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.field9 = Kob.decode(reader, reader.uint32());
          continue;
        case 11:
          if (tag !== 90) {
            break;
          }

          message.field11 = YPa.decode(reader, reader.uint32());
          continue;
        case 12:
          if (tag !== 98) {
            break;
          }

          message.field12 = YPa.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): BufferedRange {
    return {
      formatId: isSet(object.formatId) ? FormatId.fromJSON(object.formatId) : undefined,
      startTimeMs: isSet(object.startTimeMs) ? globalThis.Number(object.startTimeMs) : 0,
      durationMs: isSet(object.durationMs) ? globalThis.Number(object.durationMs) : 0,
      startSegmentIndex: isSet(object.startSegmentIndex) ? globalThis.Number(object.startSegmentIndex) : 0,
      endSegmentIndex: isSet(object.endSegmentIndex) ? globalThis.Number(object.endSegmentIndex) : 0,
      timeRange: isSet(object.timeRange) ? TimeRange.fromJSON(object.timeRange) : undefined,
      field9: isSet(object.field9) ? Kob.fromJSON(object.field9) : undefined,
      field11: isSet(object.field11) ? YPa.fromJSON(object.field11) : undefined,
      field12: isSet(object.field12) ? YPa.fromJSON(object.field12) : undefined,
    };
  },

  toJSON(message: BufferedRange): unknown {
    const obj: any = {};
    if (message.formatId !== undefined) {
      obj.formatId = FormatId.toJSON(message.formatId);
    }
    if (message.startTimeMs !== 0) {
      obj.startTimeMs = Math.round(message.startTimeMs);
    }
    if (message.durationMs !== 0) {
      obj.durationMs = Math.round(message.durationMs);
    }
    if (message.startSegmentIndex !== 0) {
      obj.startSegmentIndex = Math.round(message.startSegmentIndex);
    }
    if (message.endSegmentIndex !== 0) {
      obj.endSegmentIndex = Math.round(message.endSegmentIndex);
    }
    if (message.timeRange !== undefined) {
      obj.timeRange = TimeRange.toJSON(message.timeRange);
    }
    if (message.field9 !== undefined) {
      obj.field9 = Kob.toJSON(message.field9);
    }
    if (message.field11 !== undefined) {
      obj.field11 = YPa.toJSON(message.field11);
    }
    if (message.field12 !== undefined) {
      obj.field12 = YPa.toJSON(message.field12);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<BufferedRange>, I>>(base?: I): BufferedRange {
    return BufferedRange.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<BufferedRange>, I>>(object: I): BufferedRange {
    const message = createBaseBufferedRange();
    message.formatId = (object.formatId !== undefined && object.formatId !== null)
      ? FormatId.fromPartial(object.formatId)
      : undefined;
    message.startTimeMs = object.startTimeMs ?? 0;
    message.durationMs = object.durationMs ?? 0;
    message.startSegmentIndex = object.startSegmentIndex ?? 0;
    message.endSegmentIndex = object.endSegmentIndex ?? 0;
    message.timeRange = (object.timeRange !== undefined && object.timeRange !== null)
      ? TimeRange.fromPartial(object.timeRange)
      : undefined;
    message.field9 = (object.field9 !== undefined && object.field9 !== null)
      ? Kob.fromPartial(object.field9)
      : undefined;
    message.field11 = (object.field11 !== undefined && object.field11 !== null)
      ? YPa.fromPartial(object.field11)
      : undefined;
    message.field12 = (object.field12 !== undefined && object.field12 !== null)
      ? YPa.fromPartial(object.field12)
      : undefined;
    return message;
  },
};

function createBaseOQa(): OQa {
  return { field1: [], field2: new Uint8Array(0), field3: "", field4: 0, field5: 0, field6: "" };
}

export const OQa: MessageFns<OQa> = {
  encode(message: OQa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.field1) {
      writer.uint32(10).string(v!);
    }
    if (message.field2 !== undefined && message.field2.length !== 0) {
      writer.uint32(18).bytes(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== "") {
      writer.uint32(26).string(message.field3);
    }
    if (message.field4 !== undefined && message.field4 !== 0) {
      writer.uint32(32).int32(message.field4);
    }
    if (message.field5 !== undefined && message.field5 !== 0) {
      writer.uint32(40).int32(message.field5);
    }
    if (message.field6 !== undefined && message.field6 !== "") {
      writer.uint32(50).string(message.field6);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OQa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOQa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.field1.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.field2 = reader.bytes();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.field3 = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.field4 = reader.int32();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.field5 = reader.int32();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.field6 = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OQa {
    return {
      field1: globalThis.Array.isArray(object?.field1) ? object.field1.map((e: any) => globalThis.String(e)) : [],
      field2: isSet(object.field2) ? bytesFromBase64(object.field2) : new Uint8Array(0),
      field3: isSet(object.field3) ? globalThis.String(object.field3) : "",
      field4: isSet(object.field4) ? globalThis.Number(object.field4) : 0,
      field5: isSet(object.field5) ? globalThis.Number(object.field5) : 0,
      field6: isSet(object.field6) ? globalThis.String(object.field6) : "",
    };
  },

  toJSON(message: OQa): unknown {
    const obj: any = {};
    if (message.field1?.length) {
      obj.field1 = message.field1;
    }
    if (message.field2 !== undefined && message.field2.length !== 0) {
      obj.field2 = base64FromBytes(message.field2);
    }
    if (message.field3 !== undefined && message.field3 !== "") {
      obj.field3 = message.field3;
    }
    if (message.field4 !== undefined && message.field4 !== 0) {
      obj.field4 = Math.round(message.field4);
    }
    if (message.field5 !== undefined && message.field5 !== 0) {
      obj.field5 = Math.round(message.field5);
    }
    if (message.field6 !== undefined && message.field6 !== "") {
      obj.field6 = message.field6;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OQa>, I>>(base?: I): OQa {
    return OQa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OQa>, I>>(object: I): OQa {
    const message = createBaseOQa();
    message.field1 = object.field1?.map((e) => e) || [];
    message.field2 = object.field2 ?? new Uint8Array(0);
    message.field3 = object.field3 ?? "";
    message.field4 = object.field4 ?? 0;
    message.field5 = object.field5 ?? 0;
    message.field6 = object.field6 ?? "";
    return message;
  },
};

function createBasePqa(): Pqa {
  return { formats: [], ud: [], clipId: "" };
}

export const Pqa: MessageFns<Pqa> = {
  encode(message: Pqa, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.formats) {
      FormatId.encode(v!, writer.uint32(10).fork()).join();
    }
    for (const v of message.ud) {
      BufferedRange.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.clipId !== undefined && message.clipId !== "") {
      writer.uint32(26).string(message.clipId);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): Pqa {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBasePqa();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.formats.push(FormatId.decode(reader, reader.uint32()));
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.ud.push(BufferedRange.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.clipId = reader.string();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): Pqa {
    return {
      formats: globalThis.Array.isArray(object?.formats) ? object.formats.map((e: any) => FormatId.fromJSON(e)) : [],
      ud: globalThis.Array.isArray(object?.ud) ? object.ud.map((e: any) => BufferedRange.fromJSON(e)) : [],
      clipId: isSet(object.clipId) ? globalThis.String(object.clipId) : "",
    };
  },

  toJSON(message: Pqa): unknown {
    const obj: any = {};
    if (message.formats?.length) {
      obj.formats = message.formats.map((e) => FormatId.toJSON(e));
    }
    if (message.ud?.length) {
      obj.ud = message.ud.map((e) => BufferedRange.toJSON(e));
    }
    if (message.clipId !== undefined && message.clipId !== "") {
      obj.clipId = message.clipId;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<Pqa>, I>>(base?: I): Pqa {
    return Pqa.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<Pqa>, I>>(object: I): Pqa {
    const message = createBasePqa();
    message.formats = object.formats?.map((e) => FormatId.fromPartial(e)) || [];
    message.ud = object.ud?.map((e) => BufferedRange.fromPartial(e)) || [];
    message.clipId = object.clipId ?? "";
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
