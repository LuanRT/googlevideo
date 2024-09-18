// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_innertube_response.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { HttpHeader } from "../misc/common.js";
import { ProxyStatus, proxyStatusFromJSON, proxyStatusToJSON } from "./proxy_status.js";

export const protobufPackage = "video_streaming";

export interface OnesieInnertubeResponse {
  proxyStatus?: ProxyStatus | undefined;
  status?: number | undefined;
  headers: HttpHeader[];
  body?: Uint8Array | undefined;
}

function createBaseOnesieInnertubeResponse(): OnesieInnertubeResponse {
  return { proxyStatus: undefined, status: undefined, headers: [], body: undefined };
}

export const OnesieInnertubeResponse: MessageFns<OnesieInnertubeResponse> = {
  encode(message: OnesieInnertubeResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.proxyStatus !== undefined) {
      writer.uint32(8).int32(message.proxyStatus);
    }
    if (message.status !== undefined) {
      writer.uint32(16).int32(message.status);
    }
    for (const v of message.headers) {
      HttpHeader.encode(v!, writer.uint32(26).fork()).join();
    }
    if (message.body !== undefined) {
      writer.uint32(34).bytes(message.body);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OnesieInnertubeResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnesieInnertubeResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.proxyStatus = reader.int32() as any;
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.status = reader.int32();
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.headers.push(HttpHeader.decode(reader, reader.uint32()));
          continue;
        case 4:
          if (tag !== 34) {
            break;
          }

          message.body = reader.bytes();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): OnesieInnertubeResponse {
    return {
      proxyStatus: isSet(object.proxyStatus) ? proxyStatusFromJSON(object.proxyStatus) : undefined,
      status: isSet(object.status) ? globalThis.Number(object.status) : undefined,
      headers: globalThis.Array.isArray(object?.headers) ? object.headers.map((e: any) => HttpHeader.fromJSON(e)) : [],
      body: isSet(object.body) ? bytesFromBase64(object.body) : undefined,
    };
  },

  toJSON(message: OnesieInnertubeResponse): unknown {
    const obj: any = {};
    if (message.proxyStatus !== undefined) {
      obj.proxyStatus = proxyStatusToJSON(message.proxyStatus);
    }
    if (message.status !== undefined) {
      obj.status = Math.round(message.status);
    }
    if (message.headers?.length) {
      obj.headers = message.headers.map((e) => HttpHeader.toJSON(e));
    }
    if (message.body !== undefined) {
      obj.body = base64FromBytes(message.body);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnesieInnertubeResponse>, I>>(base?: I): OnesieInnertubeResponse {
    return OnesieInnertubeResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnesieInnertubeResponse>, I>>(object: I): OnesieInnertubeResponse {
    const message = createBaseOnesieInnertubeResponse();
    message.proxyStatus = object.proxyStatus ?? undefined;
    message.status = object.status ?? undefined;
    message.headers = object.headers?.map((e) => HttpHeader.fromPartial(e)) || [];
    message.body = object.body ?? undefined;
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
