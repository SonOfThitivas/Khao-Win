"use client"
import React, { useState, } from 'react';
import Link from 'next/link';
import { usePathname,} from 'next/navigation';

import { FiAlignJustify } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";

export function NavbarTH(){
    const [showMenu, setShowMenu] = useState(false);    // show menu dropdown
    const pathname = usePathname();                 // get pathname
    
    return (
        <>
        
            {/* dropdown */}
            <div className={'absolute z-30 ' + (showMenu ? " bg-white w-full " : "")}>
                <div className='flex justify-between'>
                    {/* dropdown button */}
                    <div className='p-1' onClick={() => setShowMenu(!showMenu)}><FiAlignJustify size={"3em"}/></div>
                    {/* language selector when dropdown menu is open */}
                    {showMenu && (
                    <>
                        <div className='flex justify-between items-center mr-3'>
                            <p className={"px-2 underline"}>
                                <Link href={"/th" + pathname.slice(3)}>TH</Link>
                            </p>
                            <p>|</p>
                            <p className={"px-2"}>
                                <Link href={"/en" + pathname.slice(3)}>EN</Link>
                            </p>
                        </div>
                    </>
                    )}
                </div>
                {/* dropdown menu */}
                {showMenu && (
                <div className="">
                    <Link href="/th/home" className="flex p-2 -ml-1 shadow-sm shadow-gray-300">
                        <div className='ml-2'><FaMapMarkedAlt size={"2em"}/></div>
                        <p className='p-1 ml-3'>หน้าหลัก</p>
                    </Link>
                    <Link href="/th/motorcycletaxistandaddition" className="flex p-2 -ml-1 shadow-sm shadow-gray-300">
                        <div className='ml-2'><MdPinDrop size={"2em"}/></div>
                        <p className='p-1 ml-3'>เพิ่มจุดบริการรถจักรยนตร์รับจ้าง</p>
                    </Link>
                    <Link href="/th/complaint" className="flex p-2 -ml-1 shadow-sm shadow-gray-300">
                        <div className='ml-2'><FaWpforms size={"2em"}/></div>
                        <p className='p-1 ml-3'>รับคำร้องเรียน</p>
                    </Link>
                    <Link href="/th/about" className="flex pt-2 pl-2 -ml-1 shadow-sm shadow-gray-300">
                        <div className='ml-2'><BsFillPeopleFill size={"2em"}/></div>
                        <p className='p-1 ml-3'>เกี่ยวกับเรา</p>
                    </Link>
                </div>
                )}
            </div>
        </>
    );
}

function Navbar() {
    const [showMenu, setShowMenu] = useState(false);    // show menu dropdown
    const pathname = usePathname();                 // get pathname
    
    return (
        <>
        
            {/* dropdown */}
            <div className={'absolute z-30' + (showMenu ? " bg-white w-full" : "")}>
                <div className='flex justify-between'>
                    {/* dropdown button */}
                    <div className='p-1' onClick={() => setShowMenu(!showMenu)}><FiAlignJustify size={"3em"}/></div>
                    {/* language selector when dropdown menu is open */}
                    {showMenu && (
                    <>
                        <div className='flex justify-between items-center mr-3'>
                            <p className={"px-2"}>
                                <Link href={"/th" + pathname.slice(3)} >TH</Link>
                            </p>
                            <p>|</p>
                            <p className={"px-2 underline"}>
                                <Link href={"/en" + pathname.slice(3)} >EN</Link>
                            </p>
                        </div>
                    </>
                    )}
                </div>
                {/* dropdown menu */}
                {showMenu && (
                <div className="">
                    <Link href="/en/home" className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><FaMapMarkedAlt size={"2em"}/></div>
                        <p className='p-1 ml-3'>Home</p>
                    </Link>
                    <Link href="/en/motorcycletaxistandaddition" className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><MdPinDrop size={"2em"}/></div>
                        <p className='p-1 ml-3'>Add new motorcycle stand</p>
                    </Link>
                    <Link href="/en/complaint" className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><FaWpforms size={"2em"}/></div>
                        <p className='p-1 ml-3'>Complaint form</p>
                    </Link>
                    <Link href="/en/about" className="flex pt-2 pl-2 -ml-1 shadow-sm">
                        <div className='ml-2'><BsFillPeopleFill size={"2em"}/></div>
                        <p className='p-1 ml-3'>About us</p>
                    </Link>
                </div>
                )}
            </div>
        </>
    );
}

export default Navbar;