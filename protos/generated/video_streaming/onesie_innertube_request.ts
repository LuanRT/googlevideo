// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_innertube_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { EncryptedRequest } from "./encrypted_request.js";
import { MediaInfo } from "./media_info.js";
import { StreamerContext } from "./streamer_context.js";

export const protobufPackage = "video_streaming";

export interface OnesieInnertubeRequest {
  mediaInfo?: MediaInfo | undefined;
  encryptedRequest?: EncryptedRequest | undefined;
  onesieUstreamerConfig?: Uint8Array | undefined;
  streamerContext?: StreamerContext | undefined;
}

function createBaseOnesieInnertubeRequest(): OnesieInnertubeRequest {
  return {
    mediaInfo: undefined,
    encryptedRequest: undefined,
    onesieUstreamerConfig: undefined,
    streamerContext: undefined,
  };
}

export const OnesieInnertubeRequest: MessageFns<OnesieInnertubeRequest> = {
  encode(message: OnesieInnertubeRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.mediaInfo !== undefined) {
      MediaInfo.encode(message.mediaInfo, writer.uint32(18).fork()).join();
    }
    if (message.encryptedRequest !== undefined) {
      EncryptedRequest.encode(message.encryptedRequest, writer.uint32(26).fork()).join();
    }
    if (message.onesieUstreamerConfig !== undefined) {
      writer.uint32(34).bytes(message.onesieUstreamerConfig);
    }
    if (message.streamerContext !== undefined) {
      StreamerContext.encode(message.streamerContext, writer.uint32(82).fork()).join();
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OnesieInnertubeRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnesieInnertubeRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          if (tag !== 18) {
            break;
          }

          message.mediaInfo = MediaInfo.decode(reader, reader.uint32());
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.encryptedRequest = EncryptedRequest.decode(reader, reader.uint32());
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.onesieUstreamerConfig = reader.bytes();
          continue;
        case 10:
          if (tag !== 82) {
            break;
          }

          message.streamerContext = StreamerContext.decode(reader, reader.uint32());
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnesieInnertubeRequest {
    return {
      mediaInfo: isSet(object.mediaInfo) ? MediaInfo.fromJSON(object.mediaInfo) : undefined,
      encryptedRequest: isSet(object.encryptedRequest) ? EncryptedRequest.fromJSON(object.encryptedRequest) : undefined,
      onesieUstreamerConfig: isSet(object.onesieUstreamerConfig)
        ? bytesFromBase64(object.onesieUstreamerConfig)
        : undefined,
      streamerContext: isSet(object.streamerContext) ? StreamerContext.fromJSON(object.streamerContext) : undefined,
    };
  },

  toJSON(message: OnesieInnertubeRequest): unknown {
    const obj: any = {};
    if (message.mediaInfo !== undefined) {
      obj.mediaInfo = MediaInfo.toJSON(message.mediaInfo);
    }
    if (message.encryptedRequest !== undefined) {
      obj.encryptedRequest = EncryptedRequest.toJSON(message.encryptedRequest);
    }
    if (message.onesieUstreamerConfig !== undefined) {
      obj.onesieUstreamerConfig = base64FromBytes(message.onesieUstreamerConfig);
    }
    if (message.streamerContext !== undefined) {
      obj.streamerContext = StreamerContext.toJSON(message.streamerContext);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnesieInnertubeRequest>, I>>(base?: I): OnesieInnertubeRequest {
    return OnesieInnertubeRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnesieInnertubeRequest>, I>>(object: I): OnesieInnertubeRequest {
    const message = createBaseOnesieInnertubeRequest();
    message.mediaInfo = (object.mediaInfo !== undefined && object.mediaInfo !== null)
      ? MediaInfo.fromPartial(object.mediaInfo)
      : undefined;
    message.encryptedRequest = (object.encryptedRequest !== undefined && object.encryptedRequest !== null)
      ? EncryptedRequest.fromPartial(object.encryptedRequest)
      : undefined;
    message.onesieUstreamerConfig = object.onesieUstreamerConfig ?? undefined;
    message.streamerContext = (object.streamerContext !== undefined && object.streamerContext !== null)
      ? StreamerContext.fromPartial(object.streamerContext)
      : undefined;
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