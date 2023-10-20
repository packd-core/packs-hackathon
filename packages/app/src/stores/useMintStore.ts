import {create} from 'zustand'

type Module = {
    moduleAddress: string,
    address: string,
    value: bigint
}

type MintState = {
    eth: bigint
    modules: Module[]
    setEth: (amount: bigint) => void
    addModule: (module: Module) => void
    removeModule: (module: Module) => void
    reset: () => void

}

export const useMintStore = create<MintState>()((set) => ({
    eth: BigInt(0),
    setEth: (amount) => set((state) => ({eth: amount})),
    modules: [],
    addModule: (module) => set((state) => ({modules: [...state.modules, module]})),
    removeModule: (module) => set((state) => ({modules: state.modules.filter(m => m !== module)})),
    reset: () => set((state) => ({eth: BigInt(0), modules: []}))
}))
