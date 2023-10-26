import {Address, useAccount, useBalance, useToken} from "wagmi";
import {useCallback, useState} from "react";
import Modal from "@/app/components/dialog/Modal";
import {Card} from "@/app/components/Card";
import Button from "@/app/components/button/Button";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {ContentCard} from "@/app/components/content/ContentCard";
import TokenInput from "@/app/components/web3/TokenSelectorDialog";

export default function AddTokenModal({isOpen, setIsOpen, onAdd}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, onAdd: (address: Address, amount: bigint) => void }) {
    const [tokenAddress, setTokenAddress] = useState<Address>();
    const [amount, setAmount] = useState<bigint>()
    const {address} = useAccount();
    const {isLoading, data} = useBalance({address, token: tokenAddress, enabled: !!tokenAddress});
    const isValidAmount = amount && amount > 0 && (amount < (data?.value ?? BigInt(0)));
    const add = useCallback(() => {
        if (!tokenAddress || !isValidAmount) return;
        setIsOpen(false);
        onAdd(tokenAddress, amount);
    }, [setIsOpen, onAdd, tokenAddress, amount, isValidAmount]);
    return (
        <Modal render={closeModal => <Card
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
                    onClick={add}
                >
                    Add
                </Button>
            </div>}>
            <div className="flex flex-col gap-2">
                <ContentCard className='self-stretch'>
                    <div className="flex justify-between">
                        <span className='text-card-title'>Token</span>
                        {tokenAddress && <span className='text-card-title'>Available: {data?.formatted}</span>}
                    </div>

                        <TokenInput
                        onTokenSelected={setTokenAddress}
                        token={tokenAddress}
                        onValueChanged={setAmount}
                        value={amount}
                        autoOpenModal={true}
                        />



                </ContentCard>

            </div>
        </Card>} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
