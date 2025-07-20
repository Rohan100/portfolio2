'use client'
import React, { use, useRef } from 'react'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react';
import ScrollTrigger from 'gsap-trial/ScrollTrigger';
import { Card } from './ui/card';
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
                },
                    {
                        scale: 0.6,
                        opacity: 0,
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
        <div className='bg-gradient-to-b from-violet-950/60 via-violet-800/40 to-black md:px-14 px-7    flex flex-col items-center justify-center'>
            <h1 className='md:text-6xl my-7 text-4xl font-bold italic uppercase tracking-tight w-fit relative flex items-center justify-center'>
                <span className="relative bg-clip-text text-white ">
                    What I{"'"}ve Built
                    <span className='absolute rounded left-0 top-full h-2 w-full bg-purple-800'>

                    </span>
                </span>
            </h1>
            <div ref={scrollRef} className='pinned flex flex-col '>
                <section className='card pinned w-full h-screen flex itmex-center justify-center'>
                    <Card className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5  m-auto bg-black/20  backdrop-blur-3xl rounded-none '>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </Card>
                </section>
                <section className='card pinned w-full h-screen'>
                    <Card className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5  m-auto bg-black/20  backdrop-blur-3xl rounded-none'>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </Card>
                </section>
                <section className='card pinned w-full h-screen'>
                    <Card className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5  m-auto bg-black/20  backdrop-blur-3xl rounded-none'>
                        <img src='/card1.jpg' alt='Project Image' className='md:w-2/5 w-full m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center md:w-3/5 w-full p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </Card>
                </section>
                <section ref={lastRef} className='card pinned w-full h-screen'>
                    <Card className='md:w-4/5 w-full md:h-11/12 h-4/5 flex md:flex-row flex-col md:p-10 p-5  m-auto bg-black/20  backdrop-blur-3xl rounded-none'>
                        <img src='/card1.jpg' alt='Project Image' className='w-2/5 m-auto h-full object-cover rounded' />
                        <div className='flex flex-col items-start justify-center w-3/5 p-10'>
                            <h2 className='text-4xl font-bold mb-4'>Project Title</h2>
                            <p className='text-lg mb-6'>This is a brief description of the project. It showcases my skills in web development and design.</p>
                            <a href='#' className='text-blue-500 hover:underline'>View Project</a>
                        </div>
                    </Card>
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