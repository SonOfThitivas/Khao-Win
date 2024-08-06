// app/page.js
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

function Page() {
  return (
    <div className="logoin">

      <div className='headerpage'>
        <Image src="/LOGO1.png" alt="logo" width={400} height={400} className="center"/>
      </div>
      <div className="conti">
        <p>
          <Link href="/home">Tap To Continue</Link>
        </p>
      </div>
      <div className='footerpage'>
        <p>Contact or Support developers</p>
        <p><a href="mailto:1234@kmutnb.ac.th">1234@kmutnb.ac.th</a></p>
      </div>
    </div>
  );
}

export default Page;
