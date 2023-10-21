import {HelpItem} from "@/app/components/content/HelpItem";
import {usePackState} from "@/app/mint/usePackState";
import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {useClaimKeys} from "@/src/hooks/useClaimKeys";
import {useBalanceOf} from "@/src/hooks/useBalanceOf";
import {useAccount} from "wagmi";
import {useMintStore} from "@/src/stores/useMintStore";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import StepperIndicator from "@/app/claim/[key]/steps/components/StepperIndicator";

export const SignForm = () => {
    const nextStep = useClaimState(state => state.nextStep)
    const previousStep = useClaimState(state => state.previousStep)
    const setControls = useClaimState(state => state.setControls)
    // const setClaimKey = useClaimState(state => state.setClaimKey)
    const {address} = useAccount();
    const {
        balance: balanceOf,
        // isLoading: isBalanceOfLoading,
        // isError: isBalanceOfError,
    } = useBalanceOf(address!);
    const {
        claimPublicKey,
        claimPrivateKey,
        handlePrepareAndSignMessage,
        isSignLoading,
        isSignSuccess,
    } = useClaimKeys(balanceOf);

    useEffect(() => {
        if (isSignSuccess && claimPrivateKey && claimPublicKey) {
            // setClaimKey({private: claimPrivateKey, public: claimPublicKey})
            nextStep()
        }
    }, [claimPrivateKey, claimPublicKey, isSignSuccess, nextStep]);

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
