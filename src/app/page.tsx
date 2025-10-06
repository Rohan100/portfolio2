"use client";
import Project from "@/components/Project";
import Background from "@/components/Background";
import ScrollBasedVelocityDemo from "@/components/ScrollVelocity";
import MyServices from "@/components/MyServices";
import SkillSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
import About from "@/components/AboutOverview/About";
import { useEffect } from "react";
import HorizontalScrollCarousel from "@/components/Horizontalscroll";
import Lenis from "lenis";
export default function Home() {
   useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2, // control the smoothness
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // cleanup
    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <div className="bg-white dark:bg-black overflow-x-hidden">
      <Background />
      <About />
      <HorizontalScrollCarousel />
      {/* <Project /> */}
      <ScrollBasedVelocityDemo />
      <MyServices />
      <SkillSection />
      <Footer />
      {/* <div className="flex items-center justify-center bg-black h-screen">
    </div>     */}
    </div>
  );
}
