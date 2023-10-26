import type { Address } from "wagmi";
import { useEffect, useState } from "react";
import useKeySignManager from "@/src/hooks/useKeySignManager";

export const useGenerateClaimData = (
  address: Address,
  maxRefundValue: bigint,
  sigClaimer: string,
  tokenId: bigint,
  privateKeyDecoded: string
) => {
  const [claimData, setClaimData] = useState({
    tokenId: 0n,
    sigOwner: "",
    claimer: address,
    sigClaimer,
    refundValue: BigInt(0),
    maxRefundValue,
  });
  const keySignManager = useKeySignManager();

  useEffect(() => {
    const generateSignature = async () => {
      if (tokenId==undefined || !privateKeyDecoded) {
        return;
      }
      const sigOwner = await keySignManager.generateClaimSignature(
        privateKeyDecoded,
        ["uint256", "address"],
        [Number(tokenId), address]
      );
      const sigOwnerResolved = await sigOwner.claimSignature;
      setClaimData((prev) => {
        return ({
          ...prev,
          tokenId,
          sigOwner: sigOwnerResolved,
          sigClaimer,
        });
      });
    };

    generateSignature();
  }, [address, tokenId, privateKeyDecoded, sigClaimer, keySignManager]);

  return claimData;
};
