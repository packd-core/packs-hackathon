import { useState, useCallback } from "react";
import { useSignMessage } from "wagmi";
import useKeySignManager from "@/src/hooks/useKeySignManager";

export const usePrepareAndSignMessage = (
  tokenId: number | null,
  maxRefundValue: bigint
) => {
  const [message, setMessage] = useState<string | undefined>(undefined);
  const keySignManager = useKeySignManager();
  const {
    data: signData,
    isError: isSignError,
    isLoading: isSignLoading,
    isSuccess: isSignSuccess,
    signMessage,
  } = useSignMessage({
    message,
  });

  const handlePrepareAndSignMessage = useCallback(async () => {
    try {
      const msg = await keySignManager.prepareMessage(
        ["uint256", "uint256"],
        [Number(tokenId), maxRefundValue]
      );
      console.log("Message:", msg);
      setMessage(msg);
      signMessage({ message: msg });
    } catch (error) {
      console.error("Error preparing message:", error);
    }
  }, [keySignManager, tokenId, maxRefundValue, signMessage]);

  return {
    signData,
    isSignError,
    isSignLoading,
    isSignSuccess,
    signMessage,
    handlePrepareAndSignMessage,
  };
};
