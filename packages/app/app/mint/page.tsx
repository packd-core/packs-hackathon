'use client'
import {Card} from "@/app/components/Card";
import {Wrapper} from "@/app/components/Wrapper";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";
import Present from "~/present.svg";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {useState} from "react";
import {ApproveForm} from "@/app/mint/pack/ApproveForm";

const MintPage = () => {
    const [step, setStep] = useState(0)

    return (
        <main>
            <Wrapper className='min-h-screen flex items-center'>
                <Card
                    className={'mx-auto w-full'}
                    containerClassName='max-h-[60vh] overflow-y-auto'
                    controls={
                        <div className='w-full flex justify-between py-1'>
                            <Button
                                onClick={() => setStep(step - 1)}
                                variant="navigation" disabled={step == 0}
                                    leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                                Back
                            </Button>
                            <Button
                                onClick={() => setStep(step + 1)}
                                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                                Next
                            </Button>
                        </div>
                    }>
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-2 rounded-full bg-gray-800">
                            <Present className={'h-6 w-6'}/>
                        </div>
                        <h1 className="text-lg">Create new Pack</h1>
                        <CurrentChain className='my-4'/>
                        {step === 0 && <AssetsForm/>}
                        {step === 1 && <ApproveForm/>}
                    </div>
                </Card>
            </Wrapper>
        </main>
    );
};

export default MintPage;
