'use client'
import {Card} from "@/app/components/Card";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";
import Present from "~/present.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {useCallback, useEffect, useState} from "react";
import {ApproveForm} from "@/app/mint/pack/ApproveForm";
import {SignForm} from "@/app/mint/pack/SignForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {PackCreatedCard} from "@/app/mint/pack/PackCreatedCard";
import {Address, useAccount, useWaitForTransaction} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {useMintStore} from "@/src/stores/useMintStore";
import {usePackState} from "@/app/mint/usePackState";
import {useHydrated} from "@/src/hooks/useHydrated";
import {useMintPackWrite} from "@/src/hooks/useMintPackWrite";
import {decodeEventLog} from "viem";
import {packMainABI} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {watchContractEvent} from "viem/actions";

const MintPage = () => {

    const step = usePackState(state => state.step);
    const controls = usePackState(state => state.controls);

    const {isConnected, isConnecting, address} = useAccount();
    const isLoaded = useHydrated()
    const hash = usePackState(state => state.hash)

    const addresses = usePackdAddresses();
    const setMintedTokenId = usePackState(state => state.setMintedTokenId);
    const mintedTokenId = usePackState(state => state.mintedTokenId);
    const nextStep = usePackState(state => state.nextStep)

    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransaction({hash});

    useEffect(() => {
        if (receipt?.status === "success") {
            const logs = receipt.logs.filter(
                (log) =>
                    log.address.toLowerCase() === addresses.PackMain.toLowerCase()
            );
            logs.forEach((log) => {
                try {
                    const decodedLog = decodeEventLog({
                        abi: packMainABI,
                        data: log.data,
                        topics: log.topics,
                    });
                    if (decodedLog.eventName === "PackCreated") {
                        setMintedTokenId((decodedLog.args as any).tokenId);
                    }
                } catch (e) {
                    //ignore error
                }
            });
        }
    }, [addresses.PackMain, receipt, setMintedTokenId]);

    //
    // useEffect(() => {
    //     if (step === 4) {
    //         setTimeout(() => {
    //             setStep(5)
    //         }, 3000)
    //     }
    // }, [step]);

    if (isConnecting && !isLoaded) {
        return <LoadingCard
            title="Connecting"
            text='Waiting for network...'/>
    }
    if (!isConnecting && !isConnected) {
        return <Card
            className={'mx-auto w-full'}
            containerClassName=' overflow-y-auto'
            controls={<div className="text-center"> Connect to a network</div>}>
            <div className="flex flex-col items-center pb-4">
                <div className="p-2 rounded-full bg-gray-800">
                    <Present className={'h-6 w-6'}/>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl mb-10">Create new Pack</h1>
                <ConnectButton/>
            </div>
        </Card>
    }

    if (isLoading && hash) return (
        <LoadingCard
            title="Your pack is being created..."
            text='Waiting for Comfirmation...'
            transactionHash="askkhn"/>

    )
    if (mintedTokenId !== undefined) return (
        <PackCreatedCard/>
    )
    return (
        <Card
            className={'mx-auto w-full'}
            containerClassName=' overflow-y-auto'
            controls={controls ?? <div>hello </div>}>
            <div className="flex flex-col items-center gap-2">
                <div className="p-2 rounded-full bg-gray-800">
                    <Present className={'h-6 w-6'}/>
                </div>
                <h1 className="text-lg sm:text-xl md:text-2xl">Create new Pack</h1>
                <CurrentChain className='my-4'/>
                {step === 0 && <AssetsForm/>}
                {step === 1 && <ApproveForm/>}
                {step === 2 && <SignForm/>}
                {step === 3 && <ReviewForm/>}
            </div>
        </Card>
    );
};

export default MintPage;
