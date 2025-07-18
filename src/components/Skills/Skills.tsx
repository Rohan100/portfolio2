'use client'
import React from 'react'
import { useEffect, useRef } from 'react'

function Skills() {
  const set1Ref = useRef<HTMLDivElement>(null)
  const set2Ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // GSAP infinite scroll animation
    const createTimeline = () => {
      // Create timeline for infinite scroll
      const tl = {
        currentTime: 0,
        duration: 8000, // 8 seconds for full cycle
        
        animate: function() {
          this.currentTime += 16 // ~60fps
          
          const progress = (this.currentTime % this.duration) / this.duration
          const translateY = progress * -100
          
          if (set1Ref.current) {
            set1Ref.current.style.transform = `translateY(${translateY}%)`
          }
          if (set2Ref.current) {
            set2Ref.current.style.transform = `translateY(${translateY + 100}%)`
          }
          
          requestAnimationFrame(() => this.animate())
        }
      }
      
      tl.animate()
    }

    createTimeline()
  }, [])

const skills = [
    { name: 'JavaScript', src: '/tools/javascript.png' },
    { name: 'Tailwind', src: '/tools/tailwind.png' },
    { name: 'React', src: '/tools/react.png' },
    { name: 'Next.js', src: '/tools/nextjs.png' },
    { name: 'Git', src: '/tools/git.png' },
    { name: 'Drizzle', src: '/tools/drizzle.png' },
    { name: 'Prisma', src: '/tools/prisma.png' },
    { name: 'PostgreSQL', src: '/tools/postgres.png' },
    { name: 'MongoDb', src: '/tools/mongodb.png' },
    { name: 'TypeScript', src: '/tools/typescript.png' },
    { name: 'FastAPI', src: '/tools/fastapi.png' },
    { name: 'Python', src: '/tools/python.png' },
    { name: 'GSAP', src: '/tools/gsap.png' },
    {name:"Node.js", src: '/tools/nodejs.png' },
    {name:"Express", src: '/tools/express.png' },
    {name:"Three.js", src: '/tools/threejs.png' },
  ]

  return (
    <div className='bg-gradient-to-b sm:p-10 p-5 mt-10 from-gray-100 to-gray-300 dark:from-black dark:via-gray-900/40 dark:to-black text-gray-900 dark:text-white flex flex-col gap-5'>
      
      <div className='h-[90vh] md:w-[85%] w-[99%]  m-auto relative overflow-hidden rounded-lg'>
        {/* First set of cards */}
        <div className='text-sm bg-white/20 backdrop-blur-lg absolute top-7 left-1/2 -translate-x-1/2 rounded-xl px-4 py-2 z-[20] w-fit text-nowrap'>Tools and Technology I Use</div>
        <div ref={set1Ref} className='grid sm:grid-cols-4 grid-cols-3 gap-6 absolute w-full'>
          {skills.map((skill, index) => (
            <div key={`set1-${index}`} className='flex flex-col items-center justify-center h-32 bg-white/10 w-full dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform duration-300'>
              <img 
                src={skill.src} 
                alt={skill.name}
                className='w-14 h-auto object-contain mb-2' 
              />
              <span className='text-sm font-medium text-center'>{skill.name}</span>
            </div>
          ))}
        </div>
        
        {/* Second set of cards (duplicate for seamless loop) */}
        <div ref={set2Ref} className='grid mt-4 sm:grid-cols-4 grid-cols-3 gap-6 absolute w-full'>
          {skills.map((skill, index) => (
            <div key={`set2-${index}`} className='flex flex-col items-center justify-center h-32 bg-white/10 dark:bg-gray-800/30 rounded-lg backdrop-blur-sm border border-white/20 dark:border-gray-700/50 hover:scale-105 transition-transform duration-300'>
              <img 
                src={skill.src} 
                alt={skill.name}
                className='w-14 h-auto object-contain mb-2' 
              />
              <span className='text-sm font-medium text-center'>{skill.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Skills