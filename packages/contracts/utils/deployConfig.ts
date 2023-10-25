import { ZeroAddress } from "ethers";
import type { HardhatRuntimeEnvironment } from "hardhat/types";

const DEFAULT_CHAIN_ID = 31337;

export interface SystemConfig {
  packConfig: {
    initBaseURI: string;
    name: string;
    symbol: string;
    registry: string;
    implementation: string;
    registryChainId: number;
    salt: number;
  };
}

export function getSystemConfig(hre: HardhatRuntimeEnvironment) {
  return {
    packConfig: {
      initBaseURI: "https://packd.io/",
      name: "PackMain",
      symbol: "PCK",
      registry: ZeroAddress,
      implementation: ZeroAddress,
      registryChainId: getChainId(hre) || DEFAULT_CHAIN_ID,
      salt: 0,
    },
  };
}

function getChainId(hre: HardhatRuntimeEnvironment) {
  return hre.network.config.chainId;
}
