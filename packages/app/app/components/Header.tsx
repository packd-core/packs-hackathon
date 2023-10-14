import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Wrapper } from "./Wrapper";
import {PackdLogo} from "@/app/components/header/PackdLogo";
import {CiTwitter} from "react-icons/ci";
import {AiFillTwitterSquare} from "react-icons/ai";
import {BsDisc, BsDiscord, BsGithub, BsTwitter} from "react-icons/bs";

const Header = () => {
  return (
    <header className="py-8 border-b mb-10 fixed top-0 left-0 right-0">
      <Wrapper>
        <div className="flex items-center justify-between">
          <PackdLogo />
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

export { Header };
