import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {HelpItem} from "@/app/components/content/HelpItem";

export const SignForm = () => (
    <div className="flex flex-col w-full gap-2">
        <div className='text-center pb-8'>
            <h2 className="text-2xl font-bold ">Connect Wallet</h2>
            <p className='text-sm text-gray-500'>Connect with your wallet to proceed.  No ETH needed to claim, the pack pays for itself for unpacking.</p>
        </div>
        <HelpItem title={'Why am I asked to connect wallet?'}>
            In order to verify your ownership of the address that you want to claim with.         
        </HelpItem>
    </div>)
