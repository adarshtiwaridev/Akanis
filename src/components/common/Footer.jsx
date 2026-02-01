"use client";

import React from "react";
import {
  Instagram,
  Mail,
  Phone,
  Linkedin,
  Globe,
  ArrowUp,
} from "lucide-react";
import { motion } from "framer-motion";

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden bg-background text-foreground pt-24 pb-10 transition-colors duration-700">
      
      {/* BACKGROUND GIANT TEXT (Watermark Effect) */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 select-none pointer-events-none">
        <h2 className="text-[20vw] font-black uppercase tracking-tighter opacity-[0.03] dark:opacity-[0.05] leading-none">
          AKANIS
        </h2>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* BRAND & MISSION (Left) */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <h2 className="text-4xl font-black uppercase tracking-[0.2em] flex items-center gap-2">
                <span className="text-accent animate-pulse">●</span> AKANIS
              </h2>
              <p className="mt-4 text-xs tracking-[0.5em] font-bold opacity-40 uppercase">
                Visual Stories · Digital Code
              </p>
            </div>
            
            <p className="text-sm leading-relaxed opacity-60 max-w-sm">
              We are a hybrid production house. We blend the raw aesthetic of 
              cinematography with the precision of modern web development. 
              Based in the heart of Lucknow, serving global brands.
            </p>

            <button 
              onClick={scrollToTop}
              className="group flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] hover:text-accent transition-colors"
            >
              Back to Top <div className="p-2 rounded-full border border-border group-hover:bg-accent group-hover:text-white transition-all"><ArrowUp size={14} /></div>
            </button>
          </div>

          {/* QUICK LINKS (Middle) */}
          <div className="lg:col-span-3 space-y-6">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Navigation</h3>
            <ul className="space-y-3 text-sm font-medium">
              <FooterLink text="Our Work" />
              <FooterLink text="service" />
              <FooterLink text="about" />
              <FooterLink text="contact" />
            </ul>
          </div>

          {/* SOCIALS & CONTACT (Right) */}
          <div className="lg:col-span-4 space-y-6">
             <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-accent">Get in Touch</h3>
             <div className="space-y-4">
               <LinkItem icon={<Instagram size={18} />} text="@akanis_production" href="https://instagram.com/akanis_production" />
               <LinkItem icon={<Mail size={18} />} text="akanisproduction@gmail.com" href="mailto:akanisproduction@gmail.com" />
               <LinkItem icon={<Phone size={18} />} text="+91 88813 61999" href="tel:+918881361999" />
               <LinkItem icon={<Globe size={18} />} text="View Digital Portfolio" href="https://akanisproduction.my.canva.site" />
             </div>
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="mt-24 pt-8 border-t border-border/50 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4 text-[9px] font-bold tracking-[0.2em] opacity-40">
            <span>NCR</span> / <span>LUCKNOW</span> / <span>KANPUR</span> / <span>VARANASI</span>
          </div>
          
          <span className="text-[10px] font-bold tracking-widest opacity-40 uppercase">
            © {new Date().getFullYear()} Akanis Productions — All Rights Reserved
          </span>

          <div className="flex gap-6 opacity-40 text-[9px] font-bold uppercase tracking-widest">
            <a href="#" className="hover:text-accent transition-colors">Privacy</a>
            <a href="#" className="hover:text-accent transition-colors">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

function LinkItem({ icon, text, href }) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 group"
    >
      <span className="w-10 h-10 rounded-full border border-border flex items-center justify-center opacity-60 group-hover:bg-accent group-hover:text-white group-hover:border-accent transition-all duration-500">
        {icon}
      </span>
      <span className="text-sm font-medium opacity-70 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-500">
        {text}
      </span>
    </a>
  );
}

function FooterLink({ text }) {
  return (
    <li>
      <a href="#" className="opacity-50 hover:opacity-100 hover:text-accent transition-all flex items-center gap-2 group">
        <span className="h-px w-0 bg-accent group-hover:w-4 transition-all duration-300" />
        {text}
      </a>
    </li>
  );
}