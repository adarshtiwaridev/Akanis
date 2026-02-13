"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const team = [
  {
    id: "01",
    name: "Marcus Thorne",
    role: "Lead Architect",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    offset: "md:mt-0",
  },
  {
    id: "02",
    name: "Elena Vance",
    role: "Creative Director",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&q=80",
    offset: "md:mt-32",
  },
  {
    id: "03",
    name: "Julian Kross",
    role: "System Engineer",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80",
    offset: "md:-mt-16",
  },
  {
    id: "04",
    name: "Sarah Jenkins",
    role: "Product Strategy",
    image:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=600&q=80",
    offset: "md:mt-24",
  },
];

const TeamPage = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] -top-32 -left-32 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] bottom-0 right-0 rounded-full"></div>

      <div className="relative z-10 p-6 md:p-16">

        {/* ================= HERO ================= */}
        <section className="mb-32 mt-16">
          <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tight uppercase italic">
            <span className="gradient-text">Art</span> <br />
            <span className="text-outline">Meets</span> <br />
            <span className="gradient-text">Logic.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            A team of thinkers, engineers, and designers building experiences
            where creativity meets precision.
          </p>
        </section>

        {/* ================= TEAM GRID ================= */}
        <section className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">

            {team.map((member) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 80 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={prefersReducedMotion ? { duration: 0 } : { duration: 0.8 }}
                viewport={{ once: true }}
                className={`relative group ${member.offset} flex flex-col items-center md:items-start`}
              >
                {/* Card Wrapper */}
                <div className="relative w-[300px] md:w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-[2px] transition-transform duration-500 group-hover:-translate-y-4">

                  <div className="relative w-full h-full rounded-3xl overflow-hidden bg-background">

                    {/* Big Background ID */}
                    <div className="absolute -top-10 -right-5 text-[120px] font-black opacity-5 group-hover:opacity-20 transition-all duration-700 select-none">
                      {member.id}
                    </div>

                    <div className="relative w-full h-full">
                      <Image src={member.image} alt={member.name} fill sizes="(max-width: 640px) 100vw, 33vw" className="object-cover transition-all duration-1000 group-hover:scale-110 grayscale hover:grayscale-0" />
                    </div>

                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-500"></div>

                    {/* Glass Info Box */}
                    <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 shadow-xl">
                      <p className="text-xs font-mono uppercase tracking-widest text-cyan-400 mb-1">
                        {member.role}
                      </p>
                      <p className="text-sm font-bold uppercase tracking-tight">
                        Available for collab
                      </p>
                    </div>

                  </div>
                </div>

                {/* Name Section */}
                <div className="mt-8 text-center md:text-left">
                  <h3 className="text-3xl md:text-4xl font-bold uppercase tracking-tight bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                    {member.name}
                  </h3>
                  <div className="h-[2px] w-0 group-hover:w-full bg-gradient-to-r from-purple-400 to-cyan-400 transition-all duration-500"></div>
                </div>

              </motion.div>
            ))}

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-40 pt-20 border-t border-border/40">
          <div className="max-w-4xl">
            <p className="text-4xl md:text-5xl font-black uppercase leading-tight">
              We don’t just fill seats.
            </p>
            <p className="text-4xl md:text-5xl font-black uppercase gradient-text mt-2">
              We solve real problems.
            </p>
          </div>

      
        </footer>

      </div>
    </div>
  );
};

export default TeamPage;
