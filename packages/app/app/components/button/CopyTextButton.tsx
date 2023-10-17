import {BiCopy} from "react-icons/bi";
import clsxm from "@/src/lib/clsxm";
import { toast } from "react-toastify";

type CopyTextButtonProps = {
    text: string;
    classNames?: string;
    title?: string;
}

export function CopyTextButton({text, classNames, title}: CopyTextButtonProps) {
    return (
        <button
            className={clsxm('text-lg', classNames)}
            onClick={() => {
                navigator.clipboard.writeText(text).then(value => {
                    toast.success('Copied to clipboard', {autoClose: 1000})
                });
            }}
        >
            {title}<BiCopy className=''/>
        </button>
    );
}
