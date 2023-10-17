import {ImNewTab} from "react-icons/im";
import {ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";

type ExternalLinkProps = {
    className?: string;
    href: string;
    children?: ReactNode;
}
export function ExternalLink({className, href, children}: ExternalLinkProps) {
    return <a
        href={href}
        target={'_blank'}
        className={clsxm('text-primary-500',className)}>
        {children} <ImNewTab className="inline"/>
    </a>
}
