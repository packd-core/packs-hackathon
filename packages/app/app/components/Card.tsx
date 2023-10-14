import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

type CardProps = {
    children: ReactNode;
    controls?: ReactNode;
    className?: string;
}

export const Card = ({ children, controls, className }: CardProps ) => (
    <div className={clsxm('bg-brand rounded-3xl shadow-2xl max-w-md', className)}>
        <div className="bg-back text-white rounded-3xl shadow-2xl p-6">
            {children}
        </div>
        {controls && <div className="p-2 text-white">
            {controls}
        </div>}
    </div>

    );
