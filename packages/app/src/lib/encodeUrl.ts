/*
 * This file contains functions to encode and decode the URL
 *
 * Schema:
 * VERSION | PRIVATE_KEY | CHAIN_ID | TOKEN_ID
 * i.e.
 * 01 (fixed length)
 * 0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef (64 characters)
 * 0x12345678 (8 characters)
 * 0x1 (rest of the characters, variable length)
 */

function hexToBase64(hexString: string) {
  const bytes = new Uint8Array(
    (hexString.match(/.{1,2}/g) || []).map((byte) => parseInt(byte, 16))
  );
  return Buffer.from(bytes).toString("base64");
}

function base64ToUrlSafe(base64: string): string {
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64ToHex(base64String: string) {
  const bytes = Buffer.from(base64String, "base64");
  let hex = Array.from(bytes)
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
  return hex; // Remove padding
}

function urlSafeToBase64(urlSafe: string): string {
  return urlSafe
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(urlSafe.length + ((4 - (urlSafe.length % 4)) % 4), "=");
}

export function encodeUrl(
  version: number,
  privateKey: string,
  chainId: number,
  tokenId: bigint
) {
  const hexVersion = version.toString(16).padStart(2, "0"); // Convert version to hexadecimal string
  const hexChainId = chainId.toString(16).padStart(8, "0"); // Convert chainId to hexadecimal string
  const hexTokenId = tokenId.toString(16); // Convert tokenId to hexadecimal string
  const combinedValue = `${hexVersion}${privateKey.slice(
    2
  )}${hexChainId}${hexTokenId}`; // remove '0x' from privateKey and add tokenId
  return base64ToUrlSafe(hexToBase64(combinedValue));
}

export function decodeUrl(value: string) {
  const decodedValue = base64ToHex(urlSafeToBase64(value));
  const version = parseInt(decodedValue.slice(0, 2), 16); // Extract and parse version
  const privateKey = "0x" + decodedValue.slice(2, 66); // Extract privateKey
  const chainId = parseInt(decodedValue.slice(66, 74), 16); // Extract and parse chainId
  const tokenId = Number(`0x${decodedValue.slice(74)}`); // Extract tokenId
  return {
    version,
    privateKey,
    chainId,
    tokenId,
  };
}
