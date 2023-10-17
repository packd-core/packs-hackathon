import {ContentRow, ContentTitle} from "@/app/components/content/ContentRow";


export const ReviewForm = () => (

    <div className="flex flex-col w-full gap-2">
        <div className='text-center pb-8'>
            <h2 className="text-2xl font-bold ">Review Pack Content</h2>
        </div>
        <ContentTitle>Contents</ContentTitle>
        <ContentRow
            label="ETH"
            value={0.01}/>
        <ContentTitle borderBottom={false} className='pb-0'>Tokens</ContentTitle>

        <ContentRow
            label="RPL"
            value={1000}/>
        <ContentTitle borderBottom={false} className='pb-0'>NFTs</ContentTitle>

        <ContentRow
            label="Bored Ape"
            value="tokenId: 1875"/>
        <table className="font-semibold mt-4">
            <tbody>
            <tr>
                <td className='text-gray-500'>Chain</td>
                <td className='text-right'>Base</td>
            </tr>
            <tr>
                <td className='text-gray-500'>Gas fees</td>
                <td className='text-right'>$1.00</td>
            </tr>
            </tbody>
        </table>
    </div>)
