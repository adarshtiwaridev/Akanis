"use client";

import React, { useState, useEffect } from "react";
import { Phone, ArrowUpRight, Play, Globe, Zap } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {  useRouter} from 'next/navigation';

const useTypewriter = (words, speed = 120, pause = 1500) => {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
 
  useEffect(() => {
    const current = words[wordIndex];
    let timeout;

    if (!isDeleting) {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length + 1));
        if (text === current) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      }, speed);
    } else {
      timeout = setTimeout(() => {
        setText(current.substring(0, text.length - 1));
        if (text === "") {
          setIsDeleting(false);
          setWordIndex((prev) => (prev + 1) % words.length);
        }
      }, speed / 1.8);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
};
/* ------------------------------------------------ */

const Hero = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);

  
  const typedWord = useTypewriter(
    ["CRAFTING", "FILMING", "CREATING", "DESIGNING" , "BUILDING", "ENGINEERING"],
    120,
    1200
  );
const router = useRouter();
  const images = [
     "/photos/image03.avif",
    "/photos/image02.avif",
    "/photos/image04.avif",
"/photos/image01.jpg",
    "/photos/image03.avif",
    "/photos/image02.avif",
    "/photos/image04.avif",
"/photos/image01.jpg"
 ];

 const isMobile = typeof window !== "undefined"
  ? window.matchMedia("(hover: none)").matches
  : false;


useEffect(() => {
  let interval;

  // Mobile → auto slide
  // Desktop → slide only on hover
  if (isMobile || isHovered) {
    interval = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % images.length);
    }, 800);
  } else {
    setSliderIndex(0);
  }

  return () => clearInterval(interval);
}, [isHovered, images.length, isMobile]);


  const textVariant = {
    hidden: { opacity: 0, y: 100 },
    visible: (i, number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.8, ease: [0.22, 1, 0.36, 1] },
    }),
  };

  return (
    <section className="relative min-h-screen bg-background text-foreground overflow-hidden selection:bg-accent selection:text-white transition-colors duration-700">
      
      {/* 1. ADAPTIVE BACKGROUND MESH */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 dark:bg-blue-600/20 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px]" />
        <div className="absolute inset-0 opacity-[0.05] dark:opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 pt-32 pb-20 grid lg:grid-cols-12 gap-12 items-center min-h-screen">
        
        {/* 2. LEFT CONTENT */}
        <div className="lg:col-span-7">
          <motion.div initial="hidden" animate="visible">
            <motion.div custom={0} variants={textVariant} className="flex items-center gap-3 mb-6">
              <span className="h-[1px] w-12 bg-foreground/30" />
              <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">
                Akanis Digital House
              </span>
            </motion.div>

           {/* MAIN HEADING */}
            <h1 className="text-[12vw] lg:text-[7rem] leading-[0.85] font-black uppercase tracking-tighter">
              {typedWord} <br />
              <span className="text-transparent stroke-text italic">
                LEGACIES
              </span>
            </h1>

            {/* TAGLINE (TYPE FEEL, STATIC TEXT) */}
            <p className="mt-6 text-sm md:text-base uppercase tracking-[0.35em] font-semibold opacity-70">
              Where Creativity Meets Purpose.
            </p>
            <motion.div custom={2} variants={textVariant} className="mt-10 grid grid-cols-2 gap-8 max-w-lg">
              <div>
                <p className="text-xs uppercase tracking-widest text-muted-foreground mb-2 font-bold">Services</p>
                <ul className="text-sm space-y-1 font-medium">
                  <li className="flex items-center gap-2"><Play size={12} className="text-accent"/> Film Production</li>
                  <li className="flex items-center gap-2"><Globe size={12} className="text-accent"/> Web Architect</li>
                  <li className="flex items-center gap-2"><Zap size={12} className="text-accent"/> Brand Strategy</li>
                </ul>
              </div>
              <div className="flex flex-col justify-end">
                <p className="text-sm text-muted-foreground leading-relaxed border-l border-border pl-4">
                  We don't just build reel or film videos. We engineer emotional experiences.
                </p>
              </div>
            </motion.div>

            <motion.div custom={3} variants={textVariant} className="mt-12 flex items-center gap-6">
              <button onClick={() => router.push("#contact")}   className="group relative bg-foreground text-background px-8 py-4 overflow-hidden rounded-full font-bold uppercase text-xs tracking-widest transition-transform hover:scale-105">
                <span className="relative z-10 flex items-center gap-2" href="#contact">
                  Start Project <ArrowUpRight size={16} />
                </span>
                <div className="absolute inset-0 bg-accent translate-y-[100%] group-hover:translate-y-0 transition-transform duration-300" />
              </button>

              <button onClick={() => router.push("/contact")}  className="flex items-center gap-3 text-xs uppercase tracking-[0.2em] font-bold hover:text-accent transition-colors">
                <Phone size={16} /> Contact Studio
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* 3. RIGHT CONTENT: FAST SLIDING SHOWCASE */}
        <div className="lg:col-span-5 right-5 relative h-[500px] flex items-center justify-center">
          <motion.div 
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            className="relative w-full h-full cursor-pointer perspective-1000"
          >
            <AnimatePresence >
              {images.map((img, i) => {
                // When hovered, only show the image at sliderIndex
                // When NOT hovered, show them all stacked
                const isVisible = isHovered ? i === sliderIndex : true;

                return isVisible && (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.8, x: isHovered ? 50 : 0 }}
                    animate={{ 
                      opacity: 1, 
                      scale: isHovered ? 1 : 1 - (i * 0.05),
                      rotate: isHovered ? 0 : i * 6 - 12,
                      x: isHovered ? 0 : i * 20,
                      y: isHovered ? 0 : i * -10,
                      zIndex: isHovered ? 50 : 10 - i 
                    }}
                    exit={{ opacity: 0, x: -50, scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 150, damping: 20 }}
                    className="absolute inset-0 overflow-hidden rounded-3xl border border-border shadow-2xl bg-card"
                  >
                    <img 
                      src={img} 
                      className={`w-full h-full object-cover transition-all duration-500 ${isHovered ? 'grayscale-0' : 'grayscale opacity-60'}`} 
                      alt="Portfolio" 
                    />
                    {/* Progress Bar for Fast Slide */}
                    {isHovered && (
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        key={`progress-${sliderIndex}`}
                        transition={{ duration: 0.8, ease: "linear" }}
                        className="absolute bottom-0 left-0 h-1 bg-accent z-[60]"
                      />
                    )}
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Badge - Color Adapts */}
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              className="absolute -top-6 -right-6 w-28 h-28 bg-accent text-white rounded-full flex items-center justify-center border-4 border-background z-[100] shadow-xl"
            >
              <p className="text-[10px] font-black text-center leading-tight uppercase">
                Akanis<br/>2026
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>

      <style jsx>{`
        .stroke-text {
          -webkit-text-stroke: 1px currentColor;
          opacity: 0.3;
        }
      `}</style>
    </section>
  );
};

export default Hero;