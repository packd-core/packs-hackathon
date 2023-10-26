import {useEffect, useMemo, useState} from 'react'
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {ContentCard} from "@/app/components/content/ContentCard";
import {BsChevronDown, BsSearch, BsX} from "react-icons/bs";
import {Address, useAccount, useBalance, useToken} from "wagmi";
import Modal from "@/app/components/dialog/Modal";
import Icon from '~/chain.svg'
import {isAddress} from "viem";
import {formatUnits, parseUnits} from "ethers";
import clsxm from "@/src/lib/clsxm";

export default function TokenInput({token, value, onTokenSelected, onValueChanged, autoOpenModal}: {
    token?: Address,
    value?: bigint,
    onTokenSelected?: (address: Address) => void,
    onValueChanged?: (value: bigint) => void,
    autoOpenModal?: boolean
}) {
    const {address} = useAccount()
    const [isOpen, setIsOpen] = useState(false);
    useEffect(() => {
        if (autoOpenModal && !token) {
            setIsOpen(true);
        }
    }, [autoOpenModal, token]);
    const {data: tokenData} = useToken({address: token, enabled: !!token})
    const {data: balance, isLoading} = useBalance({
        address: address as Address,
        token: token as Address,
        enabled: !!token
    })
    const isValidAmount = useMemo(() => {
        if (!onValueChanged) {
            return true;
        }
       return value && value > 0 && (value <= (balance?.value ?? BigInt(0)));
    }, [value, balance?.value, onValueChanged]);

    return <div>
        <TokenSelectorDialog isOpen={isOpen} setIsOpen={setIsOpen} onAdd={(address, name) => {
            setIsOpen(false);
            onTokenSelected?.(address);
            if (address != token) {
                onValueChanged?.(0n)
            }
        }}/>
        <div className='relative w-full'>
            <button onClick={() => onValueChanged && setIsOpen(true)}
                    className='absolute pl-2 left-0 bottom-0 top-0 flex items-center justify-center text-sm font-semibold'>
                {token ? <><Icon className="mr-1 h-4 shrink-0"/> {tokenData?.name}</> : 'Select token'}
                {onTokenSelected && <BsChevronDown
                    className='text-base ml-1 shrink-0'/>}
            </button>

            <input
                placeholder="amount"
                disabled={!token || !onValueChanged}
                value={onValueChanged == undefined ? formatUnits(value ?? 0n, tokenData?.decimals ?? 18): undefined}
                className={clsxm('text-right w-full pl-12 text-xs py-2', !isValidAmount && 'text-red-500')}
                onChange={(e) => {
                    const value = e.target.value;
                    if (!isNaN(Number(value))) {
                        const val = parseUnits(value == '' ? '0' : value as `${number}`, tokenData?.decimals ?? 18);
                        onValueChanged?.(val);
                    } else {
                        onValueChanged?.(BigInt(-1));
                    }
                }}/>
        </div>


    </div>
}

export function TokenSelectorDialog({isOpen, setIsOpen, onAdd}: {
    isOpen: boolean,
    setIsOpen: (isOpen: boolean) => void,
    onAdd: (address: Address, name: string) => void
}) {
    return <Modal render={closeModal => <TokenSelectorFrom onAdd={onAdd} closeModal={closeModal}/>} isOpen={isOpen}
                  setIsOpen={setIsOpen}/>
}

export function TokenSelectorFrom({closeModal, onAdd}: {
    closeModal: () => void,
    onAdd: (address: Address, name: string) => void
}) {
    const [selected, setSelected] = useState('')
    const [query, setQuery] = useState('')
    const addresses = usePackdAddresses();
    const data = useMemo(() => [
        {name: 'Mock Token A', symbol: 'MTK A', address: addresses?.ERC20MockA},
        {name: 'Mock Token B', symbol: 'MTK B', address: addresses?.ERC20MockB},
    ], [addresses?.PackMain])

    const [filteredTokens, setFilteredTokens] = useState(data)
    const normalizeToken = (s :string)=> s.toLowerCase().replace(/\s+/g, '');
    const includesQuery = (prop:string) => normalizeToken(prop).includes(normalizeToken(query));
    const bySymbolNameOrAddress = (item:{name:string, symbol:string, address:string}) => Object.values(item).some(includesQuery)
    useEffect(() => {
        setFilteredTokens(query === ''? data :data.filter(bySymbolNameOrAddress))
    }, [query, data]);

    useEffect(() => {
        if (isAddress(query) && filteredTokens.length === 0) {
            setFilteredTokens([{name: 'Unknown',symbol: 'unknown', address: query}])
        }
    }, [query, filteredTokens]);

    return (
        <div className='flex flex-col bg-gray-900 rounded-3xl gap-2 text-white p-4'>
            <div className="flex justify-between">
                <span className='text-card-title'>Select token</span>
                <button className="hover:text-primary-500 pl-2" onClick={closeModal}><BsX/></button>
            </div>
            <div className="border-gray-500 border-b-[1px]">{''}</div>
            <div className='relative'>
                <input
                    placeholder="Search name or paste address  "
                    className="w-full pl-8 text-xs py-2"
                    onChange={(event) => setQuery(event.target.value)}
                />
                <BsSearch className='absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400'/>
            </div>
            <div className="border-gray-500 border-b-[1px]">{''}</div>
            <div className="flex flex-col gap-2 h-60">
                {filteredTokens.map((item) => (
                    <TokenSearchItem onClick={() => onAdd(item.address, item.name)} key={item.address}
                                     tokenAddress={item.address} name={item.name}/>
                ))}
            </div>

        </div>
    )
}

function TokenSearchItem({tokenAddress, name, onClick}: { tokenAddress: string, name: string, onClick: () => void }) {
    const {address} = useAccount()
    const {data: balance, isLoading} = useBalance({
        address: address as Address,
        token: tokenAddress as Address,
        enabled: !!address
    })
    const {data} = useToken({address: tokenAddress as Address})
    return <button
        onClick={onClick}
        className=" text-left flex items-center p-1 hover:border-gray-500 p rounded-lg border border-transparent">
        <Icon className='h-6 mr-2'/>
        <div className='flex flex-col grow'>
            <span className='text-card-title'>{data?.name}: {data?.symbol}</span>
            <span className='text-xs text-gray-400'>{tokenAddress}</span>
        </div>
        <span className='text-card-title'>{balance?.formatted}</span>
    </button>
}
