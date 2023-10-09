import type { HardhatRuntimeEnvironment } from "hardhat/types";
import hre from "hardhat";
import type { Signer } from "ethers";

import type { PackAccount } from "../typechain-types/contracts/PackAccount";
import type { PackRegistry } from "../typechain-types/contracts/PackRegistry";
import type { PackMain } from "../typechain-types/contracts/PackMain";

import { getSystemConfig, SystemConfig } from "../utils/deployConfig";
import { deployContract } from "../utils/deployUtils";

const { packConfig } = getSystemConfig(hre);

export interface SystemDeployed {
  packAccount: PackAccount;
  packRegistry: PackRegistry;
  packMain: PackMain;
}

export async function deploySystem(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  systemConfig: SystemConfig
): Promise<SystemDeployed> {
  const deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };
  const packAccount = await deployContract<PackAccount>(
    hre,
    signer,
    "PackAccount",
    [],
    deploymentOverrides
  );
  const packRegistry = await deployContract<PackRegistry>(
    hre,
    signer,
    "PackRegistry",
    [],
    deploymentOverrides
  );
  const packMain = await deployContract<PackMain>(
    hre,
    signer,
    "PackMain",
    [
      await signer.getAddress(),
      systemConfig.packConfig.initBaseURI,
      systemConfig.packConfig.name,
      systemConfig.packConfig.symbol,
      await packRegistry.getAddress(),
      await packAccount.getAddress(),
      systemConfig.packConfig.registryChainId,
      systemConfig.packConfig.salt,
    ],
    deploymentOverrides
  );

  return {
    packAccount,
    packRegistry,
    packMain,
  };
}
