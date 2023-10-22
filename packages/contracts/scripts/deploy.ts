import type { HardhatRuntimeEnvironment } from "hardhat/types";
import type { Signer } from "ethers";

import {
  PackAccount,
  PackRegistry,
  PackMain,
  ERC20Module,
  ERC20Mock,
  ERC721Module,
  ERC721Mock,
  ERC20Mock__factory,
  Create2Factory,
  ERC721Mock__factory,
} from "../typechain-types";

import { getSystemConfig, SystemConfig } from "../utils/deployConfig";
import {
  deployContract,
  deployContractWithCreate2,
  logger,
} from "../utils/deployUtils";

const info = logger("info", "deploy");
export interface MocksDeployed {
  erc20MockA: ERC20Mock;
  erc20MockB: ERC20Mock;
  erc721MockA: ERC721Mock;
  erc721MockB: ERC721Mock;
}

export interface SystemDeployed {
  packAccount: PackAccount;
  packRegistry: PackRegistry;
  packMain: PackMain;
  create2Factory: Create2Factory;
  erc20Module: ERC20Module;
  erc20MockA: ERC20Mock;
  erc20MockB: ERC20Mock;
  erc721Module: ERC721Module;
  erc721MockA: ERC721Mock;
  erc721MockB: ERC721Mock;
}

export async function deployMocks(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  create2Factory: Create2Factory
): Promise<MocksDeployed> {
  info("Deploying Mocks");
  const deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  let erc20MockA: ERC20Mock;
  let erc20MockB: ERC20Mock;
  let erc721MockA: ERC721Mock;
  let erc721MockB: ERC721Mock;

  if (hre.network.name === "hardhat" || hre.network.name === "localhost") {
    // Deploy mocks with create2
    const deployCreate2Options = {
      overrides: deploymentOverrides,
      create2Options: { amount: 0, salt: "test", callbacks: [] },
      waitForBlocks: 0,
    };
    const withSalt = (salt: string) => ({
      ...deployCreate2Options,
      create2Options: { ...deployCreate2Options.create2Options, salt },
    });

    erc20MockA = await deployContractWithCreate2<ERC20Mock, ERC20Mock__factory>(
      hre,
      new ERC20Mock__factory(signer),
      create2Factory,
      "ERC20MockA",
      [],
      withSalt("ERC20MockA")
    );
    erc20MockB = await deployContractWithCreate2<ERC20Mock, ERC20Mock__factory>(
      hre,
      new ERC20Mock__factory(signer),
      create2Factory,
      "ERC20MockB",
      [],
      withSalt("ERC20MockB")
    );
    erc721MockA = await deployContractWithCreate2<
      ERC721Mock,
      ERC721Mock__factory
    >(
      hre,
      new ERC721Mock__factory(signer),
      create2Factory,
      "ERC721MockA",
      [],
      withSalt("ERC721MockA")
    );
    erc721MockB = await deployContractWithCreate2<
      ERC721Mock,
      ERC721Mock__factory
    >(
      hre,
      new ERC721Mock__factory(signer),
      create2Factory,
      "ERC721MockB",
      [],
      withSalt("ERC721MockB")
    );
  } else {
    // Deploy mocks without create2
    erc20MockA = await deployContract<ERC20Mock>(
      hre,
      signer,
      "ERC20Mock",
      [],
      deploymentOverrides
    );
    erc20MockB = await deployContract<ERC20Mock>(
      hre,
      signer,
      "ERC20Mock",
      [],
      deploymentOverrides
    );
    erc721MockA = await deployContract<ERC721Mock>(
      hre,
      signer,
      "ERC721Mock",
      [],
      deploymentOverrides
    );
    erc721MockB = await deployContract<ERC721Mock>(
      hre,
      signer,
      "ERC721Mock",
      [],
      deploymentOverrides
    );
  }
  return {
    erc20MockA,
    erc20MockB,
    erc721MockA,
    erc721MockB,
  };
}
export async function deploySystem(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  systemConfig: SystemConfig
): Promise<SystemDeployed> {
  info("Deploying System");
  const { packConfig } = getSystemConfig(hre);
  let deploymentOverrides = {
    gasPrice: hre.ethers.parseUnits("1.0", "gwei"),
  };

  const create2Factory = await deployContract<Create2Factory>(
    hre,
    signer,
    "Create2Factory",
    [],
    deploymentOverrides
  );
  const erc20Module = await deployContract<ERC20Module>(
    hre,
    signer,
    "ERC20Module",
    [],
    deploymentOverrides
  );
  const erc721Module = await deployContract<ERC721Module>(
    hre,
    signer,
    "ERC721Module",
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
      [await erc20Module.getAddress(), await erc721Module.getAddress()],
    ],
    deploymentOverrides
  );
  const mocks = await deployMocks(hre, signer, create2Factory);
  return {
    create2Factory,
    packAccount,
    packRegistry,
    packMain,
    erc20Module,
    erc721Module,
    ...mocks,
  };
}
