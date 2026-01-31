"use client";

import { useState, memo, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Mail,
  MapPin,
  Wallet,
  Briefcase,
  CheckCircle,
  ArrowRight,
} from "lucide-react";

const serviceCategories = [
  {
    label: "Creative & Media",
    options: [
      { value: "ad-shoot", name: "Advertisement Shoots" },
      { value: "photo-shoot", name: "Photo Shoots" },
      { value: "videography", name: "Videography" },
      { value: "video-production", name: "Video Production" },
    ],
  },
  {
    label: "Digital Presence",
    options: [
      { value: "branding", name: "Branding" },
      { value: "social-media", name: "Social Media Handling" },
      { value: "marketing", name: "Marketing Management" },
      { value: "website-design", name: "Website Designing" },
    ],
  },
  {
    label: "App & Web Development",
    options: [
      { value: "web-dev", name: "Website Development" },
      { value: "app-dev", name: "Mobile App Development" },
      { value: "ui-ux", name: "UI / UX Design" },
      { value: "custom-software", name: "Custom Software Solutions" },
    ],
  },
];

const initialForm = {
  name: "",
  phone: "",
  email: "",
  service: "",
  budget: "",
  location: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  // ✅ AUTO CLOSE SUCCESS AFTER 10 SECONDS
  useEffect(() => {
    if (!success) return;

    const timer = setTimeout(() => {
      setSuccess(false);
      setForm(initialForm);
    }, 10000);

    return () => clearTimeout(timer);
  }, [success]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.service) return;

    try {
      setLoading(true);

      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSuccess(true);
    } catch (err) {
      console.error(err);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center py-20 px-4 bg-background transition-colors duration-700">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        className="w-full max-w-3xl relative"
      >
        {/* BADGE */}
        <div className="absolute -top-4 left-10 z-20 bg-accent text-white px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-[0.3em] flex items-center gap-2 shadow-xl">
          <span className="w-2 h-2 bg-white rounded-full animate-ping" />
          Available for Projects
        </div>

        <div className="relative overflow-hidden rounded-[2.5rem] bg-card border border-border/50 shadow-xl backdrop-blur-xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
              >
                {/* HEADER */}
                <div className="mb-10">
                  <h2 className="text-4xl font-black uppercase tracking-tighter">
                    Start a <span className="text-accent italic">Conversation</span>
                  </h2>
                  <p className="mt-3 text-muted-foreground text-sm">
                    Fill the form below and we’ll reach out within 24 hours.
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <CardInput label="Name" name="name" icon={<User size={16} />} value={form.name} onChange={handleChange} />
                    <CardInput label="Phone" name="phone" icon={<Phone size={16} />} value={form.phone} onChange={handleChange} />
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <CardInput label="Email" name="email" type="email" icon={<Mail size={16} />} value={form.email} onChange={handleChange} />
                    <CardInput label="Location" name="location" icon={<MapPin size={16} />} value={form.location} onChange={handleChange} />
                  </div>

{/* SERVICE SELECT – UI CONSISTENT WITH OTHER INPUTS */}
<div className="grid md:grid-cols-2 gap-8">
  <div className="space-y-3 group">
    <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">
      Service Required
    </label>

    <div className="relative">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-30 group-focus-within:opacity-100 group-focus-within:text-accent transition-all">
        <Briefcase size={16} />
      </span>

      <select
        name="service"
        value={form.service}
        onChange={handleChange}
        required
        className="
          w-full bg-transparent
          border-b border-border
          py-3 pl-8 pr-6
          text-sm text-foreground
          outline-none appearance-none
          focus:border-accent transition-all
          dark:bg-transparent dark:text-foreground
        "
      >
        <option value="" disabled className="text-muted-foreground">
          Select a service
        </option>

        {serviceCategories.map((category) => (
          <optgroup key={category.label} label={category.label}>
            {category.options.map((service) => (
              <option
                key={service.value}
                value={service.value}
                className="bg-background text-foreground"
              >
                {service.name}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

      {/* dropdown arrow */}
      <span className="absolute right-0 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
        ▾
      </span>
    </div>
  </div>

  <CardInput
    label="Estimated Budget"
    name="budget"
    icon={<Wallet size={16} />}
    value={form.budget}
    onChange={handleChange}
  />
</div>

              
                  <div className="space-y-3">
                    <label className="text-[10px] uppercase tracking-[0.2em] font-black opacity-40">
                      Project Summary
                    </label>
                    <textarea
                      name="message"
                      rows={3}
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="w-full bg-transparent border-b border-border py-3 focus:border-accent outline-none resize-none text-sm"
                      placeholder="What are we building together?"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 rounded-2xl bg-foreground text-background font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 transition active:scale-95 disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Submit Inquiry"}
                    <ArrowRight size={16} />
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="py-12 text-center space-y-6"
              >
                <div className="w-20 h-20 mx-auto rounded-full bg-green-500/10 text-green-500 flex items-center justify-center">
                  <CheckCircle size={40} />
                </div>
                <h2 className="text-3xl font-black uppercase tracking-tight">
                  Transmission Successful
                </h2>
                <p className="text-muted-foreground">
                  We’ll be in touch shortly Within 2 hours .
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </section>
  );
}

const CardInput = memo(({ label, icon, ...props }) => (
  <div className="space-y-3 group">
    <label className="text-[10px] uppercase tracking-widest font-black opacity-40">
      {label}
    </label>
    <div className="relative">
      <span className="absolute left-0 top-1/2 -translate-y-1/2 opacity-40">
        {icon}
      </span>
      <input
        {...props}
        required
        className="w-full bg-transparent border-b border-border py-3 pl-8 text-sm focus:border-accent outline-none"
      />
    </div>
  </div>
));
