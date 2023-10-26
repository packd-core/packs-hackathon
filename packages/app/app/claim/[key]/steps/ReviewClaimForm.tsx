import {useCallback, useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowRight} from "react-icons/fi";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {Address, useAccount, useNetwork} from "wagmi";
import StepperIndicator from "@/app/claim/[key]/steps/components/StepperIndicator";
import Arrow from '~/arrow.svg'
import formatAddress from "@/src/lib/addressFormatter";
import {usePackDataByTokenId} from "@/src/hooks/usePackDataByTokenId";
import {ReviewData} from "@/app/mint/pack/ReviewForm";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {useClaim} from "@/src/hooks/useClaim";
import {useGenerateClaimData} from "@/src/hooks/useGenerateClaimData";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {RelayerRequest} from '@/pages/api/claim';
import useEnsOrFormattedAddress from "@/src/hooks/useEnsOrAddress";

// @ts-ignore
BigInt.prototype.toJSON = function() { return this.toString() }
export default function ReviewClaimForm() {
    const nextStep = useClaimState(state => state.nextStep)
    const previousStep = useClaimState(state => state.previousStep)
    const setControls = useClaimState(state => state.setControls)
    const owner = useClaimState(state => state.owner)
    const addresses = usePackdAddresses();
    const {openConnectModal} = useConnectModal()
    const {address} = useAccount()
    const {chain} = useNetwork()
    const tokenId = useClaimState(state => state.mintedTokenId);
    const {packData,rawEth, isLoading: isTokenDataLoading} = usePackDataByTokenId(tokenId!);
    const setLoading = useClaimState(state => state.setLoading);

    const maxRefundValue = useClaimState(state => state.maxRefundValue);
    const signedData = useClaimState(state => state.signedMessage);
    const privateKey = useClaimState(state => state.privateKey);
    const  claimData  = useGenerateClaimData(
        address!,
        maxRefundValue,
        signedData!,
        tokenId!,
        privateKey!
    );

    const {
        write,
        data,
        isLoading,
    } = useClaim(claimData, isTokenDataLoading? undefined : (packData?.moduleData??[]));

    const writeToRelayer = useCallback(async () => {
        const body = {
            mainContractAddress: addresses.PackMain,
            args: claimData
        }
        const res = await fetch('/api/claim', {body: JSON.stringify(body), method: 'POST'});
        if (res.ok){
            const data = await res.json();
            setLoading(data.hash);
        }
    }, [addresses.PackMain, claimData, setLoading]);

    useEffect(() => {
        if (data?.hash) {
            setLoading(data!.hash)
        }
        },[data, data?.hash, setLoading]
    )


    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1 items-center'>
            <StepperIndicator step={2}/>

            <Button
                isLoading={isLoading}
                onClick={() => writeToRelayer()}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                Confirm Claim
            </Button>

        </div>)
    }, [writeToRelayer, nextStep, setControls, previousStep, address, openConnectModal, isLoading]);

    const ownerName = useEnsOrFormattedAddress(owner as Address);
    const claimerName = useEnsOrFormattedAddress(address);
    return <div className="flex flex-col w-full gap-2 items-stretch">
        <div className='flex p-2 rounded-full bg-gray-800 items-center justify-around gap-4'>
            <div className="p-2 text-sm">
                <div className='text-gray-400'>From</div>
                {ownerName}
            </div>
            <Arrow className="h-12 w-8"/>
            <div className="p-2 text-sm">
                <div className="text-right text-gray-400">To</div>
                {claimerName}
            </div>
        </div>
        <ContentTitle>Contents</ContentTitle>

        <div className="flex flex-col gap-2">
            {<ReviewData eth={rawEth ?? BigInt(0)}
                         modules={packData?.fullModuleData ?? []}/>}
        </div>
        <table className="font-semibold mt-4">
            <tbody>
            <tr>
                <td className='text-gray-500'>Chain</td>
                <td className='text-right'>{chain?.name}</td>
            </tr>
            <tr>
                <td className='text-gray-500'>Gas fees</td>
                <td className='text-right'>$1.00</td>
            </tr>
            </tbody>
        </table>

    </div>

}
