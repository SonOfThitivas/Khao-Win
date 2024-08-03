"use client"
import React, {useState, useEffect} from 'react';
import dynamic from 'next/dynamic';     // For NestJS

function page() {

    // Import Map Components
    const Map = dynamic(async () => await import("./components/Map"),{
        ssr: false,
        loading: () => <p>loading...</p>
    })

    return (
        <div>
            <Map />
        </div>
    );
}

export default page;