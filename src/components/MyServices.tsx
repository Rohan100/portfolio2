'use client'
import React, { useEffect } from 'react'
import Lenis from 'lenis'

import { ScrollTrigger } from 'gsap/ScrollTrigger';
import gsap from 'gsap';
gsap.registerPlugin(ScrollTrigger)

function MyServices() {
    useEffect(() => {
        const lenis = new Lenis();

        lenis.on('scroll', () => {
            ScrollTrigger.update()
        })
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000)
        });
        gsap.ticker.lagSmoothing(0, 0);

        const services = gsap.utils.toArray('.service');
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }
        
        const callback = (entries: any) => {
            entries.forEach((entry: any) => {
                if (entry.isIntersecting) {
                    const service = entry.target;
                    const imgContainer = service.querySelector('img');
                    
                    // Image width animation - slower and smoother
                    ScrollTrigger.create({
                        trigger: service,
                        start: "center bottom", // Start later to give more time to see initial state
                        end: "center top", // End earlier for more gradual transition
                        scrub: 5, // Increased scrub for much slower animation
                        onUpdate: (self) => {
                            const progress = self.progress;
                            // Smoother easing curve
                            let easedProgress = gsap.utils.interpolate(0, 1, progress);
                            easedProgress = Math.pow(easedProgress, 0.7); // Custom easing for smoother start
                            const newWidth = 30 + 70 * easedProgress;
                            gsap.set(imgContainer, {
                                width: newWidth + "%",
                                duration: 0.6,
                                ease: "power2.out",
                            });
                        },
                    });
                    
                    // Container height animation - much more subtle
                    ScrollTrigger.create({
                        trigger: service,
                        start: "center bottom", // Match the image animation start
                        end: "center top",
                        scrub: 6, // Even slower for height changes
                        onUpdate: (self) => {
                            const progress = self.progress;
                            // Much more subtle height change
                            let easedProgress = gsap.utils.interpolate(0, 1, progress);
                            easedProgress = Math.pow(easedProgress, 0.8);
                            // Reduced height variation from 300px to 100px for subtlety
                            const newHeight = 208 + 300 * easedProgress; // 192px = h-52 in Tailwind (12rem)
                            gsap.set(service, {
                                height: newHeight + "px",
                                duration: 0.6,
                                ease: "power2.out",
                            });
                        },
                    });
                    observer.unobserve(service);
                }
            });
        }
        
        const observer = new IntersectionObserver(callback, observerOptions);
        services.forEach((service: any) => {
            observer.observe(service);
        });

        // Cleanup function
        return () => {
            lenis.destroy();
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            observer.disconnect();
        };
    }, []);

    return (
        <section className='flex flex-col px-10 py-4'>
            <div className="grid grid-cols-2 my-7">
                <h1 className='text-5xl font-bold text-end'>
                    All Services
                </h1>
            </div>
            <div className='flex gap-2 h-52 border-t-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='text-4xl font-semibold text-white'>1.0 <br/>Web Development </h1>
                    <p className='text-base font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim explicabo neque deserunt quas possimus sequi ab ipsa</p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/backend_dev.jpg" alt="Web Development" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
            <div className='flex gap-2 h-52 border-t-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='text-4xl font-semibold text-white'>2.0 <br/>App Development </h1>
                    <p className='text-base font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim explicabo neque deserunt quas possimus sequi ab ipsa</p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/web_dev.jpg" alt="App Development" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
            <div className='flex gap-2 h-52 border-t-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='text-4xl font-semibold text-white'>3.0 <br/>UI/UX Design </h1>
                    <p className='text-base font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim explicabo neque deserunt quas possimus sequi ab ipsa</p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/app_dev.jpg" alt="UI/UX Design" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
            <div className='flex gap-2 h-52 border-y-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='text-4xl font-semibold text-white'>4.0 <br/>Brand Identity </h1>
                    <p className='text-base font-semibold'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim explicabo neque deserunt quas possimus sequi ab ipsa</p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/carbon.png" alt="Brand Identity" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
        </section>
    )
}

export default MyServices