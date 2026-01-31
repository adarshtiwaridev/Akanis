"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  Code,
  Camera,
  Smartphone,
  Film,
  Globe,
  Video,
} from "lucide-react";

const AboutPage = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500">
      {/* HERO */}
      <section className="relative h-[80vh] flex items-center justify-center overflow-hidden px-6">
        <div className="absolute inset-0 opacity-60">
          <Image
            src="/photos/mountain.jpg"
            alt="Background"
            fill
            priority
            sizes="100vw"
            className="object-cover "
          />
        </div>

        <div className="relative z-10 text-center">
          <motion.h1
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-[15vw] md:text-[10rem] font-black italic tracking-tighter"
          >
            AKANIS<span className="text-accent">.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-6 text-xs md:text-sm uppercase tracking-[0.6em] font-bold opacity-70"
          >
            Where Creativity Meets Purpose
          </motion.p>
        </div>
      </section>

      {/* CONTENT */}
      <div className="max-w-7xl mx-auto px-6 py-24">
        {/* BENTO GRID */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-12 gap-6"
        >
          {/* PRODUCTION */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-8 relative h-[420px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/image04.avif"
              alt="Production"
              fill
              sizes="(min-width: 768px) 66vw, 100vw"
              className="object-cover opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <Film size={38} className="text-accent mb-4" />
              <h3 className="text-4xl font-black uppercase">
                Production & Films
              </h3>
              <p className="text-sm opacity-60 max-w-sm">
                Commercials, brand films, ad shoots, cinematic storytelling.
              </p>
            </div>
          </motion.div>

          {/* REELS */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 relative h-[420px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/reel.jpg"
              alt="Reels & Videography"
              fill
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-cover opacity-80"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end text-white">
              <Video size={34} className="text-accent mb-3" />
              <h3 className="text-3xl font-black uppercase">
                Reels & Videography
              </h3>
              <p className="text-sm opacity-80">
                Instagram reels, brand edits, short-form impact.
              </p>
            </div>
          </motion.div>

          {/* PHOTOGRAPHY */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-5 relative h-[330px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/image03.avif"
              alt="Photography"
              fill
              sizes="(min-width: 768px) 42vw, 100vw"
              className="object-cover opacity-30"
            />
            <div className="relative z-10 p-10 h-full flex flex-col justify-end">
              <Camera size={30} className="mb-2" />
              <h3 className="text-3xl font-black uppercase">Photography</h3>
            </div>
          </motion.div>

          {/* WEB */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-4 relative h-[330px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/web.avif"
              alt="Web Development"
              fill
              sizes="(min-width: 768px) 34vw, 100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
              <Code size={28} className="text-accent mb-2" />
              <h3 className="text-2xl font-black uppercase">Web Development</h3>
              <p className="text-sm opacity-80">
                Fast, scalable, conversion-focused websites.
              </p>
            </div>
          </motion.div>

          {/* SOFTWARE */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 relative h-[330px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/software.avif"
              alt="Software"
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
              <Globe size={28} className="text-accent mb-2" />
              <h3 className="text-2xl font-black uppercase">Software</h3>
              <p className="text-sm opacity-80">
                Dashboards & internal systems.
              </p>
            </div>
          </motion.div>

          {/* MOBILE */}
          <motion.div
            variants={itemVariants}
            className="md:col-span-3 relative h-[330px] overflow-hidden rounded-[2.5rem] border border-foreground/10"
          >
            <Image
              src="/photos/mobile.avif"
              alt="Mobile Apps"
              fill
              sizes="(min-width: 768px) 25vw, 100vw"
              className="object-cover opacity-35"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
            <div className="relative z-10 p-8 h-full flex flex-col justify-end text-white">
              <Smartphone size={28} className="text-accent mb-2" />
              <h3 className="text-2xl font-black uppercase">Mobile Apps</h3>
              <p className="text-sm opacity-80">
                Android & iOS with native feel.
              </p>
            </div>
          </motion.div>
        </motion.div>

        {/* PHILOSOPHY */}
        <section className="mt-40 grid md:grid-cols-2 gap-20 items-center">
          <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.8]">
            PIXELS <br />
            <span className="text-accent italic underline underline-offset-8">
              POETRY
            </span>
          </h2>

          <p className="text-xl leading-relaxed opacity-60 font-medium">
            Akanis blends cinematic storytelling with digital craftsmanship —
            brands that look strong and work even stronger.
          </p>
        </section>
      </div>
    </main>
  );
};

export default memo(AboutPage);
