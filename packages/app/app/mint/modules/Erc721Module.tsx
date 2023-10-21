import {Module} from "@/src/stores/useMintStore";
import {ContentCard} from "@/app/components/content/ContentCard";
import {BsX} from "react-icons/bs";
import {useErc721Name} from "@/app/abi/generated";

export default function Erc721Card({onClick, module}: { onClick: () => void, module: Module }) {
    const {data: tokenName} = useErc721Name({address: module.address});

    return <ContentCard className="self-stretch">
        <div className="flex justify-between">
            <span className="text-card-title">NFT address</span>
            <button className="hover:text-primary-500 pl-2" onClick={onClick}><BsX/></button>
        </div>
        <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 flex items-center pl-2 text-xs font-bold">
                {tokenName}
            </div>
            <input className="text-right w-full pl-12 text-xs py-2" disabled={true} value={module.address}/>
        </div>
        <span className="text-card-title">TokenID</span>
        <input className="text-right" disabled={true} value={module.value?.toString()}/>
    </ContentCard>;
}
