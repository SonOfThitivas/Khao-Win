"use client";

import React, { useState, useRef } from 'react';
import { useRouter } from 'next/navigation';

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

    const handleRadioChange = (event) => {
        const selectedValue = event.target.value;
        if (selectedValue && ['/home', '/management', '/about'].includes(selectedValue)) {
            router.push(selectedValue);
        } else {
            console.warn('Invalid navigation value:', selectedValue);
        }
    };

    const sendEmail = async () => {
        const name = nameRef.current.value.trim();
        const mail = mailRef.current.value.trim();
        const message = messageRef.current.value.trim();
    
        if (!name || !mail || !message) {
            alert('Please fill out all fields.');
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
                alert('Email sent successfully!');
                resetForm();
            } else {
                alert(`Failed to send email: ${result.error}`);
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
        <div className='complaintpage'>
            <div className='complaint'>
                <div className='form-container'>
                    <div className='form'>
                        <span className='heading'>Complaint Or Grievance</span>
                        <input
                            ref={nameRef}
                            placeholder="Enter your name."
                            type="text"
                            className='input'
                        />
                        <input
                            ref={mailRef}
                            placeholder="Enter your email."
                            type="email"
                            className='input'
                        />
                        <textarea
                            ref={messageRef}
                            placeholder="Fill in the details of the complaint or grievance"
                            rows="10"
                            cols="30"
                            className='textarea'
                        ></textarea>
                        <div className='button-container'>
                            <div className='send-button' onClick={sendEmail} aria-label="Send email">Send</div>
                            <div className='reset-button-container'>
                                <div id="reset-btn" className='reset-button' onClick={resetForm} aria-label="Reset form">Reset</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='footermanagement'>
                <div id="navbody">
                    <form>
                        <ul className='ul'>
                            <li className='li'>
                                <input
                                    className='radio'
                                    name="rad"
                                    id="choose1"
                                    type="radio"
                                    value="/home"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose1">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className='svg w-6 h-6 text-gray-800 dark:text-white'
                                    >
                                        <title>Home</title>
                                        <path
                                            d="m4 12 8-8 8 8M6 10.5V19a1 1 0 0 0 1 1h3v-3a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v3h3a1 1 0 0 0 1-1v-8.5"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className='li'>
                                <input
                                    className='radio'
                                    name="rad"
                                    id="choose2"
                                    type="radio"
                                    disabled
                                />
                                <label htmlFor="choose2">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className='svg w-6 h-6 text-gray-800 dark:text-white'
                                    >
                                        <title>Search</title>
                                        <path
                                            d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className='li'>
                                <input
                                    className='radio'
                                    name="rad"
                                    id="choose3"
                                    type="radio"
                                    value="/management"
                                    defaultChecked
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose3">
                                    <svg
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        height="24"
                                        width="24"
                                        xmlns="http://www.w3.org/2000/svg"
                                        aria-hidden="true"
                                        className='svg w-6 h-6 text-gray-800 dark:text-white'
                                    >
                                        <title>Management</title>
                                        <path
                                            d="M10 19H5a1 1 0 0 1-1-1v-1a3 3 0 0 1 3-3h2m10 1a3 3 0 0 1-3 3m3-3a3 3 0 0 0-3-3m3 3h1m-4 3a3 3 0 0 1-3-3m3 3v1m-3-4a3 3 0 0 1 3-3m-3 3h-1m4-3v-1m-2.121 1.879-.707-.707m5.656 5.656-.707-.707m-4.242 0-.707.707m5.656-5.656-.707.707M12 8a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                            strokeWidth="2"
                                            strokeLinejoin="round"
                                            strokeLinecap="square"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                            <li className='li'>
                                <input
                                    className='radio'
                                    name="rad"
                                    id="choose4"
                                    type="radio"
                                    value="/about"
                                    onChange={handleRadioChange}
                                />
                                <label htmlFor="choose4">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        height="24"
                                        width="24"
                                        aria-hidden="true"
                                        className='svg w-6 h-6 text-gray-800 dark:text-white'
                                    >
                                        <title>About</title>
                                        <path
                                            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            stroke="currentColor"
                                        ></path>
                                    </svg>
                                </label>
                            </li>
                        </ul>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Management;
