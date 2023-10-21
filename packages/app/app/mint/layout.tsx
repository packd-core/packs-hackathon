"use client"
import type {Metadata} from "next";
import {Wrapper} from "@/app/components/Wrapper";
import {ReactNode, useEffect} from "react";
import {useMintStore} from "@/src/stores/useMintStore";
import {usePackState} from "@/app/mint/usePackState";

// export const metadata: Metadata = {
//     title: "Create Pack - PACKD",
//     description:
//         "A starter kit for building full stack Ethereum dApps with Solidity and Next.js",
// };

export default function MintLayout({children}: {
    children: ReactNode;
}) {
    const resetMint = useMintStore(state => state.reset);
    const resetStepper = usePackState(state => state.reset);
    useEffect(() => {
        resetMint();
        resetStepper();
        // eslint-disable-next-line
    }, []);
    return (
        <main>
            <Wrapper className='flex items-center mb-12'>
                {children}
            </Wrapper>
        </main>
    );
}
