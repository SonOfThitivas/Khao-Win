// Nescessary Package: leaflet, react-leaflet
import React from 'react';
import * as L from 'react-leaflet';
import { latLng, latLngBounds} from 'leaflet';

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

// Leaflet components (Tag)
const MapContainer = L.MapContainer;
const TileLayer = L.TileLayer;
const Marker = L.Marker;
const Popup = L.Popup;
const Tooltip = L.Tooltip;

// Icon customize

// latitude, longitude
/*
    MRT Yaek Wongsawang: 13.82799, 100.52786
    Pak Soi Wongsawang 11: 13.82129, 100.52054
    KMUTNB's FrontGate: 13.81867, 100.51425
    Piboonsongkhraam Soi 22: 13.83219, 100.50090
    Piboonsongkhraam Soi 22/22:  13.83207, 100.51337
    North's zone opposite 7-Eleven: 13.82728, 100.51428
    Zoom Cafe: 13.82746, 100.51469
    Ruenmainam: 13.82451, 100.51605
    KMUTNB's BackGate: 13.82244, 100.51509
*/

// NOTE: function for display text but it is in testing
function posIn2dis(x,y){
    
}

function Map() {

    // Latitude and Longitude of P'Win
    // TODO: import the data from the database
    const posWin = [
        [[13.82799, 100.52786], "MRT Yaek Wongsawang"],
        [[13.82129, 100.52054], "Pak Soi Wongsawang 11", [[13.82129, 100.52054], [13.82006, 100.52266]]],
        [[13.81867, 100.51425], "KMUTNB's FrontGate"],
        [[13.83219, 100.50090], "Piboonsongkhraam Soi 22"],
        [[13.83207, 100.51337], "Piboonsongkhraam Soi 22/22"],
        [[13.82728, 100.51428], "North's zone opposite 7-Eleven"],
        [[13.82746, 100.51469], "Zoom Cafe"],
        [[13.82451, 100.51605], "Ruenmainam"],
        [[13.82244, 100.51509], "KMUTNB's BackGate"],
    ];
    
    // Latitude and Longitude for blocking area display
    const upperBound = latLng(13.9071, 100.5065);
    const lowerBound = latLng(13.7356, 100.5194);
    const rightBound = latLng(13.8231, 100.6294);
    const leftBound = latLng(13.8216, 100.4130);

    // Argument for blocking area display
    const bounds = latLngBounds(
        [upperBound, leftBound, lowerBound, rightBound],
        
    );


    return (
        <div>

            {/* Map initialize  */}
            <MapContainer center={[13.8304, 100.5147]}
                zoom={16} 
                scrollWheelZoom={true}
                maxBounds={bounds}

                className="h-screen"
            
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                
                {/* 
                    pins out Win's position 
                    On Working!!!
                */}
                {posWin.map((p)=>(
                    <Marker position={p[0]}>
                        <Popup>

                        </Popup>
                        <Tooltip>
                            {p[1]}
                        </Tooltip>

                        
                    </Marker>
                ))}

                {/* The original one */}
                {/* <Marker position={[13.8304, 100.5147]}>
                    <Popup>
                        A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                </Marker> */}


            </MapContainer>
        </div>
    )
}

export default Map