"use client"
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {Address, useAccount, useWaitForTransaction} from "wagmi";
import {useHydrated} from "@/src/hooks/useHydrated";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {Card} from "@/app/components/Card";
import SenderToUser from '~/claimprogress.svg'
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import InitialForm from "@/app/claim/[key]/steps/InitialForm";
import ConnectWalletForm from "@/app/claim/[key]/steps/ConnectWalletForm";
import {SignForm} from "@/app/claim/[key]/steps/SignForm";
import ReviewClaimForm from "@/app/claim/[key]/steps/ReviewClaimForm";
import {PackClaimedCard} from "@/app/claim/[key]/steps/PackClaimedCard";
import {useDecodeUrl} from "@/src/hooks/useUrlEncodeDecode";
import {useEffect} from "react";
import useEnsOrFormattedAddress from "@/src/hooks/useEnsOrAddress";


export default function ClaimPage({params: { key }}: any) {
    const {isConnected, isConnecting, address} = useAccount();
    const {tokenId,version,chainId,privateKey} = useDecodeUrl(key);
    const setMintedTokenId = useClaimState(state => state.setMintedTokenId);
    const mintedTokenId = useClaimState(state => state.mintedTokenId);
    const resetStepper = useClaimState(state => state.reset);
    const setPrivateKey = useClaimState(state => state.setPrivateKey);
    useEffect(() => {
        resetStepper();
        setMintedTokenId(BigInt(tokenId))
        setPrivateKey(privateKey)
        // TODO: Set and validate chain Id
    }, [privateKey, resetStepper, setMintedTokenId, setPrivateKey, tokenId]);

    const isLoaded = useHydrated()

    const step = useClaimState(state => state.step);

    const hash = useClaimState(state => state.hash)

    const owner = useClaimState(state => state.owner)

    const isSendingToRelayer = useClaimState(state => state.sendingToRelayer)

    const {
        data: receipt,
        isLoading,
        isSuccess,
    } = useWaitForTransaction({hash});
    useEffect(() => {
        if (isSuccess) {
            useClaimState.getState().nextStep();
        }
    }, [isSuccess]);

    const ownerName = useEnsOrFormattedAddress(owner as Address);

    if (isConnecting || !isLoaded || mintedTokenId == undefined) {
        return <LoadingCard
            title="Connecting"
            text='Waiting for network...'/>
    }
    if (isLoading && hash) return (
        <LoadingCard
            title="Your pack is on the way..."
            text='Waiting for Comfirmation...'
            transactionHash={hash}/>

    )
    if (step === 4){
        return <PackClaimedCard/>
    }
    if (isSendingToRelayer) {
        return <LoadingCard
            title={'Your pack is on the way'}
            text="Sending to Relayer"/>
    }
    return <Card
        className={'mx-auto w-full'}
        containerClassName=' overflow-y-auto'
        controls={ <Controls/>}>
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-gray-800 flex justify-center items-center">
                <SenderToUser className='w-20 h-10'/>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl"><span className="text-red-500">{ownerName}</span> sent you a pack</h1>
            <CurrentChain className='my-4'/>
            {step === 0 && <InitialForm/>}
            {step === 1 && <ConnectWalletForm/>}
            {step === 2 && <SignForm/>}
            {step === 3 && <ReviewClaimForm/>}



        </div>
    </Card>
}


function Controls() {
    return useClaimState(state => state.controls);
}
