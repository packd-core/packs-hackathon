import type { HardhatRuntimeEnvironment } from "hardhat/types";
import hre from "hardhat";
import type { Signer } from "ethers";

import type {
  PackAccount,
  PackRegistry,
  PackMain,
  ERC20Module,
  ERC20Mock,
} from "../typechain-types";

import { getSystemConfig, SystemConfig } from "../utils/deployConfig";
import { deployContract } from "../utils/deployUtils";

const { packConfig } = getSystemConfig(hre);

export interface SystemDeployed {
  packAccount: PackAccount;
  packRegistry: PackRegistry;
  packMain: PackMain;
  erc20Module: ERC20Module;
  erc20MockA: ERC20Mock;
  erc20MockB: ERC20Mock;
}

export async function deploySystem(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  systemConfig: SystemConfig
): Promise<SystemDeployed> {
  const deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  const erc20Module = await deployContract<ERC20Module>(
    hre,
    signer,
    "ERC20Module",
    [],
    deploymentOverrides
  );
  const erc20MockA = await deployContract<ERC20Mock>(
    hre,
    signer,
    "ERC20Mock",
    [],
    deploymentOverrides
  );
  const erc20MockB = await deployContract<ERC20Mock>(
    hre,
    signer,
    "ERC20Mock",
    [],
    deploymentOverrides
  );
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
    erc20Module,
    erc20MockA,
    erc20MockB,
  };
}
