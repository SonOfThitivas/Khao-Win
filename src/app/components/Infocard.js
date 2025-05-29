import React, { useState, useEffect} from "react";
import "./info-style.css";

export function InfoCardTH({win_data = {}, showInfo=false, setShowInfo}){

    /*                 win_data
    ==================================================
    index |         name      |     type
    0       win_name            -> Object
    1       win_price           -> Object
    2       win_location        -> Object
    3       win_time            -> Object
    4       win_rider           -> Object
    5       win_most_user_time  -> Object
    6       win_credit          -> Object
    ==================================================
    */

    // const [showInfo, setShowInfo] = useState(false);
    const [priceText, setPriceText] = useState("");
    const [noInfo, setNoInfo] = useState(true);

    // const [showMenu, setShowMenu] = useState(false);    // show menu dropdown

    // price data handling
    useEffect(() => {
        if (win_data.length == 0){
            setShowInfo(false)
        }else{
            setShowInfo(true)
            let text = "";
            win_data[1].dest.map((x) => {
                text += `<div class="destName">${x.name}</div>
                <div class="destPrice">${x.price.toString()} ฿</div>`;
            })
            setPriceText(text);
        }

    // useEffect(()=>{
    //     if (showInfo === true && Object.){
            
    //     }
    // },[showInfo])

    },[win_data]);


    return(
        <>
            {!showInfo ? 
                <div className=" h-full w-full
                flex justify-center items-center">
                    <h1 className=" text-l font-bold text-center p-2">
                        คลิ้กที่จุดใดก็ได้เพื่อดูข้อมูล
                    </h1>
                </div>
            : 
            <div className="flex flex-col items-center h-full">
                <div className=" mt-5 text-5xl font-bold text-center border-b-2 border-black">{win_data[0].name}</div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="font-semibold text-end">
                        เปิด - ปิด:
                    </div>
                    <div className="text-start">
                        {win_data[3].time[0]} - {win_data[3].time[1]}
                    </div>
                    <div className="font-semibold text-end">
                        ช่วงที่คนใช้เยอะ:
                    </div>
                    <div className="text-start">{win_data[5].time.toString()}</div>
                    <div className="font-semibold text-end">
                        จำนวนวินต่อวัน:
                    </div>
                    <div className="">
                        {win_data[4].amount} คน
                    </div>
                </div>
                <div className="text-lg font-semibold text-center">
                    ราคา
                </div>
                <div className="priceTable grid grid-cols-2 justify-center" 
                dangerouslySetInnerHTML={{__html: priceText}} />
                <div className="m-1 pb-24">
                    แหล่งข้อมูล: {win_data[6].name}
                </div>
            </div>}
        </>
    );
}

export default function InfoCard({win_data = {}, showInfo=false, setShowInfo}){

    /*                 win_data
    ==================================================
    index |         name      |     type
    0       win_name            -> Object
    1       win_price           -> Object
    2       win_location        -> Object
    3       win_time            -> Object
    4       win_rider           -> Object
    5       win_most_user_time  -> Object
    6       win_credit          -> Object
    ==================================================
    */

    // const [showInfo, setShowInfo] = useState(false);
    const [priceText, setPriceText] = useState("");
    const [noInfo, setNoInfo] = useState(true);

    // const [showMenu, setShowMenu] = useState(false);    // show menu dropdown

    // price data handling
    useEffect(() => {
        if (win_data.length == 0){
            setShowInfo(false)
        }else{
            setShowInfo(true)
            let text = "";
            win_data[1].dest.map((x) => {
                text += `<div class="destName">${x.name}</div>
                <div class="destPrice">${x.price.toString()} ฿</div>`;
            })
            setPriceText(text);
        }

    // useEffect(()=>{
    //     if (showInfo === true && Object.){
            
    //     }
    // },[showInfo])

    },[win_data]);


    return(
        <>
            {!showInfo ? 
                <div className=" h-full w-full
                flex justify-center items-center">
                    <h1 className=" text-l font-bold text-center p-2">
                        Click on any markers to see more information.
                    </h1>
                </div>
            : 
            <div className="flex flex-col items-center h-full">
                <div className=" mt-5 text-5xl font-bold text-center border-b-2 border-black">{win_data[0].name}</div>
                <div className="grid grid-cols-2 gap-2">
                    <div className="font-semibold text-end">
                        Open - Close:
                    </div>
                    <div className="text-start">
                        {win_data[3].time[0]} - {win_data[3].time[1]}
                    </div>
                    <div className="font-semibold text-end">
                        Peak service:
                    </div>
                    <div className="text-start">{win_data[5].time.toString()}</div>
                    <div className="font-semibold text-end">
                        Rider per day:
                    </div>
                    <div className="">
                        {win_data[4].amount} riders
                    </div>
                </div>
                <div className="text-lg font-semibold text-center">
                    Price
                </div>
                <div className="priceTable grid grid-cols-2 justify-center" 
                dangerouslySetInnerHTML={{__html: priceText}} />
                <div className="m-1 pb-24">
                    Source: {win_data[6].name}
                </div>
            </div>}
        </>
    );
}