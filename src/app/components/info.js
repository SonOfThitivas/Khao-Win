import React, { useState, useEffect } from "react";
import "./info-style.css";

export default function Info({win_data = {}}){

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

    const [showInfo, setShowInfo] = useState(false);
    const [priceText, setPriceText] = useState("");


    // price data handling
    useEffect(() => {
        if (win_data.length == 0){
            setShowInfo(false)
        }else{
            setShowInfo(true)
            let text = "";
            win_data[1].dest.map((x) => {
                text += `<div class="destName">${x.name}:</div>
                <div class="destPrice">${x.price.toString()} ฿</div>`;
            })
            setPriceText(text);
        }

    },[win_data]);

    return(
        <>
            {!showInfo ? 
                <div className=" h-full w-full
                flex justify-center items-center">
                    <h1 className=" text-l font-bold">
                        กดที่หมุดพิกัดใดก็ได้เพื่อดูข้อมูลเพิ่มเติม<br/>
                        Click on any markers to see more information.
                    </h1>
                </div>
            : 
            <div className=" h-full w-full">
                <div className=" mt-5 text-5xl font-bold">{win_data[0].name}</div>
                <hr className=" mt-1 mb-1 border-b-4 border-black rounded-md" />
                <div className="grid grid-cols-2 gap-2">
                    <div className="font-semibold text-end">เวลาบริการ:</div>
                    <div className="text-start">{win_data[3].time[0]} - {win_data[3].time[1]}</div>
                    <div className="font-semibold text-end">ช่วงที่มีผู้ใช้บริการเยอะ:</div>
                    <div className="text-start">{win_data[5].time.toString()}</div>
                    <div className="font-semibold text-end">จำนวนวินต่อวัน:</div>
                    <div className="text-start">{win_data[4].amount} คน</div>
                </div>
                <div className="text-lg font-semibold">ราคา</div>
                <div className="priceTable grid grid-cols-2" 
                dangerouslySetInnerHTML={{__html: priceText}} />
                <div className=" text-start m-1">ข้อมูลจาก: {win_data[6].name}</div>
            </div>}
        </>
    );
}