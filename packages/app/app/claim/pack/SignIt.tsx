import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {HelpItem} from "@/app/components/content/HelpItem";

export const SignIt = () => (
    <div className="flex flex-col w-full gap-2">
        <div className='text-center pb-8'>
            <h2 className="text-2xl font-bold ">Sign Message</h2>
            <p className='text-sm text-gray-500'>SIgn a message to verify ownership of the address you like to claim with.</p>
        </div>
        <HelpItem title={'What am I signing?'}>
        For claiming your ownership of the address has to be verified with some claim information that protects your pack.        
        </HelpItem>
    </div>)
