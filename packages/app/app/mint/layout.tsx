import type {Metadata} from "next";
import {Wrapper} from "@/app/components/Wrapper";
import {ReactNode} from "react";

export const metadata: Metadata = {
    title: "Create Pack - PACKD",
    description:
        "A starter kit for building full stack Ethereum dApps with Solidity and Next.js",
};

export default function MintLayout({children}: {
    children: ReactNode;
}) {
    return (
        <main>
            <Wrapper className='flex items-center mb-12'>
                {children}
            </Wrapper>
        </main>
    );
}
