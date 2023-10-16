import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

type WrapperProps = {
    children: ReactNode;
    className?: string;
}
const Wrapper = ({children, className}: WrapperProps) => (
    <div className={clsxm("max-w-6xl mx-auto px-6", className)}>
        {children}
    </div>
);

export {Wrapper};
