"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const PortfolioPage = memo(function PortfolioPage() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [videoRef, setVideoRef] = useState(null);

  const handlePlayPause = () => {
    if (videoRef) {
      if (isPlaying) {
        videoRef.pause();
      } else {
        videoRef.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef) {
      videoRef.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef && videoRef.requestFullscreen) {
      videoRef.requestFullscreen();
    }
  };

  const portfolioItems = [
    {
      id: 1,
      title: "Cinematic Brand Film",
      category: "Production",
      video: "/videos/video-01.mp4",
      description: "High-impact commercial showcasing brand storytelling",
    },
    {
      id: 2,
      title: "Digital Experience Design",
      category: "Web",
      video: "/videos/video-01.mp4",
      description: "Interactive web experience for modern brands",
    },
    {
      id: 3,
      title: "Social Media Campaign",
      category: "Digital",
      video: "/videos/video-01.mp4",
      description: "Viral-ready content for social platforms",
    },
  ];

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24 px-6 transition-colors duration-700">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-24 text-center md:text-left"
        >
          <h1 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none mb-6">
            Portfolio
          </h1>
          <p className="text-sm md:text-base uppercase tracking-[0.3em] font-bold opacity-60 max-w-2xl">
            Our best work. Real results. Proven impact across industries.
          </p>
        </motion.div>

        {/* FEATURED VIDEO */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mb-32"
        >
          <div className="relative mb-8">
            <h2 className="text-3xl font-black uppercase mb-6">Featured Work</h2>
            
            <div className="relative bg-card border border-border/50 rounded-[2rem] overflow-hidden shadow-2xl group">
              {/* VIDEO PLAYER */}
              <div className="relative aspect-video bg-black/50 overflow-hidden">
                <video
                  ref={setVideoRef}
                  className="w-full h-full object-cover"
                  onPlay={() => setIsPlaying(true)}
                  onPause={() => setIsPlaying(false)}
                >
                  <source src="/videos/video-01.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>

                {/* OVERLAY CONTROLS */}
                <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handlePlayPause}
                    className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center hover:bg-white/30 transition-all"
                  >
                    {isPlaying ? (
                      <Pause size={40} className="fill-white text-white ml-1" />
                    ) : (
                      <Play size={40} className="fill-white text-white ml-1" />
                    )}
                  </motion.button>
                </div>

                {/* CONTROLS BAR */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handlePlayPause}
                      className="text-white hover:text-accent transition-colors"
                      title={isPlaying ? "Pause" : "Play"}
                    >
                      {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                    </button>

                    <button
                      onClick={handleMute}
                      className="text-white hover:text-accent transition-colors"
                      title={isMuted ? "Unmute" : "Mute"}
                    >
                      {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                    </button>

                    <div className="flex-1" />

                    <button
                      onClick={handleFullscreen}
                      className="text-white hover:text-accent transition-colors"
                      title="Fullscreen"
                    >
                      <Maximize size={20} />
                    </button>
                  </div>
                </div>
              </div>

              {/* VIDEO INFO */}
              <div className="p-8">
                <span className="inline-block text-blue-500 font-bold uppercase tracking-widest text-xs mb-3">
                  Featured Project
                </span>
                <h3 className="text-3xl font-black uppercase mb-2">
                  Cinematic Brand Film
                </h3>
                <p className="text-muted-foreground">
                  A premium commercial showcasing how we combine technical excellence with creative storytelling.
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* PORTFOLIO GRID */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-3xl font-black uppercase mb-12">All Projects</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all duration-300"
              >
                {/* THUMBNAIL */}
                <div className="relative aspect-video overflow-hidden bg-black/20">
                  <video
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500 scale-100 group-hover:scale-110"
                    muted
                  >
                    <source src={item.video} type="video/mp4" />
                  </video>

                  {/* HOVER OVERLAY */}
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={40} className="fill-white text-white ml-1" />
                  </div>
                </div>

                {/* CONTENT */}
                <div className="p-6">
                  <span className="text-xs uppercase tracking-widest font-bold text-accent">
                    {item.category}
                  </span>
                  <h3 className="text-lg font-black uppercase mt-2 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
});

export default PortfolioPage;
