import {usePackCreatedByTokenId} from "@/src/hooks/usePackCreatedByTokenId";
import {usePackMainAccount} from "@/app/abi/generated";
import {useBalance} from "wagmi";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function usePackDataByTokenId(tokenId: bigint) {
    const addresses = usePackdAddresses();
    const {data: packData, isLoading: isPackDataLoading} = usePackCreatedByTokenId(tokenId);
    const {data: account, isLoading: isAccountLoading} = usePackMainAccount({enabled: tokenId !== undefined, args: [tokenId!], address: addresses.PackMain})
    const {data: rawEth, isLoading: isEthLoading} = useBalance({address: account})

    return {packData, rawEth, isLoading: isPackDataLoading || isAccountLoading || isEthLoading}
}
