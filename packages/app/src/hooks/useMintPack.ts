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

export function useMintPack(
    ethAmount: BigInt,
    address: Address,
    claimPublicKey: `0x${string}`,
    moduleList: Address[],
    additionalData: readonly `0x${string}`[]
) {
    const [mintedTokenId, setMintedTokenId] = useState(0);
    const addresses = usePackdAddresses()
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePreparePackMainPack({
        address: addresses.PackMain,
        value: ethAmount as any,
        enabled: !!addresses.PackMain,
        args: [address, claimPublicKey, moduleList, additionalData],
    });

    useEffect(() => {
        console.log(address, claimPublicKey, moduleList, additionalData)
    }, [address, claimPublicKey, moduleList, additionalData])

    const {write, data, error, isLoading, isError} = usePackMainPack(config);

    const {
        data: receipt,
        isLoading: isPending,
        isSuccess,
    } = useWaitForTransaction({hash: data?.hash});

    useEffect(() => {
        if (receipt?.status === "success") {
            const logs = receipt.logs.filter(
                (log) =>
                    log.address.toLowerCase() === addresses.PackMain.toLowerCase()
            );
            logs.forEach((log) => {
                const decodedLog = decodeEventLog({
                    abi: packMainABI,
                    data: log.data,
                    topics: log.topics,
                });
                if (decodedLog.eventName === "PackCreated") {
                    setMintedTokenId(Number((decodedLog.args as any).tokenId));
                }
            });
        }
    }, [addresses.PackMain, receipt]);

    return {
        write,
        mintedTokenId,
        prepareError,
        isPrepareError,
        data,
        error,
        isLoading,
        isError,
        receipt,
        isPending,
        isSuccess,
    };
}
