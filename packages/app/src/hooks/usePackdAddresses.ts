import {KeySignManager} from "packs-contracts/utils/keySignManager";
import addresses from "../../app/abi/addresses.json";
import {Address, useNetwork} from "wagmi";
import {useMemo} from "react";

type Contracts = keyof typeof addresses["31337"];
export default function usePackdAddresses() {
    const { chain } = useNetwork();
    return useMemo(() => {
        return getAddressesByChainId(chain?.id ?? 0);
    }, [chain]);
}

function getAddressesByChainId(chainId: number) {
    const id = chainId + '';
    if (addresses.hasOwnProperty(id)) {
        // @ts-ignore
        console.log(addresses[id] as Record<Contracts, Address>)

        // @ts-ignore
        return addresses[id] as Record<Contracts, Address>;
    }
    console.log(addresses.hasOwnProperty(id))
    return {} as Record<Contracts, Address>;
}

