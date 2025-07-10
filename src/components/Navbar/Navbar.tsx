'use client';
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown, Menu, X, User, ShoppingCart } from "lucide-react";
import Link from "next/link";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import { cn } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCoursesOpen, setIsCoursesOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);

  useGSAP(()=>{
    gsap.fromTo(".nav-nav-link",{
      opacity:0,
      y:-30
    },{
      opacity:1,
      y:0,
      stagger:0.2,
      duration:0.3,
      delay:1.2
    })
  })

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      const isCurrentlyAtTop = scrollYProgress.get() < 0.02;
      setIsAtTop(isCurrentlyAtTop);

      if (isCurrentlyAtTop) {
        setVisible(true);
      } else {
        let direction = current! - scrollYProgress.getPrevious()!;
        if (direction < 0) {
          setVisible(true);
        } else {
          setVisible(false);
        }
      }
    }
  });

  return (
    <AnimatePresence mode="wait">
      <motion.header

        initial={{
          opacity: 1,
          y: -100,
        }}
        animate={{
          y: visible ? 0 : -100,
          opacity: visible ? 1 : 0,
        }}
        transition={{
          duration: 0.3,
          startTime: 1,
          ease: "easeInOut"
        }}
        className={"fixed top-0 left-0 right-0 z-[10] bg-transparent transition-all duration-300"}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <strong className="text-2xl nav-nav-link font-bold text-gray-900 dark:text-white tracking-tight flex items-center space-x-2"
            >
              R.N
            </strong>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1">

              {["Home", "About", "Contact"].map((v,i) => <div
               className="nav-nav-link"
                key={i}
              >
                <Link href="/" className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:border-b-2 hover:border-b-violet-800">
                  {v}
                </Link>
              </div>)}
            </nav>

            {/* CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3 nav-nav-link">
              <ThemeToggle />
            </div>

            {/* Mobile Menu Button */}
            <motion.button
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <AnimatePresence mode="wait">
                {isMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="h-6 w-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="h-6 w-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="md:hidden bg-white/95 dark:bg-gray-900/95 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50"
            >
              <div className="px-4 py-6 max-w-7xl mx-auto">
                <nav className="flex flex-col space-y-4">
                  {["Home", "About", "Contact"].map(i => <motion.div
                    initial={{ y: -20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 1.2 }}
                  >
                    <Link href="/" className="block px-4 py-3 text-gray-700 dark:text-gray-200 hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-gray-100/50 dark:hover:bg-gray-800/50 font-medium">
                      Home
                    </Link>
                  </motion.div>)}
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>
    </AnimatePresence>
  );
};

export default Header;
