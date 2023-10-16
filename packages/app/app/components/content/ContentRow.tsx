import {ReactNode} from "react";

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
