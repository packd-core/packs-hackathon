import { useState, useEffect } from "react";
import { decodeUrl } from "../lib/encodeUrl";

export function useDecode(privateKey: string): {
  tokenId: number;
  privateKeyDecoded: string;
} {
  const [tokenId, setTokenId] = useState(0);
  const [privateKeyDecoded, setPrivateKeyDecoded] = useState("");

  useEffect(() => {
    if (privateKey && typeof privateKey === "string") {
      const { tokenId: id, privateKey: privateKeyDecoded } =
          decodeUrl(privateKey);
      setTokenId(id);
      setPrivateKeyDecoded(privateKeyDecoded);
    }
  }, [privateKey]);

  return { tokenId, privateKeyDecoded };
}
