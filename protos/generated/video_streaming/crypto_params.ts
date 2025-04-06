// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/crypto_params.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface CryptoParams {
  hmac?: Uint8Array | undefined;
  iv?: Uint8Array | undefined;
  compressionType?: CryptoParams_CompressionType | undefined;
}

export enum CryptoParams_CompressionType {
  NONE = 0,
  GZIP = 1,
  BROTLI = 2,
  UNRECOGNIZED = -1,
}

export function cryptoParams_CompressionTypeFromJSON(object: any): CryptoParams_CompressionType {
  switch (object) {
    case 0:
    case "NONE":
      return CryptoParams_CompressionType.NONE;
    case 1:
    case "GZIP":
      return CryptoParams_CompressionType.GZIP;
    case 2:
    case "BROTLI":
      return CryptoParams_CompressionType.BROTLI;
    case -1:
    case "UNRECOGNIZED":
    default:
      return CryptoParams_CompressionType.UNRECOGNIZED;
  }
}

export function cryptoParams_CompressionTypeToJSON(object: CryptoParams_CompressionType): string {
  switch (object) {
    case CryptoParams_CompressionType.NONE:
      return "NONE";
    case CryptoParams_CompressionType.GZIP:
      return "GZIP";
    case CryptoParams_CompressionType.BROTLI:
      return "BROTLI";
    case CryptoParams_CompressionType.UNRECOGNIZED:
    default:
      return "UNRECOGNIZED";
  }
}

function createBaseCryptoParams(): CryptoParams {
  return { hmac: new Uint8Array(0), iv: new Uint8Array(0), compressionType: 0 };
}

export const CryptoParams: MessageFns<CryptoParams> = {
  encode(message: CryptoParams, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.hmac !== undefined && message.hmac.length !== 0) {
      writer.uint32(34).bytes(message.hmac);
    }
    if (message.iv !== undefined && message.iv.length !== 0) {
      writer.uint32(42).bytes(message.iv);
    }
    if (message.compressionType !== undefined && message.compressionType !== 0) {
      writer.uint32(48).int32(message.compressionType);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): CryptoParams {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseCryptoParams();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 4:
          if (tag !== 34) {
            break;
          }

          message.hmac = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.iv = reader.bytes();
          continue;
        case 6:
          if (tag !== 48) {
            break;
          }

          message.compressionType = reader.int32() as any;
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): CryptoParams {
    return {
      hmac: isSet(object.hmac) ? bytesFromBase64(object.hmac) : new Uint8Array(0),
      iv: isSet(object.iv) ? bytesFromBase64(object.iv) : new Uint8Array(0),
      compressionType: isSet(object.compressionType) ? cryptoParams_CompressionTypeFromJSON(object.compressionType) : 0,
    };
  },

  toJSON(message: CryptoParams): unknown {
    const obj: any = {};
    if (message.hmac !== undefined && message.hmac.length !== 0) {
      obj.hmac = base64FromBytes(message.hmac);
    }
    if (message.iv !== undefined && message.iv.length !== 0) {
      obj.iv = base64FromBytes(message.iv);
    }
    if (message.compressionType !== undefined && message.compressionType !== 0) {
      obj.compressionType = cryptoParams_CompressionTypeToJSON(message.compressionType);
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<CryptoParams>, I>>(base?: I): CryptoParams {
    return CryptoParams.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<CryptoParams>, I>>(object: I): CryptoParams {
    const message = createBaseCryptoParams();
    message.hmac = object.hmac ?? new Uint8Array(0);
    message.iv = object.iv ?? new Uint8Array(0);
    message.compressionType = object.compressionType ?? 0;
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
