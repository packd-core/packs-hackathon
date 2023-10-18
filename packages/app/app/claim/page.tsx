'use client'
import {Card} from "@/app/components/Card";
import {Wrapper} from "@/app/components/Wrapper";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";
import Prog from "~/prog.svg";
import Prog2 from "~/progress2.svg";
import Prog3 from "~/prog2.svg";
import ClaimProgress from "~/claimprogress.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {AssetsForm} from "@/app/claim/pack/AssetsForm";
import {useCallback, useState} from "react";
import {ContinueClaim} from "@/app/claim/pack/ContinueClaim";
import {SignForm} from "@/app/claim/pack/SignForm";
import {SignIt} from "@/app/claim/pack/SignIt";
import {ConfirmClaim} from "@/app/claim/pack/ConfirmClaim";


const ClaimPage = () => {
    const [step, setStep] = useState(0)
    const signMessage = useCallback(() => {}, []);
    const next = useCallback(() => {
        if (step === 4) {
            signMessage()
            return;
        }
        setStep(step + 1)
    }, [step, signMessage]);
    const back = useCallback(() => {
        setStep(step - 1)
    }, [step]);
    return (
        <main>
            <Wrapper className='min-h-screen flex items-center'>
                <Card
                    className={'mx-auto w-full'}
                    containerClassName='max-h-[60vh] overflow-y-auto'
                    controls={
                        <div className='w-full flex justify-between py-1'>
                            {/* <Button
                                onClick={back}
                                variant="navigation" disabled>
                            {step === 2 ? '2' : ''} */}
                            <div className="flex justify-center items-center gap-2 p-[16px]">
                                {step === 1 || step === 2 ? '1/3' : ''}
                                {step === 3 ? '2/3' : ''}
                                {step === 4 ? '3/3' : ''}
                                <Prog className={'w-10'} hidden={step === 0 || step === 3 || step === 4}/>
                                <Prog2 className={'w-10'} hidden={step !== 3}/>
                                <Prog3 className={'w-10'} hidden={step !== 4}/>

                            </div>
                            {/* </Button> */}
                            <Button
                                onClick={next}
                                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                                {step === 0 ? 'Claim' : ''}
                                {step === 1 ? 'Connect Wallet' : ''}
                                {step === 2 ? 'Continue Claiming' : ''}
                                {step === 3 ? 'Sign Message' : ''}
                                {step === 4 ? 'Confirm Claim' : ''}

                            </Button>
                        </div>
                    }>
                    <div className="flex flex-col items-center gap-2">
                        <div hidden={step === 4} className="p-2 rounded-full bg-gray-800">
                            <ClaimProgress  className={'h-8'}/>
                        </div>
                        <h1 className="text-lg" hidden={step === 4}>ox123...828c sent you a pack</h1>
                        <div hidden={step === 4}>
                            <CurrentChain className='my-4'/>
                        </div>
                        {step === 0 && <AssetsForm/>}
                        {step === 1 && <SignForm/>}
                        {step === 2 && <ContinueClaim/>}
                        {step === 3 && <SignIt/>}
                        {step === 4 && <ConfirmClaim/>}
                    </div>
                </Card>
            </Wrapper>
        </main>
    );
};

export default ClaimPage;
