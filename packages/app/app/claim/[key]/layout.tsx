'use client'
import {Wrapper} from "@/app/components/Wrapper";
import {ReactNode, useEffect} from "react";
import {usePackState} from "@/app/mint/usePackState";
import {useClaimState} from "@/app/claim/[key]/useClaimState";


export default function ClaimLayout({children}: {
    children: ReactNode;
}) {
    const resetStepper = useClaimState(state => state.reset);
    useEffect(() => {
        // resetStepper();
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
