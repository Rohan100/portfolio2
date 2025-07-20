import About from "@/components/AboutOverview/About";
import Hero from "@/components/Hero/Hero";
import Loader from "@/components/Loader";
import Header from "@/components/Navbar/Navbar";
import Project from "@/components/Project";
import Image from "next/image";
import Background from "@/components/Background";
import ScrollBasedVelocityDemo from "@/components/ScrollVelocity";
import MyServices from "@/components/MyServices";
import SkillSection from "@/components/SkillsSection";
import Footer from "@/components/Footer";
export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
      {/* <Background /> */}
      {/* <About /> */}
     {/* <Project /> */}
      <ScrollBasedVelocityDemo/>
      <MyServices />
      <SkillSection />
      <Footer />
      {/* <div className="flex items-center justify-center bg-black h-screen">
    </div>     */}
    </div>
  );
}
