import { expect } from "chai";
import { encodeUrl, decodeUrl } from "../src/lib/encodeUrl";
import { KeySignManager } from "../../contracts/utils/keySignManager";
import { ethers } from "ethers";
describe("encode and decode URLs", () => {
  it("should encode and decode URLs", () => {
    const version = 1;
    const privateKey =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const chainId = 1; // ETHEREUM MAINNET
    const tokenId = 1;

    const encodedUrl = encodeUrl(version, privateKey, chainId, tokenId);
    console.log(encodedUrl);
    const decodedUrl = decodeUrl(encodedUrl);

    expect(decodedUrl.version).to.equal(version);
    expect(decodedUrl.privateKey).to.equal(privateKey);
    expect(decodedUrl.chainId).to.equal(chainId);
    expect(decodedUrl.tokenId).to.equal(tokenId);
  });
  it("should encode and decode URLs with a different chainId", () => {
    const version = 1;
    const privateKey =
      "0x1234567890abcdef1234567890abcdef1234567890abcdef1234567890abcdef";
    const chainId = 534351; // Scroll Sepolia
    const tokenId = 12341;

    const encodedUrl = encodeUrl(version, privateKey, chainId, tokenId);
    console.log(encodedUrl);
    const decodedUrl = decodeUrl(encodedUrl);

    expect(decodedUrl.version).to.equal(version);
    expect(decodedUrl.privateKey).to.equal(privateKey);
    expect(decodedUrl.chainId).to.equal(chainId);
    expect(decodedUrl.tokenId).to.equal(tokenId);
  });
  it("should encode and decode URLs with a different tokenId and different private key", () => {
    const version = 2;
    const privateKey =
      "0xb336fc406c28b09c3eedaac4afa18132c70fed90ea4fc1e17b12c14453a516e7";
    const chainId = 534351599; // Some other chain
    const tokenId = 92332341999;

    const encodedUrl = encodeUrl(version, privateKey, chainId, tokenId);
    console.log(encodedUrl);
    const decodedUrl = decodeUrl(encodedUrl);

    expect(decodedUrl.version).to.equal(version);
    expect(decodedUrl.privateKey).to.equal(privateKey);
    expect(decodedUrl.chainId).to.equal(chainId);
    expect(decodedUrl.tokenId).to.equal(tokenId);
  });
});
