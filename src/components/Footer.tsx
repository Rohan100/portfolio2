'use client'
import React, { useState } from 'react';
import CircularText from './ui/Circulartext';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-purple-800 via-purple-950 to-black backdrop-blur-2xl shadow-inner  py-16 pb-0 "
>
      {/* Black shadow blur effect */}

      <div className="mx-10 relative pb-16">
        {/* Main Brand */}
        <div className="mb-12 flex justify-between items-center">
          <h1 className="text-9xl tracking-tighter font-bold ">
            ROHANDEV
          </h1>

          <div className='relative'>


          </div>
        </div>

        {/* Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Contact Section */}
          <div>
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              CONTACT
            </h3>
            <div className=" space-y-1">
              <p>Rohan Developer</p>
              <p>hello@rohan.dev</p>
              <p>+91 XXX XXX XXXX</p>
            </div>
          </div>

          {/* Follow Section */}
          <div>
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              FOLLOW
            </h3>
            <div className=" space-y-2">
              <a href="#" className="block hover:underline transition-all duration-200">
                GitHub
              </a>
              <a href="#" className="block hover:underline transition-all duration-200">
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

          {/* Newsletter Section */}
          <div className='flex ittems-center'>
            <CircularText text='ROHAN*DEVELOPER*' className="absolute top-0 left-0 w-24 h-24 text-red-500 animate-spin-slow" />
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center pt-8 border-t border-red-200">
          <div className=" text-sm mb-4 md:mb-0">
            <span>Built with </span>
            <a href="#" className="hover:underline">React & Tailwind</a>
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