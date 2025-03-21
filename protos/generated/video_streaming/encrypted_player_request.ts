// Code generated by protoc-gen-ts_proto. DO NOT EDIT.
// versions:
//   protoc-gen-ts_proto  v2.2.0
//   protoc               v5.28.0
// source: video_streaming/encrypted_player_request.proto

/* eslint-disable */
import { BinaryReader, BinaryWriter } from "@bufbuild/protobuf/wire";

export const protobufPackage = "video_streaming";

export interface EncryptedPlayerRequest {
  context?: Uint8Array | undefined;
  encryptedOnesiePlayerRequest?: Uint8Array | undefined;
  encryptedClientKey?: Uint8Array | undefined;
  iv?: Uint8Array | undefined;
  hmac?: Uint8Array | undefined;
  reverseProxyConfig?: string | undefined;
  serializeResponseAsJson?: boolean | undefined;
  pM?: boolean | undefined;
  enableCompression?: boolean | undefined;
  unencryptedOnesiePlayerRequest?: Uint8Array | undefined;
  TQ?: boolean | undefined;
}

function createBaseEncryptedPlayerRequest(): EncryptedPlayerRequest {
  return {
    context: new Uint8Array(0),
    encryptedOnesiePlayerRequest: new Uint8Array(0),
    encryptedClientKey: new Uint8Array(0),
    iv: new Uint8Array(0),
    hmac: new Uint8Array(0),
    reverseProxyConfig: "",
    serializeResponseAsJson: false,
    pM: false,
    enableCompression: false,
    unencryptedOnesiePlayerRequest: new Uint8Array(0),
    TQ: false,
  };
}

