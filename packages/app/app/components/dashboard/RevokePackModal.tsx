import {useCallback, useEffect, useState} from 'react'
import {Card} from "@/app/components/Card";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import {BsArrowLeft, BsArrowRight, BsX} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import Button from "@/app/components/button/Button";
import {IoIosCheckmark} from "react-icons/io";
import {usePackMainRevoke, usePreparePackMainRevoke} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useWaitForTransaction} from "wagmi";
import {ErrorCard} from "@/app/components/content/ErrorCard";

type RevokePackModalProps = {
    tokenId: bigint,
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void
}
export default function RevokePackModal({isOpen, setIsOpen, tokenId}: RevokePackModalProps ) {
    const [step, setStep] = useState(0)
    const addresses = usePackdAddresses();
    const {
        config: config,
        error: prepareError,
        isError: isPrepareError,
    } = usePreparePackMainRevoke({address: addresses.PackMain, args: [tokenId, []],})
    const { write, data, error, isLoading, isError } = usePackMainRevoke(config);

    const {
        data: receipt,
        isLoading: isPending,
        isSuccess: isSuccess,
    } = useWaitForTransaction({ hash: data?.hash });


    const revokePack = useCallback(() => {
        write && write();
    }, [write]);
    useEffect(() => {
        if (isPending) {
            setStep(1);
        }
    }, [isPending]);
    useEffect(() => {
        if (isSuccess) {
            setStep(2);
        }
    }, [isSuccess]);

    const card = useCallback((closeModal: () => void) => {
        if (isError) {
            return <ErrorCard onCloseClick={closeModal}></ErrorCard>
        }
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
                    <div>
                        details...
                    </div>
                    {/*<ReviewForm hideTitle={true}/>*/}

                </div>
            </Card>
        }
        if (step === 1) {
            return <LoadingCard
                title={'Revoking your Pack'}
                text={'Waiting for confirmation...'}
                transactionHash={data?.hash}/>
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
    }, [revokePack, step, isError, data?.hash]);

    return (
        <Modal render={closeModal => card(closeModal)} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
