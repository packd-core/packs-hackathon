import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";

export const ConfirmClaim = () => (
    <>
        <div className='border-b-[1px] self-stretch border-gray-500 text-sm py-2'>
            This pack contains
        </div>
        <div className="flex flex-col w-full gap-2">
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
    </>)
