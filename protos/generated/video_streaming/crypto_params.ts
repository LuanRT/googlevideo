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
};

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
