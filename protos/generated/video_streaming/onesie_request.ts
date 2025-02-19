// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { BufferedRange } from "./buffered_range.js";
import { ClientAbrState } from "./client_abr_state.js";
import { EncryptedPlayerRequest } from "./encrypted_player_request.js";
import { StreamerContext } from "./streamer_context.js";

export const protobufPackage = "video_streaming";

export interface OnesieRequest {
  urls: string[];
  clientAbrState?: ClientAbrState | undefined;
  playerRequest?: EncryptedPlayerRequest | undefined;
  onesieUstreamerConfig?: Uint8Array | undefined;
  maxVp9Height?: number | undefined;
  clientDisplayHeight?: number | undefined;
  streamerContext?:
    | StreamerContext
    | undefined;
  /** MLOnesieRequestTarget */
  requestTarget?: number | undefined;
  bufferedRanges: BufferedRange[];
}

function createBaseOnesieRequest(): OnesieRequest {
  return {
    urls: [],
    clientAbrState: undefined,
    playerRequest: undefined,
    onesieUstreamerConfig: new Uint8Array(0),
    maxVp9Height: 0,
    clientDisplayHeight: 0,
    streamerContext: undefined,
    requestTarget: 0,
    bufferedRanges: [],
  };
}

export const OnesieRequest: MessageFns<OnesieRequest> = {
  encode(message: OnesieRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    for (const v of message.urls) {
      writer.uint32(10).string(v!);
    }
    if (message.clientAbrState !== undefined) {
      ClientAbrState.encode(message.clientAbrState, writer.uint32(18).fork()).join();
    }
    if (message.playerRequest !== undefined) {
      EncryptedPlayerRequest.encode(message.playerRequest, writer.uint32(26).fork()).join();
    }
    if (message.onesieUstreamerConfig !== undefined && message.onesieUstreamerConfig.length !== 0) {
      writer.uint32(34).bytes(message.onesieUstreamerConfig);
    }
    if (message.maxVp9Height !== undefined && message.maxVp9Height !== 0) {
      writer.uint32(40).int32(message.maxVp9Height);
    }
    if (message.clientDisplayHeight !== undefined && message.clientDisplayHeight !== 0) {
      writer.uint32(48).int32(message.clientDisplayHeight);
    }
    if (message.streamerContext !== undefined) {
      StreamerContext.encode(message.streamerContext, writer.uint32(82).fork()).join();
    }
    if (message.requestTarget !== undefined && message.requestTarget !== 0) {
      writer.uint32(104).int32(message.requestTarget);
    }
    for (const v of message.bufferedRanges) {
      BufferedRange.encode(v!, writer.uint32(114).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OnesieRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnesieRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.urls.push(reader.string());
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.clientAbrState = ClientAbrState.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.playerRequest = EncryptedPlayerRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.onesieUstreamerConfig = reader.bytes();
          continue;
        case 5:
          if (tag !== 40) {
            break;
          }

          message.maxVp9Height = reader.int32();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.clientDisplayHeight = reader.int32();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.streamerContext = StreamerContext.decode(reader, reader.uint32());
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.requestTarget = reader.int32();
          continue;
        case 14:
          if (tag !== 114) {
            break;
          }

          message.bufferedRanges.push(BufferedRange.decode(reader, reader.uint32()));
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnesieRequest {
    return {
      urls: globalThis.Array.isArray(object?.urls) ? object.urls.map((e: any) => globalThis.String(e)) : [],
      clientAbrState: isSet(object.clientAbrState) ? ClientAbrState.fromJSON(object.clientAbrState) : undefined,
      playerRequest: isSet(object.playerRequest) ? EncryptedPlayerRequest.fromJSON(object.playerRequest) : undefined,
      onesieUstreamerConfig: isSet(object.onesieUstreamerConfig)
        ? bytesFromBase64(object.onesieUstreamerConfig)
        : new Uint8Array(0),
      maxVp9Height: isSet(object.maxVp9Height) ? globalThis.Number(object.maxVp9Height) : 0,
      clientDisplayHeight: isSet(object.clientDisplayHeight) ? globalThis.Number(object.clientDisplayHeight) : 0,
      streamerContext: isSet(object.streamerContext) ? StreamerContext.fromJSON(object.streamerContext) : undefined,
      requestTarget: isSet(object.requestTarget) ? globalThis.Number(object.requestTarget) : 0,
      bufferedRanges: globalThis.Array.isArray(object?.bufferedRanges)
        ? object.bufferedRanges.map((e: any) => BufferedRange.fromJSON(e))
        : [],
    };
  },

  toJSON(message: OnesieRequest): unknown {
    const obj: any = {};
    if (message.urls?.length) {
      obj.urls = message.urls;
    }
    if (message.clientAbrState !== undefined) {
      obj.clientAbrState = ClientAbrState.toJSON(message.clientAbrState);
    }
    if (message.playerRequest !== undefined) {
      obj.playerRequest = EncryptedPlayerRequest.toJSON(message.playerRequest);
    }
    if (message.onesieUstreamerConfig !== undefined && message.onesieUstreamerConfig.length !== 0) {
      obj.onesieUstreamerConfig = base64FromBytes(message.onesieUstreamerConfig);
    }
    if (message.maxVp9Height !== undefined && message.maxVp9Height !== 0) {
      obj.maxVp9Height = Math.round(message.maxVp9Height);
    }
    if (message.clientDisplayHeight !== undefined && message.clientDisplayHeight !== 0) {
      obj.clientDisplayHeight = Math.round(message.clientDisplayHeight);
    }
    if (message.streamerContext !== undefined) {
      obj.streamerContext = StreamerContext.toJSON(message.streamerContext);
    }
    if (message.requestTarget !== undefined && message.requestTarget !== 0) {
      obj.requestTarget = Math.round(message.requestTarget);
    }
    if (message.bufferedRanges?.length) {
      obj.bufferedRanges = message.bufferedRanges.map((e) => BufferedRange.toJSON(e));
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnesieRequest>, I>>(base?: I): OnesieRequest {
    return OnesieRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnesieRequest>, I>>(object: I): OnesieRequest {
    const message = createBaseOnesieRequest();
    message.urls = object.urls?.map((e) => e) || [];
    message.clientAbrState = (object.clientAbrState !== undefined && object.clientAbrState !== null)
      ? ClientAbrState.fromPartial(object.clientAbrState)
      : undefined;
    message.playerRequest = (object.playerRequest !== undefined && object.playerRequest !== null)
      ? EncryptedPlayerRequest.fromPartial(object.playerRequest)
      : undefined;
    message.onesieUstreamerConfig = object.onesieUstreamerConfig ?? new Uint8Array(0);
    message.maxVp9Height = object.maxVp9Height ?? 0;
    message.clientDisplayHeight = object.clientDisplayHeight ?? 0;
    message.streamerContext = (object.streamerContext !== undefined && object.streamerContext !== null)
      ? StreamerContext.fromPartial(object.streamerContext)
      : undefined;
    message.requestTarget = object.requestTarget ?? 0;
    message.bufferedRanges = object.bufferedRanges?.map((e) => BufferedRange.fromPartial(e)) || [];
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
