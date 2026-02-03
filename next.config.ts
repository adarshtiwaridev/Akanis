import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },

    api: {
    bodyParser: {
      sizeLimit: '200mb',
    },
  },

};

export default nextConfig;
