import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

type CardProps = {
    children: ReactNode;
    controls?: ReactNode;
    className?: string;
    containerClassName?: string;
    controlsClassName?: string;
}

export const Card = ({children, controls, className, containerClassName, controlsClassName}: CardProps) => (
    <div className={clsxm('bg-brand rounded-3xl shadow-2xl max-w-md', className)}>
        <div className={clsxm("bg-back text-white rounded-3xl shadow-2xl p-6", containerClassName)}>
            {children}
        </div>
        {controls && <div className={clsxm("p-2 text-white", controlsClassName)}>
            {controls}
        </div>}
    </div>

);
