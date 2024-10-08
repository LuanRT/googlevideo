// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/stream_protection_status.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface StreamProtectionStatus {
  status?: number | undefined;
  field2?: number | undefined;
}

function createBaseStreamProtectionStatus(): StreamProtectionStatus {
  return { status: 0, field2: 0 };
}

export const StreamProtectionStatus: MessageFns<StreamProtectionStatus> = {
  encode(message: StreamProtectionStatus, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.status !== undefined && message.status !== 0) {
      writer.uint32(8).int32(message.status);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      writer.uint32(16).int32(message.field2);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): StreamProtectionStatus {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseStreamProtectionStatus();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.status = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.field2 = reader.int32();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): StreamProtectionStatus {
    return {
      status: isSet(object.status) ? globalThis.Number(object.status) : 0,
      field2: isSet(object.field2) ? globalThis.Number(object.field2) : 0,
    };
  },

  toJSON(message: StreamProtectionStatus): unknown {
    const obj: any = {};
    if (message.status !== undefined && message.status !== 0) {
      obj.status = Math.round(message.status);
    }
    if (message.field2 !== undefined && message.field2 !== 0) {
      obj.field2 = Math.round(message.field2);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<StreamProtectionStatus>, I>>(base?: I): StreamProtectionStatus {
    return StreamProtectionStatus.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<StreamProtectionStatus>, I>>(object: I): StreamProtectionStatus {
    const message = createBaseStreamProtectionStatus();
    message.status = object.status ?? 0;
    message.field2 = object.field2 ?? 0;
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