export const EncryptedPlayerRequest: MessageFns<EncryptedPlayerRequest> = {
  encode(message: EncryptedPlayerRequest, writer: BinaryWriter = new BinaryWriter()): BinaryWriter {
    if (message.context !== undefined && message.context.length !== 0) {
      writer.uint32(10).bytes(message.context);
    }
    if (message.encryptedOnesiePlayerRequest !== undefined && message.encryptedOnesiePlayerRequest.length !== 0) {
      writer.uint32(18).bytes(message.encryptedOnesiePlayerRequest);
    }
    if (message.encryptedClientKey !== undefined && message.encryptedClientKey.length !== 0) {
      writer.uint32(42).bytes(message.encryptedClientKey);
    }
    if (message.iv !== undefined && message.iv.length !== 0) {
      writer.uint32(50).bytes(message.iv);
    }
    if (message.hmac !== undefined && message.hmac.length !== 0) {
      writer.uint32(58).bytes(message.hmac);
    }
    if (message.reverseProxyConfig !== undefined && message.reverseProxyConfig !== "") {
      writer.uint32(74).string(message.reverseProxyConfig);
    }
    if (message.serializeResponseAsJson !== undefined && message.serializeResponseAsJson !== false) {
      writer.uint32(80).bool(message.serializeResponseAsJson);
    }
    if (message.pM !== undefined && message.pM !== false) {
      writer.uint32(104).bool(message.pM);
    }
    if (message.enableCompression !== undefined && message.enableCompression !== false) {
      writer.uint32(112).bool(message.enableCompression);
    }
    if (message.unencryptedOnesiePlayerRequest !== undefined && message.unencryptedOnesiePlayerRequest.length !== 0) {
      writer.uint32(130).bytes(message.unencryptedOnesiePlayerRequest);
    }
    if (message.TQ !== undefined && message.TQ !== false) {
      writer.uint32(136).bool(message.TQ);
    }
    return writer;
  },

  decode(input: BinaryReader | Uint8Array, length?: number): EncryptedPlayerRequest {
    const reader = input instanceof BinaryReader ? input : new BinaryReader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseEncryptedPlayerRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          if (tag !== 10) {
            break;
          }

          message.context = reader.bytes();
          continue;
        case 2:
          if (tag !== 18) {
            break;
          }

          message.encryptedOnesiePlayerRequest = reader.bytes();
          continue;
        case 5:
          if (tag !== 42) {
            break;
          }

          message.encryptedClientKey = reader.bytes();
          continue;
        case 6:
          if (tag !== 50) {
            break;
          }

          message.iv = reader.bytes();
          continue;
        case 7:
          if (tag !== 58) {
            break;
          }

          message.hmac = reader.bytes();
          continue;
        case 9:
          if (tag !== 74) {
            break;
          }

          message.reverseProxyConfig = reader.string();
          continue;
        case 10:
          if (tag !== 80) {
            break;
          }

          message.serializeResponseAsJson = reader.bool();
          continue;
        case 13:
          if (tag !== 104) {
            break;
          }

          message.pM = reader.bool();
          continue;
        case 14:
          if (tag !== 112) {
            break;
          }

          message.enableCompression = reader.bool();
          continue;
        case 16:
          if (tag !== 130) {
            break;
          }

          message.unencryptedOnesiePlayerRequest = reader.bytes();
          continue;
        case 17:
          if (tag !== 136) {
            break;
          }

          message.TQ = reader.bool();
          continue;
      }
      if ((tag & 7) === 4 || tag === 0) {
        break;
      }
      reader.skip(tag & 7);
    }
    return message;
  },

  fromJSON(object: any): EncryptedPlayerRequest {
    return {
      context: isSet(object.context) ? bytesFromBase64(object.context) : new Uint8Array(0),
      encryptedOnesiePlayerRequest: isSet(object.encryptedOnesiePlayerRequest)
        ? bytesFromBase64(object.encryptedOnesiePlayerRequest)
        : new Uint8Array(0),
      encryptedClientKey: isSet(object.encryptedClientKey)
        ? bytesFromBase64(object.encryptedClientKey)
        : new Uint8Array(0),
      iv: isSet(object.iv) ? bytesFromBase64(object.iv) : new Uint8Array(0),
      hmac: isSet(object.hmac) ? bytesFromBase64(object.hmac) : new Uint8Array(0),
      reverseProxyConfig: isSet(object.reverseProxyConfig) ? globalThis.String(object.reverseProxyConfig) : "",
      serializeResponseAsJson: isSet(object.serializeResponseAsJson)
        ? globalThis.Boolean(object.serializeResponseAsJson)
        : false,
      pM: isSet(object.pM) ? globalThis.Boolean(object.pM) : false,
      enableCompression: isSet(object.enableCompression) ? globalThis.Boolean(object.enableCompression) : false,
      unencryptedOnesiePlayerRequest: isSet(object.unencryptedOnesiePlayerRequest)
        ? bytesFromBase64(object.unencryptedOnesiePlayerRequest)
        : new Uint8Array(0),
      TQ: isSet(object.TQ) ? globalThis.Boolean(object.TQ) : false,
    };
  },

  toJSON(message: EncryptedPlayerRequest): unknown {
    const obj: any = {};
    if (message.context !== undefined && message.context.length !== 0) {
      obj.context = base64FromBytes(message.context);
    }
    if (message.encryptedOnesiePlayerRequest !== undefined && message.encryptedOnesiePlayerRequest.length !== 0) {
      obj.encryptedOnesiePlayerRequest = base64FromBytes(message.encryptedOnesiePlayerRequest);
    }
    if (message.encryptedClientKey !== undefined && message.encryptedClientKey.length !== 0) {
      obj.encryptedClientKey = base64FromBytes(message.encryptedClientKey);
    }
    if (message.iv !== undefined && message.iv.length !== 0) {
      obj.iv = base64FromBytes(message.iv);
    }
    if (message.hmac !== undefined && message.hmac.length !== 0) {
      obj.hmac = base64FromBytes(message.hmac);
    }
    if (message.reverseProxyConfig !== undefined && message.reverseProxyConfig !== "") {
      obj.reverseProxyConfig = message.reverseProxyConfig;
    }
    if (message.serializeResponseAsJson !== undefined && message.serializeResponseAsJson !== false) {
      obj.serializeResponseAsJson = message.serializeResponseAsJson;
    }
    if (message.pM !== undefined && message.pM !== false) {
      obj.pM = message.pM;
    }
    if (message.enableCompression !== undefined && message.enableCompression !== false) {
      obj.enableCompression = message.enableCompression;
    }
    if (message.unencryptedOnesiePlayerRequest !== undefined && message.unencryptedOnesiePlayerRequest.length !== 0) {
      obj.unencryptedOnesiePlayerRequest = base64FromBytes(message.unencryptedOnesiePlayerRequest);
    }
    if (message.TQ !== undefined && message.TQ !== false) {
      obj.TQ = message.TQ;
    }
    return obj;
  },

  create<I extends Exact<DeepPartial<EncryptedPlayerRequest>, I>>(base?: I): EncryptedPlayerRequest {
    return EncryptedPlayerRequest.fromPartial(base ?? ({} as any));
  },
  fromPartial<I extends Exact<DeepPartial<EncryptedPlayerRequest>, I>>(object: I): EncryptedPlayerRequest {
    const message = createBaseEncryptedPlayerRequest();
    message.context = object.context ?? new Uint8Array(0);
    message.encryptedOnesiePlayerRequest = object.encryptedOnesiePlayerRequest ?? new Uint8Array(0);
    message.encryptedClientKey = object.encryptedClientKey ?? new Uint8Array(0);
    message.iv = object.iv ?? new Uint8Array(0);
    message.hmac = object.hmac ?? new Uint8Array(0);
    message.reverseProxyConfig = object.reverseProxyConfig ?? "";
    message.serializeResponseAsJson = object.serializeResponseAsJson ?? false;
    message.pM = object.pM ?? false;
    message.enableCompression = object.enableCompression ?? false;
    message.unencryptedOnesiePlayerRequest = object.unencryptedOnesiePlayerRequest ?? new Uint8Array(0);
    message.TQ = object.TQ ?? false;
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
