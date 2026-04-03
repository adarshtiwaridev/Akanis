"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import Image from "next/image";

/**
 * VideoCard Component
 * Handles video playback with mute toggle and hover controls
 * @param {Object} item - The video item object with url and captions
 */
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
      playPromise.catch((error) => {
        setPlayError(true);
        if (process.env.NODE_ENV === "development") {
          console.warn("Video autoplay prevented:", error.message);
        }
      });
    }
  }, [isMuted]);

  const pauseOnLeave = useCallback(() => {
    if (!videoRef.current) return;
    videoRef.current.pause();
  }, []);

  return (
    <div
      className="relative h-full w-full group overflow-hidden cursor-pointer"
      onMouseEnter={playOnEnter}
      onMouseLeave={pauseOnLeave}
      role="region"
      aria-label="Video player"
    >
      <video
        ref={videoRef}
        src={item.url}
        loop
        playsInline
        defaultMuted
        preload="metadata"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        aria-label={`Video: ${item.title || "Untitled"}`}
      >
        {item.captions && (
          <track kind="captions" src={item.captions} srcLang="en" />
        )}
      </video>

      {/* Mute Control */}
      <button
        onClick={toggleMute}
        aria-label={isMuted ? "Unmute video" : "Mute video"}
        className="absolute bottom-4 right-4 z-30 rounded-full bg-black/60 p-2.5 text-white backdrop-blur-md hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover:opacity-100"
      >
        {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
      </button>

      {/* Fallback message for play errors */}
      {playError && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/40">
          <p className="text-xs text-white text-center">
            Video playback unavailable
          </p>
        </div>
      )}
    </div>
  );
}

/* ================= WORKS PAGE ================= */
/**
 * WorksPage Component
 * Displays a grid of portfolio works with video and image support
 */
const WorksPage = () => {
  const [works, setWorks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        setError(null);
        const res = await fetch("/api/gallery", {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`Gallery API error: ${res.status}`);
        }

        const data = await res.json();

        if (!Array.isArray(data)) {
          throw new Error("Invalid response format from gallery API");
        }

        setWorks(data);
      } catch (err) {
        setError(err.message || "Failed to load gallery");
        if (process.env.NODE_ENV === "development") {
          console.error("Error fetching works:", err);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchWorks();
  }, []);

  // Loading State
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-accent/20 border-t-accent" />
        <p className="text-sm tracking-wide font-medium text-foreground/60">
          Loading portfolio…
        </p>
      </div>
    );
  }

  // Error State
  if (error) {
    return (
      <main className="min-h-screen p-6 md:p-12 lg:p-20 flex flex-col items-center justify-center">
        <div className="max-w-md text-center">
          <h1 className="text-2xl font-bold text-foreground mb-3">
            Unable to Load Portfolio
          </h1>
          <p className="text-foreground/60 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition"
          >
            Try Again
          </button>
        </div>
      </main>
    );
  }

  // Empty State
  if (works.length === 0) {
    return (
      <main className="min-h-screen p-6 md:p-12 lg:p-20 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-foreground mb-3">
            No Works Yet
          </h1>
          <p className="text-foreground/60">
            Check back soon for our latest projects.
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-6 md:p-12 lg:p-20">
      {/* Header */}
      <header className="mb-20">
        <h1 className="text-[2.5rem] md:text-[4rem] font-black uppercase tracking-tight text-foreground opacity-70">
          Experience
        </h1>

        <span className="mt-4 block text-lg md:text-xl uppercase tracking-[0.4em] font-semibold text-foreground/70">
          Selected Works
        </span>

        <p className="mt-3 max-w-xl text-foreground/60 font-medium">
          A curated showcase of the work{" "}
          <span className="text-accent">I’ve built, shipped, and refined.</span>
        </p>
      </header>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {works.map((item) => (
          <article
            key={item._id || item.id}
            className="group relative overflow-hidden rounded-3xl border border-border bg-card transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              {item.type === "video" ? (
                <VideoCard item={item} />
              ) : (
                <div className="relative h-full w-full">
                  <Image
                    src={item.url}
                    alt={item.title || "Portfolio work"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    priority={false}
                  />
                </div>
              )}

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              {/* Tag Badge */}
              {item.tag && (
                <span className="absolute top-4 left-4 z-20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full bg-white/80 text-black">
                  {item.tag}
                </span>
              )}

              {/* Hover Content */}
              <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
                <h2 className="text-xl font-bold text-white mb-2">
                  {item.title || "Untitled"}
                </h2>

                {item.description && (
                  <p className="text-white/80 text-sm line-clamp-3">
                    {item.description}
                  </p>
                )}

                <button
                  aria-label={`View project: ${item.title || "Untitled"}`}
                  className="mt-4 w-fit text-xs font-bold uppercase tracking-widest border-b-2 border-accent text-white pb-1 hover:text-accent transition"
                >
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
