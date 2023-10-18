import {Dialog, Transition} from '@headlessui/react'
import {Fragment} from 'react'
import {Card} from "@/app/components/Card";
import {LoadingCard} from "@/app/components/content/LoadingCard";
import {AssetsForm} from "@/app/mint/pack/AssetsForm";
import {ReviewForm} from "@/app/mint/pack/ReviewForm";
import Present from "~/present.svg";
import {BsArrowLeft, BsBack, BsLink45Deg, BsX} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import {HelpItem} from "@/app/components/content/HelpItem";
import Button from "@/app/components/button/Button";

export default function ClaimLinkModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

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
                    <BsLink45Deg className={'h-10 w-10 text-primary-500'}/>
                </div>
                <div className='text-center pb-8'>
                    <h2 className="text-2xl font-bold ">Claim link</h2>
                </div>
                <p>Sign a message to regenerate the claim link.
                    This is gas-less! No transactions will be send.</p>
                <HelpItem title={'What am I signing?'}>
                    The signature is used as a seed for creating a new claim key. The signature content is determined by the pack information, so you can reconstruct a claim key in the future again.
                </HelpItem>

            </div>
        </Card>} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
