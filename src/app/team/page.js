import Image from "next/image";
import TeamCard from "../../components/team/TeamCard";

const team = [
  {
    id: "01",
    name: "Marcus Thorne",
    role: "Lead Architect",
    image:
      "/photos/image01.jpg",
    offset: "md:mt-0",
  },
  {
    id: "02",
    name: "Elena Vance",
    role: "Creative Director",
  image:
      "/photos/image01.jpg",
    offset: "md:mt-32",
  },
  {
    id: "03",
    name: "Julian Kross",
    role: "System Engineer",
    image:
      "/photos/image01.jpg",
    offset: "md:-mt-16",
  },
  {
    id: "04",
    name: "Sarah Jenkins",
    role: "Product Strategy",
   image:
      "/photos/image01.jpg",
    offset: "md:mt-24",
  },
];

const TeamPage = () => {
  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-hidden font-sans">

      {/* Background Glow Effects */}
      <div className="absolute w-[500px] h-[500px] bg-purple-500/20 blur-[150px] -top-32 -left-32 rounded-full"></div>
      <div className="absolute w-[400px] h-[400px] bg-cyan-500/20 blur-[150px] bottom-0 right-0 rounded-full"></div>

      <div className="relative z-10 p-6 md:p-16">

        {/* ================= HERO ================= */}
        <section className="mb-32 mt-16">
          <h1 className="text-6xl md:text-[8rem] font-black leading-[0.85] tracking-tight uppercase italic">
            <span className="gradient-text">Art</span> <br />
            <span className="text-outline">Meets</span> <br />
            <span className="gradient-text">Logic.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-muted-foreground">
            A team of thinkers, engineers, and designers building experiences
            where creativity meets precision.
          </p>
        </section>

        {/* ================= TEAM GRID ================= */}
        <section className="max-w-7xl mx-auto">
          <h2 className="sr-only">Our team</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-24">

            {team.map((member, idx) => (
              <TeamCard key={member.id} member={member} idx={idx} />
            ))}

          </div>
        </section>

        {/* ================= FOOTER ================= */}
        <footer className="mt-40 pt-20 border-t border-border/40">
          <div className="max-w-4xl">
            <p className="text-4xl md:text-5xl font-black uppercase leading-tight">
              We don’t just fill seats.
            </p>
            <p className="text-4xl md:text-5xl font-black uppercase gradient-text mt-2">
              We solve real problems.
            </p>
          </div>

      
        </footer>

      </div>
    </div>
  );
};

export default TeamPage;
