import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {Card} from "@/app/components/Card";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import Present from "~/present.svg";
import {BsArrowLeft, BsX} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import Button from "@/app/components/button/Button";

export default function RevokePackModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    return (
        <Modal render={closeModal => <Card
            controls={<Button
                variant="navigation"
                leftIcon={<BsArrowLeft/>}
                onClick={closeModal}
            >
                Cancel
            </Button>}>
            <div className="flex flex-col gap-2">
                <div className="p-1 rounded-full bg-gray-800 self-center">
                    <BsX className={'h-10 w-10 text-primary-500'}/>
                </div>
                <div className='text-center pb-8'>
                    <h2 className="text-2xl font-bold ">Revoke Pack</h2>
                </div>
                <ReviewForm hideTitle={true}/>

            </div>
        </Card>} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
