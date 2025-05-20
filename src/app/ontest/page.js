"use client"
import React, {useState, useRef, useEffect} from 'react';
import { TbCaretUpDownFilled } from "react-icons/tb";
import Info from '../components/info';


function page() {
    const info_param = [];
    const [heightPer, setHieghtPer] = useState(8);

    function handleHieghtPer(){
        if (heightPer === 8) setHieghtPer(90);
        else setHieghtPer(8)
    }

    return(
        <>  
            <div className={`absolute z-20 bg-white w-full bottom-0 border-2 border-black rounded-t-2xl overflow-hidden duration-200 ease-in-out`}
            style={{height: `${heightPer}%`}}>
                <div className='flex justify-center border-b shadow-md' onClick={handleHieghtPer}>
                    <TbCaretUpDownFilled size={"3rem"}/>
                </div>
                <div className='w-full h-full overflow-auto'>
                    <Info win_data={info_param} lang={lang}/>
                </div>
            </div>
        </>
    );
}

export default page;