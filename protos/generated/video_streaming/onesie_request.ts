// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { HttpHeader } from "../misc/common.js";

export const protobufPackage = "video_streaming";

export interface OnesieRequest {
  url?: string | undefined;
  headers: HttpHeader[];
  body?: string | undefined;
  field4?: boolean | undefined;
  field6?: boolean | undefined;
}

function createBaseOnesieRequest(): OnesieRequest {
  return { url: undefined, headers: [], body: undefined, field4: undefined, field6: undefined };
}

export const OnesieRequest: MessageFns<OnesieRequest> = {
  encode(message: OnesieRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.url !== undefined) {
      writer.uint32(10).string(message.url);
    }
    for (const v of message.headers) {
      HttpHeader.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.body !== undefined) {
      writer.uint32(26).string(message.body);
    }
    if (message.field4 !== undefined) {
      writer.uint32(32).bool(message.field4);
    }
    if (message.field6 !== undefined) {
      writer.uint32(48).bool(message.field6);
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

          message.url = reader.string();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.headers.push(HttpHeader.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 26) {
            break;
          }

          message.body = reader.string();
          continue;
        case 4:
          if (tag !== 32) {
            break;
          }

          message.field4 = reader.bool();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.field6 = reader.bool();
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
      url: isSet(object.url) ? globalThis.String(object.url) : undefined,
      headers: globalThis.Array.isArray(object?.headers) ? object.headers.map((e: any) => HttpHeader.fromJSON(e)) : [],
      body: isSet(object.body) ? globalThis.String(object.body) : undefined,
      field4: isSet(object.field4) ? globalThis.Boolean(object.field4) : undefined,
      field6: isSet(object.field6) ? globalThis.Boolean(object.field6) : undefined,
    };
  },

  toJSON(message: OnesieRequest): unknown {
    const obj: any = {};
    if (message.url !== undefined) {
      obj.url = message.url;
    }
    if (message.headers?.length) {
      obj.headers = message.headers.map((e) => HttpHeader.toJSON(e));
    }
    if (message.body !== undefined) {
      obj.body = message.body;
    }
    if (message.field4 !== undefined) {
      obj.field4 = message.field4;
    }
    if (message.field6 !== undefined) {
      obj.field6 = message.field6;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<OnesieRequest>, I>>(base?: I): OnesieRequest {
    return OnesieRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<OnesieRequest>, I>>(object: I): OnesieRequest {
    const message = createBaseOnesieRequest();
    message.url = object.url ?? undefined;
    message.headers = object.headers?.map((e) => HttpHeader.fromPartial(e)) || [];
    message.body = object.body ?? undefined;
    message.field4 = object.field4 ?? undefined;
    message.field6 = object.field6 ?? undefined;
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
