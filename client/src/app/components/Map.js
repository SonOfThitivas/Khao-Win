import React, { useState, useEffect, useCallback } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker, useMap } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';
import { createClient } from '../utils/supabase/client';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./map.css";

// คอมโพเนนต์สำหรับเลื่อนแผนที่ไปยังตำแหน่งที่กำหนด
function MoveMapToPosition({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, 16, { animate: false });
        }
    }, [position, map]);
    return null;
}

// คอมโพเนนต์สำหรับเลื่อนแผนที่ไปยังตำแหน่งปัจจุบันของผู้ใช้
function MoveMapToCurrentPosition({ position }) {
    const map = useMap();
    useEffect(() => {
        if (position) {
            map.setView(position, map.getZoom(), { animate: false });
        }
    }, [position, map]);
    return null;
}

function Map({ searchTerm, mapCenter, onMapCenterUpdate }) {
    const supabase = createClient();
    const [winData, setWinData] = useState([]);
    const [currentPosition, setCurrentPosition] = useState(null);
    const [error, setError] = useState(null);

    // ฟังก์ชันดึงข้อมูลจาก Supabase
    const getData = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("KhaoWinTable").select('*');
            if (error) throw error;
            setWinData(data || []);
        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    useEffect(() => {
        getData();
    }, [getData]);

    // ฟังก์ชันกรองข้อมูลตามคำค้นหา
    const filterData = () => {
        return winData.filter(obj =>
            obj.name.toLowerCase().includes(searchTerm.trim().toLowerCase())
        );
    };

    const filteredData = filterData();

    // เมื่อมีข้อมูลที่ถูกกรองแล้ว อัปเดตตำแหน่งศูนย์กลางของแผนที่
    useEffect(() => {
        if (filteredData.length > 0 && onMapCenterUpdate) {
            const firstResult = filteredData[0];
            onMapCenterUpdate(firstResult.latlng);
        }
    }, [filteredData, onMapCenterUpdate]);

    // ฟังก์ชันจัดการการคลิกปุ่มเพื่อแสดงตำแหน่งปัจจุบัน
    const handleButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                },
                (error) => {
                    console.error("Error fetching location: ", error);
                    alert("ไม่สามารถเข้าถึงตำแหน่งของคุณได้ กรุณาตรวจสอบการอนุญาตของเบราว์เซอร์");
                },
                {
                    enableHighAccuracy: true,
                    timeout: 10000,
                    maximumAge: 0,
                }
            );
        } else {
            alert("เบราว์เซอร์ของคุณไม่รองรับการเข้าถึงตำแหน่ง");
        }
    };

    // ฟังก์ชันจัดการข้อมูลช่วงเวลาที่มีผู้ใช้เยอะ
    function mostUserWhenFunc(mostUserWhenList){
        let content = mostUserWhenList[0];

        if (mostUserWhenList.length > 1){
            for(let i=1;i<mostUserWhenList.length;i++){
                content += `, ${mostUserWhenList[i]}`;
            }
        }
        return content;
    }

    // ฟังก์ชันจัดรูปแบบราคา
    function priceFormat(priceObj) {
        let i = 0;
        let priceList = Object.entries(priceObj);
        
        let content = "<div className=' p-3'>";
        for (; i < Math.ceil(priceList.length / 2); i++) {
            let place = priceList[i][0], price = priceList[i][1];
            content += `<div>${place}: ${price}฿</div>`;
        }
        content += "</div><div className=' p-3'>";
        for (; i < priceList.length; i++) {
            let place = priceList[i][0], price = priceList[i][1];
            content += `<div>${place}: ${price}฿</div>`;
        }
        content += "</div>";
        return content;
    }

    // กำหนดขอบเขตของแผนที่
    const upperBound = latLng(13.9071, 100.5065);
    const lowerBound = latLng(13.7356, 100.5194);
    const rightBound = latLng(13.8231, 100.6294);
    const leftBound = latLng(13.8216, 100.4130);
    const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

    // กำหนดตำแหน่งเริ่มต้นและระดับซูม
    const initialCenter = [13.8304, 100.5147];
    const initialZoom = 16;

    return (
        <div>
            {error && <div className="error-message">{error}</div>}
            <MapContainer 
                center={mapCenter || initialCenter} 
                zoom={initialZoom} 
                scrollWheelZoom={true}
                maxBounds={bounds}
                className="h-screen">
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredData.map((obj) => (
                    <Marker key={obj.id} position={obj.latlng}>
                        <Popup className="pointer-events-none">
                            <header className="text-center text-2xl font-bold">
                                {obj.name}
                            </header>
                            <main className="text-base">
                                เวลาบริการ: {(obj.time != null) ? obj.time[0] + " - " + obj.time[1] : '-'}<br />
                                จำนวนวินต่อวัน: {(obj.amount != null) ? obj.amount : '-'}<br />
                                ช่วงที่มีผู้ใช้บริการเยอะ: {(obj.mostUserWhen == null) ? '-': mostUserWhenFunc(obj.mostUserWhen)}
                                <div>   
                                    ราคา: {(obj.price == null) ? "-" : 
                                        <div className="flex text-xs " dangerouslySetInnerHTML={{__html: priceFormat(obj.price)}} />
                                    }
                                </div>
                            </main>
                            <footer className="text-base">
                                ข้อมูลจาก: {(obj.credit != null) ? obj.credit : "-"}
                            </footer>
                        </Popup>
                        <Tooltip>{obj.name}</Tooltip>
                    </Marker>
                ))}

                {currentPosition && (
                    <CircleMarker
                        center={currentPosition}
                        radius={5}
                        color="red"
                        fillColor="red"
                        fillOpacity={0.5}
                    >
                        <Popup>ตำแหน่งปัจจุบันของคุณ</Popup>
                    </CircleMarker>
                )}

                {/* เลื่อนแผนที่ไปยังตำแหน่งปัจจุบันของผู้ใช้ */}
                {currentPosition && <MoveMapToCurrentPosition position={currentPosition} />}
                {/* เลื่อนแผนที่ไปยังตำแหน่งแรกของผลลัพธ์การค้นหา */}
                {filteredData.length > 0 && <MoveMapToPosition position={filteredData[0].latlng} />}
            </MapContainer>

            <button
                aria-label="แสดงตำแหน่งของคุณ"
                aria-pressed="false"
                id="sVuEFc"
                className="map-button"
                onClick={handleButtonClick}
            >
                <svg className="svg-icon-show-me" viewBox="0 0 24 24" width="24" height="24">
                    <path fill="none" 
                        strokeWidth="1.5"
                        strokeLinejoin="round"
                        strokeLinecap="round"
                        stroke="currentColor" 
                        d="M10.292,4.229c-1.487,0-2.691,1.205-2.691,2.691s1.205,2.691,2.691,2.691s2.69-1.205,2.69-2.691
                        S11.779,4.229,10.292,4.229z M10.292,8.535c-0.892,0-1.615-0.723-1.615-1.615S9.4,5.306,10.292,5.306
                        c0.891,0,1.614,0.722,1.614,1.614S11.184,8.535,10.292,8.535z M10.292,1C6.725,1,3.834,3.892,3.834,7.458
                        c0,3.567,6.458,10.764,6.458,10.764s6.458-7.196,6.458-10.764C16.75,3.892,13.859,1,10.292,1z M4.91,7.525
                        c0-3.009,2.41-5.449,5.382-5.449c2.971,0,5.381,2.44,5.381,5.449s-5.381,9.082-5.381,9.082S4.91,10.535,4.91,7.525z"></path>
                </svg>
            </button> 
        </div>
    );
}

export default Map;
