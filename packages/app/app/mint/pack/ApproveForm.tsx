import {ContentCard} from "@/app/components/content/ContentCard";
import Button from "@/app/components/button/Button";
import Help from "~/help.svg";
import {HelpItem} from "@/app/components/content/HelpItem";
import {ContentTitle} from "@/app/components/content/ContentRow";
import {usePackState} from "@/app/mint/usePackState";
import {useEffect, useMemo} from "react";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import clsxm from "@/src/lib/clsxm";
import {Module, useMintStore} from "@/src/stores/useMintStore";
import {useAccount, useToken, useWaitForTransaction} from "wagmi";
import {
    useErc20Allowance,
    useErc20Approve, useErc721Approve,
    useErc721GetApproved,
    useErc721Name,
    usePrepareErc20Approve, usePrepareErc721Approve
} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

function ApproveToken({module}: { module: Module }) {
    const addresses = usePackdAddresses();
    const {address} = useAccount()
    const {data: tokenData} = useToken({address: module.address})
    const {data: dataAllowance} = useErc20Allowance({address: module.address, args: [address!, addresses.PackMain], watch: true, staleTime: 0},)
    const {config} = usePrepareErc20Approve({address: module.address, args: [addresses.PackMain, module.value]})
    const {data: dataApprove, write} = useErc20Approve(config)
    const {isLoading} = useWaitForTransaction({hash: dataApprove?.hash})
    const isApproved = useMemo(() => (dataAllowance ?? 0) >= module.value, [dataAllowance, module])
    const setApproved = useMintStore(state => state.setApproved)
    useEffect(() => {
        if (isApproved) {
            setApproved(module)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isApproved, setApproved]);
    return <ApproveItem name={tokenData?.name ?? 'Loading...'} address={module.address} isLoading={isLoading}
                        isApproved={isApproved} onClick={() => write && write()}/>;

}

function ApproveNft({module}: { module: Module }) {
    const addresses = usePackdAddresses();
    const {data: name} = useErc721Name({address: module.address})
    const {data: dataApprovedFor} = useErc721GetApproved({address: module.address, args: [module.value], watch: true})
    const isApproved = useMemo(() => dataApprovedFor === addresses.PackMain, [dataApprovedFor, addresses.PackMain]);
    const {config} = usePrepareErc721Approve({address: module.address, args: [addresses.PackMain, module.value]})
    const {data, write} = useErc721Approve(config);
    const {isLoading} = useWaitForTransaction({hash: data?.hash})
    const setApproved = useMintStore(state => state.setApproved)
    useEffect(() => {
        if (isApproved) {
            setApproved(module)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isApproved, setApproved]);
    return <ApproveItem name={`${name} ${module.value}`} address={module.moduleAddress} isLoading={isLoading}
                        isApproved={isApproved} onClick={() => write && write()}/>;
}

function ApproveItem({name, address, isLoading, isApproved, onClick}: { name: string, address: string, isLoading: boolean, isApproved: boolean, onClick: () => void }) {
    return <ContentCard className="self-stretch">
        <span className="text-card-title">{name}</span>
        <input className="text-right text-xs" disabled={true} value={address}/>
        <Button className="justify-center" isLoading={isLoading} onClick={onClick}
                disabled={isApproved}> {isApproved ? 'Approved' : 'Approve'}</Button>
    </ContentCard>;
}

export const ApproveForm = () => {
    const nextStep = usePackState(state => state.nextStep)
    const previousStep = usePackState(state => state.previousStep)
    const setControls = usePackState(state => state.setControls)
    const modules = useMintStore(state => state.modules);
    const addresses = usePackdAddresses();
    const isAllApproved = useMemo(() => modules.every(m => m.isApproved), [modules]);
    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                onClick={previousStep}
                variant="navigation"
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
            <Button
                onClick={nextStep}
                disabled={!isAllApproved}
                className={clsxm(!isAllApproved && 'text-red-600')}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                {'Next'}
            </Button>
        </div>)
    }, [nextStep, setControls, isAllApproved, previousStep]);
    return (
        <div className="flex flex-col w-full gap-2">
            <HelpItem title={'Approve tokens'}>
                Approving tokens for a contract is necessary so that the contract can transfer the specified tokens and
                NFTs
                into the new pack.
            </HelpItem>
            <ContentTitle>Approve tokens</ContentTitle>
            {modules.map((value, index) => {
                if (value.moduleAddress === addresses.ERC20Module) return (<ApproveToken key={index} module={value}/>)
                if (value.moduleAddress === addresses.ERC721Module) return (<ApproveNft key={index} module={value}/>)
                return <ContentCard key={index} className="self-stretch"> Unknown module</ContentCard>
            })}

        </div>);
}
