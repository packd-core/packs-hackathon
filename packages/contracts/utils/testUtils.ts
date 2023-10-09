import type { Signer } from "ethers";
import { ethers } from "hardhat";
import type { PackMain } from "../typechain-types";
import type { KeySignManager } from "./keySignManager";
import { encodeData } from "./moduleData";

interface ModuleData {
  types: string[];
  values: any[];
}

export async function createPack(
  packMain: PackMain,
  signer: Signer,
  keySignManager: KeySignManager,
  value: number,
  modules: string[] = [],
  moduleData: ModuleData = { types: [], values: [] }
) {
  const packInstance = packMain.connect(signer);
  const { claimPublicKey, claimPrivateKey } =
    await keySignManager.generateClaimKey(signer, ["uint256"], [0]);

  let moduleDataArray: string[] = [];
  if (modules.length > 1) {
    // TODO: Fix this to work with multiple modules
    const encodedData = await encodeData(moduleData.types, moduleData.values);
    moduleDataArray = [encodedData];
  }

  await packInstance.pack(
    await signer.getAddress(),
    claimPublicKey,
    modules,
    moduleDataArray,
    {
      value: ethers.parseEther(value.toString()),
    }
  );

  return { packInstance, claimPrivateKey };
}
