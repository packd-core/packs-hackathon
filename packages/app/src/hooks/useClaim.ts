
import {usePackMainOpen, usePreparePackMainOpen} from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";

export const useClaim = (claimData: any,  moduleData?: string[][]) => {
    const addresses = usePackdAddresses();
    const {
        config,
        error: prepareError,
        isError: isPrepareError,
    } = usePreparePackMainOpen({
        address: addresses.PackMain,
        args: [claimData, moduleData],
        enabled: !!claimData.sigOwner && moduleData !== undefined,

    });

    const {write, data, error, isLoading, isError}
        = usePackMainOpen(config);

    return {
        write,
        data,
        error,
        isLoading,
        isError,
        prepareError,
        isPrepareError,
    };
};
