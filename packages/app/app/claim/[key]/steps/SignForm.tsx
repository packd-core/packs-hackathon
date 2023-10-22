import {HelpItem} from "@/app/components/content/HelpItem";
import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import { FiArrowRight} from "react-icons/fi";
import {useAccount} from "wagmi";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import StepperIndicator from "@/app/claim/[key]/steps/components/StepperIndicator";
import {usePrepareAndSignMessage} from "@/src/hooks/usePrepareAndSignMessage";

export const SignForm = () => {
    const nextStep = useClaimState(state => state.nextStep)
    const previousStep = useClaimState(state => state.previousStep)
    const setControls = useClaimState(state => state.setControls)
    const maxRefundValue = useClaimState(state => state.maxRefundValue);
    const tokenId = useClaimState(state => state.mintedTokenId);
    const setSignedMessage = useClaimState(state => state.setSignedMessage);
    const {address} = useAccount();
    const {
        signData,
        isLoading: isSignLoading,
        isSuccess: isSignSuccess,
        handlePrepareAndSignMessage,
    } = usePrepareAndSignMessage(Number(tokenId), maxRefundValue);

    useEffect(() => {
        if (isSignSuccess && signData) {
            setSignedMessage(signData)
            nextStep()
        }
    }, [signData, isSignSuccess, nextStep, setSignedMessage]);

    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1 items-center'>
            <StepperIndicator step={1}/>
            <Button
                onClick={handlePrepareAndSignMessage}
                isLoading={isSignLoading}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                {'Sign Message'}
            </Button>
        </div>)
    }, [nextStep, setControls, previousStep, handlePrepareAndSignMessage, isSignLoading]);
    return (
        <div className="flex flex-col w-full gap-2">
            <div className='text-center pb-8'>
                <h2 className="text-2xl font-bold ">Sign Message</h2>
                <p className='text-sm text-gray-500 mt-4'>Sign a message to verify ownership of the address you like to claim with</p>
            </div>
            <HelpItem title={'What am I signing?'}>
                For claiming your ownership of the address has to be verified with some claim information that protects your pack.
            </HelpItem>
        </div>);
}
