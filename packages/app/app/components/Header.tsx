'use client'
import {ConnectButton} from "@rainbow-me/rainbowkit";
import {Wrapper} from "./Wrapper";
import {PackdLogo} from "@/app/components/header/PackdLogo";
import {CiTwitter} from "react-icons/ci";
import {AiFillTwitterSquare} from "react-icons/ai";
import {BsDisc, BsDiscord, BsGithub, BsTwitter} from "react-icons/bs";
import {useEffect, useRef, useState} from "react";
import clsxm from "@/src/lib/clsxm";
import Link from "next/link";

const Header = () => {
    const [scrolled, setScrolled] = useState(false);
    useEffect(() => {
        const observer = new IntersectionObserver(([entry]) => {
            setScrolled(!entry.isIntersecting)
        });
        const trigger = document.querySelector('[data-header-trigger]');
        if (trigger) {
            observer.observe(trigger);
        }
        return () => {
            observer.disconnect();
        }
    }, []);
    return (
        <header
            className={clsxm(
                'z-20 py-4 mb-4 sm:py-8 sm:mb-10 border-b sticky top-0 left-0 right-0',
                'transition duration-200',
                scrolled && 'backdrop-blur-md bg-black/10')}>
            <Wrapper>
                <div className="flex items-center justify-between">
                    <Link href={'/'}>
                        <PackdLogo/>
                    </Link>
                    <div className='flex h-full items-center gap-2'>
                        <BsTwitter className='text-white text-2xl hidden sm:flex'/>
                        <BsDiscord className='text-white text-2xl hidden sm:flex'/>
                        <BsGithub className='text-white text-2xl hidden sm:flex'/>
                        <div className='w-[1px] bg-white/20 h-[34px]'></div>
                        <ConnectButton
                            showBalance={false}
                            accountStatus="address"
                            label="Connect"
                        />
                    </div>
                </div>
            </Wrapper>
        </header>
    );
};

export {Header};
