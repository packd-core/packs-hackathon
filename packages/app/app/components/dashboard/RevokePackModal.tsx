import {Dialog, Transition} from '@headlessui/react'
import {Fragment, useCallback, useMemo, useState} from 'react'
import {Card} from "@/app/components/Card";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import Present from "~/present.svg";
import {BsArrowLeft, BsArrowRight, BsX} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import Button from "@/app/components/button/Button";
import {ExternalLink} from "@/app/components/links/ExternalLink";
import {IoIosCheckmark} from "react-icons/io";

export default function RevokePackModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const [step, setStep] = useState(0)
    const revokePack = useCallback(() => {
        setStep(1);
        setTimeout(() => {
            setStep(2)
        }, 3000);
    }, []);

    const card = useCallback((closeModal: () => void) => {
        if (step === 0) {
            return <Card
                controls={<div className={'flex justify-between'}>
                    <Button
                        variant="navigation"
                        leftIcon={<BsArrowLeft/>}
                        onClick={closeModal}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="navigation"
                        rightIcon={<BsArrowRight/>}
                        onClick={revokePack}
                    >
                        Revoke Pack
                    </Button>
                </div>}>
                <div className="flex flex-col gap-2">
                    <div className="p-1 rounded-full bg-gray-800 self-center">
                        <BsX className={'h-10 w-10 text-primary-500'}/>
                    </div>
                    <div className='text-center pb-8'>
                        <h2 className="text-2xl font-bold ">Revoke Pack</h2>
                    </div>
                    <ReviewForm hideTitle={true}/>

                </div>
            </Card>
        }
        if (step === 1) {
            return <LoadingCard
                title={'Revoking your Pack'}
                text={'Waiting for confirmation...'}
                transactionHash={'sadasd'}/>
        }
        return <Card
            className={'mx-auto w-full bg-green-800'}
            controls={
                <div className='w-full flex justify-between py-1 px-2 items-center'>
                    <div>Revoked!</div>
                    <Button
                        variant="navigation"
                        rightIcon={<BsX/>}
                        onClick={closeModal}
                    >
                        Close
                    </Button>
                </div>
            }>
            <div className="flex flex-col gap-2 items-center">

                <div className="p-1 rounded-full bg-gray-800  relative">
                    <BsX className={'h-10 w-10 text-primary-500'}/>
                    <IoIosCheckmark
                        className='bg-green-800 w-5 h-5 rounded-full absolute bottom-0 right-0 translate-x-1/4'/>
                </div>
                <h1 className="text-xl">Pack Revoked!</h1>

                <p className="text-sm mt-10">The contents of the pack are back in your wallet!</p>
            </div>
        </Card>
    }, [revokePack, step]);

    return (
        <Modal render={closeModal => card(closeModal)} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
