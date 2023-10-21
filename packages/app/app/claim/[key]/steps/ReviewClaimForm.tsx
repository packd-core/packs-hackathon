import {HelpItem} from "@/app/components/content/HelpItem";
import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import clsxm from "@/src/lib/clsxm";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import {useConnectModal} from "@rainbow-me/rainbowkit";
import {useAccount, useEnsAvatar, useNetwork} from "wagmi";
import StepperIndicator from "@/app/claim/[key]/steps/components/StepperIndicator";
import Arrow from '~/arrow.svg'
import formatAddress from "@/src/lib/addressFormatter";


export default function ReviewClaimForm() {
    const nextStep = useClaimState(state => state.nextStep)
    const previousStep = useClaimState(state => state.previousStep)
    const setControls = useClaimState(state => state.setControls)
    const {openConnectModal} = useConnectModal()
    const {address} = useAccount()
    const {chain} = useNetwork()

    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1 items-center'>
            <StepperIndicator step={2}/>

            <Button
                onClick={nextStep}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                Confirm Claim
            </Button>

        </div>)
    }, [nextStep, setControls, previousStep, address, openConnectModal]);
    return <div className="flex flex-col w-full gap-2 items-center">
        <div className='flex p-2 rounded-full bg-gray-800 items-center w-full justify-around gap-4'>
            <div className="p-2 text-sm">
                <div className='text-gray-400'>From</div>
                {formatAddress(address)}
            </div>
            <Arrow className="h-12 w-8"/>
            <div className="p-2 text-sm">
                <div className="text-right text-gray-400">To</div>
                {formatAddress(address)}
            </div>
        </div>
        <div className='h-40'>
            details...
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
