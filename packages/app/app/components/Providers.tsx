"use client";

import { ReactNode } from "react";
import { WagmiConfig, configureChains, createConfig } from "wagmi";
import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
// tesnets
import { hardhat, scrollSepolia, polygonZkEvmTestnet, mantleTestnet } from "wagmi/chains";
// mainnets
import { polygonZkEvm, mantle } from "wagmi/chains";

import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";

const testnets = [scrollSepolia, polygonZkEvmTestnet, mantleTestnet]
const mainnets = [polygonZkEvm, mantle] //scroll not yet live

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [
    ...(process.env.NEXT_PUBLIC_ENVIRONMENT == 'development' ? ([hardhat]) : []),
    ...(process.env.NEXT_PUBLIC_ENVIRONMENT == 'development' || process.env.NEXT_PUBLIC_ENVIRONMENT == 'testnet' ? (testnets) : []),
    ...(process.env.NEXT_PUBLIC_ENVIRONMENT == 'production' ? (mainnets) : [])
  ],
  [
    alchemyProvider({
      apiKey: process.env.NEXT_PUBLIC_ALCHEMY_API_KEY ?? "",
    }),
    publicProvider(),
  ],
);
const { connectors } = getDefaultWallets({
  appName: "Solidity Next.js Starter",
  projectId: process.env.NEXT_PUBLIC_RAINBOWKIT_PROJECT_ID ?? "",
  chains,
});
const config = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
  webSocketPublicClient,
});

const Providers = ({ children }: { children: ReactNode }) => (
  <WagmiConfig config={config}>
    <RainbowKitProvider chains={chains}>{children}</RainbowKitProvider>
  </WagmiConfig>
);

export { Providers };
