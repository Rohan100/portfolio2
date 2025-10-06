'use client'
import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
import { Card } from './ui/card';
import ProjectCard from './Project/ProjectCard';
import Image from 'next/image';
import { clipPath } from 'framer-motion/client';
import { Scroll } from 'lucide-react';
import Lenis from 'lenis';
function Project() {
    const stepRef = useRef<HTMLDivElement>(null);


    useLayoutEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        ScrollTrigger.create({
            trigger: stepRef.current,
            start: 'top top',
            end: `+=${window.innerHeight * 7}px`,
            pin: true,
            pinSpacing: true,
            onUpdate: (self) => {
                positionCards(self.progress);
            }
        })



        const getRedius = () => window.innerWidth < 900 ? window.innerWidth * 7.5 : window.innerWidth * 2.5
        const arcAngle = Math.PI * 0.4; // 40 degrees in radians
        const startAngle = Math.PI / 2 - arcAngle / 2; // Start at the top center
        const cards = document.querySelectorAll('.project-card');
        const totalCards = cards.length;
        function positionCards(progress: number) {
            const radius = getRedius();
            const totalTravel = 1 + totalCards / 7.5
            const adjustedProgress = (progress * totalTravel - 1) * 0.75;
            cards.forEach((card, index) => {
                const normalizedProgress = (totalCards - 1 - index) / totalCards
                const cardProgress = normalizedProgress + adjustedProgress
                const angle = startAngle + arcAngle * cardProgress;
                const x = radius * Math.cos(angle);
                const y = radius * Math.sin(angle);
                const rotation = (angle - Math.PI / 2) * (180 / Math.PI);
                gsap.set(card, {
                    x: x,
                    y: -y + radius,
                    rotation: -rotation,
                    transformOrigin: 'center center'
                }) // Convert to degrees and adjust
            })

        }
        positionCards(0);
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());


        };
    }, []);

    return (
        <div ref={stepRef} className='w-full steps gradient-container'>
            <div className='absolute m-[2em] flex flex-col'>
                <div className='relative w-[1200px] md:h-40 h-8 overflow-hidden'
                    style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }}>
                    <h1 className='w-full relative text-white uppercase font-extrabold  md:text-9xl text-3xl tracking-tighter will-change-transform font-mono' style={{ font: "PP Monument Extended" }}>
                        Steps
                    </h1>
                </div>
                <div className='relative w-[1200px] h-40  will-change-transform overflow-hidden md:-top-2.5 top-0 ' style={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)' }} >
                    <div className='translate-y-40 relative will-change-transform'>
                        <h1>1</h1>
                        <h1>2</h1>
                        <h1>3</h1>
                        <h1>4</h1>
                        <h1>5</h1>
                    </div>
                </div>
            </div>

            <div className='absolute top-0 right-0 w-full h-full'>
                <div className='absolute project-card -ms-60 flex flex-col left-1/2 top-1/2 -translate-1/2 md:w-[min(60vw,60vh)] w-[40vw] aspect-4/5 '>
                    <div className='flex-1 overflow-hidden rounded-2xl' >
                        <Image src='/assets/web_dev.jpg' className='w-full h-full object-cover' alt='project1' width={500} height={500} />
                    </div>
                    <div className='h-[60px]'>
                        <p className='text-white text-base/tight font-medium '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. exercitationem a in magnam
                        </p>
                    </div>
                </div>
                <div className='absolute project-card -ms-60 flex flex-col left-1/2 top-1/2 -translate-1/2 md:w-[min(60vw,60vh)] w-[40vw] aspect-4/5 '>
                    <div className='flex-1 overflow-hidden rounded-2xl' >
                        <Image src='/assets/web_dev.jpg' className='w-full h-full object-cover' alt='project1' width={500} height={500} />
                    </div>
                    <div className='h-[60px]'>
                        <p className='text-white text-base/tight font-medium '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. exercitationem a in magnam
                        </p>
                    </div>
                </div>
                <div className='absolute project-card -ms-60 flex flex-col left-1/2 top-1/2 -translate-1/2 md:w-[min(60vw,60vh)] w-[40vw] aspect-4/5 '>
                    <div className='flex-1 overflow-hidden rounded-2xl' >
                        <Image src='/assets/web_dev.jpg' className='w-full h-full object-cover' alt='project1' width={500} height={500} />
                    </div>
                    <div className='h-[60px]'>
                        <p className='text-white text-base/tight font-medium '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. exercitationem a in magnam
                        </p>
                    </div>
                </div>
                <div className='absolute project-card -ms-60 flex flex-col left-1/2 top-1/2 -translate-1/2 md:w-[min(60vw,60vh)] w-[40vw] aspect-4/5 '>
                    <div className='flex-1 overflow-hidden rounded-2xl' >
                        <Image src='/assets/web_dev.jpg' className='w-full h-full object-cover' alt='project1' width={500} height={500} />
                    </div>
                    <div className='h-[60px]'>
                        <p className='text-white text-base/tight font-medium '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. exercitationem a in magnam
                        </p>
                    </div>
                </div>
                <div className='absolute project-card -ms-60 flex flex-col left-1/2 top-1/2 -translate-1/2 md:w-[min(60vw,60vh)] w-[40vw] aspect-4/5 '>
                    <div className='flex-1 overflow-hidden rounded-2xl' >
                        <Image src='/assets/web_dev.jpg' className='w-full h-full object-cover' alt='project1' width={500} height={500} />
                    </div>
                    <div className='h-[60px]'>
                        <p className='text-white text-base/tight font-medium '>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. exercitationem a in magnam
                        </p>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default Project