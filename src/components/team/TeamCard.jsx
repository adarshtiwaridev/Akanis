import Image from "next/image";

export default function TeamCard({ member, idx }) {
  return (
    <div className={`relative ${member.offset} flex flex-col items-center md:items-start`}>
      {/* Card Wrapper */}
      <div className="relative w-[300px] md:w-[340px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-br from-purple-500/20 to-cyan-500/20 p-[2px] transition-transform duration-500 will-change-transform">

        <div className="relative w-full h-full rounded-3xl overflow-hidden bg-background">

          {/* Big Background ID */}
          <div className="absolute -top-10 -right-5 text-[120px] font-black opacity-5 group-hover:opacity-20 transition-opacity duration-700 select-none">
            {member.id}
          </div>

          <div className="relative w-full h-full">
            {
              /* Remove `priority` from team thumbnails (non-LCP) and add `sizes` + lazy loading */
              <Image
                src={member.image}
                alt={member.name}
                width={340}
                height={425}
                sizes="(max-width: 640px) 100vw, 340px"
                className="object-cover transition-transform duration-1000 group-hover:scale-110 grayscale hover:grayscale-0"
                loading={idx === 0 ? "eager" : "lazy"}
              />
            }
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Glass Info Box */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/10 backdrop-blur-xl border border-white/20 p-5 rounded-2xl transform translate-y-16 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-transform transition-opacity duration-500 shadow-xl">
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
        <div className="h-[2px] w-full origin-left transform scale-x-0 group-hover:scale-x-100 bg-gradient-to-r from-purple-400 to-cyan-400 transition-transform duration-500"></div>
      </div>
    </div>
  );
}
