import {useEffect, useState} from "react";
import {Address, useContractRead} from "wagmi";
import {packMainABI, usePackMainBalanceOf} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export function useBalanceOf(address: Address) {
    const [balance, setBalance] = useState(0);
    const addresses = usePackdAddresses();
    const {data, isLoading, isError, refetch} = usePackMainBalanceOf({address: addresses.PackMain, args: [address], enabled: !!addresses.PackMain});

    useEffect(() => {
        if (data && !isLoading && !isError) {
            setBalance(Number(data));
        }
    }, [data, isLoading, isError]);

    return {balance, isLoading, isError, refetch};
}
