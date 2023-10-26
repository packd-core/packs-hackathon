import { useEffect } from "react";
import Button from "@/app/components/button/Button";
import { FiArrowRight } from "react-icons/fi";
import { useClaimState } from "@/app/claim/[key]/useClaimState";
import { usePackDataByTokenId } from "@/src/hooks/usePackDataByTokenId";
import { ReviewData } from "@/app/mint/pack/ReviewForm";
import { usePackMainPackState } from "@/app/abi/generated";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import clsxm from "@/src/lib/clsxm";

export default function InitialForm() {
  const nextStep = useClaimState((state) => state.nextStep);
  const previousStep = useClaimState((state) => state.previousStep);
  const setControls = useClaimState((state) => state.setControls);
  const tokenId = useClaimState((state) => state.mintedTokenId);
  const { packData, rawEth, isLoading } = usePackDataByTokenId(tokenId!);
  const setMaxRefundValue = useClaimState((state) => state.setMaxRefundValue);
  const setOwner = useClaimState((state) => state.setOwner);
  const setPackData = useClaimState((state) => state.setPackData);
  const addresses = usePackdAddresses();
  const { data: rawState, isLoading: isStateLoading } = usePackMainPackState({
    enabled: tokenId !== undefined && addresses.PackMain !== undefined,
    args: [tokenId!],
    address: addresses.PackMain,
  });
  useEffect(() => {
    setMaxRefundValue(rawEth ?? BigInt(0));
  }, [rawEth, setMaxRefundValue]);
  useEffect(() => {
    if (packData) {
      setOwner(packData.owner ?? "");
      setPackData(packData);
    }
  }, [packData, setOwner]);
  useEffect(() => {
    const isClaimed = rawState === 2;
    setControls(
      <div className={clsxm("w-full flex justify-end py-1", isClaimed && 'justify-center')}>
        {isClaimed && (
          <div className="text-center">This pack has already been claimed!</div>
        )}

        {rawState === 1 && packData && (
          <Button
            onClick={nextStep}
            variant="navigation"
            rightIcon={<FiArrowRight className="text-inherit inline" />}
          >
            Claim
          </Button>
        )}
      </div>,
    );
  }, [nextStep, setControls, previousStep, rawState, packData]);
  return (
    <div className="flex flex-col w-full gap-2">
      {
        <ReviewData
          eth={rawEth ?? BigInt(0)}
          modules={packData?.fullModuleData ?? []}
        />
      }
    </div>
  );
}
