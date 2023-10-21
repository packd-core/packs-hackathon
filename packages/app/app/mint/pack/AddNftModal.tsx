import {Address, useAccount} from "wagmi";
import {useCallback, useMemo, useState} from "react";
import Modal from "@/app/components/dialog/Modal";
import {Card} from "@/app/components/Card";
import Button from "@/app/components/button/Button";
import {BsArrowLeft, BsArrowRight} from "react-icons/bs";
import {ContentCard} from "@/app/components/content/ContentCard";
import {isAddress} from "viem";
import clsxm from "@/src/lib/clsxm";
import {useErc721Name, useErc721OwnerOf} from "@/app/abi/generated";


export default function AddNftModal({isOpen, setIsOpen, onAdd}: { isOpen: boolean, setIsOpen: (isOpen: boolean) => void, onAdd: (address: Address, tokenId: bigint) => void }) {
    const [nftAddress, setNftAddress] = useState<Address>();
    const [tokenId, setTokenId] = useState<bigint>()
    const {address} = useAccount();
    const {data: nftOwner, isLoading: isOwnerLoading} = useErc721OwnerOf({
        address: nftAddress,
        args: [tokenId ?? BigInt(-1)]
    })

    const hasToken = useMemo(() => address == nftOwner, [address, nftOwner]);
    const {data: tokenName} = useErc721Name({address: nftAddress});


    const add = useCallback(() => {
        if (!nftAddress || (tokenId ?? -1) < 0 || !hasToken) return;
        setIsOpen(false);
        onAdd(nftAddress, tokenId!);
    }, [setIsOpen, onAdd, nftAddress, tokenId, hasToken]);
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
                        <span className='text-card-title'>NFT address</span>
                        {/*{nftAddress && <span className='text-card-title'>Available: {hasToken ? 'yes' : 'no'}</span>}*/}
                    </div>
                    <div className="relative">
                        {tokenName &&
                            <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 text-xs font-bold">
                                {tokenName}
                            </div>}
                        <input className='text-right w-full pl-12 text-xs py-2' onChange={(e) => {
                            const value = e.target.value;
                            if (isAddress(value)) {
                                setNftAddress(value as Address);
                            } else {
                                setNftAddress(undefined)
                            }
                        }}/>
                    </div>
                    <div className="flex justify-between">

                        <span className='text-card-title'>TokenID</span>
                        {!isOwnerLoading && <span
                            className={clsxm(!hasToken && 'text-red-500', 'text-xs font-semibold')}>Available: {hasToken ? 'yes' : 'You don\'t own this token'}</span>}
                    </div>
                    <input className={clsxm('text-right', ((tokenId ?? -1) < 0 || !hasToken) && 'text-red-500')}
                           onChange={(e) => {
                               const value = e.target.value;
                               if (!isNaN(Number(value))) {
                                   setTokenId(BigInt(value));
                               } else {
                                   setTokenId(BigInt(-1));
                               }
                           }}/>
                </ContentCard>

            </div>
        </Card>} isOpen={isOpen} setIsOpen={setIsOpen}/>
    )
}
