import Present from "~/present.svg";
import {IoIosCheckmark} from "react-icons/io";
import {Card} from "@/app/components/Card";
import PackLinkDetails from "@/app/mint/pack/PackLinkDetails";
import {useUrlEncodeDecode} from "@/src/hooks/useUrlEncodeDecode";
import {usePackState} from "@/app/mint/usePackState";
import {useMintStore} from "@/src/stores/useMintStore";
import {CheckMyWalletButton} from "@/app/components/web3/CheckMyWalletButton";

export function PackCreatedCard() {
    const claimPrivateKey = useMintStore(state => state.claimKey?.private);
    const mintedTokenId = usePackState(state => state.mintedTokenId);
    const { urlEncoded, urlDecoded, decodedTokenId } = useUrlEncodeDecode(
        claimPrivateKey!,
        mintedTokenId!
    );
    return <Card
        className={'mx-auto w-full bg-green-800'}
        controls={
            <div className='w-full flex justify-between py-1 px-2'>
                <div>Created!</div>
                <CheckMyWalletButton/>
            </div>
        }>
        <div className="flex flex-col items-center gap-8">
            <div className="p-4 rounded-full bg-primary-500/25 relative">
                <Present className={'h-6 w-6'}/>
                <IoIosCheckmark className='bg-green-800 w-5 h-5 rounded-full absolute bottom-0 right-0 translate-x-1/4'/>
            </div>
            <h1 className="text-xl">Pack Created!</h1>
            <PackLinkDetails claimKey={urlEncoded}/>
        </div>
    </Card>
}
