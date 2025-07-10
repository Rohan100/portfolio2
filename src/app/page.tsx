import Hero from "@/components/Hero/Hero";
import Loader from "@/components/Loader";
import Header from "@/components/Navbar/Navbar";

import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-white dark:bg-black">
    <Header/>
    <Hero/>  
    <Loader/>
    {/* <div className="flex items-center justify-center bg-black h-screen">
    </div>     */}
    </div>
  );
}
