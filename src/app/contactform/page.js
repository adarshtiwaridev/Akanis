"use client";

import { useState, useEffect, memo } from "react";
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
  MessageSquare,
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
  budget: 0,
  location: "",
  message: "",
};

export default function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [budgetRange, setBudgetRange] = useState({
    min: 0,
    max: 0,
    step: 1000,
  });

  // Dynamic budget range logic
  useEffect(() => {
    let range = { min: 0, max: 0, step: 1000 };
    
    if (["video-production", "videography", "ad-shoot"].includes(form.service)) {
      range = { min: 8000, max: 25000, step: 1000 };
    } else if (form.service === "web-dev") {
      range = { min: 19999, max: 80000, step: 2000 };
    } else if (form.service !== "") {
      // Default range for other services so slider isn't hidden
      range = { min: 15000, max: 50000, step: 1000 };
    }

    setBudgetRange(range);
    // Only update budget if the range actually exists
    if (range.min > 0) {
      setForm((prev) => ({ ...prev, budget: range.min }));
    }
  }, [form.service]);

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
    setLoading(true);
    try {
      // Mocking API call
      await new Promise(res => setTimeout(res, 1500));
      setSuccess(true);
    } catch (err) {
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="flex justify-center items-center py-20 px-4 bg-background transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="w-full max-w-3xl"
      >
        <div className="rounded-3xl bg-card border border-border shadow-2xl p-8 md:p-12">
          <AnimatePresence mode="wait">
            {!success ? (
              <motion.div
                key="form-content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <header className="mb-10">
                  <h2 className="text-4xl md:text-5xl font-black uppercase tracking-tighter text-foreground">
                    Start a <span className="text-accent italic">Conversation</span>
                  </h2>
                  <p className="mt-3 text-foreground font-medium">
                    Fill the form and we’ll reach out within 24 hours.
                  </p>
                </header>

                <form onSubmit={handleSubmit} className="space-y-6 ">
                  <div className="grid md:grid-cols-2 gap-6 text-foreground">
                    <CardInput label="Name" name="name" icon={<User size={18} />} value={form.name} onChange={handleChange} placeholder="John Doe" />
                    <CardInput label="Phone" name="phone" icon={<Phone size={18} />} value={form.phone} onChange={handleChange} placeholder="+91 ..." />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 text-foreground">
                    <CardInput label="Email" name="email" type="email" icon={<Mail size={18} />} value={form.email} onChange={handleChange} placeholder="hello@example.com" />
                    <CardInput label="Location" name="location" icon={<MapPin size={18} />} value={form.location} onChange={handleChange} placeholder="City, Country" />
                  </div>

                  {/* SERVICE SELECT */}
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest font-bold text-foreground ml-1">
                      Service Required
                    </label>
                    <div className="relative group">
                      <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-foreground group-focus-within:text-accent transition-colors" size={18} />
                      <select
                        name="service"
                        value={form.service}
                        onChange={handleChange}
                        required
                        className="w-full bg-background text-foreground border border-border rounded-2xl py-4 pl-12 pr-10 text-sm focus:ring-2 focus:ring-accent outline-none appearance-none transition-all"
                      >
                        <option value="">Select a service</option>
                        {serviceCategories.map((category) => (
                          <optgroup key={category.label} label={category.label} className="bg-card">
                            {category.options.map((service) => (
                              <option key={service.value} value={service.value}>
                                {service.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-foreground">
                        <ArrowRight size={14} className="rotate-90" />
                      </div>
                    </div>
                  </div>

                  {/* BUDGET SLIDER */}
                  <AnimatePresence>
                    {budgetRange.min > 0 && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="space-y-4 overflow-hidden"
                      >
                        <label className="text-[10px] uppercase tracking-widest font-bold text-foreground  flex items-center gap-2 ml-1">
                          <Wallet size={14} />
                          Estimated Budget
                        </label>
                        <div className="px-2">
                          <input
                            type="range"
                            min={budgetRange.min}
                            max={budgetRange.max}
                            step={budgetRange.step}
                            value={form.budget}
                            onChange={(e) => setForm({ ...form, budget: Number(e.target.value) })}
                            className="w-full h-1.5 bg-border rounded-lg appearance-none cursor-pointer accent-accent"
                          />
                          <div className="flex justify-between mt-3">
                            <span className="text-xs font-medium text-muted-foreground">₹{budgetRange.min.toLocaleString()}</span>
                            <span className="text-sm font-black text-accent bg-accent/10 px-3 py-1 rounded-full">₹{form.budget.toLocaleString()}</span>
                            <span className="text-xs font-medium text-muted-foreground">₹{budgetRange.max.toLocaleString()}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* MESSAGE */}
                  <div className="space-y-2">
                    <label htmlFor="message" className="text-[10px] uppercase tracking-widest font-bold text-foreground/80 ml-1">
                      Project Summary
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={4}
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="Tell us about your vision..."
                      className="w-full bg-background text-foreground border border-border rounded-2xl py-4 px-5 text-sm placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-accent outline-none resize-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full h-16 rounded-2xl bg-foreground text-background font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:opacity-90 transition active:scale-[0.98] disabled:opacity-50"
                  >
                    {loading ? "Processing..." : "Submit Inquiry"}
                    {!loading && <ArrowRight size={18} />}
                  </button>
                </form>
              </motion.div>
            ) : (
              <motion.div 
                key="success-message"
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="py-20 text-center space-y-6"
              >
                <div className="w-20 h-20 bg-accent/10 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle size={40} className="text-accent" />
                </div>
                <h2 className="text-4xl font-black text-foreground uppercase tracking-tight">
                  Received!
                </h2>
                <p className="text-foreground max-w-xs mx-auto">
                  Our team is reviewing your inquiry. We'll be in touch within 2 hours.
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
  <div className="space-y-2">
    <label htmlFor={props.name} className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground/80 ml-1">
      {label}
    </label>
    <div className="relative group">
      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-accent transition-colors">
        {icon}
      </span>
      <input
        {...props}
        id={props.name}
        required
        className="w-full bg-background text-foreground border border-border rounded-2xl py-4 pl-12 pr-4 text-sm placeholder:text-muted-foreground/50 focus:ring-2 focus:ring-accent outline-none transition-all"
      />
    </div>
  </div>
));