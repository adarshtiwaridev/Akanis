"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Camera,
  Home,
  Briefcase,
  Image,
  Phone,
  Sun,
  Moon,
  User,
  Calendar,
  X,
  LayoutDashboard,
} from "lucide-react";



export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDark(saved === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  useEffect(() => setOpen(false), [pathname]);

  if (!mounted) return null;

const token = localStorage.getItem("auth_token");
const navItems = [
  { name: "Home", href: "/", icon: Home },
  token ? { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard } : { name: "Login", href: "/login", icon: User },  
  { name: "Gallery", href: "/Gallery", icon: Image },
  { name: "Contact", href: "/contact", icon: Phone },
  { name: "Contactform", href: "/contactform", icon: Calendar },
  { name: "About", href: "/about", icon: User },
  { name: "Services", href: "/services", icon: Briefcase },
  { name: "Member", href: "/team", icon: User }
];
  return (
    <>
      {/* ================= LOGO (TOP-LEFT) ================= */}
      <div className="fixed top-8 left-8 z-[60] mix-blend-difference">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex flex-col leading-none text-white"
           
        >
          <div aria-hidden className="text-2xl font-black uppercase tracking-[0.3em]">AKANIS</div>
          <div aria-hidden className="text-[0.6rem] font-bold uppercase tracking-[0.6em] opacity-70">Production</div>
        </motion.div>
      </div>

      {/* ================= ACTION BUTTONS (TOP-RIGHT) ================= */}
      <div className="fixed top-8 right-8 z-[70] flex flex-col items-end gap-6">
        
        {/* MAIN CAMERA TOGGLE */}
        return (
          <>
            {/* ================= LOGO (TOP-LEFT) ================= */}
            <div className="fixed top-8 left-8 z-[60] mix-blend-difference">
              <div className="flex flex-col leading-none text-white animate-fade-in">
                <div aria-hidden className="text-2xl font-black uppercase tracking-[0.3em]">AKANIS</div>
                <div aria-hidden className="text-[0.6rem] font-bold uppercase tracking-[0.6em] opacity-70">Production</div>
              </div>
            </div>

            {/* ================= ACTION BUTTONS (TOP-RIGHT) ================= */}
            <div className="fixed top-8 right-8 z-[70] flex flex-col items-end gap-6">

              {/* MAIN CAMERA TOGGLE */}
              <button
                aria-label={open ? "Close menu" : "Open menu"}
                aria-expanded={open}
                onClick={() => setOpen(!open)}
                className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300 transform ${open ? 'bg-red-500 text-white rotate-90' : 'bg-black dark:bg-white text-white dark:text-black'} hover:scale-105 active:scale-95`}
              >
                {open ? <X key="x" size={28} /> : <Camera key="camera" size={28} />}

                {/* Pulsing Ring when closed */}
                {!open && (
                  <span className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" />
                )}
              </button>

              {/* STAGGERED MENU */}
              {open && (
                <div className="flex flex-col items-end gap-4 mr-2 transition-opacity duration-300">
                  {navItems.map((item, i) => {
                    const Icon = item.icon;
                    const active = pathname === item.href;

                    return (
                      <div key={item.name} className="opacity-100 transform transition-all duration-300" style={{ transitionDelay: `${i * 30}ms` }}>
                        <Link href={item.href} className="group flex items-center gap-4">
                          {/* TOOLTIP LABEL */}
                          <span className={`text-[10px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full backdrop-blur-md border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-x-4 group-hover:translate-x-0 ${dark ? 'bg-white/5 text-white' : 'bg-black/5 text-black'}`}>
                            {item.name}
                          </span>

                          {/* ICON CIRCLE */}
                          <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-500 shadow-lg ${active ? 'bg-blue-600 text-white scale-110' : 'bg-white/10 dark:bg-black/20 backdrop-blur-xl border border-white/20 text-black dark:text-white group-hover:bg-blue-600 group-hover:text-white'}`}>
                            <Icon size={18} />
                          </div>
                        </Link>
                      </div>
                    );
                  })}

                  {/* THEME TOGGLE (SPECIAL STYLING) */}
                  <button aria-label="Toggle theme" onClick={() => setDark(!dark)} className="group flex items-center gap-4" style={{ transitionDelay: `${navItems.length * 30}ms` }}>
                    <span className={`text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-all ${dark ? 'text-white' : 'text-black'}`}>
                      {dark ? "Light Mode" : "Dark Mode"}
                    </span>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 shadow-xl ${dark ? 'bg-yellow-400 text-black rotate-180' : 'bg-indigo-600 text-white rotate-0'}`}>
                      {dark ? <Sun size={18} /> : <Moon size={18} />}
                    </div>
                  </button>
                </div>
              )}
            </div>

            {/* FULLSCREEN OVERLAY BLUR (Optional - looks very premium) */}
            {open && (
              <div onClick={() => setOpen(false)} className="fixed inset-0 z-[55] bg-black/20 dark:bg-white/5 backdrop-blur-[4px] transition-opacity duration-300" />
            )}
          </>
        );