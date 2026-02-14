"use client";

import { useState, useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
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
  const [token, setToken] = useState(null);

  // ===== INITIAL MOUNT =====
  useEffect(() => {
    setMounted(true);

    // Theme
    const saved = localStorage.getItem("theme");
    if (saved) {
      setDark(saved === "dark");
    } else {
      setDark(window.matchMedia("(prefers-color-scheme: dark)").matches);
    }

    // Reduced motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const handler = (e) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", handler);

    // Token
    setToken(localStorage.getItem("auth_token"));

    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  // ===== APPLY THEME =====
  useEffect(() => {
    if (!mounted) return;
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark, mounted]);

  // ===== CLOSE MENU ON ROUTE CHANGE =====
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  if (!mounted) return null;

  // ===== MEMOIZED NAV ITEMS =====
  const navItems = useMemo(() => [
    { name: "Home", href: "/", icon: Home },
    token
      ? { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard }
      : { name: "Login", href: "/login", icon: User },
    { name: "Gallery", href: "/gallery", icon: Image },
    { name: "Contact", href: "/contact", icon: Phone },
    { name: "Contactform", href: "/contactform", icon: Calendar },
    { name: "About", href: "/about", icon: User },
    { name: "Services", href: "/services", icon: Briefcase },
    { name: "Member", href: "/team", icon: User },
  ], [token]);

  return (
    <>
      {/* LOGO */}
      <div className="fixed top-8 left-8 z-[60] mix-blend-difference">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={prefersReducedMotion ? { duration: 0 } : undefined}
          className="flex flex-col leading-none text-white"
        >
          <div className="text-2xl font-black uppercase tracking-[0.3em]">
            AKANIS
          </div>
          <div className="text-[0.6rem] font-bold uppercase tracking-[0.6em] opacity-70">
            Production
          </div>
        </motion.div>
      </div>

      {/* BUTTON AREA */}
      <div className="fixed top-8 right-8 z-[70] flex flex-col items-end gap-6">

        {/* MAIN TOGGLE */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((prev) => !prev)}
          className={`relative w-16 h-16 rounded-full flex items-center justify-center shadow-2xl transition-transform duration-300
            ${open
              ? "bg-red-500 text-white rotate-90"
              : "bg-black dark:bg-white text-white dark:text-black"
            }`}
        >
          {open ? <X size={28} /> : <Camera size={28} />}

          {!open && (
            <span className="absolute inset-0 rounded-full bg-current opacity-20 animate-ping" />
          )}
        </motion.button>

        {/* MENU */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={prefersReducedMotion ? { duration: 0 } : undefined}
              className="flex flex-col items-end gap-4 mr-2"
            >
              {navItems.map((item, i) => {
                const Icon = item.icon;
                const active = pathname === item.href;

                return (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: 40 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={
                      prefersReducedMotion
                        ? { duration: 0 }
                        : { delay: i * 0.05 }
                    }
                  >
                    <Link href={item.href} className="group flex items-center gap-4">
                      <span className="text-[10px] uppercase tracking-[0.3em] font-bold px-3 py-1 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        {item.name}
                      </span>

                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-300 shadow-lg
                          ${active
                            ? "bg-blue-600 text-white scale-110"
                            : "bg-white/10 dark:bg-black/20 text-black dark:text-white group-hover:bg-blue-600 group-hover:text-white"
                          }`}
                      >
                        <Icon size={18} />
                      </div>
                    </Link>
                  </motion.div>
                );
              })}

              {/* THEME TOGGLE */}
              <motion.button
                onClick={() => setDark((prev) => !prev)}
                className="group flex items-center gap-4"
              >
                <span className="text-[10px] uppercase tracking-[0.3em] font-bold opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {dark ? "Light Mode" : "Dark Mode"}
                </span>

                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-transform duration-500 shadow-xl
                    ${dark
                      ? "bg-yellow-400 text-black rotate-180"
                      : "bg-indigo-600 text-white"
                    }`}
                >
                  {dark ? <Sun size={18} /> : <Moon size={18} />}
                </div>
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* OVERLAY */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[55] bg-black/20 dark:bg-white/5 backdrop-blur-[4px]"
          />
        )}
      </AnimatePresence>
    </>
  );
}
