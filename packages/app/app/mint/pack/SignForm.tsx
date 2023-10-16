import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import {HelpItem} from "@/app/components/content/HelpItem";

export const SignForm = () => (
    <div className="flex flex-col w-full gap-2">
        <div className='text-center pb-8'>
            <h2 className="text-2xl font-bold ">Sign Message</h2>
            <p className='text-sm text-gray-500'>Sign the Message to generate a claim key.</p>
        </div>
        <HelpItem title={'What am I signing?'}>
            The signature is used as a seed for creating a new claim key. The singature content is determined by the pack information, so you can reconstruct a claim key in the future again.
        </HelpItem>
    </div>)
