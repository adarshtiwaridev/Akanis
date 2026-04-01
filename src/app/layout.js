import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Toaster } from "sonner";
import FloatingActions from "../components/common/FloatingActions";

export const metadata = {
  metadataBase: new URL("https://www.voritemedia.com"),
  title: {
    default: "Vorite Media | Premium Digital Agency & Video Production in Delhi NCR",
    template: "%s | Vorite Media - Leading Creative Agency",
  },
  description:
    "Vorite Media is a premier full-service digital agency serving Delhi, Noida, Gurgaon, Ghaziabad, Faridabad, and Rohtak. We specialize in high-end photography, cinematic video production, web development, and strategic branding.",

  keywords: [
    "Digital Agency in Delhi NCR",
    "Video Production Noida",
    "Creative Agency Gurgaon",
    "Photography Studio Faridabad",
    "Website Development Ghaziabad",
    "Branding Agency Rohtak",
    "Corporate Film Makers Delhi",
    "Commercial Photography NCR",
    "E-commerce Shoot Noida",
    "Web Design Agency Gurgaon",
  ],

  authors: [{ name: "Vorite Media Team" }],
  creator: "Vorite Media",
  publisher: "Vorite Media",

  openGraph: {
    title: "Vorite Media | Digital & Media Excellence in Delhi NCR",
    description:
      "Transforming brands through cinematic video, high-end photography, and cutting-edge web solutions across Delhi, Noida, and Gurgaon.",
    url: "https://www.voritemedia.com",
    siteName: "Vorite Media",
    images: [
      {
        url: "/og-image.jpg", // Ensure you have this in your public folder
        width: 1200,
        height: 630,
        alt: "Vorite Media Digital Agency",
      },
    ],
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Vorite Media | Digital Agency & Video Production",
    description: "Premium Creative & Digital Solutions for brands in Delhi NCR and beyond.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col text-slate-900 antialiased bg-white">
        
        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-4 left-4 z-50 bg-blue-600 text-white px-6 py-3 rounded-md shadow-lg"
        >
          Skip to main content
        </a>

        <header role="banner">
          <Navbar />
        </header>

        <Toaster
          richColors
          position="top-right"
          toastOptions={{ 
            duration: 3000,
            style: { borderRadius: '8px' } 
          }}
        />

        <main
          id="main-content"
          className="flex-1"
          role="main"
          aria-label="Main Content"
        >
          {children}
        </main>

        <FloatingActions />

        <footer role="contentinfo">
          <Footer />
        </footer>

        {/* Structured Data for Local SEO (NCR Coverage) */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "ProfessionalService",
              "name": "Vorite Media",
              "image": "https://www.voritemedia.com/logo.png",
              "url": "https://www.voritemedia.com",
              "telephone": "+91 8368507050",
              "priceRange": "$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Your Office Address",
                "addressLocality": "Noida",
                "addressRegion": "Uttar Pradesh",
                "postalCode": "201301",
                "addressCountry": "India"
              },
              "areaServed": [
                { "@type": "City", "name": "Delhi" },
                { "@type": "City", "name": "Noida" },
                { "@type": "City", "name": "Gurgaon" },
                { "@type": "City", "name": "Ghaziabad" },
                { "@type": "City", "name": "Faridabad" },
                { "@type": "City", "name": "Rohtak" }
              ],
              "description": "Premium digital agency and video production house serving the Delhi NCR region.",
              "sameAs": [
                "https://www.instagram.com/voritemedia",
                "https://www.linkedin.com/company/voritemedia",
                "https://www.facebook.com/voritemedia"
              ]
            }),
          }}
        />
      </body>
    </html>
  );
}