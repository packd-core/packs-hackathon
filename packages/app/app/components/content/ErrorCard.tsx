import {Card} from "@/app/components/Card";
import clsxm from "@/src/lib/clsxm";
import Button from "@/app/components/button/Button";
import {BsX} from "react-icons/bs";
import {IoWarning} from "react-icons/io5";

type ErrorCardProps = {
    className?: string;
    children?: React.ReactNode;
    title?: string;
    text?: string;
    onCloseClick?: ()=>void;
}

export function ErrorCard({className, children, title, onCloseClick}: ErrorCardProps) {
    return <Card
        className={clsxm('mx-auto w-full bg-gray-800', className)}
        containerClassName='max-h-[60vh] overflow-y-auto'
        controls={
            <div className='w-full flex justify-center py-1'>
                <Button variant='navigation' onClick={onCloseClick} leftIcon={<BsX className='text-lg'/>}> Back </Button>
            </div>}>
        <div className="flex flex-col items-center gap-2">
            <div className="p-2 rounded-full bg-gray-800">
                <IoWarning className={'h-10 w-10'}/>
            </div>
            <h1 className="text-lg sm:text-xl pt-4">{title ?? 'Ooops, something went wrong :('}</h1>
            {children}
        </div>
    </Card>
}
