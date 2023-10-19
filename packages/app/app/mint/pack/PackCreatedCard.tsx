import {ExternalLink} from "@/app/components/links/ExternalLink";
import Present from "~/present.svg";
import {IoIosCheckmark} from "react-icons/io";
import {Card} from "@/app/components/Card";
import PackLinkDetails from "@/app/mint/pack/PackLinkDetails";

export function PackCreatedCard() {
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
            <h1 className="text-xl">Pack Created!</h1>
            <PackLinkDetails claimKey={'9oiaskdbgiowsdboghisbadokgh'}/>
        </div>
    </Card>
}
