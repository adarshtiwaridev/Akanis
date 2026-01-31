"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Sun, Moon, Upload, CheckCircle, XCircle } from "lucide-react";

export default function Dashboard() {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // // 🔐 Auth Guard
  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     router.replace("/login");
  //   } else {
  //     setMounted(true);
  //   }
  // }, [router]);

  // if (!mounted) return null;

  // Dummy contact data (replace with API later)
  const contacts = [
    {
      id: 1,
      name: "Rahul Sharma",
      email: "rahul@gmail.com",
      service: "Cinematography",
      reviewed: false,
    },
    {
      id: 2,
      name: "Ananya Verma",
      email: "ananya@gmail.com",
      service: "Brand Film",
      reviewed: true,
    },
  ];

  const toggleTheme = () => {
    document.documentElement.classList.toggle("dark");
  };

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors">

      {/* ================= HEADER ================= */}
      <header className="flex items-center justify-between px-8 py-6 border-b border-border">
        <div>
          <h1 className="text-xl font-bold tracking-wide">
            AKANIS <span className="opacity-70">PRODUCTION</span>
          </h1>
          <p className="text-sm text-foreground/60">
            Crafting cinematic stories that last
          </p>
        </div>

        <button
          onClick={toggleTheme}
          className="p-2 rounded-full border border-border hover:bg-foreground/5 transition"
        >
          <Sun className="block dark:hidden" size={18} />
          <Moon className="hidden dark:block" size={18} />
        </button>
      </header>

      {/* ================= MAIN ================= */}
      <main className="px-8 py-10 max-w-7xl mx-auto space-y-16">

        {/* ===== STATS ===== */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { label: "Total Projects", value: "128" },
            { label: "Active Clients", value: "45" },
            { label: "Contact Requests", value: contacts.length },
          ].map((item, i) => (
            <div
              key={i}
              className="bg-card border border-border rounded-2xl p-6"
            >
              <p className="text-sm text-foreground/60 mb-2">
                {item.label}
              </p>
              <p className="text-3xl font-semibold">
                {item.value}
              </p>
            </div>
          ))}
        </section>

        {/* ===== CONTACT FORM LIST ===== */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold">
              Contact Form Submissions
            </h2>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border">
            <table className="w-full text-left">
              <thead className="bg-foreground/5">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium">Name</th>
                  <th className="px-6 py-4 text-sm font-medium">Email</th>
                  <th className="px-6 py-4 text-sm font-medium">Service</th>
                  <th className="px-6 py-4 text-sm font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {contacts.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-border"
                  >
                    <td className="px-6 py-4">{c.name}</td>
                    <td className="px-6 py-4">{c.email}</td>
                    <td className="px-6 py-4">{c.service}</td>
                    <td className="px-6 py-4">
                      {c.reviewed ? (
                        <span className="flex items-center gap-2 text-green-500">
                          <CheckCircle size={16} /> Reviewed
                        </span>
                      ) : (
                        <span className="flex items-center gap-2 text-red-500">
                          <XCircle size={16} /> Unreviewed
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* ===== GALLERY UPLOAD ===== */}
        <section className="flex items-center justify-between bg-card border border-border rounded-2xl p-6">
          <div>
            <h3 className="text-xl font-semibold">
              Gallery Management
            </h3>
            <p className="text-sm text-foreground/60">
              Upload and manage production images
            </p>
          </div>

          <button
            onClick={() => router.push("/dashboard/gallery-upload")}
            className="
              flex items-center gap-2
              bg-accent text-white
              px-5 py-3 rounded-xl
              font-medium hover:opacity-90 transition
            "
          >
            <Upload size={18} />
            Upload Images
          </button>
        </section>

      </main>
    </div>
  );
}
