import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";
import Arrow from "~/arrow.svg";
import Sender from "~/sender.svg";
import Reciever from "~/reciever.svg";
import Chain from "~/chain.svg";

export const ConfirmClaim = () => (
    <>
        <div className='text-center mb-5'>
            <h2 className="text-2xl font-bold ">Review Claim</h2>
        </div>

        <div className="p-2 rounded-full w-full h-14 mb-5 px-5 bg-gray-800">
            {/* <ClaimProgress  className={'h-8'}/> */}
            <div className="w-1/3 inline-block">
                <h5 className="text-xs  text-gray-500">From</h5>
                <div className="flex gap-2 items-center">
                    <Sender className='h-4 '/>
                    <h5 className="text-s  ">  0x123...6h6h</h5>
                </div>
            </div>
            <div className="w-1/3  inline-block">
                <div className="flex justify-center items-center">

                <Arrow className='h-6'/>
                </div>
            </div>
            <div className="w-1/3 text-right inline-block">
                <h5 className="text-xs  text-gray-500">From</h5>
                <div className="flex gap-2 items-center">
                    <Reciever className='h-4 '/>
                    <h5 className="text-s  ">  0x123...6h6h</h5>
                </div>
            </div>
            {/* <div className="absolute">
                >>
            </div>
            <div className="absolute right-5">
                <h5 className="text-xs text-gray-500  ">To</h5>
                <h5 className="text-s  ">0x123...6h6h</h5>
            </div> */}
        </div>

        <div className='border-b-[1px] self-stretch border-gray-500 text-sm py-2'>
            This pack contains
        </div>
        <div className="flex flex-col w-full mb-5 gap-2 ">
            <ContentCard className='self-stretch'>
                <span className='text-card-title'>ETH</span>
                <input className='text-right' type="text" disabled value={0.01}/>
            </ContentCard>
            <ContentCard className='self-stretch'>
                <span className='text-card-title'>Tokens</span>
                <input className='text-right' type="text" disabled value={1000}/>
            </ContentCard>
            <ContentCard className='self-stretch'>
                <span className='text-card-title'>Nfts</span>
                <input className='text-right' type="text" disabled value={"tokenId: 1023"} />
            </ContentCard>
            {/* <Button
                variant='flat' isDarkBg={true}
                className='justify-center bg-gray-800 text-white py-2 rounded-2xl'
                rightIcon={<AiOutlinePlus/>}>Add</Button> */}

            {/* <ContentCard className='self-stretch'>
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
            </ContentCard> */}
        </div>
        {/* <div className='border-b-[1px] self-stretch border-gray-500 text-sm py-2'>
            This pack contains
        </div> */}
        <div className="flex flex-col w-full border-t-[1px] border-gray-500 py-2 gap-2">
            <div className="p-2 w-full relative ">
                <h5 className="text-xs absolute left-5 text-gray-500">Chain</h5>
                <div className="flex absolute right-5 gap-2 items-center">
                    <Chain className='h-4 '/>
                    <h5 className="text-xs   ">Base</h5>
                </div>
            </div>
            <div className="p-2 w-full relative ">
                <h5 className="text-xs absolute left-5 text-gray-500">Gas Fees</h5>
                <h5 className="text-xs  absolute right-5 ">$0.00</h5>
            </div>  
        </div>
    </>)
