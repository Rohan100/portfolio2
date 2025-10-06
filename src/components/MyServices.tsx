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

        // Add bottom line animation
        gsap.set("#bottom-line", {
            width: "0%"
        });

        ScrollTrigger.create({
            trigger: "#bottom-line",
            start: "top center+=100",
            end: "bottom center",
            scrub: 1.5,
            onUpdate: (self) => {
                const progress = self.progress;
                gsap.to("#bottom-line", {
                    width: progress * 100 + "%",
                    duration: 0.7,
                    ease: "power2.out"
                });
            }
        });

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
                        start: "bottom bottom+=50", // Start later to give more time to see initial state
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
                        start: "center bottom+=50", // Match the image animation start
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
        <section className='flex flex-col sm:px-10 sm:py-4 px-5 py-2'>
            <div className="w-fit mx-4 relative my-7">
                <h1 className='sm:text-7xl text-4xl font-bold tracking-wide '>
                    Services
                </h1>
                <p id="bottom-line" className='absolute top-full h-2 rounded w-full bg-purple-800'></p>
            </div>
            <div className='flex sm:flex-row flex-col gap-2 h-52 border-b-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='sm:text-4xl text-2xl font-semibold text-white'>
                        1.0 <br /> Full-Stack Web Development
                    </h1>
                    <p className='sm:text-base text-sm font-semibold'>
                        Scalable, high-performance websites and web apps built with
                        <strong> React, Next.js, Node.js, and modern databases</strong>.
                        From idea to deployment, I handle complete end-to-end development.
                    </p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/web_dev.jpg" alt="Backend Development" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>

            {/* Service 2 - Backend Systems & APIs */}
            <div className='flex sm:flex-row flex-col gap-2 h-52 border-b-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='sm:text-4xl text-2xl font-semibold text-white'>
                        2.0 <br /> Backend Systems & APIs
                    </h1>
                    <p className='sm:text-base text-sm font-semibold'>
                        Secure and efficient backend solutions with
                        <strong> Node.js, Express, Prisma, and Drizzle</strong>.
                        REST and GraphQL APIs designed for speed, scalability, and reliability.
                    </p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/backend_dev.jpg" alt="Full Stack Development" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>

            {/* Service 3 - Mobile App Development */}
            <div className='flex sm:flex-row flex-col gap-2 h-52 border-b-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='sm:text-4xl text-2xl font-semibold text-white'>
                        3.0 <br /> Mobile App Development
                    </h1>
                    <p className='sm:text-base text-sm font-semibold'>
                        Cross-platform apps built with <strong>React Native & Expo</strong>.
                        Smooth UI, optimized performance, and real-time features powered by modern APIs.
                    </p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/app_dev.jpg" alt="Mobile App Development" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
            <div className='flex sm:flex-row flex-col gap-2 h-52 border-b-2 border-[#e6e6e659] service'>
                <div className='flex flex-col flex-[2] w-full h-full justify-between p-4'>
                    <h1 className='sm:text-4xl text-2xl font-semibold text-white'>
                        4.0 <br />  GIS Solutions
                    </h1>
                    <p className='sm:text-base text-sm font-semibold'>
                        Innovative solutions leveraging <strong>Artificial Intelligence, Blockchain, and GIS technologies</strong>.
                        From intelligent automation to secure decentralized apps and location-based systems,

                    </p>
                </div>
                <div className='flex-[5] w-full h-full p-4'>
                    <img src="/assets/gis_dev.jpg" alt="AI and Blockchain Solutions" className='w-[30%] h-full overflow-hidden rounded-xl object-cover' />
                </div>
            </div>
        </section>
    )
}

export default MyServices