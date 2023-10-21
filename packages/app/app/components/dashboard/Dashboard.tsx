import {useMemo, useState} from "react";
import clsxm from "@/src/lib/clsxm";
import {PackTypeSelector} from "@/app/components/dashboard/PackTypeSelector";
import {AiOutlinePlus} from "react-icons/ai";
import ButtonLink from "@/app/components/links/ButtonLink";
import {FaEthereum} from "react-icons/fa";
import {PackActionsMenu} from "@/app/components/dashboard/PackActionsMenu";
import {Address, useAccount, useBalance} from "wagmi";
import {useBalanceOf} from "@/src/hooks/useBalanceOf";
import {useTokenOfOwnerByIndex} from "@/src/hooks/useTokenOfOwnerByIndex";
import {usePackMainAccount, usePackMainPackState} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export enum PackState {
    EMPTY='Empty',
    CREATED='Created',
    OPENED='Opened',
    REVOKED='Revoked'

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
    const [selectedTypes, setSelectedTypes] = useState<PackState[]>([])
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
                {!!balance && <PackList count={balance}/>}
            </div>
        </div>
    )
}

function PackList({count}: { count: number }) {
    // const items = useMemo<Pack[]>(
    //     () => [
    //         {
    //             id: '1',
    //             state: PackState.CREATED,
    //             date: new Date(),
    //             modules: [['1', '2'], ['4', '5'], ['7', '8']]
    //         },
    //         {
    //             id: '2',
    //             state: PackState.OPENED,
    //             date: new Date(),
    //             modules: [['1', '2'], ['4', '5'], ['7', '8']]
    //         },
    //         {
    //             id: '3',
    //             state: PackState.REVOKED,
    //             date: new Date(),
    //             modules: [['1', '2'], ['4', '5'], ['7', '8']]
    //         },
    //     ], []
    // )
    return <div className='flex flex-col gap-4'>
        {[...Array(count)].map((_, id) => <PackItem key={id} index={id}/>)}
    </div>
}

function PackItem({index}: { index: number }) {
    const {address: owner} = useAccount();
    const addresses = usePackdAddresses();
    console.log('index:', index, 'owner:', owner);
    const {tokenId, isLoading, isError, refetch} = useTokenOfOwnerByIndex(
        owner!,
        BigInt(index)
    );

    const {data: rawState, isLoading: isStateLoading} = usePackMainPackState({enabled: tokenId !== undefined, args: [tokenId!], address: addresses.PackMain});
    const {data: account, isLoading: isAccountLoading} = usePackMainAccount({enabled: tokenId !== undefined, args: [tokenId!], address: addresses.PackMain})
    const {data: rawEth, isLoading: isEthLoading} = useBalance({address: account})
    const state = useMemo(() =>  Object.values(PackState)[rawState??0], [rawState]);

    return <div className={clsxm('rounded-xl p-4 bg-white/50',
        state && 'bg-[rgba(209,240,234,0.50)]'
    )}>
        <div className='flex items-center'>
            <PackStateBadge packState={state}/>
            <div className='grow text-xs'>account: {account}</div>
            <div className='text-sm pr-2'> tokenId: {tokenId?.toString()}</div>
            <div className='text-sm pr-2'> packId: {index?.toString()}</div>
            {tokenId !== undefined && <PackActionsMenu tokenId={tokenId}/>}
        </div>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            <PackModuleItem module={['Eth', rawEth?.formatted ?? 'Loading']}/>
            {/*    {pack.modules.map((module, index) => <PackModuleItem key={index} module={module}/>)}*/}
        </div>
    </div>
}

function PackModuleItem({module}: { module: string[] }) {
    return <div className="text-black p-2 rounded bg-white border border-gray-500/50 flex items-center">
        <div className='p-2 aspect-square rounded-full bg-blue-500'>
            <FaEthereum/>
        </div>
        <div className='grow p-2'>{module[0]}</div>
        <div>{module[1]}</div>
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
