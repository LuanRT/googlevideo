import crypto from 'crypto';

type Encrypted = {
  encrypted: Uint8Array;
  hmac: Uint8Array;
  iv: Uint8Array;
};

export async function encryptRequest(clientKey: Uint8Array, data: Uint8Array): Promise<Encrypted> {
  if (clientKey.length !== 32)
    throw new Error('Invalid client key length');

  const aesKeyData = clientKey.slice(0, 16);
  const hmacKeyData = clientKey.slice(16, 32);

  const iv = crypto.getRandomValues(new Uint8Array(16));

  const aesKey = await crypto.subtle.importKey(
    'raw',
    aesKeyData,
    { name: 'AES-CTR', length: 128 },
    false,
    [ 'encrypt' ]
  );

  const encrypted = new Uint8Array(await crypto.subtle.encrypt(
    { name: 'AES-CTR', counter: iv, length: 128 },
    aesKey,
    data
  ));

  const hmacKey = await crypto.subtle.importKey(
    'raw',
    hmacKeyData,
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    [ 'sign' ]
  );

  const hmac = new Uint8Array(await crypto.subtle.sign(
    'HMAC',
    hmacKey,
    new Uint8Array([ ...encrypted, ...iv ])
  ));

  return { encrypted, hmac, iv };
}

export async function decryptResponse(iv?: Uint8Array, hmac?: Uint8Array, data?: Uint8Array, clientKeyData?: Uint8Array): Promise<Uint8Array> {
  if (!iv || !hmac || !data || !clientKeyData)
    throw new Error('Invalid input');

  const aesKey = await crypto.subtle.importKey(
    'raw',
    clientKeyData.slice(0, 16),
    { name: 'AES-CTR', length: 128 },
    false,
    [ 'decrypt' ]
  );

  const decryptedData = new Uint8Array(await crypto.subtle.decrypt(
    { name: 'AES-CTR', counter: iv, length: 128 },
    aesKey,
    data
  ));

  const hmacKey = await crypto.subtle.importKey(
    'raw',
    clientKeyData.slice(16, 32),
    { name: 'HMAC', hash: { name: 'SHA-256' } },
    false,
    [ 'verify' ]
  );

  const isValid = await crypto.subtle.verify(
    'HMAC',
    hmacKey,
    hmac,
    new Uint8Array([ ...data, ...iv ])
  );

  if (!isValid)
    throw new Error('HMAC verification failed');

  return decryptedData;
}