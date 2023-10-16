import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import Help from "~/help.svg";
import {HelpItem} from "@/app/components/content/HelpItem";
import {ContentTitle} from "@/app/components/content/ContentRow";

export const ApproveForm = () => (
    <div className="flex flex-col w-full gap-2">
        <HelpItem title={'Approve tokens'}>
            Approving tokens for a contract is necessary so that the contract can transfer the specified tokens and NFTs
            into the new pack.
        </HelpItem>
        <ContentTitle>Approve tokens</ContentTitle>
        <ContentCard className='self-stretch'>
            <span className='text-card-title'>Token address</span>
            <input className='text-right' disabled={true} value="0xkahdajhsdbjhasbdhjbdsfsf"/>
            <Button className='justify-center' isLoading={true}> Approve</Button>
        </ContentCard>
        <ContentCard className='self-stretch'>
            <span className='text-card-title'>Token address</span>
            <input className='text-right' disabled={true} value="0xkahdajhsdbjhasbdhjbdsfsf"/>
            <Button className='justify-center'> Approve</Button>
        </ContentCard>

    </div>)
