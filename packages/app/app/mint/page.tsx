import {Card} from "@/app/components/Card";
import {Wrapper} from "@/app/components/Wrapper";
import {AiOutlineArrowLeft} from "react-icons/ai";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";

const MintPage = () => {
    return (
        <main>
            <Wrapper className='min-h-screen flex items-center'>
                <Card
                    className={'mx-auto w-full'}
                    controls={
                    <div className='w-full flex justify-between py-1'>
                        <button className='flex items-center gap-1 px-2'>
                            <FiArrowLeft className='text-inherit inline'/>
                            Back
                        </button>
                        <button className='flex items-center gap-1 px-2'>
                            Next
                            <FiArrowRight className='text-inherit inline'/>
                        </button>
                    </div>
                }>
                    <h1 className='text-2xl'>Welcome to Packd</h1>
                    <h2 className='text-2xl'>Welcome to Packd</h2>
                    <h3 className='text-2xl'>Welcome to Packd</h3>
                    <h4 className='text-2xl'>Welcome to Packd</h4>
                </Card>
            </Wrapper>
        </main>
    );
};

export default MintPage;
