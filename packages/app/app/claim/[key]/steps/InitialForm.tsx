import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowRight} from "react-icons/fi";
import {useClaimState} from "@/app/claim/[key]/useClaimState";
import {usePackDataByTokenId} from "@/src/hooks/usePackDataByTokenId";
import {ReviewData} from "@/app/mint/pack/ReviewForm";

export default function InitialForm() {
    const nextStep = useClaimState(state => state.nextStep)
    const previousStep = useClaimState(state => state.previousStep)
    const setControls = useClaimState(state => state.setControls)
    const tokenId = useClaimState(state => state.mintedTokenId);
    const {packData,rawEth, isLoading} = usePackDataByTokenId(tokenId!);
    const setMaxRefundValue = useClaimState(state => state.setMaxRefundValue);
    useEffect(() => {
        setMaxRefundValue(rawEth?.value ?? BigInt(0))
    }, [rawEth,setMaxRefundValue]);
    useEffect(() => {
        setControls(<div className='w-full flex justify-end py-1'>
                <Button
                    onClick={nextStep}
                    variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                    Claim
                </Button>
        </div>)
    }, [nextStep, setControls, previousStep]);
    return  <div className="flex flex-col w-full gap-2">
        <div>
            {<ReviewData eth={rawEth?.value ?? BigInt(0)}
                                       modules={packData?.fullModuleData ?? []}/>}
        </div>
    </div>
}
