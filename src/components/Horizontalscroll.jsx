import React, { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { image } from 'framer-motion/client';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { useRouter } from 'next/navigation';

function Horizontalscroll() {
    const containerRef = useRef(null);
    const sectionRef = useRef(null);
    const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
    const [isHovering, setIsHovering] = useState(false);
    const router = useRouter();
    const projects = [
        {
            id: 1,
            title: "Task Management System",
            description: "A web application to manage tasks efficiently.",
            image: "/projects/task_pr.png",
            link: "https://pms.rottengrapes.tech/"
        },
        {
            id: 2,
            title: "Beatcoader",
            description: "A Landing page for Startup.",
            image: "/projects/beatcoder.png",
            link: "https://beatcoder.vercel.app/"
        },
        {
            id: 3,
            title: "A VsCode Extension",
            description: "VS Code extension to visualize code relationships through AST analysis",
            image: "/projects/vscodeext.png",
            link: "https://github.com/Rohan100/code-context-map/"
        },
        {
            id: 4,
            title: "A Multiplay Battleship Game",
            description: "multiplayer Battleship game using React, Node.js, Socket.IO, HTML, and CSS",
            image: "/projects/battleship.jpg",
            link: "https://github.com/Rohan100/multiplayer_battleship"
        }
    ]

    // Add cursor movement handler
    const handleMouseMove = (e) => {
        setCursorPosition({
            x: e.clientX,
            y: e.clientY
        });
    };

    const handleProjectClick = (link) => {
        // Add a small scale animation before navigation
        gsap.to(".hrcontent", {
            scale: 0.98,
            duration: 0.2,
            ease: "power2.inOut",
            onComplete: () => {
                // Open link in new tab
                window.open(link, '_blank', 'noopener,noreferrer');
                // Reset scale
                gsap.to(".hrcontent", {
                    scale: 1,
                    duration: 0.2
                });
            }
        });
    };

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Only apply scroll effect on medium and larger screens
        if (window.innerWidth >= 768) {
            const container = containerRef.current;
            const sections = gsap.utils.toArray(".hrcontent", container);

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
            window.addEventListener('mousemove', handleMouseMove);
            return () => {
                window.removeEventListener('mousemove', handleMouseMove);
                scrollTween.kill();
                ScrollTrigger.getAll().forEach(st => st.kill());
            };
        }
    }, []);

    return (
        <div ref={containerRef} className='lg:mt-10 mt-5 mb-8'>
            {/* Custom Cursor - only show on larger screens */}
            <div 
                className={`fixed w-14 h-14 pointer-events-none z-50 transition-opacity duration-500 hidden md:flex items-center justify-center rounded-full bg-black ${
                    isHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-0'
                }`}
                style={{
                    transform: `translate(${cursorPosition.x - 40}px, ${cursorPosition.y - 40}px)`
                }}
            >
                <span className="text-black text-sm"><ArrowUpRight className='text-white'/></span>
            </div>

            <div className='grid grid-cols-1 items-center md:grid-cols-2 lg:m-10 md:m-6 sm:4 gap-4 mb-10 md:mb-5'>
                <div className='md:px-14 px-5'>

                    <h1 className='md:text-5xl text-2xl  tracking-wide font-semibold'><span className='text-purple-600'>Website</span> Creations And Client <span className='text-purple-600'>Projects</span></h1>
                </div>
                <p className='md:px-16 px-5 text-gray-300'>
                    Get to know me, my working style, and my values through an insight into my projects, which stand for quality, structure, and sustainable solutions.
                </p>
            </div>
            {/* Responsive project grid/scroll section */}
            <section
                ref={sectionRef}
                className="md:flex md:gap-4 md:overflow-hidden relative md:ps-3 grid grid-cols-1 gap-6 px-4"
                id='horizontal-scroll-section'
            >
                {projects.map((project) => (
                    <div 
                        key={project.id} 
                        className='md:w-1/2 relative w-full aspect-video shrink-0 hrcontent flex items-center justify-center cursor-pointer md:cursor-none group'
                        onMouseEnter={() => setIsHovering(true)}
                        onMouseLeave={() => setIsHovering(false)}
                        onClick={() => handleProjectClick(project.link)}
                    >
                        <Image 
                            unoptimized 
                            src={project.image} 
                            width={200} 
                            height={200} 
                            alt={project.title}
                            className='w-full h-full object-cover rounded transition-all duration-300'
                        />
                        <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300'></div>
                        <p className='absolute top-2 right-2 bg-black/90 px-2 py-1 text-xs rounded'>
                            {project.title}
                        </p>
                        <p className='absolute text-white bg-black/90 px-2 py-1 rounded text-sm bottom-2 left-2 max-w-[90%]'>
                            {project.description}
                        </p>
                    </div>
                ))}
            </section>
        </div>
    );
}

export default Horizontalscroll