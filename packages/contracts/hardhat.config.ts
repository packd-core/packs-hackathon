import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import { config as dotenvConfig } from "dotenv";
dotenvConfig({ path: __dirname + "/.env" });

const config: HardhatUserConfig = {
  solidity: "0.8.20",
  networks: {
    goerli: {
      url: `https://eth-goerli.g.alchemy.com/v2/${process.env.ALCHEMY_API_KEY}`,
      accounts: [
        process.env.GOERLI_PRIVATE_KEY ??
          "0x38592522a0d55b59f57da7ba4283d73c106bfd5022ff551c41af4cc43619cdcd", // RANDOM PRIVATE KEY, DO NOT USE
      ],
    },
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
};

export default config;
