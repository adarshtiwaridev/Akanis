"use client";

import React, { useEffect, useState, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

/* ================= VIDEO CARD ================= */
function VideoCard({ item }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);

  const toggleMute = () => {
    if (!videoRef.current) return;
    videoRef.current.muted = !isMuted;
    setIsMuted((prev) => !prev);
  };

  return (
    <div className="relative h-full w-full group overflow-hidden">
      <video
        ref={videoRef}
        src={item.url}
        autoPlay
        muted={isMuted}
        loop
        playsInline
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
      />

      <button
        onClick={toggleMute}
        className="relative bottom-0 right-0 z-10 rounded-full bg-black/60 p-2 text-white backdrop-blur hover:bg-black/80 transition"
      >
        {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
      </button>
    </div>
  );
}

/* ================= PAGE ================= */
const WorksPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const res = await fetch("/api/gallery");
        const data = await res.json();
        setWorks(data);
      } catch (err) {
        console.error("Error fetching works:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchWorks();
  }, []);

  /* ===== Loading Screen ===== */
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-white">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-amber-200 border-t-amber-600" />
        <p className="text-sm tracking-wide font-medium text-gray-600">
          Loading content…
        </p>
      </div>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20">
      {/* Header */}
      <header className="mb-20">
        <h1 className="text-[2.5rem] md:text-[4rem] font-black uppercase tracking-tight text-gray-200 opacity-70">
          Experience
        </h1>

        <span className="mt-4 block text-lg md:text-xl uppercase tracking-[0.4em] font-semibold text-gray-700">
          Selected Works
        </span>

        <p className="mt-3 max-w-xl text-gray-500 font-medium">
          A curated showcase of the work{" "}
          <span className="text-accent">I’ve built, shipped, and refined.</span>
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {works.map((item) => (
          <article
            key={item.id}
            className="group relative overflow-hidden rounded-3xl border transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {item.type === "video" ? (
                <VideoCard item={item} />
              ) : (
                <img
                  src={item.url}
                  alt={item.title}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Tag */}
              <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/80">
                {item.tag}
              </span>

              {/* Hover Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <h2 className="text-xl font-bold text-white mb-2">
                  {item.title}
                </h2>
                <p className="text-white/80 text-sm line-clamp-3">
                  {item.description}
                </p>

                <button className="mt-4 w-fit text-xs font-bold uppercase tracking-widest border-b-2 border-accent text-white pb-1 hover:text-accent transition">
                  View Project →
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </main>
  );
};

export default WorksPage;
