import {Address, useAccount, useBalance, useToken} from "wagmi";
import {useCallback, useState} from "react";
import Modal from "@/app/components/dialog/Modal";
import {Card} from "@/app/components/Card";
import Button from "@/app/components/button/Button";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {ContentCard} from "@/app/components/content/ContentCard";
import {isAddress} from "viem";
import clsxm from "@/src/lib/clsxm";
import {parseEther, parseUnits} from "ethers";

export default function AddTokenModal({isOpen, setIsOpen, onAdd}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, onAdd: (address: Address, amount: bigint) => void }) {
    const [tokenAddress, setTokenAddress] = useState<Address>();
    const [amount, setAmount] = useState<bigint>()
    const {address} = useAccount();
    const {isLoading, data} = useBalance({address, token: tokenAddress, enabled: !!tokenAddress});
    const {data: tokenData} = useToken({address: tokenAddress})
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
                        <span className='text-card-title'>Token address</span>
                        {tokenAddress && <span className='text-card-title'>Available: {data?.formatted}</span>}
                    </div>
                    <div className="relative">
                        {tokenData && <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2">
                            {tokenData?.symbol}
                        </div>}
                        <input className='text-right w-full pl-12 text-xs py-2' onChange={(e) => {
                            const value = e.target.value;
                            if (isAddress(value)) {
                                setTokenAddress(value as Address);
                            } else {
                                setTokenAddress(undefined)
                            }
                        }}/>
                    </div>

                    <span className='text-card-title'>Amount</span>
                    <input className={clsxm('text-right', !isValidAmount && 'text-red-500')}
                           disabled={!tokenData}
                           onChange={(e) => {
                               const value = e.target.value;
                               if (!isNaN(Number(value))) {
                                   const val = parseUnits(value == '' ? '0' : value as `${number}`, tokenData?.decimals ?? 18);
                                   setAmount(val);
                               } else {
                                   setAmount(BigInt(-1));
                               }
                           }}/>
                </ContentCard>

            </div>
        </Card>} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
