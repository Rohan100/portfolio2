"use client"
import React, { use } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
function Loader() {
    useGSAP(() => {
        gsap.to('.paper', {
            duration: 1,
            y: "-100%",
            delay:0.2,
            ease: 'power2.out',
        })
    }, [])
  return (
    <div className='bg-white paper z-[999] h-screen absolute top-0  left-0 w-full overflow-hidden flex items-center justify-center'>
            <img src='/rohandev.png' width={100} height={100} className='w-xl aspect-square' alt='Rohan Dev' />   
    </div>
  )
}

export default Loader