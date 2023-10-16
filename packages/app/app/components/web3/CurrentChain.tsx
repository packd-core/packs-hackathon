"use client";
import {useNetwork} from "wagmi";
import {ConnectButton} from "@rainbow-me/rainbowkit";
import clsxm from "@/src/lib/clsxm";
import {useHydrated} from "@/src/hooks/useHydrated";

type CurrentChainProps = {
    className?: string
}
const CurrentChain = ({className}: CurrentChainProps) => {
    const {chain} = useNetwork()
    const isLoaded = useHydrated();
    return <div className={clsxm('text-center', className)}>
        <span className='text-gray-500 text-sm'> Chain:</span>
        <div className='text-sm'> {isLoaded ? <>
            {chain?.name || <ConnectButton/>}
        </> : 'loading...'}</div>

    </div>
}
CurrentChain.displayName = 'CurrentChain';
export default CurrentChain
