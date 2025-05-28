"use client";

import React, { useState, useEffect, useCallback} from 'react';
import { MapContainer, TileLayer, Marker, Tooltip, useMapEvents } from 'react-leaflet';
import { latLng, latLngBounds } from 'leaflet';
import { createClient } from '../utils/supabase/client';
import { TbCaretUpDownFilled } from "react-icons/tb";
import "leaflet/dist/leaflet.css";
// import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
// import "leaflet-defaulticon-compatibility";
import "./map.css";

import InfoCard, {InfoCardTH} from "./Infocard.js";

// Icon Error: https://github.com/PaulLeCam/react-leaflet/issues/255#issuecomment-261904061 02/22/2025 Karn
import L from 'leaflet';
import { SERVER_PROPS_GET_INIT_PROPS_CONFLICT } from 'next/dist/lib/constants';
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

export function MapTH(){
    const supabase = createClient();
    
    const [win_name, setwin_name] = useState([]);                   // supabase fetching data variables
    const [win_price, setwin_price] = useState([]);
    const [win_location, setwin_location] = useState([]);
    const [win_time, setwin_time] = useState([]);
    const [win_rider, setwin_rider] = useState([]);
    const [win_most_user_time, setwin_most_user_time] = useState([]);
    const [win_credit, setwin_credit] = useState([]);
    const [error, setError] = useState(null);

    const [showInfo, setShowInfo] = useState(false);              // information variables
    const [info_param, setInfo_param] = useState([]);
    const [infoId, setInfoId] = useState();
    const maxInfoShow = 90, minInfoShow = 8;
    const [heightPer, setHeightPer] = useState(minInfoShow);
    const handleHeightPer = () => {
        if (info_param.length !== 0){
            if (heightPer === minInfoShow) {
                setHeightPer(maxInfoShow);
                setShowInfo(true);
            }
            else {
                setHeightPer(minInfoShow);
                setShowInfo(false);
            }
        }else{
            if (heightPer === minInfoShow) {
                setHeightPer(maxInfoShow);
            }
            else {
                setHeightPer(minInfoShow);
            }
        }
        
    }
    
    // Fetching data from Supabase
    // win_name table fetching function
    const fetch_win_name = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_name").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_name(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_price table fetching function
    const fetch_win_price = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_price").select("*").order("id", {ascending: true});
            if (error) throw error;

            // Group by id > name > collect prices
            const filt_data = Object.values(
                data.reduce((param, { id, name, price }) => {
                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, dest: [] };
                }
            
                // Find or create the name group within that id
                let nameGroup = param[id].dest.find(group => group.name === name);
                if (!nameGroup) {
                    nameGroup = { name, price: [] };
                    param[id].dest.push(nameGroup);
                }
            
                // Add price to the name group
                nameGroup.price.push(price);
            
                return param;
                }, {})
            );
            setwin_price(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_location table fetching function
    const fetch_win_location = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_location").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_location(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_time table fetching function
    const fetch_win_time = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_time").select("*").order("id", {ascending: true});
            if (error) throw error;

             // Group by id > time
             const filt_data = Object.values(
                data.reduce((param, { id, time}) => {

                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, time: [] };
                }
                
                param[id].time.push(time);
            
                return param;
                }, {})
            );

            setwin_time(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_rider table fetching function
    const fetch_win_rider = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_rider").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_rider(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_most_user_time table fetching function
    const fetch_win_most_user_time = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_most_user_time").select("*").order("id", {ascending: true});
            if (error) throw error;

            // Group by id > time
            const filt_data = Object.values(
                data.reduce((param, { id, time}) => {

                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, time: [] };
                }
            
                param[id].time.push(time);
            
                return param;
                }, {})
            );

            setwin_most_user_time(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_credit table fetching function
    const fetch_win_credit = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_credit").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_credit(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);



    // call function any re-rendered
    useEffect(() => {
        fetch_win_name();
        fetch_win_price();
        fetch_win_location();
        fetch_win_time();
        fetch_win_rider();
        fetch_win_most_user_time();
        fetch_win_credit();
    }, [fetch_win_name, fetch_win_price, fetch_win_location,
        fetch_win_time, fetch_win_rider, fetch_win_most_user_time,
        fetch_win_credit
    ]);

    

    // กำหนดขอบเขตของแผนที่
    // const upperBound = latLng(13.9071, 100.5065);
    // const lowerBound = latLng(13.7356, 100.5194);
    // const rightBound = latLng(13.8231, 100.6294);
    // const leftBound = latLng(13.8216, 100.4130);
    // const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

    // กำหนดตำแหน่งเริ่มต้นและระดับซูม
    const initialCenter = [13.8304, 100.5147];
    const initialZoom = 16;

    return (
        <div>
             <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""/>
             <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin=""></script>
            

            {error && <div className="error-message">{error}</div>}
            
            {/* Leaflet map section*/}
            <MapContainer
                center={initialCenter}
                zoom={initialZoom}
                scrollWheelZoom={true}
                zoomControl={false}
                className="h-svh z-10"
                >
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    key={"tile-layer"}
                />
                {/* Marking the motorcycle stands wit mapping function */}
                {win_location.map((obj) => (
                    <Marker 
                    key={obj.id} 
                    position={Array(obj.lat, obj.lng)}
                    eventHandlers={{
                        click: () => {
                            if (obj.id === infoId){
                                // setShowInfo(!showInfo);
                                handleHeightPer();
                            }else{
                                setInfo_param(Array(
                                    win_name[obj.id-1], win_price[obj.id-1],
                                    win_location[obj.id-1], win_time[obj.id-1],
                                    win_rider[obj.id-1], win_most_user_time[obj.id-1],
                                    win_credit[obj.id-1]
                                ));
                                setInfoId(obj.id);
                                setHeightPer(maxInfoShow);
                            }
                        }
                    }}>
                        <Tooltip key={obj.id}>{Object(win_name[obj.id-1]).name}</Tooltip>
                    </Marker>
                ))}

            </MapContainer>

            {/* Information Displayer */}
            <div className='flex justify-center w-full'>
                 <div className={`absolute z-20 w-full sm:w-[640px] bg-white bottom-0 border-2 border-black rounded-t-2xl overflow-hidden duration-200 ease-in-out `}
                style={{height: `${heightPer}%`}}>
                    <div className='flex justify-center border-b shadow-md' onClick={handleHeightPer}>
                        <TbCaretUpDownFilled size={"3rem"}/>
                    </div>
                    <div className='w-full h-full overflow-auto'>
                        <InfoCardTH win_data={info_param} showInfo={showInfo} setShowInfo={setShowInfo}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

function Map() {

    const supabase = createClient();
    
    const [win_name, setwin_name] = useState([]);                   // supabase fetching data variables
    const [win_price, setwin_price] = useState([]);
    const [win_location, setwin_location] = useState([]);
    const [win_time, setwin_time] = useState([]);
    const [win_rider, setwin_rider] = useState([]);
    const [win_most_user_time, setwin_most_user_time] = useState([]);
    const [win_credit, setwin_credit] = useState([]);
    const [error, setError] = useState(null);

    const [showInfo, setShowInfo] = useState(false);              // information variables
    const [info_param, setInfo_param] = useState([]);
    const [infoId, setInfoId] = useState();
    const maxInfoShow = 90, minInfoShow = 8;
    const [heightPer, setHeightPer] = useState(minInfoShow);
    const handleHeightPer = () => {
        if (info_param.length !== 0){
            if (heightPer === minInfoShow) {
                setHeightPer(maxInfoShow);
                setShowInfo(true);
            }
            else {
                setHeightPer(minInfoShow);
                setShowInfo(false);
            }
        }else{
            if (heightPer === minInfoShow) {
                setHeightPer(maxInfoShow);
            }
            else {
                setHeightPer(minInfoShow);
            }
        }
        
    }
    const handleClickMapCloseInfo = () =>{
        setHeightPer(minInfoShow);
        setShowInfo(false);
    }
    
    // Fetching data from Supabase
    // win_name table fetching function
    const fetch_win_name = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_name").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_name(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_price table fetching function
    const fetch_win_price = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_price").select("*").order("id", {ascending: true});
            if (error) throw error;

            // Group by id > name > collect prices
            const filt_data = Object.values(
                data.reduce((param, { id, name, price }) => {
                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, dest: [] };
                }
            
                // Find or create the name group within that id
                let nameGroup = param[id].dest.find(group => group.name === name);
                if (!nameGroup) {
                    nameGroup = { name, price: [] };
                    param[id].dest.push(nameGroup);
                }
            
                // Add price to the name group
                nameGroup.price.push(price);
            
                return param;
                }, {})
            );
            setwin_price(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_location table fetching function
    const fetch_win_location = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_location").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_location(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_time table fetching function
    const fetch_win_time = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_time").select("*").order("id", {ascending: true});
            if (error) throw error;

             // Group by id > time
             const filt_data = Object.values(
                data.reduce((param, { id, time}) => {

                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, time: [] };
                }
                
                param[id].time.push(time);
            
                return param;
                }, {})
            );

            setwin_time(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_rider table fetching function
    const fetch_win_rider = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_rider").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_rider(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_most_user_time table fetching function
    const fetch_win_most_user_time = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_most_user_time").select("*").order("id", {ascending: true});
            if (error) throw error;

            // Group by id > time
            const filt_data = Object.values(
                data.reduce((param, { id, time}) => {

                // If id is not yet added
                if (!param[id]) {
                    param[id] = { id, time: [] };
                }
            
                param[id].time.push(time);
            
                return param;
                }, {})
            );

            setwin_most_user_time(filt_data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);

    // win_credit table fetching function
    const fetch_win_credit = useCallback(async () => {
        try {
            const { data, error } = await supabase.from("win_credit").select("*").order("id", {ascending: true});
            if (error) throw error;
            setwin_credit(data || []);

        } catch (err) {
            console.error('Error fetching data:', err);
            setError('Unable to fetch data. Please try again later.');
        }
    }, [supabase]);



    // call function any re-rendered
    useEffect(() => {
        fetch_win_name();
        fetch_win_price();
        fetch_win_location();
        fetch_win_time();
        fetch_win_rider();
        fetch_win_most_user_time();
        fetch_win_credit();
    }, [fetch_win_name, fetch_win_price, fetch_win_location,
        fetch_win_time, fetch_win_rider, fetch_win_most_user_time,
        fetch_win_credit
    ]);

    

    // กำหนดขอบเขตของแผนที่
    // const upperBound = latLng(13.9071, 100.5065);
    // const lowerBound = latLng(13.7356, 100.5194);
    // const rightBound = latLng(13.8231, 100.6294);
    // const leftBound = latLng(13.8216, 100.4130);
    // const bounds = latLngBounds([upperBound, leftBound, lowerBound, rightBound]);

    // กำหนดตำแหน่งเริ่มต้นและระดับซูม
    const initialCenter = [13.8304, 100.5147];
    const initialZoom = 16;

    return (
        <div>
             <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
            integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
            crossOrigin=""/>
             <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
            integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
            crossOrigin=""></script>
            

            {error && <div className="error-message">{error}</div>}
            
            {/* Leaflet map section*/}
            
            <MapContainer
                center={initialCenter}
                zoom={initialZoom}
                scrollWheelZoom={true}
                zoomControl={false}
                className="h-svh z-10"
                // style={{height:"100svh"}}
                >
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    key={"tile-layer"}
                />
                {/* Marking the motorcycle stands wit mapping function */}
                {win_location.map((obj) => (
                    <Marker 
                    key={obj.id} 
                    position={Array(obj.lat, obj.lng)}
                    eventHandlers={{
                        click: () => {
                            if (obj.id === infoId){
                                // setShowInfo(!showInfo);
                                handleHeightPer();
                            }else{
                                setInfo_param(Array(
                                    win_name[obj.id-1], win_price[obj.id-1],
                                    win_location[obj.id-1], win_time[obj.id-1],
                                    win_rider[obj.id-1], win_most_user_time[obj.id-1],
                                    win_credit[obj.id-1]
                                ));
                                setInfoId(obj.id);
                                setHeightPer(maxInfoShow);
                            }
                        }
                    }}>
                        <Tooltip key={obj.id}>{Object(win_name[obj.id-1]).name}</Tooltip>
                    </Marker>
                ))}

            </MapContainer>

            {/* Information Displayer */}
            <div className='flex justify-center w-full'>
                 <div className={`absolute z-20 w-full sm:w-[640px] bg-white bottom-0 border-2 border-black rounded-t-2xl overflow-hidden duration-200 ease-in-out `}
                style={{height: `${heightPer}%`}}>
                    <div className='flex justify-center border-b shadow-md' onClick={handleHeightPer}>
                        <TbCaretUpDownFilled size={"3rem"}/>
                    </div>
                    <div className='w-full h-full overflow-auto'>
                        <InfoCard win_data={info_param} showInfo={showInfo} setShowInfo={setShowInfo}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Map;