"use client"
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {useAccount} from "wagmi";
import {useHydrated} from "@/src/hooks/useHydrated";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {Card} from "@/app/components/Card";
import SenderToUser from '~/claimprogress.svg'
import Button from "@/app/components/button/Button";
import {BsArrowRight} from "react-icons/bs";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import InitialForm from "@/app/claim/[key]/steps/InitialForm";
import ConnectWalletForm from "@/app/claim/[key]/steps/ConnectWalletForm";
import {SignForm} from "@/app/claim/[key]/steps/SignForm";
import ReviewClaimForm from "@/app/claim/[key]/steps/ReviewClaimForm";
import {PackClaimedCard} from "@/app/claim/[key]/steps/PackClaimedCard";


export default function ClaimPage({params: { key }}: any) {
    const {isConnected, isConnecting, address} = useAccount();
    const isLoaded = useHydrated()

    const step = useClaimState(state => state.step);
    const controls = useClaimState(state => state.controls);

    if (isConnecting && !isLoaded) {
        return <LoadingCard
            title="Connecting"
            text='Waiting for network...'/>
    }
    if (step === 4){
        return <PackClaimedCard/>
    }
    return <Card
        className={'mx-auto w-full'}
        containerClassName=' overflow-y-auto'
        controls={ controls}>
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-gray-800 flex justify-center items-center">
                <SenderToUser className='w-20 h-10'/>
            </div>
            <h1 className="text-lg sm:text-xl md:text-2xl">XYZ sent you a pack</h1>
            <CurrentChain className='my-4'/>
            {step === 0 && <InitialForm/>}
            {step === 1 && <ConnectWalletForm/>}
            {step === 2 && <SignForm/>}
            {step === 3 && <ReviewClaimForm/>}



        </div>
    </Card>
}
