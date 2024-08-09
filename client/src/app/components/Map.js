import React, { useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip, CircleMarker, useMap } from 'react-leaflet';      // map component
import { latLng, latLngBounds } from 'leaflet';     // Latitude and Longitude data

//      Map and Marker style 
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";
import "./map.css";

//      Data fetching
import * as fetchData from "./data.json";

function Map() {
    //      fetching Data
    const [winData, setWinData] = useState(Object);

    useEffect(()=>{
        fetch("http://localhost:5000/api/fetchData").then(
            response => response.json()
        ).then(
            data => {
                console.log(data);
                setWinData(data);
            }
        )
    },[])

    const winDateList = winData;

    // const dataObjectArray = Object.entries(fetchData);
    // dataObjectArray.pop(); //       remove a default
    // const [priceContent, setPriceContent] = useState("");


    //      Map bounds
    const upperBound = latLng(13.9071, 100.5065);
    const lowerBound = latLng(13.7356, 100.5194);
    const rightBound = latLng(13.8231, 100.6294);
    const leftBound = latLng(13.8216, 100.4130);
    const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

    // GPS tracking variable
    const [currentPosition, setCurrentPosition] = useState(null);


    //      GPS tracking
    function MoveMapToCurrentPosition({ position }) {
        const map = useMap();
        useEffect(() => {
            if (position) {
                map.setView(position, map.getZoom());
            }
        }, [position, map]);
        return null;
    }


    //      GPS's user Permission
    const handleButtonClick = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentPosition([latitude, longitude]);
                    console.log(`Current position: ${latitude}, ${longitude}`);
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

    return (
        <div>
            <MapContainer center={[13.8304, 100.5147]}
                zoom={16}
                scrollWheelZoom={true}
                maxBounds={bounds}
                zoomControl={false}
                doubleClickZoom={false}
                className="h-screen"
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                

                {/* {fetchData.map((obj) => (
                    
                    <Marker key={obj[1]["name"]} position={obj[1]["latlng"]}>
                        <Popup>
                            <header className="text-center text-2xl font-bold">
                                {obj[1]["name"]}
                            </header>
                            <main className="text-lg">
                                เวลาบริการ: {(obj[1]["time"] != null) ? obj[1]["time"][0] + " - " + obj[1]["time"][1] : '-'}<br />
                                จำนวนวินต่อวัน: {(obj[1]["amount"] != null) ? obj[1]["amount"] : '-'}<br />
                                ช่วงที่มีผู้ใช้บริการเยอะ: {(obj[1]["mostPeopleWhen"] != null) ? obj[1]["mostPeopleWhen"] : '-'}
                                <div>   
                                    ราคา: {(obj[1]["price"] == null) ? useEffect(()=>setPriceContent("-"),[]) :
                                        useEffect(()=>
                                        {
                                            const priceObj = obj[1].price;
                                            let tempContent = "";
                                            for (const [key, value] of Object.entries(priceObj)){
                                                tempContent += `<div style="font-size:16px">${key} : ${value} บาท</div>`
                                            }
                                            setPriceContent(tempContent);
                                            console.log(priceContent);
                                        },[])
                                    }
                                    /* https://legacy.reactjs.org/docs/dom-elements.html#dangerouslysetinnerhtml 
                                    <div className=" justify-center" dangerouslySetInnerHTML={{__html: priceContent}}/>
                                </div>
                            </main>
                            
                        </Popup>
                        <Tooltip>{obj[1]["name"]}</Tooltip>
                    </Marker> */}

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
                <div className="mNcDk bpLs1b">ShowME</div>
            </button>
        </div>
    );
}

export default Map;
