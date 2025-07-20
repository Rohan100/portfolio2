'use client'
import React, { useState } from 'react';

const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e:any) => {
    e.preventDefault();
    // Handle email subscription logic here
    console.log('Email submitted:', email);
    setEmail('');
  };

  return (
    <footer className="relative bg-gradient-to-b from-violet-800 via-violet-950 to-black shadow-inner px-8 py-16">
      {/* Black shadow blur effect */}
      <div className="absolute inset-x-0 -top-32 h-32 bg-gradient-to-b from-transparent via-black/40 to-black/90 backdrop-blur-2xl pointer-events-none"></div>
      
      {/* Extra layer for smoother transition */}
      <div className="absolute inset-x-0 -top-16 h-16 bg-gradient-to-b from-transparent to-black/80 pointer-events-none"></div>
      
      <div className="max-w-7xl mx-auto relative">
        {/* Main Brand */}
        <div className="mb-12">
          <h1 className="text-6xl md:text-8xl font-bold  mb-2">
            ROHAN.DEV
          </h1>
          <p className=" text-lg font-medium">
            Crafted with passion
          </p>
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
          <div>
            <h3 className=" font-semibold mb-4 uppercase tracking-wide">
              NEWSLETTER
            </h3>
            <p className=" mb-4 text-sm">
              Subscribe for project updates
            </p>
            
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full bg-transparent border-b-2 border-red-500  placeholder-red-300 pb-2 focus:outline-none focus:border-red-600 transition-colors duration-200"
              />
              <button
                onClick={handleSubmit}
                className="absolute right-0 bottom-2  hover:text-red-600 transition-colors duration-200"
              >
                <svg 
                  className="w-5 h-5" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M17 8l4 4m0 0l-4 4m4-4H3" 
                  />
                </svg>
              </button>
            </div>
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
    </footer>
  );
};

export default Footer;