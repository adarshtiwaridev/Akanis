"use client";

import React, { useState, memo } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  Code,
  Code2,
  Globe,
  Video,
  BarChart3,

  Smartphone,
  Megaphone,
  X,
  ArrowRight,
  CheckCircle2,
  Zap,
} from "lucide-react";

const services = [
  // ===== TOP: VIDEO & VISUAL PRODUCTION =====
  {
    id: "ads",
    category: "Production",
    title: "Advertisement Shoots",
    icon: <Video size={24} />,
    image:
      "/photos/image02.avif",
    description:
      "High-impact commercial films crafted to communicate brand value and convert audiences.",
    details: ["Concept & Script", "Director’s Cut", "VFX & Motion Graphics"],
    size: "md:col-span-2",
    priority: 1,
  },
  {
    id: "photo",
    category: "Production",
    title: "Professional Photography",
    icon: <Camera size={24} />,
    image:
      "/photos/image03.avif",
    description:
      "Timeless, clean photography for brands, products, and creative portfolios.",
    details: ["Studio Portraits", "Product Shoots", "Architecture & Lifestyle"],
    size: "md:col-span-2",
    priority: 2,
  },
  {
    id: "video",
    category: "Production",
    title: "Cinematic Videography",
    icon: <Zap size={24} />,
    image:
      "/photos/image04.avif",
    description:
      "Premium cinematic videos designed for storytelling and visual impact.",
    details: ["Brand Films", "Event Coverage", "Reels & Short Content"],
    size: "md:col-span-2",
    priority: 3,
  },

  // ===== MIDDLE: SOCIAL & DIGITAL VISIBILITY =====
  {
    id: "social",
    category: "Digital",
    title: "Social Media Management",
    icon: <Smartphone size={24} />,
    image:"/photos/netflix.jpg",
    description:
      "Consistent, trend-aware content strategies that build reach and engagement.",
    details: ["Content Planning", "Trend Mapping", "Organic Growth"],
    size: "md:col-span-3",
    priority: 4,
  },

  // ===== BOTTOM: WEB & MARKETING =====
  {
    id: "marketing",
    category: "Business",
    title: "Marketing & Brand Strategy",
    icon: <BarChart3 size={24} />,
    image:
      "/photos/marketing.avif",
    description:
      "Data-backed marketing strategies aligned with creativity and business goals.",
    details: ["Brand Positioning", "Paid Ads (PPC)", "Analytics & Reporting"],
    size: "md:col-span-3",
    priority: 5,
  },
  {
    id: "web",
    category: "Technology",
    title: "Web Design & Development",
    icon: <Globe size={24} />,
    image:
      "/photos/web.avif",
    description:
      "Fast, responsive websites built for performance, aesthetics, and conversions.",
    details: ["UI/UX Design", "SEO Optimization", "Performance Tuning"],
    size: "md:col-span-3",
    priority: 6,
  },
];

export default memo(function ServicesPage() {
  const [selectedId, setSelectedId] = useState(null);
  const activeService = services.find((s) => s.id === selectedId);

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <header className="mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-4"
          >
            <Zap size={14} className="text-accent" />
            <span className="text-[10px] uppercase tracking-[0.5em] font-bold text-accent">
              Our Expertise
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-6xl md:text-[7rem] font-black uppercase tracking-tighter leading-none"
          >
            Capabilities <br />
            <span className="italic opacity-20 text-outline">& Solutions</span>
          </motion.h1>

          <p className="mt-6 text-sm text-muted-foreground max-w-xl">
            We combine engineering precision with cinematic storytelling to
            create digital experiences that are visually striking, technically
            sound, and commercially effective.
          </p>
        </header>

        {/* SERVICES GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => (
            <motion.div
              layoutId={service.id}
              key={service.id}
              onClick={() => setSelectedId(service.id)}
              className="group relative h-80 cursor-pointer rounded-[2rem] bg-card border border-border/50 p-8 flex flex-col justify-between overflow-hidden transition-all hover:shadow-2xl"
            >
              {/* Glow */}
              <div
                className={`absolute -right-10 -top-10 w-40 h-40 rounded-full blur-[90px] opacity-10 group-hover:opacity-30 transition-opacity ${service.color}`}
              />

              <div className="relative z-10 text-accent group-hover:scale-110 transition-transform duration-500 origin-left">
                {service.icon}
              </div>

              <div className="relative z-10">
                <h3 className="text-2xl font-black uppercase tracking-tight mb-2">
                  {service.title}
                </h3>
                <p className="text-xs opacity-60 leading-relaxed line-clamp-2">
                  {service.description}
                </p>
              </div>

              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-accent">
                Explore <ArrowRight size={14} />
              </div>
            </motion.div>
          ))}
        </div>

          {/* MODAL */}
       {/* MODAL */}
