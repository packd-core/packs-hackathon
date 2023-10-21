import {create} from 'zustand'
import {Address} from "wagmi";

export type Module = {
    isApproved?: boolean,
    moduleAddress: Address,
    address: Address,
    value: bigint
}
type ClaimKey = {
    private: string,
    public: string,
}

type MintState = {
    eth: bigint
    modules: Module[]
    claimKey: ClaimKey | null
    setEth: (amount: bigint) => void
    addModule: (module: Module) => void
    removeModule: (module: Module) => void
    setApproved: (module: Module) => void
    setClaimKey: (claimKey: ClaimKey) => void
    reset: () => void
}

export const useMintStore = create<MintState>()((set) => ({
    eth: BigInt(0),
    setEth: (amount) => set((state) => ({eth: amount})),
    modules: [],
    claimKey: null,
    addModule: (module) => set((state) => ({modules: [...state.modules, module]})),
    removeModule: (module) => set((state) => ({modules: state.modules.filter(m => m !== module)})),
    setApproved: (module) => set((state) => ({modules: state.modules.map(m => m === module ? {...m, isApproved: true} : m)})),
    setClaimKey: (claimKey) => set((state) => ({claimKey})),
    reset: () => set((state) => ({eth: BigInt(0), modules: [], claimKey: null}))
}))
