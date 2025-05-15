"use client";
import React, { useCallback, useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import Navbar from '../components/Navbar';


function motorcycletaxistandaddition() {

    const [lang, setLang] = useState("th");  // show search bar

    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang");

    useEffect(()=>{
        if (langParam){
            setLang(langParam);
        }
    },[langParam]);
    

  return (
    <div>
        <Navbar />
        <div className="flex items-center justify-center h-screen">
            {lang === "en" ? "This page is in development." : "หน้านี้อยู่ในระหว่างการพัฒนา"}
        </div>
    </div>
  );
}

export default motorcycletaxistandaddition;