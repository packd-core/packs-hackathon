'use client'
import { Wrapper } from "./components/Wrapper";
import { Greeting } from "./components/Greeting";
import {useAccount} from "wagmi";
import React from "react";
import Landing from "@/app/components/landing/Landing";
import {useHydrated} from "@/src/hooks/useHydrated";
import Dashboard from "@/app/components/dashboard/Dashboard";

const Home = () => {
    const { isConnected} = useAccount();
    const isLoaded = useHydrated()
  return (
    <main>
      <Wrapper>
          {isLoaded && isConnected ? <Dashboard/> : <Landing/>}
      </Wrapper>
    </main>
  );
};

export default Home;
