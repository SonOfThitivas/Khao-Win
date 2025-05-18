"use client"

import React, { useEffect, useState, } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname,} from 'next/navigation';

import { FiAlignJustify } from "react-icons/fi";
import { FaWpforms } from "react-icons/fa";
import { BsFillPeopleFill } from "react-icons/bs";
import { FaMapMarkedAlt } from "react-icons/fa";
import { MdPinDrop } from "react-icons/md";

function Navbar() {
    
    const pathname = usePathname();                 // get pathname

    const [lang, setLang] = useState("th");         // language display
    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang");
    useEffect(() => {
        if (langParam) {
            setLang(langParam);
            // console.log("Language:", langParam);
        }
    }, [langParam]);

    const [showMenu, setShowMenu] = useState(false);    // show menu dropdown
    

    return (
        <>
            {/* dropdown */}
            <div className={'absolute z-30 p-1' + (showMenu ? " bg-white w-screen" : "")}>
                <div className='flex justify-between'>
                    {/* dropdown button */}
                    <div onClick={() => setShowMenu(!showMenu)}><FiAlignJustify size={"3em"}/></div>
                    {/* language selector when dropdown menu is open */}
                    {showMenu && (
                    <>
                        <div className='flex justify-between items-center mr-3'>
                            <p className={"px-2" + (lang === "th" ? " underline" : "")}>
                                <Link href={{pathname:pathname, query:{lang:"th"}}} replace={true}>TH</Link>
                            </p>
                            <p>|</p>
                            <p className={"px-2" + (lang === "en" ? " underline" : "")}>
                                <Link href={{pathname:pathname, query:{lang:"en"}}} replace={true}>EN</Link>
                            </p>
                        </div>
                    </>
                    )}
                </div>
                {/* dropdown menu */}
                {showMenu && (
                <div className="">
                    <Link href={{pathname:"/home", query:{lang:lang}}} className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><FaMapMarkedAlt size={"2em"}/></div>
                        <p className='p-1 ml-3'>{lang === "en" ? "Home" : "หน้าหลัก"}</p>
                    </Link>
                    <Link href={{pathname:"/motorcycletaxistandaddition", query: {lang:lang}}} 
                    className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><MdPinDrop size={"2em"}/></div>
                        <p className='p-1 ml-3'>{lang === "en" ? "Add new motorcycle stand" : "เพิ่มจุดจอดรถจักรยายนต์"}</p>
                    </Link>
                    <Link href={{pathname:"/management", query:{lang:lang}}} className="flex p-2 -ml-1 shadow-sm">
                        <div className='ml-2'><FaWpforms size={"2em"}/></div>
                        <p className='p-1 ml-3'>{lang === "en" ? "Comment form" : "รายงานการใช้บริการ"}</p>
                    </Link>
                    <Link href={{pathname:"/about", query:{lang:lang}}} className="flex pt-2 pl-2 -ml-1 shadow-sm">
                        <div className='ml-2'><BsFillPeopleFill size={"2em"}/></div>
                        <p className='p-1 ml-3'>{lang === "en" ? "About us" : "เกี่ยวกับเรา"}</p>
                    </Link>
                </div>
                )}
            </div>
        </>
    );
}

export default Navbar;