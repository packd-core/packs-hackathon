import {ReactNode, useCallback, useMemo, useState} from "react";
import clsxm from "@/src/lib/clsxm";
import {PackTypeSelector} from "@/app/components/dashboard/PackTypeSelector";
import Button from "@/app/components/button/Button";
import {AiOutlinePlus} from "react-icons/ai";
import Link from "next/link";
import ButtonLink from "@/app/components/links/ButtonLink";
import clsx from "clsx";
import {EtherSymbol} from "ethers";
import {FaEthereum} from "react-icons/fa";

export enum PackState {
    CREATED = 'created',
    REVOKED = 'revoked',
    OPENED = 'opened',
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

    return (
        <div>
            <h1 className='text-5xl text-gray-100 font-extrabold'>Your Packs</h1>
            <div className='flex justify-between mt-6 mb-2 flex-wrap-reverse gap-2'>
                <PackTypeSelector selectedTypes={selectedTypes} setSelectedTypes={setSelectedTypes}/>
                <ButtonLink href={'/mint'} leftIcon={<AiOutlinePlus/>}>Create</ButtonLink>
            </div>
            <div className='flex rounded-2xl bg-white/40 min-h-[60vh] flex-col p-4'>
                {!!selectedTypes.length && <NoPackFound/>}
                {!selectedTypes.length && <PackList/>}
            </div>
        </div>
    )
}

function PackList() {
    const items = useMemo<Pack[]>(
        () => [
            {
                id: '1',
                state: PackState.CREATED,
                date: new Date(),
                modules: [['1', '2'], ['4', '5'], ['7', '8']]
            },
            {
                id: '2',
                state: PackState.OPENED,
                date: new Date(),
                modules: [['1', '2'], ['4', '5'], ['7', '8']]
            },
            {
                id: '3',
                state: PackState.REVOKED,
                date: new Date(),
                modules: [['1', '2'], ['4', '5'], ['7', '8']]
            },
        ], []
    )
    return <div className='flex flex-col gap-4'>
        {items.map((pack) => <PackItem key={pack.id} pack={pack}/>)}
    </div>
}

function PackItem({pack}: { pack: Pack }) {
    return <div className={clsxm('rounded-xl p-4 bg-white/50',
        pack.state === PackState.OPENED && 'bg-[rgba(209,240,234,0.50)]')}>
        <div className='flex items-center'>
            <PackStateBadge packState={pack.state}/>
            <div className="text-sm px-2">{pack.date.toDateString()}</div>
            <div className='grow'></div>
            <div className='text-sm'> Pack id: {pack.id}</div>
        </div>
        <div className='mt-2 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
            {pack.modules.map((module, index) => <PackModuleItem key={index} module={module}/>)}
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
