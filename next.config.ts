import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60000,
    contentSecurityPolicy: "default-src 'self'; img-src 'self' data: https:; media-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data:; script-src 'self'; style-src 'self';",
  },
  experimental: {
    optimizePackageImports: ["lucide-react", "framer-motion", "@ffmpeg/ffmpeg"],
    optimizeCss: true,
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "no-referrer-when-downgrade" },
          { key: "Permissions-Policy", value: "geolocation=()" },
          { key: "X-XSS-Protection", value: "1; mode=block" },
          { key: "Content-Security-Policy", value: "default-src 'self'; img-src 'self' data: https:; media-src 'self' data: https:; connect-src 'self' https:; font-src 'self' data:; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline';" },
          // Preconnect to Cloudinary for faster image loading
          { key: "Link", value: "<https://res.cloudinary.com>; rel=preconnect; crossorigin" },
          // Allow back/forward cache
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
