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

function About() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.4, // Adjust as needed
  });
  return (
    <div className='bg-gradient-to-b px-10 from-gray-100 to-gray-300 dark:from-black dark:via-gray-900/40 dark:to-black text-gray-900 dark:text-white grid md:grid-cols-2 items-center min-h-screen p-10'>
      {/* <div className='flex flex-col items-center justify-center' >
        <div className='w-11/12'>

          <h1 className='text-5xl font-bold uppercase tracking-tight w-fit relative' ref={ref}>What i do
            <span className='w-full bg-violet-800 absolute left-0 top-full rounded h-1'>

            </span>
          </h1>

          <p className='text-lg mt-4'>
            I craft responsive and performant web apps using modern JavaScript frameworks. From backend APIs to pixel-perfect UIs — I turn ideas into functional, user-friendly digital products.
          </p>
        </div>

        <CardContainer className="bg-transparent" containerClassName='w-[85%] max-w-2xl py-0'>

          <img src="/carbon.png" alt="Jsx code" className="w-full" />

        </CardContainer>
      </div> */}
      <div className='h-full w-full'>
        <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
      </div>
      <div ref={ref} className='flex  items-center justify-center'>

        <Terminal className="h-auto" >
          {true && (
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

/*'use client';


export default function TerminalDemo() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2, // Adjust as needed
  });

  return (
    <Terminal className="h-auto" ref={ref}>
      {inView && (
        <>
          <TypingAnimation>&gt; whoami</TypingAnimation>

          <AnimatedSpan delay={1500} className="text-green-500">
            <span>Rohan Nagare</span>
          </AnimatedSpan>
          <TypingAnimation>&gt; role</TypingAnimation>
          <AnimatedSpan delay={2000} className="text-green-500">
            <span>FullStack Developer</span>
          </AnimatedSpan>
          <TypingAnimation>&gt; overview</TypingAnimation>
          <AnimatedSpan delay={2500} className="text-green-500">
            <span className="text-wrap">🔧 I build modern web applications .</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3000} className="text-green-500">
            <span className="text-wrap">🚀 I'm passionate about solving real-world problems.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={3500} className="text-green-500">
            <span className="text-wrap">📦 I love working on and exploring new technologies.</span>
          </AnimatedSpan>
          <TypingAnimation delay={4000}>&gt; skills</TypingAnimation>
          <AnimatedSpan delay={4500} className="text-green-500">
            <span>✔ Javascript, Python, Java.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5000} className="text-green-500">
            <span>✔ React, Next.</span>
          </AnimatedSpan>

          <AnimatedSpan delay={5500} className="text-green-500">
            <span>✔ Nodejs, Bunjs</span>
          </AnimatedSpan>

          <TypingAnimation delay={6000} className="text-muted-foreground">
            Success! Project initialization completed.
          </TypingAnimation>
        </>
      )}
    </Terminal>
  );
}
*/