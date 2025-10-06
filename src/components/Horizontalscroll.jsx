import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { image } from 'framer-motion/client';
import Image from 'next/image';

function Horizontalscroll() {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const projects = [
        {
            id: 1,
            title: "Task Management System",
            description: "A web application to manage tasks efficiently.",
            image: "/projects/task_pr.png",
            link: "https://example.com/project1"
        },
        {
            id: 2,
            title: "E-commerce Platform",
            description: "An online platform for buying and selling products.",
            image: "/projects/tast_pr.png",
            link: "https://example.com/project2"
        },
        {
            id: 3,
            title: "Portfolio Website",
            description: "A personal portfolio to showcase projects and skills.",
            image: "/projects/tast_pr.png",
            link: "https://example.com/project3"
        },
        {
            id: 4,
            title: "Blog Platform",
            description: "A platform for writing and sharing blog posts.",
            image: "/projects/tast_pr.png",
            link: "https://example.com/project4"
        }
    ]

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        const container = containerRef.current;
        const sections = gsap.utils.toArray(".hrcontent", container);

        // Kill any existing ScrollTriggers
        ScrollTrigger.getAll().forEach(st => st.kill());

        const scrollTween = gsap.to(sections, {
            xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: containerRef.current,
                pin: true,
                scrub: 1,
                snap: 1 / (sections.length - 1),
                start: "top top",
                end: () => "+=" + (sectionRef.current.offsetWidth * (sections.length - 1)),
                invalidateOnRefresh: true,
                anticipatePin: 1
            }
        });

        return () => {
            scrollTween.kill();
            ScrollTrigger.getAll().forEach(st => st.kill());
        };
    }, []);

    return (
        <div ref={containerRef}>
            <div className='grid grid-cols-1 items-center md:grid-cols-2 '>
                <div className='md:px-16 px-5'>

                    <h1 className='md:text-5xl text-3xl m-10 tracking-wide'>Website Creations And Client Projects</h1>
                </div>
                <p className='md:px-16 px-5 text-gray-300'>
                    Get to know me, my working style, and my values through an insight into my projects, which stand for quality, structure, and sustainable solutions.
                </p>
            </div>
            <section
                ref={sectionRef}
                className="flex gap-4 overflow-hidden relative ps-3"
                id='horizontal-scroll-section'
            >
                {
                    projects.map((project) => (<div key={project.id} className='md:w-1/2 relative w-full aspect-video  shrink-0 hrcontent flex items-center justify-center'>
                        <Image unoptimized src={project.image} width={200} height={200} alt={project.title}
                                className='w-full h-full object-cover rounded-2xl' />
                        <p className='absolute top-2 right-2 bg-black/90 px-2 py-1 text-xs rounded'> {project.title} </p>
                        <p className='absolute text-white bg-black/90 px-2 py-1 rounded text-sm bottom-2 left-2 '>
                            {project.description}
                        </p>
                    </div>))
                }

                {/* <div className='md:w-1/2 w-full aspect-video bg-blue-500 shrink-0 hrcontent flex items-center justify-center'>
                    <p className='text-4xl'>content 2</p>
                </div>
                <div className='md:w-1/2 w-full aspect-video bg-yellow-500 shrink-0 hrcontent flex items-center justify-center'>
                    <p className='text-4xl'>content 3</p>
                </div>
                <div className='md:w-1/2 w-full aspect-video bg-orange-500 shrink-0 hrcontent flex items-center justify-center'>
                    <p className='text-4xl'>content 4</p>
                </div> */}
            </section>

        </div>
    )
}

export default Horizontalscroll