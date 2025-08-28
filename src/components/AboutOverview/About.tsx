'use client';
import React, { useState, useEffect } from 'react';
import { useInView } from "react-intersection-observer";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import dynamic from "next/dynamic";

// Better lazy loading with proper error handling
const Lanyard = dynamic(() => import("./Lanyard"), {
  ssr: false,
  loading: () => (
    <div className="h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
      <div className="text-gray-500">Loading 3D Scene...</div>
    </div>
  ),
});

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4,
  });

  // Add mounted state to ensure client-side rendering
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Don't render until mounted on client
  if (!mounted) {
    return (
      <div className='bg-gradient-to-b px-10 grid md:grid-cols-2 items-center min-h-screen p-10'>
        <div className='h-full w-full'>
          <div className="h-96 bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
            <div className="text-gray-500">Loading 3D Scene...</div>
          </div>
        </div>
        <div className='flex items-center justify-center'>
          <Terminal className="h-auto">
            <div className="text-gray-500">Loading terminal...</div>
          </Terminal>
        </div>
      </div>
    );
  }

  return (
    <div className='bg-gradient-to-b px-10 grid md:grid-cols-2 items-center min-h-screen p-10'>
      <div className='h-full w-full'>
        <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
      </div>
      <div ref={ref} className='flex items-center justify-center'>
        <Terminal className="h-auto">
          {inView && (
            <>
              <TypingAnimation>&gt; whoami</TypingAnimation>
              <AnimatedSpan delay={500} className="text-green-500">
                <span>Rohan Nagare</span>
              </AnimatedSpan>
              <TypingAnimation delay={750}>&gt; role</TypingAnimation>
              <AnimatedSpan delay={1000} className="text-green-500">
                <span>FullStack Developer</span>
              </AnimatedSpan>
              <TypingAnimation delay={1250}>&gt; overview</TypingAnimation>
              <AnimatedSpan delay={1500} className="text-green-500">
                <span className="text-wrap">🔧 I build modern web applications.</span>
              </AnimatedSpan>
              <AnimatedSpan delay={1750} className="text-green-500">
                <span className="text-wrap">🚀 I{"'"}m passionate about solving real-world problems.</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2000} className="text-green-500">
                <span className="text-wrap">📦 I love working on and exploring new technologies.</span>
              </AnimatedSpan>
              <TypingAnimation delay={2250}>&gt; skills</TypingAnimation>
              <AnimatedSpan delay={2500} className="text-green-500">
                <span>✔ Javascript, Python, Java.</span>
              </AnimatedSpan>
              <AnimatedSpan delay={2750} className="text-green-500">
                <span>✔ React, Next.</span>
              </AnimatedSpan>
              <AnimatedSpan delay={3000} className="text-green-500">
                <span>✔ Nodejs, Bunjs</span>
              </AnimatedSpan>
              <TypingAnimation delay={3200}>&gt; contact</TypingAnimation>
              <AnimatedSpan delay={3400}>
                <p>
                  <span className='text-[#df3079]'>email : </span>
                  <span className='text-green-500'>rohannagare8355@gmail.com</span>
                </p>
              </AnimatedSpan>
              <AnimatedSpan delay={3400} className="text-green-500">
                <p>
                  <span className='text-[#df3079]'>Github : </span>
                  <span className='text-green-500'>github.com/rnagare</span>
                </p>
              </AnimatedSpan>
              <AnimatedSpan delay={3600} className="text-green-500">
                <p>
                  <span className='text-[#df3079]'>linkedin : </span>
                  <span className='text-green-500'>linkedin.com/in/rohan-nagare</span>
                </p>
              </AnimatedSpan>
              <TypingAnimation delay={3800} className="text-muted-foreground">
                Success! Project initialization completed.
              </TypingAnimation>
            </>
          )}
        </Terminal>
      </div>
    </div>
  );
}

export default About;