import {useState, useEffect} from "react";
import {encodeUrl, decodeUrl} from "../lib/encodeUrl";
import {useNetwork} from "wagmi";

export function useUrlEncodeDecode(
    claimPrivateKey: string,
    mintedTokenId: number
) {
    const [urlEncoded, setUrlEncoded] = useState("");
    const [urlDecoded, setUrlDecoded] = useState("");
    const [decodedTokenId, setDecodedTokenId] = useState(0);
    const {chain} = useNetwork();

    // Convert claimPrivateKey to base64
    useEffect(() => {
        if (claimPrivateKey && mintedTokenId && chain) {
            setUrlEncoded(encodeUrl(1, claimPrivateKey, chain.id, mintedTokenId));
        }
    }, [claimPrivateKey, mintedTokenId, chain]);

    useEffect(() => {
        if (urlEncoded) {
            const {privateKey, tokenId} = decodeUrl(urlEncoded);
            setUrlDecoded(privateKey);
            setDecodedTokenId(tokenId);
        }
    }, [urlEncoded]);

    return {urlEncoded, urlDecoded, decodedTokenId};
}
