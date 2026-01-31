"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const items = [
  { id: 1, title: "Cinematic Reel", category: "Film", src: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=800" },
  { id: 2, title: "E-Commerce OS", category: "Dev", src: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=800" },
  { id: 3, title: "Vogue Edit", category: "Photography", src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=800" },
  { id: 4, title: "Next-Gen App", category: "Dev", src: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800" },
  { id: 5, title: "Urban Narrative", category: "Film", src: "https://images.unsplash.com/photo-1502982722823-b9210447026e?q=80&w=800" },
  { id: 6, title: "Abstract Logic", category: "Dev", src: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=800" },
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