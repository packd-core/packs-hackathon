import { ethers } from "ethers";

export interface ClaimData {
  tokenId: number;
  sigOwner: string; // Signature from the Pack owner
  claimer: string; // Address of the claimer
  sigClaimer: string; // Signature from the claimer
  refundValue: bigint; // Value to refund to the relayer
  maxRefundValue: bigint; // Maximum refundable value (to prevent over-refund)
}

// Common function to encode data
export async function encodeData(types: string[], values: any[]) {
  const coder = ethers.AbiCoder.defaultAbiCoder();
  return coder.encode(types, values);
}

export async function generateMintData(data: Array<[string, Array<bigint>]>) {
  return encodeData(["tuple(address,uint256[])[]"], [data]);
}
export async function generateRevokeData(data: Array<[string, bigint[]]>) {
  return encodeData(["tuple(address,uint256[])[]"], [data]);
}

export const generateClaimData = generateRevokeData;
