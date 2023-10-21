import {Module} from "@/src/stores/useMintStore";
import {useToken} from "wagmi";
import {ContentCard} from "@/app/components/content/ContentCard";
import {BsX} from "react-icons/bs";
import {formatUnits} from "ethers";

export default function Erc20Card({onClick, module}: { onClick: () => void, module: Module }) {
    const {data: tokenData} = useToken({address: module.address})
    return <ContentCard className="self-stretch">
        <div className="flex justify-between">
            <span className="text-card-title">Token address</span>
            <button className="hover:text-primary-500 pl-2" onClick={onClick}><BsX/></button>
        </div>
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 text-xs font-bold">
                {tokenData?.symbol}
            </div>
            <input className="text-right w-full pl-12 text-xs py-2" disabled={true} value={module.address}/>
        </div>
        <span className="text-card-title">Amount</span>
        <input className="text-right" disabled={true}
               value={formatUnits(module.value?.toString(), tokenData?.decimals ?? 18)}/>
    </ContentCard>;
}
