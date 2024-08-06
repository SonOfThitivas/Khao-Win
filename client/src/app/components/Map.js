import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

// data
import * as fetchData from "./data.json";

function Map() {
    // Latitude and Longitude of positions
    const dataObjectArray = Object.entries(fetchData);
    dataObjectArray.pop();
    console.log(dataObjectArray);
    const price = dataObjectArray.map((index) => {
        if (index[1]["price"] == null) return null;
        let priceArray = Object.entries(index[1]["price"]);
        return priceArray;
    });
    console.log(price);

    // Latitude and Longitude for blocking area display
    const upperBound = latLng(13.9071, 100.5065);
    const lowerBound = latLng(13.7356, 100.5194);
    const rightBound = latLng(13.8231, 100.6294);
    const leftBound = latLng(13.8216, 100.4130);

    // Argument for blocking area display
    const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

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
                
                {/* Pins out Win's position */}
                {dataObjectArray.map((obj) => (
                    <Marker key={obj[1]["name"]} position={obj[1]["latlng"]}>
                        <Popup>
                            สถานที่: {obj[1]["name"]}<br/>
                            เวลาบริการ: {(obj[1]["time"] != null) ? obj[1]["time"][0] + " - " +  obj[1]["time"][1]: '-'}<br/>
                            จำนวนวินต่อวัน: {(obj[1]["amount"] != null) ? obj[1]["amount"]: '-'}<br/>
                            ช่วงที่มีผู้ใช้บริการเยอะ: {(obj[1]["mostPeopleWhen"] != null) ? obj[1]["mostPeopleWhen"]: '-'}<br/>
                            ราคา: {
                                (obj[1]["mostPeopleWhen"] == null) ? '-' : '-'
                                }
                            
                        </Popup>
                        <Tooltip>{obj[1]["name"]}</Tooltip>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
}

export default Map;
