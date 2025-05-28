"use client"
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAnimate, motion, AnimatePresence } from "motion/react"
import { useTimer } from 'react-timer-hook';

function Page() {
    const router = useRouter();
    const handleCompleteTransition = () => {
        router.push("/en/home");
        return null;
    }

  return (
    <>
        <div className='relative w-full h-full flex flex-col md:flex-row gap-5 justify-center items-center'>
            <div>
                <AnimatePresence key={0}>
                    <motion.div key={1}
                    animate={{opacity:[0,1,1,0], y:[100,0,0,-100]}}
                    transition={{duration:5,
                        time:[0,0.1,0.9,1],
                        ease:["easeOut", "linear", "easeIn"]
                    }}>
                        <Image src="/LOGO1.png" alt="logo" width={300} height={300} className=""/>
                    </motion.div>
                    <div key={2} className='flex flex-col gap-1 text-center'>
                        <motion.div key={2}
                            animate={{opacity:[0,1,1,0], y:[100,0,0,-100]}}
                            transition={{duration:5,
                            time:[0,0.1,0.9,1],
                            ease:["easeOut", "linear", "easeIn"],
                            delay:0.2}}
                            >Contact or Support developers</motion.div>

                        <motion.div key={3}
                        animate={{opacity:[0,1,1,0], y:[100,0,0,-100]}}
                        transition={{duration:5,
                            time:[0,0.1,0.9,1],
                            ease:["easeOut", "linear", "easeIn"],
                            delay:0.4}}
                            onAnimationComplete={handleCompleteTransition}>khaowinreport@gmail.com</motion.div>
                    </div>
                </AnimatePresence>
            </div>
            
        </div>
        
    </>
  );
}

export default Page;
