import {ExternalLink} from "@/app/components/links/ExternalLink";
import {useAccount} from "wagmi";
import {useAddressExplorer} from "@/src/hooks/useBlockExplorer";

export function CheckMyWalletButton() {
    const { address } = useAccount()
    const url = useAddressExplorer(address)
    return  <ExternalLink
        href={url}
        className='text-white'>
        Check My Wallet
    </ExternalLink>
}
