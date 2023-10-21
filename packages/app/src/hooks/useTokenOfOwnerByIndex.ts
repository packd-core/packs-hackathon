import type {Address} from "wagmi";
import {useContractRead} from "wagmi";
import {usePackMainTokenOfOwnerByIndex} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function useTokenOfOwnerByIndex(owner: Address, index: bigint) {
    const addresses = usePackdAddresses();

    const {
        data: tokenId,
        isLoading,
        isError,
        refetch,
    } = usePackMainTokenOfOwnerByIndex({
            address: addresses.PackMain,
            args: [owner, index],
        }
    );

    return {tokenId, isLoading, isError, refetch};
}
