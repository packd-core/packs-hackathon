import {ContentTitle} from "@/app/components/content/ContentRow";
import {useEffect} from "react";
import Button from "@/app/components/button/Button";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import {usePackState} from "@/app/mint/usePackState";
import usePackdAddresses from "@/src/hooks/usePackdAddresses";
import {useNetwork} from "wagmi";
import {useMintStore} from "@/src/stores/useMintStore";
import Erc721Card from "@/app/mint/modules/Erc721Module";
import Erc20Card from "@/app/mint/modules/Erc20Module";
import {ContentCard} from "@/app/components/content/ContentCard";
import useMintPack from "@/src/hooks/useMintPack";
import {BsX} from "react-icons/bs";
import {formatEther} from "ethers";


export const ReviewForm = () => {

    const setHash = usePackState(state => state.setLoading)
    const previousStep = usePackState(state => state.previousStep)
    const setControls = usePackState(state => state.setControls)
    const addresses = usePackdAddresses();
    const modules = useMintStore(state => state.modules)
    const amountEth = useMintStore(state => state.eth)
    const {chain} = useNetwork();
    const {write, isLoading, error, data} = useMintPack();
    useEffect(() => {
        if (data?.hash) {
            setHash(data!.hash)
        }
    }, [data, setHash]);
    useEffect(() => {
        setControls(<div className='w-full flex justify-between py-1'>
            <Button
                onClick={previousStep}
                variant="navigation"
                leftIcon={<FiArrowLeft className='text-inherit inline'/>}>
                Back
            </Button>
            <Button
                onClick={() => write && write()}
                variant="navigation" rightIcon={<FiArrowRight className='text-inherit inline'/>}>
                Pack it!
            </Button>
        </div>)
    }, [setControls, previousStep, write]);
    return (
        <div className="flex flex-col w-full gap-2">
            <div className='text-center pb-8'>
                <h2 className="text-2xl font-bold ">Review Pack Content</h2>
            </div>
            <ContentTitle>Contents</ContentTitle>
            <ContentCard className="self-stretch">
                <div className="flex justify-between">
                    <span className="text-card-title">Eth</span>
                </div>
                <input className="text-right w-full " disabled={true}
                       value={formatEther(amountEth ?? 0)}/>
            </ContentCard>
            {modules.map((module, index) => {
                if (module.moduleAddress === addresses.ERC721Module) {
                    return <Erc721Card key={module.address + module.value}
                                       module={module}/>
                }
                if (module.moduleAddress === addresses.ERC20Module) {
                    return <Erc20Card key={module.address + module.value}
                                      module={module}/>
                }
                return <ContentCard key={module.address + module.value}>
                    <ContentTitle>Unknown module</ContentTitle>
                </ContentCard>;
            })
            }
            <table className="font-semibold mt-4">
                <tbody>
                <tr>
                    <td className='text-gray-500'>Chain</td>
                    <td className='text-right'>{chain?.name}</td>
                </tr>
                <tr>
                    <td className='text-gray-500'>Gas fees</td>
                    <td className='text-right'>$1.00</td>
                </tr>
                </tbody>
            </table>
        </div>);
}
