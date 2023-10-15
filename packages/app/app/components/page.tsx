import {Card} from "@/app/components/Card";
import {Wrapper} from "@/app/components/Wrapper";
import {FiArrowLeft, FiArrowRight} from "react-icons/fi";
import Button from "@/app/components/button/Button";

const ComponentsPage = () => {
    return (
        <main>
            <Wrapper className='min-h-screen flex items-center'>
                <Card
                    className={'mx-auto w-full'}>
                    <div className="flex flex-col items-center gap-2">
                        {['primary', 'outline', 'flat', 'text'].map((variant) => (
                            <div key={variant} className='flex flex-col items-center gap-2'>
                                <Button isLoading={true} variant={variant as any} isDarkBg={false}
                                        disabled={false}> {variant} </Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={true}
                                        disabled={false}>  {variant} isDarkBg </Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={false}
                                        disabled={true}> {variant} disabled</Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={true}
                                        disabled={true}> {variant} isDarkBg disabled</Button>
                            </div>
                        ))}
                    </div>
                </Card>
                <Card
                    className={'mx-auto w-full'}
                containerClassName={'bg-white'}>
                    <div className="flex flex-col items-center gap-2">
                        {['primary', 'outline', 'flat', 'text'].map((variant) => (
                            <div key={variant} className='flex flex-col items-center gap-2'>
                                <Button isLoading={true} variant={variant as any} isDarkBg={false}
                                        disabled={false}> {variant} </Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={true}
                                        disabled={false}>  {variant} isDarkBg </Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={false}
                                        disabled={true}> {variant} disabled</Button>
                                <Button isLoading={true} variant={variant as any} isDarkBg={true}
                                        disabled={true}> {variant} isDarkBg disabled</Button>
                            </div>
                        ))}
                    </div>
                </Card>
            </Wrapper>
        </main>
    );
};

export default ComponentsPage;
