"use client"
import React, {useEffect, useState, useCallback} from 'react';
import { useSearchParams } from 'next/navigation';
import { createClient } from '../utils/supabase/client';

import Navbar from '../components/Navbar';
import Card from '../components/Card';

const data = [
    {
        id:1,
        nameTH: "นายกานต์ สุขสมกิจ",
        nameEN: "Mr.Karn Suksomkit",
        positionTH: "นักพัฒนา",
        positionEN: "Developer",
        imgPath: "/karn.jpg",
        email: "6601012620011@email.kmutnb.ac.th",
        tel: "098-285-4425",
    
    }
];

function About() {

    const [lang, setLang] = useState("th");         // language display
    const searchParams = useSearchParams();
    const langParam = searchParams.get("lang");
    useEffect(() => {
        if (langParam) {
            setLang(langParam);
        }
    }, [langParam]);
    
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
            <Navbar/>
            <div className='p-5 text-center text-3xl shadow-md bg-orange-300
            border-b-2 border-black'>
                {lang === "en" ? "About us" : "เกี่ยวกับเรา"}
            </div>
        </div>
        
        <div className='w-full'>
            {devlist.map((x)=><Card key={x.id} lang={lang} data={x}/>)}
        </div>
    </>
  );
}

export default About;
