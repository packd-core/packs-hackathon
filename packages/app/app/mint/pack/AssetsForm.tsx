import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {Address, useAccount, useBalance, useToken} from "wagmi";
import {useCallback, useEffect, useMemo, useState} from "react";
import {parseEther} from "ethers";
import clsxm from "@/src/lib/clsxm";
import {useMintStore, Module} from "@/src/stores/useMintStore";
import {useUrlEncodeDecode} from "@/src/hooks/useUrlEncodeDecode";
import {useMintPackWrite} from "@/src/hooks/useMintPackWrite";
import {useClaimKeys} from "@/src/hooks/useClaimKeys";
import {useBalanceOf} from "@/src/hooks/useBalanceOf";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import AddTokenModal from "@/app/mint/pack/AddTokenModal";
import AddNftModal from "@/app/mint/pack/AddNftModal";
import Erc721Card from "@/app/mint/modules/Erc721Module";
import Erc20Card from "@/app/mint/modules/Erc20Module";
import {usePackState} from "@/app/mint/usePackState";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";


export const AssetsForm = () => {
    const {address} = useAccount();
    const addresses = usePackdAddresses();
    const {data: ethBalance, fetchStatus} = useBalance({address});
    const ethAmount = useMintStore(state => state.eth)
    const mintStore = useMintStore();
    const isEthAmountValid = useMemo(() => ethAmount > 0 && ethAmount < (ethBalance?.value ?? BigInt(0)),[ethAmount,ethBalance])
    const [isAddTokenModalOpen, setIsAddTokenModalOpen] = useState(false);
    const [isAddNftModalOpen, setIsAddNftModalOpen] = useState(false);
    const nextStep = usePackState(state => state.nextStep)
    const setControls = usePackState(state => state.setControls)
    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                variant="navigation" disabled={true}
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
            <Button
                onClick={nextStep}
                disabled={!isEthAmountValid}
                className={clsxm(!isEthAmountValid && 'text-red-600')}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                {'Next'}
            </Button>
        </div>)
    }, [nextStep,setControls, isEthAmountValid]);

    return (
        <>
            {isAddTokenModalOpen && <AddTokenModal
                isOpen={isAddTokenModalOpen}
                setIsOpen={setIsAddTokenModalOpen}
                onAdd={(address, amount) => {
                    mintStore.addModule({address, value: amount, moduleAddress: addresses.ERC20Module})
                }}/>}
            {isAddNftModalOpen && <AddNftModal
                isOpen={isAddNftModalOpen}
                setIsOpen={setIsAddNftModalOpen}
                onAdd={(address, tokenId) => {
                    mintStore.addModule({address, value: tokenId, moduleAddress: addresses.ERC721Module})
                }}/>}
            <ContentTitle>Contents</ContentTitle>
            <div className="flex flex-col w-full gap-2">
                <ContentCard className='self-stretch'>
                    <div className="flex justify-between">
                        <span className='text-card-title'>ETH</span>
                        <span className='text-card-title'>Available: {ethBalance?.formatted}</span>
                    </div>
                    <input
                        className={clsxm('text-right', !isEthAmountValid && 'text-red-500')}
                        onChange={(e) => {
                            const value = e.target.value;
                            if (!isNaN(Number(value))) {
                                const val = parseEther(value == '' ? '0' : value as `${number}`)
                                mintStore.setEth(val);
                            }
                        }}
                    />
                </ContentCard>
                {
                    mintStore.modules.map((module, index) => {
                        if (module.moduleAddress === addresses.ERC721Module) {
                            return <Erc721Card key={module.address + module.value}
                                               onClick={() => mintStore.removeModule(module)}
                                               module={module}/>
                        }
                        if (module.moduleAddress === addresses.ERC20Module) {
                            return <Erc20Card key={module.address + module.value}
                                              onClick={() => mintStore.removeModule(module)}
                                              module={module}/>
                        }

                        return <ContentCard key={module.address + module.value}>
                            <ContentTitle>Unknown module</ContentTitle>
                        </ContentCard>;
                    })
                }
                {/*<button*/}
                {/*    disabled={isSignLoading || isSignSuccess}*/}
                {/*    onClick={handlePrepareAndSignMessage}*/}
                {/*    type="button"*/}
                {/*>*/}
                {/*    Sign*/}
                {/*</button>*/}

                {/*<Button onClick={handleFormSubmit}>Mint</Button>*/}

                <ContentCard className='self-stretch'>
                    <span className='text-card-title'>Add assets</span>
                    <div className='flex gap-2'>
                        <Button
                            variant='flat' isDarkBg={true}
                            className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                            onClick={() => setIsAddTokenModalOpen(true)}
                            leftIcon={<AiOutlinePlus/>}>Token</Button>
                        <Button
                            variant='flat' isDarkBg={true}
                            className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                            onClick={() => setIsAddNftModalOpen(true)}
                            leftIcon={<AiOutlinePlus/>}>NFT</Button>
                    </div>
                </ContentCard>
            </div>
        </>);
}


