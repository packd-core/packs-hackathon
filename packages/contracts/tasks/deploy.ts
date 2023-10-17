import { subtask, task } from "hardhat/config";
import { deploySystem } from "../scripts/deploy";
import { getSystemConfig } from "../utils/deployConfig";

subtask(
  "deploy",
  "Deploy the contracts to the selected chain (defaults to localhost)",
).setAction(async (args, hre) => {
  const systemConfig = getSystemConfig(hre);
  return await deploySystem(
    hre,
    await hre.ethers.provider.getSigner(),
    systemConfig,
  );
});

task("deploy").setAction(async (_, __, runSuper) => {
  return runSuper();
});

task(
  "deploy-dev-env",
  "Deploy all contracts, send ETH  and mint ERC20 to test accounts",
).setAction(async (args, hre) => {
  await hre.run("deploy", args);
  // Setup 3  test accounts, dao, alice, bob
  // Pre compute address with default deployer
  // erc20MockA.target: 0x7D0B2154C5c709b3Cc8489286e023Cf75a38E0B5
  // erc20MockB.target: 0x416D29fbCf9fc5CA66d792B1f6368221E985ec47
  // erc721MockA.target: 0x0106f5483Ace34618dCC1c76EFF7e284e5dE4C6B
  // erc721MockB.target: 0x958B411CB2cf43678ca9d366a8a6469CEa85B8fE
  let tokenId = 0;
  for (let i = 1; i <= 3; i++) {
    const account = process.env[`ACCOUNT_${i}`];
    console.log(
      "🚀 ------------------ Setup ",
      i,
      account,
      "--------------- 🚀",
    );
    if (account && account.length === 42) {
      await hre.run("send:eth", { account: account, amount: 1 });
      await hre.run("mint:erc20", {
        account: account,
        tokenaddress: "0x7D0B2154C5c709b3Cc8489286e023Cf75a38E0B5",
        amount: 1,
      });
      await hre.run("mint:erc20", {
        account: account,
        tokenaddress: "0x416D29fbCf9fc5CA66d792B1f6368221E985ec47",
        amount: 1,
      });

      await hre.run("mint:erc721", {
        account: account,
        tokenaddress: "0x0106f5483Ace34618dCC1c76EFF7e284e5dE4C6B",
        amount: 1,
        tokenid: tokenId++,
      });
      await hre.run("mint:erc721", {
        account: account,
        tokenaddress: "0x958B411CB2cf43678ca9d366a8a6469CEa85B8fE",
        tokenid: tokenId++,
      });
    }
  }
});
