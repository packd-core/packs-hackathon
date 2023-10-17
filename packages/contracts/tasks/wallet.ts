import { task, types } from "hardhat/config";
import type { HardhatRuntimeEnvironment, TaskArguments } from "hardhat/types";
import { getDeployer } from "../utils/signers";

task("send:eth")
  .addParam("account", "Address to send ETH to", undefined, types.string)
  .addParam("amount", "Amount to send", 1, types.int)
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const deployer = await getDeployer(hre);
      const balance = await hre.ethers.provider.getBalance(deployer);

      const wallet = taskArguments.account;

      console.log(
        "Deployer balance: ",
        hre.ethers.parseEther(balance.toString())
      );
      console.log("Sending to: ", wallet);

      const tx = await deployer.sendTransaction({
        to: wallet,
        value: hre.ethers.parseEther(taskArguments.amount.toString()),
      });
      const balanceNew = await hre.ethers.provider.getBalance(wallet);

      console.log("Transaction hash: ", tx.hash);
      console.log("New balance: ", balanceNew.toString());
    }
  );

task("mint:erc20")
  .addParam(
    "account",
    "Address to send the ERC20Mock to",
    undefined,
    types.string
  )
  .addParam("tokenaddress", "Address of the ERC20Mock", undefined, types.string)
  .addOptionalParam("amount", "The amount, default 1000", 1000, types.int)
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const deployer = await getDeployer(hre);
      const wallet = taskArguments.account;
      const amount = hre.ethers.parseEther(taskArguments.amount.toString());

      console.log("Sending to: ", wallet);

      const token = await hre.ethers.getContractAt(
        "ERC20Mock",
        taskArguments.tokenaddress,
        deployer
      );

      const tx = await token.mint(wallet, taskArguments.amount);
      const balanceNew = await token.balanceOf(wallet);

      console.log("Transaction hash: ", tx.hash);
      console.log("New balance: ", balanceNew.toString());
    }
  );

task("mint:erc721")
  .addParam(
    "account",
    "Address to send the ERC721Mock to",
    undefined,
    types.string
  )
  .addOptionalParam("tokenid", "The tokenId, default 0", 0, types.int)
  .addParam(
    "tokenaddress",
    "Address of the ERC721Mock",
    undefined,
    types.string
  )
  .setAction(
    async (taskArguments: TaskArguments, hre: HardhatRuntimeEnvironment) => {
      const deployer = await getDeployer(hre);
      const wallet = taskArguments.account;

      console.log("Sending to: ", wallet);

      const token = await hre.ethers.getContractAt(
        "ERC721Mock",
        taskArguments.tokenaddress,
        deployer
      );

      const tx = await token.mint(wallet, taskArguments.tokenid);
      const balanceNew = await token.balanceOf(wallet);

      console.log("Transaction hash: ", tx.hash);
      console.log("New balance: ", balanceNew.toString());
    }
  );
