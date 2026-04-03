"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX, ArrowUpRight, PlayCircle } from "lucide-react";
import Image from "next/image";

/* ================= VIDEO CARD COMPONENT ================= */
function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [playError, setPlayError] = useState(false);

  const toggleMute = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      const newMuteState = !isMuted;
      videoRef.current.muted = newMuteState;
      setIsMuted(newMuteState);
    }
  }, [isMuted]);

  const playOnEnter = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.muted = isMuted;
    const playPromise = videoRef.current.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => setPlayError(true));
    }
  }, [isMuted]);

  const pauseOnLeave = useCallback(() => {
    if (videoRef.current) videoRef.current.pause();
  }, []);

  return (
    <div
      className="relative h-full w-full group/video overflow-hidden"
      onMouseEnter={playOnEnter}
      onMouseLeave={pauseOnLeave}
    >
      <video
        ref={videoRef}
        src={item.url}
        loop
        playsInline
        muted={isMuted}
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-1000 group-hover/video:scale-105"
      >
        {item.captions && <track kind="captions" src={item.captions} srcLang="en" />}
      </video>

      {/* Subtle Play Indicator */}
      <div className="absolute inset-0 flex items-center justify-center opacity-40 group-hover/video:opacity-0 transition-opacity">
        <PlayCircle className="text-white" size={48} strokeWidth={1} />
      </div>

      <button
        onClick={toggleMute}
        className="absolute bottom-6 right-6 z-30 rounded-full bg-white/10 p-3 text-white backdrop-blur-xl border border-white/20 hover:bg-white hover:text-black transition-all duration-500 opacity-0 group-hover/video:opacity-100"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}

/* ================= MAIN WORKS PAGE ================= */
const WorksPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch("/api/gallery");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setWorks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-[2px] bg-accent animate-pulse" />
    </div>
  );

  return (
    <main className="min-h-screen bg-background text-foreground transition-colors duration-500 selection:bg-accent selection:text-white">
      {/* Hero Section */}
      <section className="px-6 pt-32 pb-20 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="overflow-hidden">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase leading-[0.8] tracking-tighter inline-block text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/20 dark:from-white dark:to-white/10">
              Works
            </h1>
          </div>
          
          <div className="mt-12 flex flex-col md:flex-row md:items-end justify-between gap-8 border-t border-foreground/10 pt-8">
            <p className="max-w-md text-lg text-muted-foreground font-light leading-relaxed">
              A curated collection of digital experiences focusing on 
              <span className="text-foreground font-medium"> performance, aesthetics, and user-centric design.</span>
            </p>
            <div className="flex flex-col items-start md:items-end">
              <span className="text-[10px] uppercase tracking-[0.3em] text-accent font-bold mb-2">Available for projects</span>
              <span className="text-2xl font-light italic">2024 — 2026</span>
            </div>
          </div>
        </div>
      </section>

      {/* Grid Section */}
      <section className="px-6 pb-32 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-16 lg:gap-y-24">
          {works.map((item, index) => (
            <article 
              key={item._id || index}
              className={`group relative flex flex-col ${index % 2 !== 0 ? 'md:mt-24' : ''}`}
            >
              {/* Media Container */}
              <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-muted transition-all duration-700 ease-out group-hover:shadow-[0_0_50px_-12px_rgba(0,0,0,0.3)] dark:group-hover:shadow-[0_0_50px_-12px_rgba(255,255,255,0.1)]">
                {item.type === "video" ? (
                  <VideoCard item={item} />
                ) : (
                  <Image
                    src={item.url}
                    alt={item.title || "Project"}
                    fill
                    className="object-cover transition-transform duration-1000 scale-105 group-hover:scale-100"
                  />
                )}
                
                {/* Minimal Tag */}
                <div className="absolute top-6 left-6 overflow-hidden">
                   <div className="bg-white/90 dark:bg-black/90 backdrop-blur-md px-3 py-1 rounded-full translate-y-[-110%] group-hover:translate-y-0 transition-transform duration-500">
                      <span className="text-[10px] font-bold uppercase tracking-widest text-foreground">{item.tag}</span>
                   </div>
                </div>
              </div>

              {/* Content Below Image */}
              <div className="mt-6 flex justify-between items-start">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl font-bold tracking-tight group-hover:text-accent transition-colors">
                    {item.title}
                  </h2>
                  <p className="text-muted-foreground line-clamp-2 max-w-sm font-light">
                    {item.description}
                  </p>
                </div>
                
                <button className="p-3 rounded-full border border-foreground/10 group-hover:bg-foreground group-hover:text-background transition-all duration-500">
                  <ArrowUpRight size={20} />
                </button>
              </div>
              
              {/* Bottom line decoration */}
              <div className="mt-8 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-700" />
            </article>
          ))}
        </div>
      </section>
    </main>
  );
};

export default WorksPage;