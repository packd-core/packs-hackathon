import React, {forwardRef, ReactNode} from "react";
import clsxm from "@/src/lib/clsxm";
import {ImSpinner2} from "react-icons/im";
import Link from "next/link";


type ButtonLinkProps = {
    isDarkBg?: boolean;
    variant?: 'primary' | 'outline' | 'flat' | 'text' | 'navigation';
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
} & React.ComponentPropsWithRef<typeof Link>;


const ButtonLink = forwardRef<HTMLAnchorElement, ButtonLinkProps>(
    (
        {
            children,
            className,
            variant = 'primary',
            isDarkBg = false,
            leftIcon: LeftIcon,
            rightIcon: RightIcon,
            ...rest
        },
        ref
    ) => {

        return (
            <Link
                ref={ref}
                className={clsxm(
                    'inline-flex items-center rounded-full font-medium',
                    'focus-visible:ring-primary-500 focus:outline-none focus-visible:ring',
                    'shadow-sm',
                    'transition-colors duration-75',
                    'px-3 py-1.5', 'text-sm md:text-base',
                    //#region  //*=========== Variants ===========
                    [
                        variant === 'primary' && [
                            'bg-primary-500 text-white',
                            'border-primary-600 border',
                            'hover:bg-primary-600 hover:text-white',
                            'active:bg-back',
                            'disabled:bg-primary-700 disabled:opacity-40',
                        ],
                        variant === 'outline' && [
                            'text-primary-500',
                            'border-primary-500 border',
                            'hover:bg-primary-50/20 active:bg-primary-100/30',
                            'hover:border-primary-700 hover:text-primary-700',
                            isDarkBg &&
                            'hover:bg-gray-900 active:bg-gray-800 hover:text-white',
                            'disabled:bg-gray-800/40 disabled:opacity-40 disabled:hover:text-primary-500',
                        ],
                        variant === 'flat' && [
                            'text-primary-500',
                            'shadow-none',
                            'hover:bg-primary-50 active:bg-primary-100 disabled:bg-primary-100',
                            isDarkBg &&
                            'hover:text-white hover:bg-gray-900 active:bg-gray-800 disabled:bg-gray-800',
                        ],
                        variant === 'text' && [
                            'text-primary-500',
                            'shadow-none',
                            'hover:text-primary-700 active:text-primary-800 disabled:text-primary-500/40',
                            isDarkBg &&
                            'hover:text-white active:text-primary-300',
                        ],
                        variant === 'navigation' && [
                            'text-white',
                            'shadow-none',
                            'hover:text-gray-300 active:text-back disabled:text-white/40',
                        ],
                    ],
                    //#endregion  //*======== Variants ===========
                    'disabled:cursor-not-allowed',
                    className
                )}
                {...rest}
            >
                {LeftIcon}
                {children}
                {RightIcon}
            </Link>
        );
    }
);

ButtonLink.displayName = 'ButtonLink';
export default ButtonLink;
