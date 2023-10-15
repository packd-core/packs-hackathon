import Help from "~/help.svg";
import {ContentCard} from "@/app/components/content/ContentCard";

type HelpItemProps = {
    title: string;
    children: React.ReactNode;
    className?: string;
}
export const HelpItem = ({ title, children, className }: HelpItemProps ) => {
    return <ContentCard className={className}>
        <span className='text-card-title flex items-center text-sm'>
            <Help className='h-4 w-4 inline mr-2'/> {title}
            </span>
        <div className='p-2 rounded-lg text-gray-300 text-sm'>
            {children}
        </div>
    </ContentCard>
}
