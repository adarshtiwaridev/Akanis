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
  Heart,
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
  id: "wedding",
  category: "Production",
  title: "Wedding Photography & Films",
  icon: <Heart size={24} />,
  image: "/photos/wedding.jpg", // replace with your actual wedding image
  description:
    "Elegant wedding photography and cinematic films that capture emotions, rituals, and timeless memories.",
  details: [
    "Pre-Wedding Shoots",
    "Candid Photography",
    "Cinematic Wedding Films",
    "Traditional Coverage",
    "Highlight Reels & Teasers",
  ],
  size: "md:col-span-2",
  priority: 3.5, // place between videography and social if needed
},

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
  icon: <Globe size={22} />,
  image: "/photos/web.avif",
  description:
    "Modern, custom-built websites from scratch—fast, scalable, dynamic, and designed to convert users into customers.",
  details: [
    "Custom Website from Scratch",
    "Dynamic & Scalable Architecture",
    "UI/UX Focused Design",
    "SEO & Performance Optimization",
    "CMS / Admin Panel Integration",
    "API & Third-Party Integrations",
  ],
  size: "md:col-span-3",
  priority: 6,
}
,
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
<AnimatePresence>
  {activeService && (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-3 sm:p-4">

      {/* BACKDROP */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setSelectedId(null)}
        className="absolute inset-0 bg-gradient-to-br from-white/90 via-white/80 to-white/70 dark:from-black/90 dark:via-black/85 dark:to-black/80 backdrop-blur-2xl"
      />

      {/* MODAL */}
      <motion.div
        layoutId={activeService.id}
        initial={{ scale: 0.96, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.96, opacity: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
        className="relative w-full max-w-[92vw] sm:max-w-3xl rounded-2xl md:rounded-[2rem] overflow-hidden
                   bg-white dark:bg-[#0c0c0c]
                   border border-zinc-100 dark:border-white/5
                   shadow-[0_30px_80px_-20px_rgba(0,0,0,0.25)]
                   flex flex-col md:flex-row "
      >
        {/* CLOSE */}
        <button
          onClick={() => setSelectedId(null)}
          className="absolute top-4 right-4 z-30 rounded-full bg-white/70 dark:bg-black/60 backdrop-blur
                     p-2 text-zinc-400 hover:text-black dark:hover:text-white transition"
        >
          <X size={16} />
        </button>

        {/* IMAGE */}
        <div className="md:w-5/12 h-44 sm:h-52 md:h-auto relative overflow-hidden">
          <Image
            src={activeService.image}
            alt={activeService.title}
            fill
            className="object-cover scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-black/40 via-black/10 to-transparent" />
        </div>

        {/* CONTENT */}
        <div className="md:w-7/12 p-6 sm:p-8 md:p-10 flex flex-col">

          {/* HEADER */}
          <div className="mb-6">
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.35em]
                             text-blue-600 dark:text-blue-400">
              Full Capabilities
            </span>
            <h2 className="mt-3 text-2xl sm:text-3xl md:text-5xl
                           font-black tracking-tight leading-[0.95]
                           text-zinc-900 dark:text-white">
              {activeService.title}
            </h2>
          </div>

          {/* BODY */}
          <div className="flex-grow space-y-6">
            <p className="text-sm sm:text-base leading-relaxed
                          text-zinc-600 dark:text-zinc-400
                          max-w-sm italic">
              “{activeService.description}”
            </p>

            {/* CHECK MARK FEATURES */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeService.details.map((detail, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-3"
                >
                  <span className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center
                                   rounded-full bg-blue-600/10
                                   text-blue-600 dark:bg-blue-500/15 dark:text-blue-400
                                   text-xs font-black">
                    ✓
                  </span>
                  <span className="text-[11px] sm:text-xs font-semibold uppercase tracking-widest
                                   text-zinc-800 dark:text-zinc-200">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* ACTION */}
          <div className="mt-8 pt-6 border-t border-zinc-100 dark:border-white/5
                          flex flex-col sm:flex-row items-center gap-4">
            <motion.a
              href="#contact"
              whileHover={{ x: 6 }}
              onClick={() => setSelectedId(null)}
              className="w-full sm:w-auto h-12 px-6
                         rounded-full bg-gradient-to-r from-black to-zinc-800
                         dark:from-white dark:to-zinc-200
                         text-white dark:text-black
                         text-[10px] font-black uppercase tracking-widest
                         flex items-center justify-center gap-3"
            >
              Get a Quote
              <ArrowRight size={14} />
            </motion.a>

            <span className="text-[9px] font-bold uppercase tracking-widest text-zinc-400">
              Avg response: 2 hr
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
