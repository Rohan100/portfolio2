'use client'
import React, { useEffect, useRef } from 'react'
import { SparklesText } from "@/components/magicui/sparkles-text";
import { ShineBorder } from './magicui/shine-border';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);
const skills = [
    {
        name: 'React',
        icon: '/tools/reactjs.svg',
    },
    {
        name: 'Next.js',
        icon: '/tools/nextjs.svg',
    },
    {
        name: 'Node.js',
        icon: '/tools/nodejs.svg',
    },
    {
        name: 'Express',
        icon: '/tools/express.svg',
    },
    {
        name: 'MongoDB',
        icon: '/tools/mongodb.svg',
    },
    {
        name: 'GSAP',
        icon: '/tools/gsap.svg',
    },
    {
        name: 'Python',
        icon: '/tools/python.svg',
    },
    {
        name: 'JavaScript',
        icon: '/tools/javascript.svg',
    },
    {
        name: 'TypeScript',
        icon: '/tools/typescript.svg',
    },
    {
        name: 'PostgreSQL',
        icon: '/tools/postgresql.svg',
    },
    {
        name: 'Docker',
        icon: '/tools/docker.svg',
    },
    {
        name: 'Three.js',
        icon: '/tools/threejs.svg',
    },
    {
        name: 'FastAPI',
        icon: '/tools/fastapi.svg',
    },
    {
        name: 'Prisma',
        icon: '/tools/prisma.svg',
    },
    {
        name: "Git",
        icon: '/tools/git.svg',
    },
    {
        name: "Shadcn UI",
        icon: '/tools/shadcn.svg',
    },
    {
        name: "Tailwind CSS",
        icon: '/tools/tailwindcss.svg',
    },
    {
        name: "Vercel",
        icon: '/tools/vercel.svg',
    },
    {
        name: "Firebase",
        icon: '/tools/firebase.svg',
    },
    {
        name: "OpenLayer",
        icon: '/tools/openlayers.svg',
    }
]

gsap.registerPlugin(ScrollTrigger);
function SkillsSection() {
    const skillsRef = useRef(null);
    const containerRef = useRef(null);

    useEffect(() => {
        
        const skillCards = skillsRef.current.querySelectorAll('.skill-card');
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top center",
                end: "bottom center",
                scrub: 1,
            }
        });

        // Reset initial state
        gsap.set(skillCards, {
            opacity: 0,
            y: 50,
            scale: 0.8
        });

        // Add each skill card to the timeline
        skillCards.forEach((card, index) => {
            tl.to(card, {
                opacity: 1,
                y: 0,
                scale: 1,
                duration: 0.5,
                ease: "back.out(1.7)",
                stagger: {
                    from: "center",
                    amount: 0.3
                }
            }, index * 0.1); // Offset each card's animation
        });

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section ref={containerRef} className='w-full min-h-screen p-10 '>
            <div  className='flex items-center justify-center flex-col gap-4'>
                <SparklesText>Tech Stack & Tools</SparklesText>
                <p className='text-lg mb-6'>Languages, libraries, and environments I work with.</p>
            </div>
            <div 
                ref={skillsRef} 
                className='flex flex-wrap justify-center gap-3 gap-y-4 mt-8 w-1/2 mx-auto'
            >
                {skills.map((skill) => (
                    <div 
                        key={skill.name} 
                        className='skill-card flex relative rounded-3xl items-center justify-between gap-2 text-xl px-3 py-1 bg-white/10 backdrop-blur-xl hover:-translate-y-3 hover:scale-110 duration-100 cursor-pointer'
                    >
                        <ShineBorder shineColor={["#027cf7", "#fd06c5", "#6e11b0"]} />
                        <img src={skill.icon} alt={`${skill.name} icon`} className='w-5 h-5' />
                        <span className='text-lg font-semibold'>{skill.name}</span>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default SkillsSection