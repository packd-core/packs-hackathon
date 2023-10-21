import {HelpItem} from "@/app/components/content/HelpItem";
import {usePackState} from "@/app/mint/usePackState";
import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {useClaimKeys} from "@/src/hooks/useClaimKeys";
import {useBalanceOf} from "@/src/hooks/useBalanceOf";
import {useAccount} from "wagmi";
import {useMintStore} from "@/src/stores/useMintStore";

export const SignForm = () => {
    const nextStep = usePackState(state => state.nextStep)
    const previousStep = usePackState(state => state.previousStep)
    const setControls = usePackState(state => state.setControls)
    const setClaimKey = useMintStore(state => state.setClaimKey)
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
            setClaimKey({private: claimPrivateKey, public: claimPublicKey})
            nextStep()
        }
    }, [claimPrivateKey, claimPublicKey, isSignSuccess, nextStep, setClaimKey]);

    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                onClick={previousStep}
                variant="navigation"
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
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
                <p className='text-sm text-gray-500'>Sign the Message to generate a claim key.</p>
            </div>
            <HelpItem title={'What am I signing?'}>
                The signature is used as a seed for creating a new claim key. The signature content is determined by the
                pack information, so you can reconstruct a claim key in the future again.
            </HelpItem>
        </div>);
}
