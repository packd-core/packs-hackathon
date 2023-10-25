import {CopyTextButton} from "@/app/components/button/CopyTextButton";
import {HelpItem} from "@/app/components/content/HelpItem";
import {BiLogoTwitter} from "react-icons/bi";

export default function PackLinkDetails({claimKey}: { claimKey: string}) {
    const origin = typeof window !== 'undefined' ? window.location.origin : '';
    const link = origin + '/claim/' +claimKey;
    return <div className='flex flex-col gap-8 items-center max-w-full'>
        <p>Copy and share the Claim Link:</p>
        <div className="bg-gray-600 px-2 py-1 rounded-lg font-semibold text-white text-sm flex items-center max-w-full ">
            <div className="shrink grow break-all ">{link}</div>
            <CopyTextButton classNames="pl-2" text={link}/>
        </div>
        <HelpItem title="Careful with the claim Link">
            Anyone that knows the link can claim the pack contents. Be careful only to share it privately with the
            person you want to gift this pack.
        </HelpItem>
        <p className="text-xl"> Or</p>
        <p>Share this pack with someone on socials:</p>
        <div className='flex w-full justify-center gap-4'>
            <button
                className='h-16 w-16 bg-black rounded-2xl flex justify-center items-center hover:border-2 border-primary-500 text-4xl'>
                <BiLogoTwitter/>
            </button>
            <button
                className='h-16 w-16 bg-black rounded-2xl flex justify-center items-center hover:border-2 border-primary-500 text-4xl'>
                <BiLogoTwitter/>
            </button>
            <button
                className='h-16 w-16 bg-black rounded-2xl flex justify-center items-center hover:border-2 border-primary-500 text-4xl'>
                <BiLogoTwitter/>
            </button>
        </div>
    </div>
}
