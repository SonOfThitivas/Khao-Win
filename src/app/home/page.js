// Updated page.js
'use client';

import React, { useCallback, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { useMediaQuery } from 'react-responsive';

const Map = dynamic(() => import('../components/Map'), {
    ssr: false,
    loading: () => <div>Loading...</div>
});

function Home() {
    const [searchTerm, setSearchTerm] = useState('');
    const [mapCenter, setMapCenter] = useState(null);

    const isDesktopOrLaptop = useMediaQuery({minWidth: 1224})       // react-responsive
    const isTabletOrMobile = useMediaQuery({maxWidth: 1224})

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            if (searchTerm.trim() !== '') {
                setMapCenter(null); // Reset map center before search
            }
        }
    };

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue === 'focusSearch') {
            document.querySelector('.search-input').focus();
        } else {
            window.location.href = selectedValue;
        }
    };

    return (
        <div className="homepage">
            <header className="headerhome">
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
            </header>
            <main className="map">
                <Map searchTerm={searchTerm} mapCenter={mapCenter} onMapCenterUpdate={setMapCenter} />
            </main>
            <footer className="footerhome">
                <div id="navbody">
                    <form>
                        <ul className="ul">
                            <li className="li">
                                <input
                                    className="radio"
                                    name="rad"
                                    id="choose1"
                                    type="radio"
                                    value="/home"
                                    defaultChecked
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg w-6 h-6 text-gray-800 dark:text-white"
                                    >
                                        <path
                                            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className="li">
                                <input
                                    className="radio"
                                    name="rad"
                                    id="choose2"
                                    type="radio"
                                    value="focusSearch"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg w-6 h-6 text-gray-800 dark:text-white"
                                    >
                                        <path
                                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className="li">
                                <input
                                    className="radio"
                                    name="rad"
                                    id="choose3"
                                    type="radio"
                                    value="/management"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose3">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className="svg w-6 h-6 text-gray-800 dark:text-white"
                                    >
                                        <path
                                            d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="square"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className="li">
                                <input
                                    className="radio"
                                    name="rad"
                                    id="choose4"
                                    type="radio"
                                    value="/about"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                        aria-hidden="true"
                                        className="svg w-6 h-6 text-gray-800 dark:text-white"
                                    >
                                        <path
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                        </ul>
                    </form>
                </div>
            </footer>
        </div>
    );
}

export default Home;
