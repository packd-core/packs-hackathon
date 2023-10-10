import type { Signer } from "ethers";
import { ethers } from "hardhat";
import type { PackMain } from "../typechain-types";
import type { KeySignManager } from "./keySignManager";
import { encodeData } from "./erc20moduleData";

export async function createPack(
  packMain: PackMain,
  signer: Signer,
  keySignManager: KeySignManager,
  value: number | bigint,
  modules: string[] = [],
  moduleData: string[] = []
) {
  const packInstance = packMain.connect(signer);
  const { claimPublicKey, claimPrivateKey } =
    await keySignManager.generateClaimKey(signer, ["uint256"], [0]);

  // Check if the value is a number or a bigint
  if (typeof value === "number") {
    value = ethers.parseEther(value.toString());
  }

  await packInstance.pack(
    await signer.getAddress(),
    claimPublicKey,
    modules,
    moduleData,
    {
      value,
    }
  );

  return { packInstance, claimPrivateKey };
}
