'use client'
import Spline from '@splinetool/react-spline'
import React from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
function Hero() {
  const timeline = gsap.timeline({});
  useGSAP(() => {
    timeline.fromTo("#animate-line", {
      width: 0,
    }, {
      width: "128px",
      duration: 1,
      delay: 1.1,
    }).fromTo(".hero-text", {
      y: 30,
      opacity: 0,
    }, {
      y: 0,
      opacity: 1,
      duration: 1,
      stagger: 0.2,
    }).fromTo("#threedobj", {
      opacity: 0,
    }, {
      opacity: 1,
      duration: 0.5,
    })
  }, [])
  return (
    <div className="bg-gradient-to-b px-10 from-gray-100 to-gray-300 dark:from-black dark:via-gray-900/40 dark:to-black text-gray-900 dark:text-white min-h-[101vh] h-auto flex lg:flex-row  items-center justify-between   relative overflow-hidden">
      <div className='max-w-xl ml-[5%] z-10 mt-[90%] md:mt-[60%] lg:mt-6'>
        <div>
          <div className='flex items-center gap-3'>
            <h1 className='text-5xl hero-text md:text-6xl font-semibold uppercase tracking-tight'>
              Make it
            </h1>
            <div id="animate-line" className='w-32 h-2 rounded  bg-violet-800'></div>
          </div>
          <h1 className='text-5xl md:text-6xl  font-bold uppercase tracking-tight hero-text'>Inovative</h1>
        </div>
        <p className="text-lg mt-4 hero-text">
          Hi i am <span className='font-bold text-violet-800 uppercase'>Rohan Nagare</span> A Full Stack Developer with a passion for building web applications that solve real-world problems.
        </p>
        <p className="text-lg hero-text">
          I have experience in both frontend and backend development, and I love to learn new technologies.
        </p>
      </div>

        {/* <Spline
       className='absolute  lg:-top-5 top-[-20%] bottom-0 lg:left-[25%] sm:left-[-2%] h-full'
        scene="https://prod.spline.design/37elYHcaYVZ2zixu/scene.splinecode" 
      />  */}
    </div>
  )
}

export default Hero