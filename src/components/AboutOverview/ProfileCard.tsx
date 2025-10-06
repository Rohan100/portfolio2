import React, { useEffect, useRef } from 'react';
import { Dribbble, Twitter, Instagram, Mail } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ProfileCard = () => {
  const containerRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    // Set initial clip-path from top right (100% 0%) to top right (100% 0%)
    gsap.set(imageRef.current, {
      clipPath: 'polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)'
    });

    // Animate clip-path to reveal from top right to bottom left
    gsap.to(imageRef.current, {
      clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
      duration: 1.8,
      ease: 'linear',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top center',
        end: 'center center',
        scrub: 1,
        once: true,
        // markers: true, // Uncomment for debugging
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <div ref={containerRef} className='w-full flex justify-center items-center'>
      <div className='w-[85%] aspect-square relative'>
        <div 
          ref={imageRef} 
          className='w-full h-full '
        >
          <Image 
            src="/assets/profile.png" 
            alt="Profile Picture" 
            width={300} 
            height={300} 
            className='w-full h-full object-cover mask-[url("/assets/profile_mask.png")] mask-cover mask-no-repeat'
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;