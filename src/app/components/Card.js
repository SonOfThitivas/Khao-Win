import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { useMediaQuery } from 'react-responsive';
import { MdEmail } from 'react-icons/md';

function CardOnMobile({data}){
    return(
        <>
            <Image className='m-3 border-4 border-black rounded-3xl' 
            src={data.imgPath} 
            width={200} 
            height={200}
            alt={data.id}
            priority={true}
            />
            <div className='mb-1 w-full h-full justify-center content-center'>
                <p className='text-3xl text-center'>{data.nameEN}</p>
                <div className='mb-1 flex flex-col'>
                    <div className='w-full flex justify-center'>
                        <p className='px-1'>position:</p>
                        <p className='px-1'>{data.positionEN}</p>
                    </div>
                    <div className='w-full flex justify-center flex-wrap'>
                        <p className='px-1 justify-end flex'><MdEmail size={20}/>Email:</p>
                        <p className='px-1'>{data.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

function CardOnDesktop({data}){
    return(
        <>
            <div>
                <Image className='m-3 border-4 border-black rounded-3xl' 
                src={data.imgPath} 
                width={300} 
                height={300}
                alt={data.id}
                priority={true}
                />
            </div>
            <div className='mb-1 w-1/2 h-full justify-center content-center'>
                <p className='text-3xl text-center'>{data.nameEN}</p>
                <div className='mb-1 flex flex-col'>
                    <div className='w-full py-1 flex justify-center'>
                        <p className='px-1'>position:</p>
                        <p className='px-1'>{data.positionEN}</p>
                    </div>
                    <div className='w-full py-1 flex justify-center flex-wrap'>
                        <p className='px-1 justify-end flex'><MdEmail size={20}/>Email:</p>
                        <p className='px-1'>{data.email}</p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default function Card({data}){
    const [isClient, setIsClient] = useState(false);
    const isDesktopOrLaptop = useMediaQuery({minWidth: 769})     // react-responsive
    const isTabletOrMobile = useMediaQuery({maxWidth: 768})

    useEffect(()=>{setIsClient(true)},[]);

    return (
        <>
            
            {isTabletOrMobile && isClient && (
                <>
                    <div className="flex flex-col items-center justify-center
                    border-4 border-black rounded-3xl m-5 bg-orange-200">
                        <CardOnMobile data={data}/>
                    </div>
                </>
            )}

            {isDesktopOrLaptop && isClient && (
                <>
                    <div className={"flex flex-grow items-center justify-center" + 
                    " border-b-4 border-black m-5 shadow-xl" + 
                    ((data.id) % 2 === 0 ? " flex-row-reverse" : " flex-row")}>
                        <CardOnDesktop data={data}/>
                    </div>
                </>
            )}
        </>
    )
}
