import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import Help from "~/help.svg";
import {HelpItem} from "@/app/components/content/HelpItem";

export const ApproveForm = () => (
    <div className="flex flex-col w-full gap-2">
        {/* <HelpItem title={'Approve tokens'}>
            Connect Wallet
        </HelpItem> */}
        {/* <div className='border-b-[1px] border-t-[1px] self-stretch border-gray-500 text-sm py-2'> */}
            Connect Wallet
        {/* </div> */}
        Connect with your wallet to proceed.  No ETH needed to claim, the pack pays for itself for unpacking.
        <HelpItem title={'Why am I asked to connect wallet?'}>
            In order to verify your ownership of the address that you want to claim with. 
        </HelpItem>
        {/* <ContentCard className='self-stretch'>
            <span className='text-card-title'>Token address</span>
            <input className='text-right' disabled={true} value="0xkahdajhsdbjhasbdhjbdsfsf"/>
            <Button className='justify-center' isLoading={true}> Approve</Button>
        </ContentCard>
        <ContentCard className='self-stretch'>
            <span className='text-card-title'>Token address</span>
            <input className='text-right' disabled={true} value="0xkahdajhsdbjhasbdhjbdsfsf"/>
            <Button className='justify-center'> Approve</Button>
        </ContentCard> */}

    </div>)
