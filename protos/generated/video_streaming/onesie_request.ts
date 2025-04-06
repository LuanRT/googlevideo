// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/onesie_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";
import { OnesieRequestTarget } from "../misc/common.js";
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
  requestTarget?: OnesieRequestTarget | undefined;
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

          message.requestTarget = reader.int32() as any;
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
};

export interface MessageFns<T> {
  encode(message: T, writer?: BinaryWriter): BinaryWriter;
  decode(input: BinaryReader | Uint8Array, length?: number): T;
}
