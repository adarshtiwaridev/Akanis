"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Instagram,
  Mail,
  Phone,
  Linkedin,
  Globe,
  MessageCircle,
  MapPin,
  ArrowUpRight,
} from "lucide-react";

const ContactPage = () => {
  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-700 pt-32 pb-24 px-6">
      <div className="max-w-7xl mx-auto space-y-24">

        {/* TOP SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid lg:grid-cols-2 gap-20 items-start"
        >
          {/* LEFT: COMPANY DETAILS */}
          <div className="space-y-10">
            <motion.h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter leading-none">
              Contact <br />
              <span className="italic opacity-30 underline decoration-blue-500 decoration-4 underline-offset-8">
                Akanis
              </span>
            </motion.h1>

            <p className="max-w-md text-muted-foreground text-lg">
              Akanis Production is a visual storytelling and digital architecture
              studio crafting cinematic films, premium photography, and
              performance-driven web experiences.
            </p>

            {/* QUICK ACTIONS */}
            <div className="flex flex-wrap gap-4">
              <a
                href="https://wa.me/918881361999"
                className="flex items-center gap-3 bg-blue-600 text-white px-6 py-3 rounded-full font-bold hover:scale-105 transition-transform"
              >
                <MessageCircle size={20} /> WhatsApp
              </a>
              <a
                href="tel:+918881361999"
                className="flex items-center gap-3 border border-border px-6 py-3 rounded-full font-bold hover:border-blue-500 hover:text-blue-500 transition-all"
              >
                <Phone size={20} /> Call Now
              </a>
            </div>

            {/* CONTACT LINKS */}
            <div className="grid sm:grid-cols-2 gap-4 pt-6">
              <LinkItem
                href="https://instagram.com/akanis_production"
                icon={<Instagram size={18} />}
                text="@akanis_production"
              />
              <LinkItem
                href="mailto:akanisproduction@gmail.com"
                icon={<Mail size={18} />}
                text="akanisproduction@gmail.com"
              />
              <LinkItem
                href="tel:+918299841360"
                icon={<Phone size={18} />}
                text="+91 8299841360"
              />
              <LinkItem
                href="#"
                icon={<Linkedin size={18} />}
                text="Akanis Production"
              />
          
            </div>
          </div>

          {/* RIGHT: LARGE MAP */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full h-[520px] rounded-[2.5rem] overflow-hidden border border-border shadow-2xl"
          >
            <iframe
              title="Akanis Location"
            src="https://www.google.com/maps?q=Lucknow%20Uttar%20Pradesh%20262028&output=embed"
              className="w-full h-full border-0 grayscale invert-[0.9] dark:invert-0"
              loading="lazy"
            ></iframe>

            {/* MAP BADGE */}
            <div className="absolute bottom-6 left-6 bg-background/80 backdrop-blur px-5 py-3 rounded-xl flex items-center gap-3 border border-border">
              <MapPin size={16} className="text-blue-500" />
              <span className="text-xs font-bold uppercase tracking-widest">
                Based in India
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
};

/* REUSABLE LINK ITEM */
const LinkItem = ({ icon, text, href }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center gap-4 p-4 rounded-2xl border border-border/50 bg-card/40 hover:border-blue-500 hover:bg-blue-500/5 transition-all group"
  >
    <div className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-colors">
      {icon}
    </div>
    <div className="flex flex-col overflow-hidden">
      <span className="text-[10px] font-bold opacity-30 uppercase tracking-tighter">
        Connect
      </span>
      <span className="text-sm font-semibold truncate max-w-[180px]">
        {text}
      </span>
    </div>
    <ArrowUpRight
      size={14}
      className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
    />
  </a>
);

export default ContactPage;
