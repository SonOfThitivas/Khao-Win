"use client"

import React, { useEffect, useState, } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname,} from 'next/navigation';

import { useMediaQuery } from 'react-responsive';

import { FiAlignJustify } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaHome } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";


function Navbar() {
    
    const pathname = usePathname();                 // get pathname

    const [lang, setLang] = useState("th");         // language display
    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang");
    useEffect(() => {
        if (langParam) {
            setLang(langParam);
            console.log("Language:", langParam);
        }
    }, [langParam]);


    const [showMenu, setShowMenu] = useState(false);    // show menu dropdown
    const [isClient, setIsClient] = useState(false);    // fixed hyration error
    
    const isDesktopOrLaptop = useMediaQuery({minWidth: 1224})     // react-responsive
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})

    useEffect(() => {
        setIsClient(true);
    }
    , []);

    return (
        <>
            {isTabletOrMobile && isClient && (
                <>
                    {/* dropdown */}
                    <div className={'absolute z-30 p-1' + (showMenu ? " bg-white " : "")}>
                        <div className='flex justify-between'>
                            {/* dropdown button */}
                            <div onClick={() => setShowMenu(!showMenu)}><FiAlignJustify size={"2em"}/></div>
                            {/* language selector when dropdown menu is open */}
                            {showMenu && (
                            <div className='flex justify-between items-center mr-3'>
                                <p className={"px-2" + (lang === "th" ? " underline" : "")}>
                                    <Link href={{pathname:pathname, query:{lang:"th"}}}>TH</Link>
                                </p>
                                <p>|</p>
                                <p className={"px-2" + (lang === "en" ? " underline" : "")}>
                                    <Link href={{pathname:pathname, query:{lang:"en"}}}>EN</Link>
                                </p>
                            </div>
                            )}
                        </div>
                        {/* dropdown menu */}
                        {showMenu && (
                        <div className="w-screen">
                            <Link href={{pathname:"/home", query:{lang:lang}}} className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><FaHome size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang === "en" ? "Home" : "หน้าหลัก"}</p>
                            </Link>
                            <Link href={{pathname:"/motorcycletaxistandaddition", query: {lang:lang}}} 
                            className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><MdPinDrop size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang === "en" ? "Add new motorcycle stand" : "เพิ่มจุดจอดรถจักรยายนต์"}</p>
                            </Link>
                            <Link href="/management" className="flex p-2 -ml-1 shadow-sm">
                                <div className='ml-2'><FaWpforms size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang === "en" ? "Comment form" : "รายงานการใช้บริการ"}</p>
                            </Link>
                            <Link href="/about" className="flex pt-2 pl-2 -ml-1 shadow-sm">
                                <div className='ml-2'><BsFillPeopleFill size={"2em"}/></div>
                                <p className='p-1 ml-3'>{lang === "en" ? "About us" : "เกี่ยวกับเรา"}</p>
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