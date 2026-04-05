import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Toaster } from "sonner";
import FloatingActions from "../components/common/FloatingActions";

export const metadata = {
  metadataBase: new URL("https://www.voritemedia.com"),

  title: {
    default:
      "Vorite Media™ | #1 Digital Agency & Video Production Company in Delhi NCR",
    template: "%s | Vorite Media™ - Creative Digital Agency",
  },

  description:
    "Vorite Media™ is a top-rated digital agency in Delhi NCR offering cinematic video production, premium photography, web development, and branding services. Trusted by brands across India.",

  keywords: [
    "Best Digital Agency in Delhi NCR",
    "Top Video Production Company India",
    "Creative Agency Noida Gurgaon Delhi",
    "Professional Photography Services NCR",
    "Website Development Company India",
    "Branding Agency India",
    "Corporate Video Production Delhi",
    "Ecommerce Product Shoot India",
    "Best Marketing Agency India",
  ],

  authors: [{ name: "Vorite Media™ Team" }],
  creator: "Vorite Media™",
  publisher: "Vorite Media™",

  category: "Business & Marketing",

  alternates: {
    canonical: "https://www.voritemedia.com",
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },

  openGraph: {
    title:
      "Vorite Media™ | India's Leading Digital & Video Production Agency",
    description:
      "Helping brands grow with cinematic storytelling, powerful branding, and high-performance websites.",
    url: "https://www.voritemedia.com",
    siteName: "Vorite Media™",
    images: [
      {
        url: "/og-image.jpg",
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
    title: "Vorite Media™ | Premium Digital Agency India",
    description:
      "We create cinematic videos, premium websites & powerful brands.",
    creator: "@voritemedia",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
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

        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            `,
          }}
        />
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": ["LocalBusiness", "ProfessionalService"],

      name: "Vorite Media™",
      image: "https://www.voritemedia.com/logo.png",
      url: "https://www.voritemedia.com",
      telephone: "+91-8368507050",

      address: {
        "@type": "PostalAddress",
        streetAddress: "Your Exact Office Address Here",
        addressLocality: "Faridabad",
        addressRegion: "Haryana",
        postalCode: "121001",
        addressCountry: "IN",
      },

      geo: {
        "@type": "GeoCoordinates",
        latitude: 28.3899241,
        longitude: 77.2657876,
      },

      hasMap: "https://www.google.com/maps?q=28.3899241,77.2657876",

      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday"
        ],
        opens: "10:00",
        closes: "19:00"
      },

      priceRange: "₹₹₹",

      areaServed: [
        { "@type": "State", "name": "Haryana" },
        { "@type": "State", "name": "Uttar Pradesh" },
        { "@type": "State", "name": "Bihar" },

        { "@type": "City", "name": "Delhi" },
        { "@type": "City", "name": "Noida" },
        { "@type": "City", "name": "Gurgaon" },
        { "@type": "City", "name": "Faridabad" },
        { "@type": "City", "name": "Ghaziabad" },

        { "@type": "City", "name": "Lucknow" },
        { "@type": "City", "name": "Kanpur" },
        { "@type": "City", "name": "Varanasi" },

        { "@type": "City", "name": "Patna" },
        { "@type": "City", "name": "Gaya" }
      ],

      sameAs: [
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