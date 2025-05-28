"use client"
import React, {useEffect, useState, useCallback, use } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';

import Navbar from '../../components/navbar';

const Map = dynamic(() => import('../../components/map'), {
    ssr: false,
    loading: () => <div className=' text-center w-screen '>loading...</div>,
});


function Home() {
    // const [searchTerm, setSearchTerm] = useState('');
    // const [mapCenter, setMapCenter] = useState(null);

    // const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    // };

    // const handleKeyDown = (event) => {
    //     if (event.key === 'Enter') {
    //         event.preventDefault();
    //         if (searchTerm.trim() !== '') {
    //             setMapCenter(null); // Reset map center before search
    //         }
    //     }
    // };

    // const handleRadioChange = (event) => {
    //     const selectedValue = event.target.value;
    //     if (selectedValue === 'focusSearch') {
    //         document.querySelector('.search-input').focus();
    //     } else {
    //         window.location.href = selectedValue;
    //     }
    // };

    return (
        <div  className="relative">
            <Navbar />
            {/* Map layout */}
            <Map />
            
            {/* search fillbox */}
            {/* <header className="headerhome">
                <div className="container-input">
                <input 
                  type="text" 
                  placeholder="Search" 
                  name="text" 
                  className="input" 
                  value={searchTerm} // ใช้ searchTerm เป็นค่าใน input
                  onChange={handleSearchChange} // เรียก handleSearchChange เมื่อมีการเปลี่ยนแปลง
                />
                <svg fill="#000000" width="20px" height="20px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg" aria-label="Search">
                  <path d="M790.588 1468.235c-373.722 0-677.647-303.924-677.647-677.647 0-373.722 303.925-677.647 677.647-677.647 373.723 0 677.647 303.925 677.647 677.647 0 373.723-303.924 677.647-677.647 677.647Zm596.781-160.715c120.396-138.692 193.807-319.285 193.807-516.932C1581.176 354.748 1226.428 0 790.588 0S0 354.748 0 790.588s354.748 790.588 790.588 790.588c197.647 0 378.24-73.411 516.932-193.807l516.028 516.142 79.963-79.963-516.142-516.028Z" fillRule="evenodd"></path>
                </svg>
                </div>
            </header> */}

        </div>
    );
}

export default Home;
