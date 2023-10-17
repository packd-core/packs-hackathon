import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

type ContentRowProps = {
    label: ReactNode;
    value: ReactNode;
}

export function ContentRow({label, value}: ContentRowProps) {
    return <div className="bg-gray-800 rounded-full flex justify-between px-2 py-1">
        <span className="flex justify-center items-center font-semibold text-gray-500">{label}</span>
        <span className="flex justify-center items-center font-semibold text-white">{value}</span>
    </div>;
}

type ContentTitleProps = {
    children: ReactNode;
    className?: string;
    borderBottom?: boolean;
    borderTop?: boolean;
}

export function ContentTitle({children, className, borderBottom = true, borderTop = false}: ContentTitleProps) {
    return <div className={clsxm("self-stretch border-gray-500 text-sm py-2",
        {
            'border-b-[1px]': borderBottom,
            'border-t-[1px]': borderTop,
        }, className)}>
        {children}
    </div>;
}
