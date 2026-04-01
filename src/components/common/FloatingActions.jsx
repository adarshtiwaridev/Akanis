"use client";

import { useState, useEffect } from "react";
import { MessageCircle, ArrowUp } from "lucide-react"; // Install lucide-react if not present

const FloatingActions = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Configuration - Change these as needed
  const whatsappNumber = "9473662794"; // Include country code, no '+'
const message = "Hello Akanis Team, I hope you're doing well. I'm interested in learning more about your services and would love to connect.";

  // Handle scroll visibility for the 'Back to Top' button
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-center gap-4">
      {/* WhatsApp Button */}
      <a
        href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contact us on WhatsApp"
        className="bg-[#25D366] text-white p-3 rounded-full shadow-lg hover:scale-110 transition-transform duration-200"
      >
        <MessageCircle size={28} />
      </a>

      {/* Scroll to Top Button */}
      <button
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`bg-black text-white p-3 rounded-full shadow-lg transition-all duration-300 hover:bg-gray-800 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <ArrowUp size={28} />
      </button>
    </div>
  );
};

export default FloatingActions;