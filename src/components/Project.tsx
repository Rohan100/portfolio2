'use client'
import React, { use, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
function Project() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const footerRef = useRef<HTMLDivElement>(null);
    const lastRef = useRef<HTMLElement>(null);
    useGSAP(() => {
        if (!scrollRef.current) return;
        if (!lastRef.current) return;
        if (!footerRef.current) return;
        const cards = gsap.utils.toArray(scrollRef.current.children) as HTMLElement[];

        cards.forEach((card, index, cards) => {
            const currentCard = card as HTMLElement;
            const nextSection = (cards[index + 1] as HTMLElement) || lastRef.current;
            let endScalePoin = `top+=${nextSection.offsetTop - currentCard.offsetTop} top`;
            const image = currentCard.querySelector('img') as HTMLImageElement;
            let endValue;
            if (index === cards.length - 1) {
                // For the last card, end at the top of the footer
                endValue = lastRef.current
                    ? `top+=${lastRef.current.offsetHeight / 2} top`
                    : "bottom";
            } else {
                endValue = footerRef.current ? `top+=${footerRef.current.offsetTop - window.innerHeight} top` : "bottom";
            }

            gsap.to(card, {
                scrollTrigger: {
                    trigger: card,
                    start: "top top",
                    end: endValue,
                    scrub: 1,
                    pin: true,
                    pinSpacing: false,
                }
            })
            if (index !== cards.length - 1)
                gsap.fromTo(card, {
                    scale: 1,
                    opacity: 1,
                    filter: "blur(0px)"
                },
                    {
                        scale: 0.6,
                        opacity: 0,
                        filter: "blur(12px)",
                        ease: 'none',
                        scrollTrigger: {
                            trigger: card,
                            start: "top top",
                            end: endScalePoin,
                            scrub: 1,
                        }
                    }
                )


        })

    }, { scope: scrollRef })

    return (
        <div className='bg-gradient-to-b md:px-14 px-7 from-gray-100 to-gray-300 dark:from-black dark:via-gray-900/40 dark:to-black text-gray-900 dark:text-white flex flex-col items-center justify-center'>

            <h1 className='md:text-8xl my-7 text-6xl font-bold italic uppercase tracking-tight w-fit relative   flex items-center justify-center   '>
                What I{"'"}ve Built: <br /> Real-World Projects, Passion-Fueled Code
            </h1>
            <div ref={scrollRef} className='pinned flex flex-col'>
                <section className='card pinned w-full h-screen flex itmex-center justify-center'>
                    <div className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5 bg-gradient-to-br from-purple-900/30 to-indigo-900/30 backdrop-blur-3xl rounded-2xl m-auto'>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </div>
                </section>
                <section className='card pinned w-full h-screen'>
                    <div className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5 bg-gradient-to-br from-blue-900/30 to-cyan-900/30 backdrop-blur-2xl rounded-2xl m-auto'>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </div>
                </section>
                <section className='card pinned w-full h-screen'>
                    <div className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5 bg-gradient-to-br from-emerald-900/30 to-teal-900/30 backdrop-blur-2xl rounded-2xl m-auto'>
                        <img src='/card1.jpg' alt='Project Image' className='md:w-2/5 w-full m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center md:w-3/5 w-full p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </div>
                </section>
                <section ref={lastRef} className='card pinned w-full h-screen'>
                    <div className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5 bg-gradient-to-br from-rose-900/30 to-pink-900/30 backdrop-blur-2xl rounded-2xl m-auto'>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </div>
                </section>
                {/* <section ref={lastRef} className='card  w-full h-screen '>
                    <img src='/card3.jpg' alt='Project Image' className='w-full m-auto h-full object-cover' />
                </section> */}

            </div>
            <div ref={footerRef} className='w-full h-[50vh] bg-transperent flex items-center justify-center'>
            </div>
        </div>
    )
}

export default Project