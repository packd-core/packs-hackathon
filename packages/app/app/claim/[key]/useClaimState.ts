import {create} from 'zustand'
import {Address} from "wagmi";
import {ReactNode} from "react";


type ClaimState = {
    step: number,
    error: boolean,
    hash?: `0x${string}`,
    mintedTokenId?: bigint,
    setMintedTokenId: (mintedTokenId: bigint) => void,
    setLoading: (hash?: `0x${string}`) => void,
    nextStep: () => void,
    previousStep: () => void,
    controls: ReactNode,
    setControls: (controls: ReactNode) => void,
    reset: () => void

}

export const useClaimState = create<ClaimState>()((set) => ({
    step: -1,
    error: false,
    hash: undefined,
    controls: null,
    mintedTokenId: undefined,
    setMintedTokenId: (mintedTokenId) => set((state) => ({mintedTokenId})),
    setLoading: (hash) => set((state) => ({hash})),
    nextStep: () => set((state) => ({step: state.step + 1})),
    previousStep: () => set((state) => ({step: state.step - 1})),
    setControls: (controls) => set((state) => ({controls})),
    reset: () => set((state) => ({step: 0, error: false, hash: undefined, controls: null, mintedTokenId: undefined}))
}))
