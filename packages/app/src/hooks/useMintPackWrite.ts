import type {Address} from "wagmi";
import {useEffect, useState} from "react";
import {
    useContractWrite,
    usePrepareContractWrite,
    useWaitForTransaction,
} from "wagmi";
import {decodeEventLog} from "viem";
import {packMainABI, usePackMainPack, usePreparePackMainPack} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function useMintPackWrite(
    ethAmount: bigint,
    address: Address,
    claimPublicKey: `0x${string}`,
    moduleList: Address[],
    additionalData: readonly `0x${string}`[]
) {
    const addresses = usePackdAddresses()
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePreparePackMainPack({
        address: addresses.PackMain,
        value: ethAmount,
        enabled: !!addresses.PackMain,
        args: [address, claimPublicKey, moduleList, additionalData],
    });

    useEffect(() => {
        console.log('useMintPackWrite',address, claimPublicKey, moduleList, additionalData)
    }, [address, claimPublicKey, moduleList, additionalData])

    const {write, data, error, isLoading, isError} = usePackMainPack(config);



    return {
        write,
        prepareError,
        isPrepareError,
        data,
        error,
        isLoading,
        isError,

    };
}
