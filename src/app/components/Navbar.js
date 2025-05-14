"use client"

import React, {use, useEffect, useState } from 'react';
import Link from 'next/link';

import { useMediaQuery } from 'react-responsive';

import { FiAlignJustify } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";


function Navbar({handleLangChangeChild}) {
    
    const [lang, setLang] = useState("thai");  // show search bar

    const [showMenu, setShowMenu] = useState(false);    // show menu dropdown
    const [isClient, setIsClient] = useState(false);    // fixed hyration error
    
    const isDesktopOrLaptop = useMediaQuery({minWidth: 1224})     // react-responsive
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})

    useEffect(() => {
        setIsClient(true);
    }
    , []);

    useEffect(() => {
        handleLangChangeChild(lang);
    }, [lang]);

    return (
        <>
            {isTabletOrMobile && isClient && (
                <>
                    <div className={'absolute z-30 p-1' + (showMenu ? " bg-white " : "")}>
                        <div className='flex justify-between border border-red-400'>
                            <div onClick={() => setShowMenu(!showMenu)}><FiAlignJustify size={"2em"}/></div>
                            {showMenu && (
                            <div className='flex justify-between items-center mr-3 border border-red-400'>
                                <p className={"px-2" + (lang == "thai" ? " underline" : "")}
                                onClick={()=>setLang("thai")}>TH</p>
                                <p className='px-2'>|</p>
                                <p className={"px-2" + (lang == "eng" ? " underline" : "")}
                                onClick={()=>setLang("eng")}>EN</p>
                            </div>
                            )}
                        </div>
                        {showMenu && (
                        <div className="w-screen">
                            <Link href="/home" className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><FaHome size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang == "eng" ? "Home" : "หน้าหลัก"}</p>
                            </Link>
                            <Link href="/motorcycletaxistandaddition" className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><MdPinDrop size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang == "eng" ? "Add new motorcycle stand" : "เพิ่มจุดจอดรถจักรยายนต์"}</p>
                            </Link>
                            <Link href="/management" className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><FaWpforms size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang == "eng" ? "Comment form" : "รายงานการใช้บริการ"}</p>
                            </Link>
                            <Link href="/about" className="flex pt-2 pl-2 -ml-1 shadow-sm">
                                <div className='ml-2'><BsFillPeopleFill size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang == "eng" ? "About us" : "เกี่ยวกับเรา"}</p>
                            </Link>
                        </div>
                        )}
                    </div>
                </>
            )}
        </>
    );
}

export default Navbar;