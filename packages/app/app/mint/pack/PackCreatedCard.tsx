import {ExternalLink} from "@/app/components/button/ExternalLink";
import Present from "~/present.svg";
import {IoIosCheckmark} from "react-icons/io";
import {CopyTextButton} from "@/app/components/button/CopyTextButton";
import {HelpItem} from "@/app/components/content/HelpItem";
import {BiLogoTwitter} from "react-icons/bi";
import {Card} from "@/app/components/Card";

export function PackCreatedCard() {
    return <Card
        className={'mx-auto w-full bg-green-800'}
        containerClassName='max-h-[60vh] overflow-y-auto'
        controls={
            <div className='w-full flex justify-between py-1 px-2'>
                <div>Claimed!</div>
                <ExternalLink
                    href={'https://etherscan.io'}
                    className='text-white'>
                    Check My Wallet
                </ExternalLink>
            </div>
        }>
        <div className="flex flex-col items-center gap-8">
            <div className="p-4 rounded-full bg-primary-500/25 relative">
                <Present className={'h-6 w-6'}/>
                <IoIosCheckmark className='bg-green-800 w-5 h-5 rounded-full absolute bottom-0 right-0 translate-x-1/4'/>
            </div>
            <h1 className="text-xl">Pack Created!</h1>
            <p>Copy and share the Claim Link:</p>
            <div className="bg-gray-600 px-2 py-1 rounded-lg font-semibold text-white text-sm flex items-center">
                https://packd.io/claim/9oiaskdbgiowsdboghisbadokgh
                <CopyTextButton classNames="pl-2" text='https://packd.io/claim/9oiaskdbgiowsdboghisbadokgh'/>
            </div>
            <HelpItem title="Careful with the claim Link">
                Anyone that knows the link can claim the pack contents. Be careful only to share it privately with the person you want to gift this pack.
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
    </Card>
}
