import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useMemo} from "react";
import {KeySignManager} from "@/src/lib/keySignManager";

export default function useKeySignManager() {
    const addresses = usePackdAddresses();
    return useMemo(() => new KeySignManager(
        1337,
        0,
        addresses.PackMain
    ), [addresses.PackMain]);
}
