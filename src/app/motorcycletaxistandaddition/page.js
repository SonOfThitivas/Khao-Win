"use client";
import React, { useState } from 'react';

import Navbar from '../components/Navbar';


function motorcycletaxistandaddition() {
    const [lang, setLang] = useState("thai");  // show search bar

  return (
    <div>
        <Navbar handleLangChangeChild={handleLangChange}/>
        <div className="flex items-center justify-center h-screen">
            {lang == "eng" ? "This page is in development." : "หน้านี้อยู่ในระหว่างการพัฒนา"}
        </div>
    </div>
  );
}

export default motorcycletaxistandaddition;