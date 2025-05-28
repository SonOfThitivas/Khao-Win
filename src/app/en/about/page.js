"use client"
import React, {useEffect, useState, useCallback} from 'react';
import { createClient } from '../../utils/supabase/client';

import Navbar from '../../components/navbar.js';
import Card from '../../components/card.js';


function About() {

    const supabase = createClient();                    // fetching dev list
    const [devlist, setDevlist] = useState([]);

    const fetch_devlist = useCallback(async () => {
            try {
                const { data, error } = await supabase.from("devlist").select("*").order("id", {ascending: true});
                if (error) throw error;
                setDevlist(data || []);
    
            } catch (err) {
                console.error('Error fetching data:', err);
                setError('Unable to fetch data. Please try again later.');
            }
    }, [supabase]);
    useEffect(()=>{fetch_devlist()},[fetch_devlist]);

  return (
    <>
        <div className='sticky top-0'>
            <Navbar />
            <div className='p-5 text-center text-3xl shadow-md bg-orange-300 border-b-2 border-black'>
                About us
            </div>
        </div>
        
        <div className='w-full pb-10'>
            {devlist.map((x)=><Card key={x.id} data={x}/>)}
        </div>
    </>
  );
}

export default About;
