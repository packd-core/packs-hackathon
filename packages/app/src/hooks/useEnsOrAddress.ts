import {Address} from "wagmi";
import formatAddress from "@/src/lib/addressFormatter";
import {useMemo} from "react";

export default function useEnsOrFormattedAddress(address?: Address){
    //TODO use ens if available
    return useMemo(() => {
        if (!address) {
            return undefined;
        }
        return formatAddress(address);
    }, [address]);
}
