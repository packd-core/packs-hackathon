import type { NextApiRequest, NextApiResponse } from 'next'
import { PackMain__factory } from '@/app/abi/types/factories/contracts/PackMain__factory'
import { z } from 'zod';
import { PackMain } from '@/app/abi/types';

export type ResponseData = {
    error: string
    details?: object
} | {
    hash: string,
    chainId: string,
    message: string
}


const RelayerRequestSchema = z.object({
    mainContractAddress: z.string(),

    args: z.object({
        tokenId: z.string(),
        sigOwner: z.string(),
        claimer: z.string(),
        sigClaimer: z.string(),
        refundValue: z.string(), // bignumber
        maxRefundValue: z.string()
    })
})

export type RelayerRequest = z.infer<typeof RelayerRequestSchema>

const getRelayerAccount = (): string => {
    const pk = process.env.RELAYER_SIGNER_PRIVATE_KEY
    if (!pk) {
        throw new Error('RELAYER_SIGNER_PRIVATE_KEY env variable is not set')
    }
    return pk
}
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<ResponseData>
) {
    if (req.method !== 'POST') {
        res.status(400).send({ error: '404 not found' })
        return;
    }
    const parsedBody = RelayerRequestSchema.safeParse(req.body)
    if (!parsedBody.success) {
        res.status(400).send({ error: 'Invalid body parameters', details: parsedBody.error })
        return;
    }

    const tx = parsedBody.data

    console.log('Relay request', tx);
    try {
        const packMain = PackMain__factory.connect(getRelayerAccount()).attach(tx.mainContractAddress) as PackMain;// NOt sure why is this changing the type
        const openReceipt = await packMain.open(tx.args, [])
        console.log(openReceipt);
        res.status(200).send({
            hash: openReceipt.hash,
            chainId: openReceipt.chainId.toString(),
            message: "Transaction sent"
        });
    } catch (error) {
        console.log(error);
    }
}