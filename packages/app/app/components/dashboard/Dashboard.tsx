import {ReactNode, useMemo, useState} from "react";
import clsxm from "@/src/lib/clsxm";
import {PackTypeSelector} from "@/app/components/dashboard/PackTypeSelector";
import {AiOutlinePlus} from "react-icons/ai";
import ButtonLink from "@/app/components/links/ButtonLink";
import {FaEthereum} from "react-icons/fa";
import {PackActionsMenu} from "@/app/components/dashboard/PackActionsMenu";
import {Address, useAccount, useBalance, useToken} from "wagmi";
import {useBalanceOf} from "@/src/hooks/useBalanceOf";
import {useTokenOfOwnerByIndex} from "@/src/hooks/useTokenOfOwnerByIndex";
import {useErc721Name, usePackMainAccount, usePackMainPackState} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {RawCreationData, usePackCreatedByTokenId} from "@/src/hooks/usePackCreatedByTokenId";
import {formatEther, formatUnits} from "ethers";
import {ContentCard} from "@/app/components/content/ContentCard";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {Module} from "@/src/stores/useMintStore";
import {GiToken} from "react-icons/gi";
import {RiNftLine} from "react-icons/ri";

export enum PackState {
    EMPTY = 'Empty',
    CREATED = 'Created',
    OPENED = 'Opened',
    REVOKED = 'Revoked'

}


export type Pack = {
    id: string;
    date: Date;
    state: PackState;
    modules: string[][];
}


function NoPackFound() {
    return <div className="flex justify-center items-center flex-col w-full grow">
        <p>No packs found</p>
        <p>Why not create one?</p>
        <ButtonLink href={"/mint"} leftIcon={<AiOutlinePlus/>}>Create</ButtonLink>
    </div>;
}


export default function Dashboard() {
    const [selectedTypes, setSelectedTypes] = useState<PackState[]>([PackState.CREATED])
    const {address} = useAccount();

    const {balance, isLoading, isError, refetch} = useBalanceOf(
        address as Address
    );

    return (
        <div>
            <h1 className='text-5xl text-gray-100 font-extrabold'>Your Packs</h1>
            <div className='flex justify-between mt-6 mb-2 flex-wrap-reverse gap-2'>
                <PackTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}/>
                <ButtonLink href={'/mint'} leftIcon={<AiOutlinePlus/>}>Create</ButtonLink>
            </div>
            <div className='flex rounded-2xl bg-white/40 min-h-[60vh] flex-col p-4'>
                {!balance && <NoPackFound/>}
                {!!balance && <PackList count={balance} selectedTypes={selectedTypes}/>}
            </div>
        </div>
    )
}

function PackList({count,selectedTypes}: { count: number, selectedTypes: PackState[] }) {
    return <div className='flex flex-col gap-4'>
        {[...Array(count)].map((_, id) => <PackItem key={id} index={id} selectedTypes={selectedTypes} />)}
    </div>
}

function PackItem({index, selectedTypes}: { index: number, selectedTypes: PackState[] }) {
    const {address: owner} = useAccount();
    const addresses = usePackdAddresses();
    const {tokenId, isLoading, isError, refetch} = useTokenOfOwnerByIndex(
        owner!,
        BigInt(index)
    );

    const {data: rawState, isLoading: isStateLoading} = usePackMainPackState({
        enabled: tokenId !== undefined,
        args: [tokenId!],
        address: addresses.PackMain
    });
    const {data: account, isLoading: isAccountLoading} = usePackMainAccount({
        enabled: tokenId !== undefined,
        args: [tokenId!],
        address: addresses.PackMain
    })
    const state = useMemo(() => Object.values(PackState)[rawState ?? 0], [rawState]);
    const visibility = selectedTypes.length ===0 || selectedTypes.includes(state);

    return visibility? (<div className={clsxm('rounded-xl p-4 bg-white/50',
        state && 'bg-[rgba(209,240,234,0.50)]'
    )} >
        <div className='flex items-center'>
            <PackStateBadge packState={state}/>
            <div className='grow text-xs'>account: {account}</div>
            <div className='text-sm pr-2'> tokenId: {tokenId?.toString()}</div>
            <div className='text-sm pr-2'> packId: {index?.toString()}</div>
            {tokenId !== undefined && <PackActionsMenu tokenId={tokenId}/>}
        </div>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {tokenId != undefined && <PackContent tokenId={tokenId}/>}
        </div>
    </div>) : <></>
}

function PackContent({tokenId}: { tokenId: bigint }) {
    const {data, isError, isLoading} = usePackCreatedByTokenId(tokenId)

    return <>
        <PackModuleItem name='ETH' value={!!data?.ethValue ? formatEther(data!.ethValue!) : 'Loading'}/>
        {tokenId !== undefined && <Modules data={data} isLoading={isLoading} isError={isError}/>}
    </>
}

function Modules({data, isError, isLoading}: { data?: RawCreationData, isLoading?: boolean, isError?: boolean }) {
    const addresses = usePackdAddresses();
    const modules = data?.fullModuleData ?? [];
    if (isLoading) return <div>loading...</div>
    if (isError) return <div>error...</div>
    return <> {modules.map((module, index) => {
        if (module.moduleAddress === addresses.ERC721Module) {
            return <PackModuleErc721 key={module.address + module.value}
                                     module={module}/>
        }
        if (module.moduleAddress === addresses.ERC20Module) {
            return <PackModuleErc20 key={module.address + module.value}
                                    module={module}/>
        }

        return <ContentCard key={module.address + module.value}>
            <ContentTitle>Unknown module</ContentTitle>
        </ContentCard>;
    })}</>
}

function PackModuleErc20({module}: { module: Module }) {
    const {data: tokenData} = useToken({address: module.address})
    return <PackModuleItem
        icon={<GiToken/>}
        value={formatUnits(module.value?.toString(), tokenData?.decimals ?? 18)}
        name={tokenData?.symbol ?? 'Loading...'}/>
}

function PackModuleErc721({module}: { module: Module }) {
    const {data: tokenName} = useErc721Name({address: module.address});
    return <PackModuleItem
        icon={<RiNftLine/>}
        value={module.value.toString()} name={tokenName ?? 'Loading...'}/>
}

function PackModuleItem({name, value, icon}: { name: string, value: string, icon?: ReactNode }) {
    return <div className="text-black p-2 rounded bg-white border border-gray-500/50 flex items-center">
        <div className='p-2 aspect-square rounded-full bg-blue-500'>
            {icon ?? <FaEthereum/>}
        </div>
        <div className='grow p-2'>{name}</div>
        <div>{value}</div>
    </div>
}


function PackStateBadge({packState}: { packState: PackState }) {

    return <div className={clsxm('rounded px-1 font-bold',
        packState === PackState.CREATED && 'text-[#AB8707] bg-[rgba(244,211,94,0.20)]',
        packState === PackState.REVOKED && 'text-[#202020] bg-[rgba(32,32,32,0.15)]',
        packState === PackState.OPENED && 'text-[#099276] bg-[rgba(9,146,118,0.15)]',
    )}>
        {packState}
    </div>
}
