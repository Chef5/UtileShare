import appConfig from "@/config.json";
import CryptoJS from "crypto-js";

export interface PlainParams {
  [key: string]: unknown;
}

export interface EncryptResult {
  payload: string;
}

function canonicalizeParams(params: PlainParams): string {
  const keys = Object.keys(params).sort();
  const entries = keys.map((k) => [k, (params as Record<string, unknown>)[k]]);
  return JSON.stringify(entries);
}

function sha256Hex(input: string): string {
  return CryptoJS.SHA256(input).toString();
}

function aes128CbcEncrypt(plainText: string): string {
  const { encrypt } = appConfig.security;
  const key = CryptoJS.enc.Base64.parse(encrypt.keyBase64);
  const iv = CryptoJS.enc.Base64.parse(encrypt.ivBase64);

  const encrypted = CryptoJS.AES.encrypt(plainText, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  return encrypted.toString();
}

export function signParams(params: PlainParams): string {
  const { sign } = appConfig.security;
  const secret = sign.secret ?? "";
  const canonical = canonicalizeParams(params) + secret;
  return sha256Hex(canonical);
}

export function buildEncryptedPayload(
  originalParams: PlainParams
): EncryptResult {
  const params: PlainParams = { ...originalParams };
  params.t = Date.now();
  params.hash = signParams(params);

  const json = JSON.stringify(params);
  const payload = aes128CbcEncrypt(json);
  return { payload };
}

export function decryptAes128CbcBase64ToJson<T = unknown>(
  base64Payload: string
): T {
  const { encrypt } = appConfig.security;
  const key = CryptoJS.enc.Base64.parse(encrypt.keyBase64);
  const iv = CryptoJS.enc.Base64.parse(encrypt.ivBase64);

  const decrypted = CryptoJS.AES.decrypt(base64Payload, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });

  const text = decrypted.toString(CryptoJS.enc.Utf8);
  return JSON.parse(text) as T;
}
