import Present from "~/present.svg";
import {ImNewTab} from "react-icons/im";
import {Card} from "@/app/components/Card";
import clsxm from "@/src/lib/clsxm";
import {ExternalLink} from "@/app/components/links/ExternalLink";

type LoadingCardProps = {
    className?: string;
    children?: React.ReactNode;
    title?: string;
    text?: string;
    transactionHash?: string;
}

export function LoadingCard({className, children, title, text, transactionHash}: LoadingCardProps) {
    return <Card
        className={clsxm('mx-auto w-full bg-gray-800', className)}
        containerClassName='max-h-[60vh] overflow-y-auto'
        controls={
            <div className='w-full flex justify-center py-1'>
                {text}
            </div>}>
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-gray-800">
                <Present className={'h-6 w-6'}/>
            </div>
            <h1 className="text-lg pt-4">{title}</h1>
            {
                transactionHash &&
                <ExternalLink href={'https://etherscan.io'}>Track it onchain</ExternalLink>
            }
            {children}
        </div>
    </Card>
}
