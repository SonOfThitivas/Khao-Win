import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker, useMap } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./map.css";

function Map({ searchTerm }) { // รับ searchTerm จาก props
    const [winData, setWinData] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/fetchData")
            .then(response => response.json())
            .then(data => {
                setWinData(Object.values(data));
            });
    }, []);

    function priceFormat(priceObj) {
        let i = 0;
        let priceList = Object.entries(priceObj);
        let content = "<div className='item-1'>";
        for (; i < Math.ceil(priceList.length / 2); i++) {
            let place = priceList[i][0], price = priceList[i][1];
            content += `<div>${place}: ${price}฿</div>`;
        }
        content += "</div><div className='item-2'>";
        for (; i < priceList.length; i++) {
            let place = priceList[i][0], price = priceList[i][1];
            content += `<div>${place}: ${price}฿</div>`;
        }
        content += "</div>";
        return content;
    }

    const upperBound = latLng(13.9071, 100.5065);
    const lowerBound = latLng(13.7356, 100.5194);
    const rightBound = latLng(13.8231, 100.6294);
    const leftBound = latLng(13.8216, 100.4130);
    const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

    const [currentPosition, setCurrentPosition] = useState(null);

    function MoveMapToCurrentPosition({ position }) {
        const map = useMap();
        useEffect(() => {
            if (position) {
                map.setView(position, map.getZoom());
            }
        }, [position, map]);
        return null;
    }

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

    // กรองข้อมูลที่ตรงกับ searchTerm
    const filteredData = winData.filter(obj => 
        obj.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div>
            <MapContainer 
                center={[13.8304, 100.5147]}
                zoom={16}
                scrollWheelZoom={true}
                zoomControl={false}
                doubleClickZoom={false}
                className="h-screen"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {filteredData.map((obj) => (
                    <Marker key={obj.name} position={obj.latlng}>
                        <Popup>
                            <header className="text-center text-2xl font-bold">
                                {obj.name}
                            </header>
                            <main className="text-base">
                                เวลาบริการ: {(obj.time != null) ? obj.time[0] + " - " + obj.time[1] : '-'}<br />
                                จำนวนวินต่อวัน: {(obj.amount != null) ? obj.amount : '-'}<br />
                                ช่วงที่มีผู้ใช้บริการเยอะ: {(obj.mostUsing != null) ? obj.mostUsing : '-'}
                                <div>   
                                    ราคา: {(obj.price == null) ? "-" : 
                                        <div className="flex text-xs" dangerouslySetInnerHTML={{__html: priceFormat(obj.price)}} />
                                    }
                                </div>
                            </main>
                            <footer>
                                <br />
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

                {currentPosition && <MoveMapToCurrentPosition position={currentPosition} />}
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
