import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import { useMemo } from "react";
import { KeySignManager } from "@/src/lib/keySignManager";
import { useNetwork } from "wagmi";

export default function useKeySignManager() {
    const addresses = usePackdAddresses();
    const network = useNetwork()

    return useMemo(() => new KeySignManager(
        network.chain?.id ?? 31337,
        0,
        addresses.PackMain
    ), [network.chain?.id, addresses.PackMain]);
}
