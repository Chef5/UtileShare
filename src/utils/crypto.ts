import appConfig from "@/config.json";

export interface PlainParams {
  [key: string]: unknown;
}

export interface EncryptResult {
  payload: string;
}

const textEncoder = new TextEncoder();
const textDecoder = new TextDecoder();

function base64ToUint8Array(base64: string): Uint8Array {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

function uint8ArrayToBase64(bytes: Uint8Array): string {
  let binary = "";
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, Array.from(chunk) as number[]);
  }
  return btoa(binary);
}

function canonicalizeParams(params: PlainParams): string {
  const keys = Object.keys(params).sort();
  const entries = keys.map((k) => [k, (params as Record<string, unknown>)[k]]);
  return JSON.stringify(entries);
}

async function sha256Hex(input: string): Promise<string> {
  const data = textEncoder.encode(input);
  const digest = await crypto.subtle.digest("SHA-256", data);
  const bytes = new Uint8Array(digest);
  return Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function aes128CbcEncrypt(plainText: string): Promise<string> {
  const { encrypt } = appConfig.security;
  const keyBytes = base64ToUint8Array(encrypt.keyBase64);
  const ivBytes = base64ToUint8Array(encrypt.ivBase64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC", length: 128 },
    false,
    ["encrypt"]
  );

  const cipherBuffer = await crypto.subtle.encrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    textEncoder.encode(plainText)
  );

  return uint8ArrayToBase64(new Uint8Array(cipherBuffer));
}

export async function signParams(params: PlainParams): Promise<string> {
  const { sign } = appConfig.security;
  const secret = sign.secret ?? "";
  const canonical = canonicalizeParams(params) + secret;
  return sha256Hex(canonical);
}

export async function buildEncryptedPayload(
  originalParams: PlainParams
): Promise<EncryptResult> {
  const params: PlainParams = { ...originalParams };
  params.t = Date.now();
  params.hash = await signParams(params);

  const json = JSON.stringify(params);
  const payload = await aes128CbcEncrypt(json);
  return { payload };
}

export async function decryptAes128CbcBase64ToJson<T = unknown>(
  base64Payload: string
): Promise<T> {
  const { encrypt } = appConfig.security;
  const keyBytes = base64ToUint8Array(encrypt.keyBase64);
  const ivBytes = base64ToUint8Array(encrypt.ivBase64);

  const cryptoKey = await crypto.subtle.importKey(
    "raw",
    keyBytes,
    { name: "AES-CBC", length: 128 },
    false,
    ["decrypt"]
  );

  const cipherBytes = base64ToUint8Array(base64Payload);
  const plainBuffer = await crypto.subtle.decrypt(
    { name: "AES-CBC", iv: ivBytes },
    cryptoKey,
    cipherBytes
  );
  const text = textDecoder.decode(new Uint8Array(plainBuffer));
  return JSON.parse(text) as T;
}
