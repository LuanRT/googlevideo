// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_player_response.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { HttpHeader } from "../misc/common.js";

export const protobufPackage = "video_streaming";

export interface OnesiePlayerResponse {
  onesieProxyStatus?: number | undefined;
  httpStatus?: number | undefined;
  headers: HttpHeader[];
  body?: Uint8Array | undefined;
}

function createBaseOnesiePlayerResponse(): OnesiePlayerResponse {
  return { onesieProxyStatus: 0, httpStatus: 0, headers: [], body: new Uint8Array(0) };
}

export const OnesiePlayerResponse: MessageFns<OnesiePlayerResponse> = {
  encode(message: OnesiePlayerResponse, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.onesieProxyStatus !== undefined && message.onesieProxyStatus !== 0) {
      writer.uint32(8).int32(message.onesieProxyStatus);
    }
    if (message.httpStatus !== undefined && message.httpStatus !== 0) {
      writer.uint32(16).int32(message.httpStatus);
    }
    for (const v of message.headers) {
      HttpHeader.encode(v!, writer.uint32(26).fork()).join();
    }
    if (message.body !== undefined && message.body.length !== 0) {
      writer.uint32(34).bytes(message.body);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): OnesiePlayerResponse {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseOnesiePlayerResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.onesieProxyStatus = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.httpStatus = reader.int32();
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

  fromJSON(object: any): OnesiePlayerResponse {
    return {
      onesieProxyStatus: isSet(object.onesieProxyStatus) ? globalThis.Number(object.onesieProxyStatus) : 0,
      httpStatus: isSet(object.httpStatus) ? globalThis.Number(object.httpStatus) : 0,
      headers: globalThis.Array.isArray(object?.headers) ? object.headers.map((e: any) => HttpHeader.fromJSON(e)) : [],
      body: isSet(object.body) ? bytesFromBase64(object.body) : new Uint8Array(0),
    };
  },

  toJSON(message: OnesiePlayerResponse): unknown {
    const obj: any = {};
    if (message.onesieProxyStatus !== undefined && message.onesieProxyStatus !== 0) {
      obj.onesieProxyStatus = Math.round(message.onesieProxyStatus);
    }
    if (message.httpStatus !== undefined && message.httpStatus !== 0) {
      obj.httpStatus = Math.round(message.httpStatus);
    }
    if (message.headers?.length) {
      obj.headers = message.headers.map((e) => HttpHeader.toJSON(e));
    }
    if (message.body !== undefined && message.body.length !== 0) {
      obj.body = base64FromBytes(message.body);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnesiePlayerResponse>, I>>(base?: I): OnesiePlayerResponse {
    return OnesiePlayerResponse.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnesiePlayerResponse>, I>>(object: I): OnesiePlayerResponse {
    const message = createBaseOnesiePlayerResponse();
    message.onesieProxyStatus = object.onesieProxyStatus ?? 0;
    message.httpStatus = object.httpStatus ?? 0;
    message.headers = object.headers?.map((e) => HttpHeader.fromPartial(e)) || [];
    message.body = object.body ?? new Uint8Array(0);
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
