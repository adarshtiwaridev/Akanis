"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { toast } from "sonner";
export default function LoginPage() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Login failed");
     toast.success("Login successful 🔥");
      router.push("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="
      min-h-screen flex items-center justify-center px-4
      bg-background transition-colors duration-500
    ">
      <div className="
        w-full max-w-md p-8
        rounded-3xl
        bg-card/80 backdrop-blur-xl
        border border-border
        shadow-xl
      ">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="
            mx-auto mb-1 h-24 w-34 rounded-2xl
            bg-blue-600
            flex items-center justify-center
            text-white text-2xl font-black
          ">
            Akasnish
          </div>

          <h1 className="text-3xl font-extrabold text-foreground">
            Welcome back
          </h1>

          <p className="mt-2 text-sm text-foreground/70">
            Login to continue your journey
          </p>
        </div>

        {/* Error */}
        {error && (
          <p className="mb-4 text-sm text-red-500 text-center">
            {error}
          </p>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block mb-1 text-sm font-medium text-foreground/80">
              Email
            </label>
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="
                w-full rounded-xl px-4 py-3
                bg-background
                border border-border
                text-foreground
                focus:ring-2 focus:ring-accent
                outline-none transition
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block mb-1 text-sm font-medium text-foreground/80">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                required
                value={formData.password}
                onChange={handleChange}
                className="
                  w-full rounded-xl px-4 py-3 pr-12
                  bg-background
                  border border-border
                  text-foreground
                  focus:ring-2 focus:ring-accent
                  outline-none transition
                "
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-foreground/60"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full rounded-xl py-3
              bg-accent text-white
              font-semibold
              hover:opacity-90
              disabled:opacity-60
              flex items-center justify-center gap-2
              transition
            "
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}
