import {Address, useAccount} from "wagmi";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useMintStore} from "@/src/stores/useMintStore";
import {useEffect, useMemo, useState} from "react";
import {useMintPackWrite} from "@/src/hooks/useMintPackWrite";
import {ethers} from "ethers";

export default function useMintPack() {
    const {address} = useAccount();
    const ethAmount = useMintStore(state => state.eth)
    const modules = useMintStore(state => state.modules)
    const claimPublicKey = useMintStore(state => state.claimKey?.public)
    const moduleList = useMemo(() => modules.map((module) => module.moduleAddress), [modules]);
    const moduleDataPromise = useMemo(() => Promise.all(modules.map((module) => generateMintData([[module.address, module.value]]))), [modules]);
    const [moduleData,setModuleData] = useState<string[]>([])
    useEffect(() => {
        moduleDataPromise.then((data) => {
            setModuleData(data)
        })
    }, [moduleDataPromise]);
    return useMintPackWrite(
        ethAmount,
        address!,
        claimPublicKey as `0x${string}`,
        moduleList,
        moduleData as readonly `0x${string}`[]
    );
}

export async function encodeData(types: string[], values: any[]) {
    const coder = ethers.AbiCoder.defaultAbiCoder();
    return coder.encode(types, values);
}

export async function generateMintData(data: Array<[Address, bigint]>) {
    return encodeData(["tuple(address,uint256)[]"], [data]);
}
