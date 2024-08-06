// app/page.js
"use client";
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import './page.css';
import { useRouter } from 'next/router';

function Page() {
  return (
    <div className="logoin">

      <header>
        <Image src="/LOGO1.png" alt="logo" width={400} height={400} className="center"/>
      </header>
      <div className="conti">
        <p>
          <Link href="/home">Tap To Continue</Link>
        </p>
      </div>
      <footer>
        <p>Contact or Support developers</p>
        <p><a href="mailto:1234@kmutnb.ac.th">1234@kmutnb.ac.th</a></p>
      </footer>
    </div>
  );
}

export default Page;
