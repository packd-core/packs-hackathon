import Flow from '~/flow.svg'
import {ConnectButton} from "@rainbow-me/rainbowkit";


export default function Landing() {
    return <div className="flex flex-col items-center text-black mt-10 md:mt-20 lg:mt-40">
        <h1 className="max-w-3xl text-3xl sm:text-4xl md:text-5xl font-extrabold text-center mb-4">Simplify <span
            className="text-primary-500">Onboarding</span> with <span className="text-primary-500">Onchain</span> Packs
        </h1>
        <p className="max-w-xl">Create and distribute Packs effortlessly. Enable your users to claim their essentials
            without worrying about gas fees.</p>
        <Flow className="max-w-md my-16"/>
        <p className='text-gray-600 font-semibold'>Get started:</p>
        <ConnectButton/>
        <h2 className='mt-20 mb-16 text-3xl sm:text-4xl md:text-5xl font-extrabold text-center'>How It Works</h2>
        <div className="flex flex-wrap gap-16 md:mx-10 mb-20 justify-center">
            <HowItWorksItem
                number={1}
                title='Create'
                description='Add ETH and tokens or NFTs as you see fit. What would your ideal onboarding Pack
            contain?'/>
            <HowItWorksItem
                number={2}
                title='Share'
                description="Share the claim link via Telegram or any social platform. It's all they need to claim their Pack."/>
            <HowItWorksItem
                number={3}
                title='Claim'
                description="Recipient can claim their Pack without incurring any gas fees. The Pack pays for itself!"/>
        </div>
    </div>
}

type HowItWorksItemProps = {
    number: number;
    title: string;
    description: string;
}

function HowItWorksItem({number, title, description}: HowItWorksItemProps) {
    return <div className='max-w-[280px] w-full'>
        <div className="flex justify-center items-center font-semibold"><span
            className="text-7xl text-gray-600 font-extrabold mr-4">{number}.</span><h3
            className="text-3xl font-extrabold text-center ">{title} </h3></div>
        <p className="mt-4 text-center">{description}</p>
    </div>;
}
