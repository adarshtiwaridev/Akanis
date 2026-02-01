"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  /* ================= VIDEO / REELS ================= */

  {
    id: 1,
    title: "Brand Launch Film",
    category: "Videography",
    type: "video",
    src: "/photos/mountain.jpg",
    details: {
      platform: "YouTube / Instagram",
      duration: "60 sec",
      work: "Direction • Shooting • Color Grading",
    },
  },
  {
    id: 2,
    title: "Cinematic Product Reel",
    category: "Video Reel",
    type: "video",
    src: "/photos/reel.jpg",
    details: {
      platform: "Instagram Reels",
      duration: "30 sec",
      work: "Concept • Filming • Editing",
    },
  },
  {
    id: 3,
    title: "Social Media Ad Reel",
    category: "Brand Ads",
    type: "video",
    src: "/photos/netflix.jpg",
    details: {
      platform: "Instagram / Facebook",
      duration: "20 sec",
      work: "Ad Creative • Motion • CTA",
    },
  },

  /* ================= WEBSITES ================= */

  {
    id: 4,
    title: "E-Commerce Website",
    category: "Web Development",
    type: "web",
    src: "/photos/web.avif",
    details: {
      tech: "Next.js • Tailwind • Stripe",
      features: "Cart • Payments • Admin Panel",
      status: "Live Project",
    },
  },
  {
    id: 5,
    title: "Startup Landing Page",
    category: "Web Design",
    type: "web",
    src: "/photos/marketing.avif",
    details: {
      tech: "React • Framer Motion",
      features: "SEO • Animations • Lead Capture",
      status: "Client Project",
    },
  },

  /* ================= APPS ================= */

  {
    id: 6,
    title: "Mobile App Interface",
    category: "App Development",
    type: "app",
    src: "/photos/mobile-app.jpg",
    details: {
      tech: "React Native",
      features: "Auth • API • Notifications",
      status: "In Production",
    },
  },

  /* ================= BRAND VIDEO ================= */

  {
    id: 7,
    title: "Corporate Brand Film",
    category: "Video Production",
    type: "video",
    src: "/photos/brand.jpg",
    details: {
      platform: "Website / YouTube",
      duration: "90 sec",
      work: "Script • Shoot • Post-Production",
    },
  },
];


const Gallery = () => {
  const containerRef = useRef(null);

  // Scroll-based parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
  });

  const ySlow = useTransform(smoothProgress, [0, 1], [0, -100]);
  const yFast = useTransform(smoothProgress, [0, 1], [0, -250]);

  return (
    <section
      ref={containerRef}
      className="py-24 px-6 bg-background text-foreground transition-colors duration-700"
    >
      <div className="max-w-7xl mx-auto">

        {/* HEADER (THE ONE YOU WANTED) */}
        <div className="mb-24 space-y-4">
          <motion.h2
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            Selected{" "}
            <span className="italic opacity-50 underline decoration-blue-500 decoration-4 underline-offset-8">
              Works
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="max-w-md opacity-60 text-xs md:text-sm tracking-[0.3em] uppercase font-bold"
          >
            Visual Storytelling × Technical Architecture
          </motion.p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              style={{ y: i % 2 === 0 ? ySlow : yFast }}
              className="group relative flex flex-col cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-3xl bg-card border border-border/40 shadow-xl">
                <motion.img
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.8, ease: [0.33, 1, 0.68, 1] }}
                  src={item.src}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000"
                />

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center backdrop-blur-[2px]">
                  <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <ArrowUpRight size={24} />
                  </div>
                </div>
              </div>

              {/* CAPTION */}
              <div className="mt-6 flex justify-between items-start">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-blue-500">
                    {item.category}
                  </span>
                  <h3 className="text-xl font-bold uppercase tracking-tighter mt-1 group-hover:text-blue-500 transition-colors">
                    {item.title}
                  </h3>
                </div>
                <div className="h-px w-8 bg-border mt-4 group-hover:w-12 group-hover:bg-blue-500 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Gallery;