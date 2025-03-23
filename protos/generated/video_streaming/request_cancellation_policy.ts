// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/request_cancellation_policy.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface RequestCancellationPolicy {
  N0?: number | undefined;
  items: RequestCancellationPolicy_Item[];
  jq?: number | undefined;
}

export interface RequestCancellationPolicy_Item {
  fR?: number | undefined;
  NK?: number | undefined;
  minReadaheadMs?: number | undefined;
}

function createBaseRequestCancellationPolicy(): RequestCancellationPolicy {
  return { N0: 0, items: [], jq: 0 };
}

export const RequestCancellationPolicy: MessageFns<RequestCancellationPolicy> = {
  encode(message: RequestCancellationPolicy, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.N0 !== undefined && message.N0 !== 0) {
      writer.uint32(8).int32(message.N0);
    }
    for (const v of message.items) {
      RequestCancellationPolicy_Item.encode(v!, writer.uint32(18).fork()).join();
    }
    if (message.jq !== undefined && message.jq !== 0) {
      writer.uint32(24).int32(message.jq);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RequestCancellationPolicy {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCancellationPolicy();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.N0 = reader.int32();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.items.push(RequestCancellationPolicy_Item.decode(reader, reader.uint32()));
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.jq = reader.int32();
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

function createBaseRequestCancellationPolicy_Item(): RequestCancellationPolicy_Item {
  return { fR: 0, NK: 0, minReadaheadMs: 0 };
}

export const RequestCancellationPolicy_Item: MessageFns<RequestCancellationPolicy_Item> = {
  encode(message: RequestCancellationPolicy_Item, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.fR !== undefined && message.fR !== 0) {
      writer.uint32(8).int32(message.fR);
    }
    if (message.NK !== undefined && message.NK !== 0) {
      writer.uint32(16).int32(message.NK);
    }
    if (message.minReadaheadMs !== undefined && message.minReadaheadMs !== 0) {
      writer.uint32(24).int32(message.minReadaheadMs);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): RequestCancellationPolicy_Item {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseRequestCancellationPolicy_Item();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 8) {
            break;
          }

          message.fR = reader.int32();
          continue;
        case 2:
          if (tag !== 16) {
            break;
          }

          message.NK = reader.int32();
          continue;
        case 3:
          if (tag !== 24) {
            break;
          }

          message.minReadaheadMs = reader.int32();
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
