import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

export function ToggleButton(props: { selected: boolean, onClick: () => void, children: ReactNode }) {
    return <button className={clsxm(
        'text-white rounded px-2 sm:px-4 py-1',
        'hover:text-gray-100 hover:bg-black/30'
        , props.selected && "bg-black text-primary-500 hover:text-primary-500/80 hover:bg-black/80")}
                   onClick={props.onClick}> {props.children}</button>;
}
