'use client'
import { Wrapper } from "./components/Wrapper";
import { Greeting } from "./components/Greeting";
import {useAccount} from "wagmi";
import React from "react";
import Landing from "@/app/components/landing/Landing";
import {useHydrated} from "@/src/hooks/useHydrated";

const Home = () => {
    const { isConnected} = useAccount();
    const isLoaded = useHydrated()
  return (
    <main>
      <Wrapper>
          {isLoaded && isConnected ? <div>connected</div> : <Landing/>}
      </Wrapper>
    </main>
  );
};

export default Home;
