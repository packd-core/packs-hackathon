import { useState, useCallback, useEffect } from "react";
import { useSignMessage } from "wagmi";
import useKeySignManager from "@/src/hooks/useKeySignManager";

export function useClaimKeys(balanceOf: number) {
  const [claimPublicKey, setClaimPublicKey] = useState("");
  const [claimPrivateKey, setClaimPrivateKey] = useState("");
  const [isMessagePrepared, setMessagePrepared] = useState(false);
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

  const prepareMessage = useCallback(async () => {
    console.log('prepareMessage')
    const msg = await keySignManager.prepareMessage(["uint256"], [balanceOf]);
    setMessage(msg);
    setMessagePrepared(true);
  }, [balanceOf, keySignManager]);

  useEffect(() => {
    if (isMessagePrepared){
        signMessage();
    }
  }, [isMessagePrepared, signMessage]);

  const handlePrepareAndSignMessage = useCallback(async () => {
    try {
      if (!isMessagePrepared) {
        await prepareMessage();
      }else {
        signMessage();
      }
    } catch (error) {
      console.error("Error preparing and signing message:", error);
    }
  }, [prepareMessage, isMessagePrepared, signMessage]);

  const handleGenerateClaimKey = useCallback(async () => {
    try {
      if (signData) {
        const { claimPublicKey: pubkey, claimPrivateKey: privkey } =
          await keySignManager.generateClaimKey(
            signData,
            ["uint256"],
            [balanceOf]
          );
        console.log("Generated private key: ", privkey); // Debugging line
        setClaimPublicKey(pubkey);
        setClaimPrivateKey(privkey);
      }
    } catch (error) {
      console.error("Error generating claim key:", error);
    }
  }, [signData, balanceOf]);

  // Call handleGenerateClaimKey whenever signData changes
  useEffect(() => {
    handleGenerateClaimKey();
  }, [signData, handleGenerateClaimKey]);

  return {
    claimPublicKey,
    claimPrivateKey,
    handlePrepareAndSignMessage,
    isSignLoading,
    isSignSuccess,
  };
}
