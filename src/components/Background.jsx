'use client';

import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { mask } from 'motion/react-client';
import { useGSAP } from '@gsap/react';
import Image from 'next/image';
import { CustomEase } from 'gsap/CustomEase';
import DarkVeil from './ui/Darkveil';
import { useTime } from 'framer-motion';
gsap.registerPlugin(CustomEase);
const Background = () => {
    const textRef = useRef(null);
    const maskRectRef = useRef(null);
    const [maskRemoved, setMaskRemoved] = useState(false);

    useGSAP(() => {
        const text = textRef.current;
        const timeline = gsap.timeline({});
        timeline.fromTo(
                text,
                {
                    scale: 1,
                    transformOrigin: 'center',
                },
                {
                    scale: 80,
                    // yPercent: -200,
                    xPercent: -70,
                    ease: "power2.inOut",
                    duration: 2,
                    delay: 0.5,
                    onComplete: () => {
                        // Rem3ove the mask after animation
                        if (maskRectRef.current) {
                            maskRectRef.current.removeAttribute('mask');
                            setMaskRemoved(true);
                            maskRectRef.current.style.display = 'none'
                        }
                    },
                }).fromTo("#text_container", {
                    opacity: 0,
                }, { opacity: 1 })
            .fromTo("#animate-line", {
                width: 0,
            }, {
                width: "128px",
                duration: 0.8,
            }, "<").fromTo(".hero-text", {
                y: 30,
                opacity: 0,
            }, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
            })

    }, []);


    return (
        <div className="relative w-full h-screen bg-black overflow-hidden">

            <DarkVeil />

            {/* SVG Mask Overlay */}
            <svg
                className="absolute top-0 left-0 w-full h-full"
                viewBox="0 0 100 100"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    <mask id="textMask">
                        <rect fill="white" width="100%" height="100%" />
                        <text
                            ref={textRef}
                            id="mainText"
                            dominantBaseline="central"
                            x="50%"
                            y="50%"
                            textAnchor="middle"
                            className="text-[7px] w-2 overflow-hidden md:text-[8px] font-black uppercase tracking-[0.8px] lg:tracking-[0.4px]"
                            style={{
                                fontFamily: 'Raleway, sans-serif',
                                fill: 'black',
                                paintOrder: 'stroke fill', // ensures stroke is drawn outside text
                            }}
                        >
                            Rohan.Dev
                        </text>
                            
                    </mask>
                </defs>

                <rect
                    ref={maskRectRef}
                    width="100%"
                    height="100%"
                    fill="rgba(0, 0, 0)"
                    mask={maskRemoved ? undefined : 'url(#textMask)'}
                    className={maskRemoved ? '-z-10' : 'fixed top-0 bottom-0 left-0 right-0 z-10 w-screen h-screen'}
                />
            </svg>
                <style jsx>{`
                .text-stroke {
                    -webkit-text-stroke: 2px white;
                    text-stroke: 2px white;
                    paint-order: stroke fill;
                }
                
                .text-stroke-sm {
                    -webkit-text-stroke: 1px white;
                    text-stroke: 1px white;
                    paint-order: stroke fill;
                }
                
                .font-inter {
                    font-family: 'Inter', sans-serif;
                }
            `}</style>
            {/* Google Fonts Link */}

             <div id="text_container" className='absolute top-0 left-0 w-full h-full grid md:grid-cols-2 md:grid-rows-1 grid-cols-1 grid-rows-3 items-center justify-items-center opacity-0 p-10'>
                <div className=' row-span-2 md:pt-10 pt-5 ps-5 md:row-start-1 row-start-2 text-white'>
                    <div>
                        <div className='flex items-center gap-3'>
                            <h1 className='text-5xl hero-text md:text-8xl font-semibold uppercase tracking-tighter '>
                                Make it
                            </h1>
                            <div id="animate-line" className='w-32 h-2 rounded bg-violet-500 '></div>
                        </div>
                        <h1 className='text-6xl md:text-8xl font-bold uppercase tracking-tight hero-text '>Innovative</h1>
                    </div>
                    <p className="text-2xl font-semibold mt-4 hero-text text-shadow-md  ">
                        Hi i am <span className='font-bold text-violet-500 uppercase '>Rohan Nagare</span> A Full Stack Developer with a passion for building web applications that solve real-world problems.
                    </p>

                </div>
            </div>

        </div>
    );
};

export default Background;