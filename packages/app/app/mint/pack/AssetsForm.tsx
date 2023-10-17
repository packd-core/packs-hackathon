import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";
import {ContentTitle} from "@/app/components/content/ContentRow";

export const AssetsForm = () => (
    <>
        <ContentTitle>Contents</ContentTitle>
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
    </>)
