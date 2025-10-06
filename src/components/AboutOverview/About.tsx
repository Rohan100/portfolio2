'use client';
import React from 'react';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import SplitType from 'split-type';
import Lenis from 'lenis'

function About() {
  const containerRef = useRef(null);
  const textRef = useRef(null);
  const lenisRef = useRef<Lenis | null>(null);
  const rafId = useRef<number | null>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const timer = setTimeout(() => {
      // Create sticky-like effect with GSAP instead of CSS sticky
      if (textRef.current) {
        // Pin the text element during scroll
        ScrollTrigger.create({
          trigger: containerRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: textRef.current,
          pinSpacing: false
        });

        // Text reveal animation with custom colors
        const text = new SplitType(textRef.current, { types: 'words,chars' });
        console.log(text.chars);
        
        // Find the target words and their characters
        const targetWords = ['seamless', 'digital', 'products'];
        const normalChars: Element[] = [];
        const specialChars: Element[] = [];
        
        // Get all words
        const words = text.words || [];
        
        words.forEach((word) => {
          const wordText = word.textContent?.toLowerCase().trim();
          const isTargetWord = targetWords.includes(wordText || '');
          
          // Get all characters in this word
          const wordChars = Array.from(word.querySelectorAll('.char'));
          
          if (isTargetWord) {
            specialChars.push(...wordChars);
          } else {
            normalChars.push(...wordChars);
          }
        });
        
        // Create a single timeline for all characters to flow together
        const allChars = text.chars || [];
        
        // Create a timeline that will handle all characters in order
        gsap.fromTo(allChars, 
          {
            color: "#353535",
          },
          {
            color: (index, element) => {
              // Check if this character belongs to special words
              const isSpecial = specialChars.includes(element);
              return isSpecial ? "#8e51ff" : "white";
            },
            duration: 0.3,
            stagger: 0.02,
            scrollTrigger: {
              trigger: containerRef.current,
              start: 'top center',
              end: 'bottom center',
              scrub: true,
              markers: false
            }
          }
        );
      }

      // Initialize Lenis smooth scrolling
      const lenis = new Lenis({
        duration: 1.2,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
      lenisRef.current = lenis;

      const raf = (time: number) => {
        if (lenisRef.current) {
          lenisRef.current.raf(time);
        }
        rafId.current = requestAnimationFrame(raf);
      };
      
      rafId.current = requestAnimationFrame(raf);
    }, 100);

    return () => {
      clearTimeout(timer);
      if (rafId.current) {
        cancelAnimationFrame(rafId.current);
      }
      if (lenisRef.current) {
        lenisRef.current.destroy();
      }
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div className="bg-black">
      {/* Content before */}
      
      {/* Container for the pinned section */}
      <section 
        ref={containerRef}
        className="h-[300vh] relative"
      >
        {/* This will be pinned by GSAP instead of CSS sticky */}
        <div 
          ref={textRef}
          className="w-full h-screen flex items-center justify-center px-10 relative overflow-hidden"
          
        >
          
          {/* Main text content */}
          <p className="w-4/5 max-w-6xl text-4xl md:text-6xl text-center tracking-wide leading-tight text-[#353535] relative z-10">
            Focused on creating seamless digital products, I develop web and mobile applications that are fast, user-friendly, and built to solve real-world challenges.
          </p>
        </div>
      </section>
      
    </div>
  );
}

export default About;