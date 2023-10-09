import type { Signer } from "ethers";
import { ethers } from "hardhat";
import type { PackMain } from "../typechain-types";
import type { KeySignManager } from "./keySignManager";

export async function createPack(
  packMain: PackMain,
  signer: Signer,
  keySignManager: KeySignManager,
  value: number
) {
  const packInstance = packMain.connect(signer);
  const { claimPublicKey, claimPrivateKey } =
    await keySignManager.generateClaimKey(signer, ["uint256"], [0]);
  await packInstance.pack(signer.getAddress(), claimPublicKey, {
    value: ethers.parseEther(value.toString()),
  });
  return { packInstance, claimPrivateKey };
}
