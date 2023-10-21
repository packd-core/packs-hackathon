import {ExternalLink} from "@/app/components/links/ExternalLink";
import Present from "~/present.svg";
import {IoIosCheckmark} from "react-icons/io";
import {Card} from "@/app/components/Card";
import PackLinkDetails from "@/app/mint/pack/PackLinkDetails";
import {useUrlEncodeDecode} from "@/src/hooks/useUrlEncodeDecode";
import {usePackState} from "@/app/mint/usePackState";
import {useMintStore} from "@/src/stores/useMintStore";
import {BiLogoTwitter} from "react-icons/bi";

export function PackClaimedCard() {

    return <Card
        className={'mx-auto w-full bg-green-800'}
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
            <h1 className="text-xl">You have been packed!</h1>
            <p className='my-4 text-gray-400 text-sm'>The contents of the pack are now in your wallet.</p>
            <p className='my-4 text-sm'>Share this pack with someone on socials:</p>
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
