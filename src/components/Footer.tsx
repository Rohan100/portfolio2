'use client'
import React from 'react';
import CircularText from './ui/Circulartext';

const Footer = () => {



  return (
    <footer className="relative bg-gradient-to-b from-purple-800 via-purple-950 to-black backdrop-blur-2xl shadow-inner  sm:py-12 py-6 "
    >
      {/* Black shadow blur effect */}

      <div className="sm:mx-10 mx-5 relative sm:pb-12 pb-7">
        {/* Main Brand */}
        <div className="sm:mb-12 mb-8 flex justify-between items-center">
          <h1 className="sm:text-8xl text-6xl tracking-tighter font-bold ">
            ROHANDEV
          </h1>

          <div className='relative'>


          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid sm:grid-cols-4 grid-cols-2 items-center justify-center gap-8 mb-12">
          {/* Contact Section */}

          <div >
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              CONTACT
            </h3>
            <div className=" space-y-1">
              <p>Rohan Nagare</p>
              <p>rohannagare8355@gmail.com</p>
              <p>+91 9172778355</p>
            </div>
          </div>

          {/* Follow Section */}
          <div>
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              FOLLOW
            </h3>
            <div className=" space-y-2">
              <a href="https://github.com/Rohan100/" target='_blank' className="block hover:underline transition-all duration-200">
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/rohan-nagare-4078ab212" target='_blank' className="block hover:underline transition-all duration-200">
                LinkedIn
              </a>
              <a href="#" className="block hover:underline transition-all duration-200">
                Twitter
              </a>
            </div>
          </div>

          {/* Skills Section */}
          <div>
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              SKILLS
            </h3>
            <div className=" space-y-2">
              <p>React</p>
              <p>Node.js</p>
              <p>Python</p>
              <p>JavaScript</p>
            </div>
          </div>

        <div className='sm:flex items-center hidden'>
          <CircularText text='ROHAN*DEVELOPER*' className=" absolute top-0 left-0 sm:w-24 sm:h-24 w-16 h-16 text-red-500 animate-spin-slow" />
        </div>
        </div>
        {/* Newsletter Section */}

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-purple-400">
          <div className=" text-sm mb-4 md:mb-0">
            <span>Built with </span>
            <a href="#" className="hover:underline">Next & Tailwind</a>
          </div>

          <div className="flex flex-col md:flex-row gap-4  text-sm">
            <a href="#" className="hover:underline">Privacy Policy</a>
            <span>Copyright 2025 Rohan.dev</span>
          </div>

          <div className=" text-sm mt-4 md:mt-0">
            <p>Open to new opportunities and collaborations.</p>
          </div>
        </div>
      </div>
      {/* <div className='h-72 -mt-14'>
        <video
          className="w-full h-full object-cover"
          src="/assets/background.mp4"
          loop
          muted
          autoPlay
          playsInline
          style={{clipPath:"polygon(37% 0, 100% 0, 100% 100%, 75% 100%, 0 100%, 0 18%, 33% 18%)"}}
        />
      </div> */}
    </footer>
  );
};

export default Footer;