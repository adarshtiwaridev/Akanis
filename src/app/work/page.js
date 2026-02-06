"use client";
import React, { useEffect, useState } from 'react';

const WorksPage = () => {
    const [works, setWorks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWorks = async () => {
            try {
                // Ensure your API returns an array of objects with:
                // { id, type: 'image' | 'video', url, tag, title, description }
                const response = await fetch('/api/gallery');
                const data = await response.json();
                setWorks(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchWorks();
    }, []);

    if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;

    return (
        <main className="min-h-screen p-6 md:p-12 lg:p-20">
            {/* Header Section */}
            <header className="mb-16">
                <h1 className="text-6xl md:text-8xl font-black uppercase tracking-tighter text-outline opacity-50 mb-2">
                    Portfolio
                </h1>
               <span className="text-[11px] uppercase tracking-[0.35em] font-semibold text-accent">
      Portfolio
    </span>
            </header>

       {/* Content Grid */}
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
  {works.map((item) => (
    <article
      key={item.id}
      className="group relative overflow-hidden rounded-3xl bg-card border border-border transition-all duration-700 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent/20"
    >
      {/* Media */}
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {item.type === "video" ? (
          <video
            src={item.url}
            autoPlay
            muted
            loop
            playsInline
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <img
            src={item.url}
            alt={item.title}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        )}

        {/* Cinematic Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

        {/* Floating Tag */}
        <span className="absolute top-4 left-4 z-20 glass px-3 py-1 text-[10px] font-bold uppercase tracking-widest rounded-full">
          {item.tag}
        </span>

        {/* Hover Content on Image */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6 translate-y-6 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-700">
          <h2 className="text-xl font-bold text-white mb-2">
            {item.title}
          </h2>
          <p className="text-white/80 text-sm leading-relaxed line-clamp-3">
            {item.description}
          </p>

          <button className="mt-4 w-fit text-xs font-bold uppercase tracking-widest border-b-2 border-accent text-white pb-1 hover:text-accent transition-all">
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