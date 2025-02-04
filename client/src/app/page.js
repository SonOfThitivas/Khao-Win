// app/page.js
"use client";
import React from 'react';
import Image from 'next/image';

function Page() {
  return (
    <div className="logoin">
    <a href="/home">
      <div className='headerpage'>
        <Image src="/LOGO1.png" alt="logo" width={400} height={400} className="center"/>
      </div>
      <div className="conti">
        <p>
            Tap To Continue
        </p>
      </div>
      </a>
      <div className='footerpage'>
        <p>Contact or Support developers</p>
        <p><a href="mailto:khaowinreport@gmail.com">khaowinreport@gmail.com</a></p>
      </div>
    </div>
  );
}

export default Page;
