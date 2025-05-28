"use client"
import React, {useEffect, useState, useCallback, use } from 'react';
import dynamic from 'next/dynamic';

import Navbar from '../../components/Navbar';

const Map = dynamic(() => import('../../components/Map'), {
    ssr: false,
    loading: () => <div className=' text-center w-screen '>loading...</div>,
});


function Home() {

    return (
        <div  className="relative">
            <Navbar />
            {/* Map layout */}
            <Map />
            
            
        </div>
    );
}

export default Home;
