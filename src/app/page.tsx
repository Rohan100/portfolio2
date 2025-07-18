import About from "@/components/AboutOverview/About";
import Hero from "@/components/Hero/Hero";
import Loader from "@/components/Loader";
import Header from "@/components/Navbar/Navbar";
import Project from "@/components/Project";
import SkillsFlow from "@/components/Skills/Skills";

import Image from "next/image";
import Background from "@/components/Background";
export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
    <Background/>
     {/* <Hero/>   */}
    <About/> 
    <Project/>
    <SkillsFlow/>
    {/* <div className="flex items-center justify-center bg-black h-screen">
    </div>     */}
    </div>
  );
}
