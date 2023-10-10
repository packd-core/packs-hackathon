import { ethers, network } from "hardhat";
import fs from 'fs/promises'
import { BaseContract } from "ethers";


async function main() {
  const greeting = "Hello, world!";
  const greeter = await ethers.deployContract("Greeter", [
    greeting,
  ]);
  await greeter.waitForDeployment();
  await saveAddress(greeter, 'Greeter')
  console.log(
    `Greeter with greeting "${greeting}" deployed to ${greeter.target}`,
  );

}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});


const saveAddress = async (contract: BaseContract, name: string) => {
  const networkName = network.name
  const chainId = network.config.chainId ?? 31337

  const mainFolder = "../app/app";
  const abi = JSON.stringify(JSON.parse(contract.interface.formatJson()), undefined, 2) // hack to format the json
  const address = contract.target

  await fs.writeFile(`${mainFolder}/abi/${name}.json`, abi)

  const addressesFile = `${mainFolder}/abi/addresses.json`
  let currentContent = '{}'
  try { currentContent = await fs.readFile(addressesFile, 'utf-8') || '{}' } catch { }

  const addresses = {
    ...JSON.parse(currentContent),
    [chainId]: address
  }

  await fs.writeFile(addressesFile, JSON.stringify(addresses, undefined, 2))
};