<AnimatePresence>
      {activeService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6 overflow-hidden">
          
          {/* BACKDROP - Minimalist approach with heavy blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedId(null)}
            className="absolute inset-0 bg-white/80 dark:bg-black/90 backdrop-blur-2xl"
          />

          {/* MODAL CONTAINER */}
          <motion.div
            layoutId={activeService.id}
            className="relative w-full max-w-4xl bg-white dark:bg-[#0c0c0c] rounded-[2.5rem] overflow-hidden shadow-[0_32px_64px_-16px_rgba(0,0,0,0.2)] dark:shadow-none border border-zinc-100 dark:border-white/5 flex flex-col md:flex-row"
          >
            {/* CLOSE BUTTON - Repositioned for cleaner UI */}
            <button
              onClick={() => setSelectedId(null)}
              className="absolute top-8 right-8 z-30 p-2 text-zinc-400 hover:text-black dark:hover:text-white transition-colors"
            >
              <X size={24} strokeWidth={1.5} />
            </button>

            {/* LEFT: VISUAL SECTION */}
            <div className="md:w-5/12 h-64 md:h-auto relative overflow-hidden group">
              <Image
                src={activeService.image}
                alt={activeService.title}
                fill
                className="object-cover grayscale-[0.5] group-hover:grayscale-0 transition-all duration-1000 scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-transparent to-transparent" />
              
              {/* Floating Badge (Visual Interest) */}
              <div className="absolute bottom-10 left-10 hidden md:block">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl">
                   <div className="text-white text-[10px] font-bold uppercase tracking-[0.2em] mb-1 opacity-60">Service Code</div>
                   <div className="text-white text-xs font-mono uppercase tracking-widest">{activeService.id}-0922</div>
                </div>
              </div>
            </div>

            {/* RIGHT: CONTENT SECTION */}
            <div className="md:w-7/12 p-10 md:p-16 flex flex-col bg-[#fcfcfc] dark:bg-transparent">
              
              <div className="mb-12">
                <span className="inline-block text-blue-600 dark:text-blue-400 font-bold uppercase tracking-[0.3em] text-[10px] mb-4">
                  Full Capabilities
                </span>
                <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-[0.9] dark:text-white">
                  {activeService.title}
                </h2>
              </div>

              <div className="space-y-8 flex-grow">
                {/* DESCRIPTION */}
                <p className="text-zinc-500 dark:text-zinc-400 text-lg font-medium leading-relaxed max-w-md italic">
                  "{activeService.description}"
                </p>

                {/* GRID DETAILS - Cleaner alignment */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
                  {activeService.details.map((detail, idx) => (
                    <div key={idx} className="flex items-center gap-3 py-2 border-b border-zinc-100 dark:border-white/5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-800 dark:text-zinc-200">
                        {detail}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ACTION AREA */}
              <div className="mt-16 pt-8 border-t border-zinc-100 dark:border-white/5 flex flex-col sm:flex-row items-center gap-6">
                <motion.a
                  href="#contact"
                  whileHover={{ x: 5 }}
                  onClick={() => setSelectedId(null)}
                  className="w-full sm:w-auto px-10 h-16 bg-black dark:bg-white text-white dark:text-black rounded-full font-black uppercase tracking-widest text-xs flex items-center justify-center gap-4 group"
                >
                  Get a Quote 
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </motion.a>
                
                <span className="text-[10px] text-zinc-400 uppercase tracking-widest font-bold">
                  Avg. Response Time: 2hr
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>

      </div>
    </main>
  );
});
