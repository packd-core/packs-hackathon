import {Card} from "@/app/components/Card";
import {Wrapper} from "@/app/components/Wrapper";
import {AiOutlineArrowLeft, AiOutlinePlus} from "react-icons/ai";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";
import Present from "~/present.svg";
import {useAccount, useNetwork} from "wagmi";
import CurrentChain from "@/app/components/web3/CurrentChain";
import {ContentCard} from "@/app/components/content/ContentCard";
import {TiPlus} from "react-icons/ti";

const MintPage = () => {

    return (
        <main>
            <Wrapper className='min-h-screen flex items-center'>
                <Card
                    className={'mx-auto w-full'}
                    containerClassName='max-h-[60vh] overflow-y-auto'
                    controls={
                        <div className='w-full flex justify-between py-1'>
                            <Button variant="navigation" disabled={true}
                                    leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                                Back
                            </Button>
                            <Button variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
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
                        <div className='border-b-[1px] self-stretch border-gray-500 text-sm py-2'>
                            Contents
                        </div>
                        <div className="flex flex-col w-full gap-2">
                            <ContentCard className='self-stretch'>
                                <span className='text-card-title'>ETH</span>
                                <input className='text-right'/>
                            </ContentCard>
                            <ContentCard className='self-stretch'>
                                <span className='text-card-title'>Token address</span>
                                <input className='text-right'/>
                                <span className='text-card-title'>Amount</span>
                                <input className='text-right'/>
                            </ContentCard>
                            <ContentCard className='self-stretch'>
                                <span className='text-card-title'>Nft address</span>
                                <input className='text-right'/>
                                <span className='text-card-title'>Token id</span>
                                <input className='text-right'/>
                            </ContentCard>
                            <Button
                                variant='flat' isDarkBg={true}
                                className='justify-center bg-gray-800 text-white py-2 rounded-2xl'
                                rightIcon={<AiOutlinePlus/>}>Add</Button>

                            <ContentCard className='self-stretch'>
                                <span className='text-card-title'>Add assets</span>
                                <div className='flex gap-2'>
                                    <Button
                                        variant='flat' isDarkBg={true}
                                        className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                                        leftIcon={<AiOutlinePlus/>}>Token</Button>
                                    <Button
                                        variant='flat' isDarkBg={true}
                                        className='flex-1 justify-center bg-gray-600 text-white rounded-lg'
                                        leftIcon={<AiOutlinePlus/>}>NFT</Button>
                                </div>
                            </ContentCard>
                        </div>

                    </div>
                </Card>
            </Wrapper>
        </main>
    );
};

export default MintPage;
