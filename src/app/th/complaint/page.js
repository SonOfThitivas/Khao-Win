"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Navbar, {NavbarTH} from '../../components/navbar';

import "./complaint.css";

function Management() {
    const router = useRouter();

    const nameRef = useRef(null);
    const mailRef = useRef(null);
    const messageRef = useRef(null);

    const [formData, setFormData] = useState({
        name: '',
        mail: '',
        message: ''
    });

    const sendEmail = async () => {
        const name = nameRef.current.value.trim();
        const mail = mailRef.current.value.trim();
        const message = messageRef.current.value.trim();
    
        if (!name || !mail || !message) {
            alert('กรุณากรอกทุกช่อง');
            return;
        }
    
        try {
            const response = await fetch('/api/sendEmail', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, email: mail, message }),
            });
    
            const result = await response.json();
            if (response.ok) {
                alert('อีเมลได้ถูกส่งไปแล้ว');
                resetForm();
            } else {
                alert(`เกิดข้อผิดพลาดในการส่งอีเมล: ${result.error}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Something went wrong. Please try again.');
        }
    };
    

    const resetForm = () => {
        setFormData({ name: '', mail: '', message: '' });
        if (nameRef.current) nameRef.current.value = '';
        if (mailRef.current) mailRef.current.value = '';
        if (messageRef.current) messageRef.current.value = '';
    };

    return (
        <>
            <div className='relative'>
                <div className='sticky top-0'>
                    <NavbarTH/>
                    <div className='flex justify-center py-5 text-center text-3xl shadow-md bg-orange-300 border-b-2 border-black'>
                        <h1>แบบฟอร์มรับคำร้องเรียน</h1>
                    </div>
                </div>
                <div className='w-full flex justify-center'>
                    <div className=' md:w-[768px] w-full m-5 border-8 border-black rounded-2xl bg-orange-300'>
                        <div className='flex flex-col'>
                            <input
                            ref={nameRef}
                            placeholder="กรอกชื่อของคุณ"
                            type="text"
                            className=' mx-2 my-2 px-2 py-1 bg-gray-100 rounded-2xl border-2 border-black focus:outline-none'
                            />

                            <input
                            ref={mailRef}
                            placeholder="กรอกอีเมลของคุณ"
                            type="email"
                            className='mx-2 my-2 px-2 py-1 bg-gray-100 rounded-2xl border-2 border-black focus:outline-none'
                            />

                            <textarea
                            ref={messageRef}
                            placeholder="กรอกข้อมูลที่จะร้องเรียน"
                            rows="10"
                            cols="30"
                            className='mx-2 my-2 px-2 py-1 bg-gray-100 rounded-2xl border-2 border-black focus:outline-none resize-none'
                            ></textarea>
                        </div>
                        <div className='flex justify-center gap-2 mb-2'>
                            <button type="button" className='bg-green-300 active:bg-green-500 sm:w-1/3 w-1/3 text-2xl p-2 rounded-2xl border-2 border-black' onClick={sendEmail} aria-label="Send email">ส่ง</button>
                            <button type="button" id="reset-btn" className='bg-yellow-300 active:bg-yellow-500 sm:w-1/3 w-1/3  text-2xl p-2 rounded-2xl border-2 border-black' onClick={resetForm} aria-label="Reset form">รีเซ็ต</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Management;
