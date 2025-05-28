"use client"
import React, {useEffect, useState, useCallback, use } from 'react';
import dynamic from 'next/dynamic';

import {NavbarTH} from '../../components/navbar';

const MapTH = dynamic(() => import('../../components/map').then((mod)=>mod.MapTH), {
    ssr: false,
    loading: () => <div className=' text-center w-screen '>loading...</div>,
});


function Home() {
    return (
        <div  className="relative">
            <NavbarTH />
            {/* Map layout */}
            <MapTH />
            
        </div>
    );
}

export default Home;
