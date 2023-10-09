import type { BaseContract, Signer } from "ethers";

import type { HardhatRuntimeEnvironment } from "hardhat/types";

export const deployContract = async <T extends BaseContract>(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  contractName: string,
  constructorArguments: any[],
  overrides = {}
): Promise<T> => {
  const contractInstance = await hre.ethers.getContractFactory(contractName, {
    signer,
  });
  const contract = (await contractInstance.deploy(
    ...constructorArguments,
    overrides
  )) as unknown as T;
  await contract.waitForDeployment();
  const abiEncodedConstructorArgs =
    contract.interface.encodeDeploy(constructorArguments);

  //   console.log(`Deployed ${contractName} to ${await contract.getAddress()}`);
  // Verify the contract on Etherscan if not local network
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    await hre.run("verify:verify", {
      address: await contract.getAddress(),
      constructorArguments: [...constructorArguments],
    });
  }
  if (constructorArguments.length > 0)
    console.log(`ABI encoded args: ${abiEncodedConstructorArgs.slice(2)}`);
  return contract;
};
