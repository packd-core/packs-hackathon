import {
  BytesLike,
  Contract,
  ContractFactory,
  EventLog,
  Overrides,
  ethers,
  formatUnits,
  getAddress,
  resolveAddress,
  solidityPackedKeccak256,
  type BaseContract,
  type Signer,
} from "ethers";

import type { HardhatRuntimeEnvironment } from "hardhat/types";
import { Create2Factory } from "../typechain-types";
import { saveAddress } from "./saveAddress";
interface Create2Options {
  amount?: number;
  salt?: string;
  callbacks?: BytesLike[];
}

interface DeployCreate2Options {
  overrides?: Overrides;
  create2Options?: Create2Options;
  debug?: boolean;
  waitForBlocks?: number | undefined;
}
export const deployContract = async <T extends BaseContract>(
  hre: HardhatRuntimeEnvironment,
  signer: Signer,
  contractName: string,
  constructorArguments: any[],
  overrides = {},
): Promise<T> => {
  const contractInstance = await hre.ethers.getContractFactory(contractName, {
    signer,
  });
  const contract = (await contractInstance.deploy(
    ...constructorArguments,
    overrides,
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

  await saveAddress(hre, contract, contractName);

  return contract;
};
export interface ContractFactoryConstructor<C extends Contract> {
  new (signer?: Signer): ContractFactory<Array<any>, C>;
}

export const deployContractWithCreate2 = async <
  T extends BaseContract,
  F extends ContractFactory, //<Array<any>, T>
>(
  hre: HardhatRuntimeEnvironment,
  contractFactory: F,
  create2Factory: Create2Factory,
  contractName: string,
  constructorArgs: Array<unknown> = [],
  options: DeployCreate2Options = {
    overrides: {},
    create2Options: { amount: 0, salt: undefined, callbacks: [] },
    debug: false,
    waitForBlocks: undefined,
  },
): Promise<T> => {
  const { overrides, create2Options, debug, waitForBlocks } = options;

  const salt = create2Options?.salt ?? contractName;
  if (debug)
    console.log("deployContractWithCreate2", contractName, "salt", salt);

  const deployerAddress = await resolveAddress(create2Factory.target);
  const unsignedTx = await contractFactory.getDeployTransaction(
    ...constructorArgs,
    overrides ?? {},
  );

  const create2Salt = solidityPackedKeccak256(["string"], [salt]);
  const contractAddress = _computeCreate2Address(
    deployerAddress,
    create2Salt,
    unsignedTx.data,
  );

  const deployTransaction = await create2Factory.deploy(
    create2Options?.amount ?? 0,
    create2Salt,
    unsignedTx.data,
    (create2Options?.callbacks ?? []) as unknown as any[],
    overrides ?? {},
  );

  const receipt = await deployTransaction.wait(waitForBlocks);
  if (receipt == null) throw Error("Create2Factory error");

  const deployedEvent = receipt.logs.find((e) => {
    return (
      e.topics[0] ===
      ethers.keccak256(ethers.toUtf8Bytes("Deployed(bytes32,address)"))
    );
  }) as EventLog;
  const deployedAddress = deployedEvent.args["deployed"];
  if (deployedAddress.toLowerCase() !== contractAddress.toLowerCase())
    throw new Error(
      `Deployed address ${deployedAddress}, expected address ${contractAddress}`,
    );

  const contract = new ethers.Contract(
    contractAddress,
    contractFactory.interface,
  ).connect(contractFactory.runner) as T;

  if (debug) {
    const abiEncodedConstructorArgs =
      contract.interface.encodeDeploy(constructorArgs);
    console.log(`ABI encoded args: ${abiEncodedConstructorArgs.slice(2)}`);
  }
  await saveAddress(hre, contract, contractName);
  return contract;
};
function _computeCreate2Address(
  deployerAddress: string,
  salt: string,
  bytecode: BytesLike,
): string {
  return getAddress(
    "0x" +
      solidityPackedKeccak256(
        ["bytes"],
        [
          `0xff${deployerAddress.slice(2)}${salt.slice(
            2,
          )}${solidityPackedKeccak256(["bytes"], [bytecode]).slice(2)}`,
        ],
      ).slice(-40),
  );
}
