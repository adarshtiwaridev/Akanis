import "./globals.css";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Toaster } from "sonner";

export const metadata = {
  metadataBase: new URL("https://www.studioname.in"),
  title: {
    default: "StudioName | Digital Agency & Video Production in Lucknow",
    template: "%s | StudioName - Lucknow Digital Agency",
  },
  description:
    "StudioName is a full-service digital agency in Lucknow offering professional photography, video production, website design, web development, software development, branding, and digital marketing services.",

  keywords: [
    "Digital Agency in Lucknow",
    "Video Production in Lucknow",
    "Photography Studio Lucknow",
    "Website Design Lucknow",
    "Web Development Company Lucknow",
    "Software Development Lucknow",
    "Branding Agency Lucknow",
    "Corporate Video Production",
    "Wedding Photography Lucknow",
  ],

  authors: [{ name: "StudioName Team" }],
  creator: "StudioName",
  publisher: "StudioName",

  openGraph: {
    title: "StudioName | Digital & Media Agency in Lucknow",
    description:
      "Leading digital agency in Lucknow providing photography, videography, website development, software solutions, and branding services.",
    url: "https://www.studioname.in",
    siteName: "StudioName",
    locale: "en_IN",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "StudioName | Digital & Media Agency in Lucknow",
    description:
      "Photography, Video Production, Web & Software Development Agency in Lucknow.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="min-h-screen flex flex-col text-black antialiased">

        {/* Accessibility Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only absolute top-2 left-2 bg-black text-white px-4 py-2 rounded"
        >
          Skip to main content
        </a>

        <header role="banner">
          <Navbar />
        </header>

        <Toaster
          richColors
          position="top-right"
          toastOptions={{ duration: 3000 }}
        />

        <main
          id="main-content"
          className="flex-1"
          role="main"
          aria-label="Main Content"
        >
          {children}
        </main>

        <footer role="contentinfo">
          <Footer />
        </footer>

        {/* Structured Data for Local SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              name: "StudioName",
              image: "https://www.studioname.in/logo.png",
              url: "https://www.studioname.in",
              telephone: "+91-XXXXXXXXXX",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Lucknow",
                addressRegion: "Uttar Pradesh",
                addressCountry: "India",
              },
              geo: {
                "@type": "GeoCoordinates",
                latitude: "26.8467",
                longitude: "80.9462",
              },
              sameAs: [
                "https://www.instagram.com/studioname",
                "https://www.linkedin.com/company/studioname",
              ],
              description:
                "StudioName is a digital and media agency in Lucknow providing photography, videography, website design, web development, software development, and branding services.",
            }),
          }}
        />
      </body>
    </html>
  );
}
