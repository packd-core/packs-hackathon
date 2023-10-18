import {useCallback, useState} from 'react'
import {Card} from "@/app/components/Card";
import {BsArrowLeft, BsArrowRight, BsLink45Deg} from "react-icons/bs";
import Modal from "@/app/components/dialog/Modal";
import {HelpItem} from "@/app/components/content/HelpItem";
import Button from "@/app/components/button/Button";
import {PackCreatedCard} from "@/app/mint/pack/PackCreatedCard";

export default function ClaimLinkModal({isOpen, setIsOpen}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {
    const [step, setStep] = useState(0);
    const generateClaimLink = useCallback(() => {
        setStep(1)
    }, []);

     const card = useCallback((closeModal: () => void) => {
      if (step === 0) {
          return <Card
              controls={<div className="flex justify-between items-center">
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
                      onClick={generateClaimLink}
                  >
                      Revoke Pack
                  </Button>
              </div>
              }>
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
          </Card>
      }
      return <PackCreatedCard/>
     }, [generateClaimLink, step]);
    return (
        <Modal render={closeModal => card(closeModal)} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
