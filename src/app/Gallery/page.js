"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

/* ================= DATA ================= */
const items = [
  {
    id: 1,
    title: "Brand Launch Film",
    category: "Videography",
    src: "/photos/banner.avif",
  },
  {
    id: 2,
    title: "Cinematic Product Reel",
    category: "Video Reel",
    src: "/photos/software.avif",
  },
  {
    id: 3,
    title: "Social Media Ad Reel",
    category: "Brand Ads",
    src: "/photos/web.avif",
  },
  {
    id: 4,
    title: "E-Commerce Website",
    category: "Web Development",
    src: "/photos/web.avif",
  },
  {
    id: 5,
    title: "Startup Landing Page",
    category: "Web Design",
    src: "/photos/marketing.avif",
  },
  {
    id: 6,
    title: "Mobile App Interface",
    category: "App Development",
    src: "/photos/mobile.avif",
  },
];

/* ================= COMPONENT ================= */
const Gallery = () => {
  return (
    <section className="py-24 px-6 bg-background text-foreground">
      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="mb-20 space-y-4">
          <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tight">
            Selected{" "}
            <span className="italic opacity-50 underline decoration-blue-500">
              Works
            </span>
          </h2>

          <p className="max-w-md opacity-60 text-xs md:text-sm tracking-widest uppercase font-bold">
            Visual Storytelling × Technical Architecture
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
              className="group cursor-pointer"
            >
              {/* IMAGE */}
              <div className="relative aspect-[3/4] overflow-hidden rounded-2xl border border-border shadow-lg">
                
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                  className="w-full h-full"
                >
                  <Image
                    src={item.src}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover grayscale group-hover:grayscale-0 transition duration-700"
                  />
                </motion.div>

                {/* HOVER OVERLAY */}
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-black">
                    <ArrowUpRight size={20} />
                  </div>
                </div>
              </div>

              {/* TEXT */}
              <div className="mt-4 flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-blue-500 font-bold">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-bold uppercase mt-1 group-hover:text-blue-500 transition">
                    {item.title}
                  </h3>
                </div>

                <div className="h-px w-6 bg-border mt-3 group-hover:w-10 group-hover:bg-blue-500 transition-all" />
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Gallery;