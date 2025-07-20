'use client';
import React from 'react'
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import { useInView } from "react-intersection-observer";
import {
  AnimatedSpan,
  Terminal,
  TypingAnimation,
} from "@/components/magicui/terminal";
import Lanyard from './Lanyard'
import { VelocityScroll } from "@/components/magicui/scroll-based-velocity";
function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, // Adjust as needed
  });
  return (
      <div className='bg-gradient-to-b px-10  grid md:grid-cols-2 items-center min-h-screen p-10'>
        <div className='h-full w-full'>
          <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
        </div>
        <div ref={ref} className='flex  items-center justify-center'>

          <Terminal className="h-auto" >
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
                  <span className="text-wrap">🔧 I build modern web applications .</span>
                </AnimatedSpan>

                <AnimatedSpan delay={1750} className="text-green-500">
                  <span className="text-wrap">🚀 I'm passionate about solving real-world problems.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2000} className="text-green-500">
                  <span className="text-wrap">📦 I love working on and exploring new technologies.</span>
                </AnimatedSpan>
                <TypingAnimation delay={2250} >&gt; skills</TypingAnimation>
                <AnimatedSpan delay={2500} className="text-green-500">
                  <span>✔ Javascript, Python, Java.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={2750} className="text-green-500">
                  <span>✔ React, Next.</span>
                </AnimatedSpan>

                <AnimatedSpan delay={3000} className="text-green-500">
                  <span>✔ Nodejs, Bunjs</span>
                </AnimatedSpan>
                <TypingAnimation delay={3200} >&gt; contact</TypingAnimation>
                <AnimatedSpan delay={3400}>
                  <p >
                    <span className='text-[#df3079]'>email : </span>
                    <span className='text-green-500'>rohannagare8355@gmail.com</span>
                  </p>
                </AnimatedSpan>

                <AnimatedSpan delay={3400} className="text-green-500">
                  <p >
                    <span className='text-[#df3079]'>Github : </span>
                    <span className='text-green-500'>rnagare8355@gmail.com</span>
                  </p>
                </AnimatedSpan>

                <AnimatedSpan delay={3600} className="text-green-500">
                  <p >
                    <span className='text-[#df3079]'>linkedin : </span>
                    <span className='text-green-500'>rohannagare8355@gmail.com</span>
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
  )
}

export default About

