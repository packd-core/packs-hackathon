import {Menu, Transition} from '@headlessui/react'
import {FcSettings} from "react-icons/fc";
import {HelpItem} from "@/app/components/content/HelpItem";
import Button from "@/app/components/button/Button";
import {BsLink45Deg, BsX} from "react-icons/bs";
import {useState} from "react";
import RevokePackModal from "@/app/components/dashboard/RevokePackModal";
import ClaimLinkModal from "@/app/components/dashboard/ClaimLinkModal";


export function PackActionsMenu() {
    const [isRevokeOpen, setIsRevokeOpen] = useState(false)
    const [isClaimOpen, setIsClaimOpen] = useState(false)
    return (
        <Menu >
            <RevokePackModal isOpen={isRevokeOpen} setIsOpen={setIsRevokeOpen}/>
            <ClaimLinkModal isOpen={isClaimOpen} setIsOpen={setIsClaimOpen}/>
            <Menu.Button ><FcSettings/></Menu.Button>

            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items
                    unmount={false}
                    className="text-white p-4 absolute right-0 mt-2 w-80 origin-top-right gap-4 flex flex-col rounded-2xl bg-gray-900">
                    <div className='flex justify-between '>
                        Pack Actions
                    </div>
                    <Menu.Item>
                        {({active}) => (
                            <HelpItem title={'Regenerate Claim Link'}>
                                <p>Lost your claim link? Regenerate it here by signing a message with the address that
                                    created the Pack.</p>
                                <div className='flex justify-end'>
                                    <Button
                                        onClick={() => setIsClaimOpen(true)}
                                        leftIcon={<BsLink45Deg className="text-xl"/>}
                                            className={"bg-gray-300 border-transparent text-black"}>Claim Link </Button>
                                </div>

                            </HelpItem>
                        )}
                    </Menu.Item>
                    <Menu.Item>
                        {({active}) => (
                            <HelpItem title={'Revoke Pack'}>
                                <p>If a Pack hasn&apos;t been claimed, you can revoke it to retrieve your assets. This is
                                    often preferable to self-claiming the Pack.</p>
                                <div className='flex justify-end'>
                                    <Button
                                        onClick={() => setIsRevokeOpen(true)}
                                        leftIcon={<BsX className="text-xl"/>}>Revoke Pack </Button>
                                </div>
                            </HelpItem>
                        )}
                    </Menu.Item>
                </Menu.Items>
            </Transition>
        </Menu>
    )
}
