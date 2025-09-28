import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "static1.mujerhoy.com" },
      { protocol: "https", hostname: "images-na.ssl-images-amazon.com" },
      { protocol: "https", hostname: "m.media-amazon.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" }, 
    ],
  },
  env: {
    NEXT_PUBLIC_API_BASE: "http://127.0.0.1:8080",
  },
};

export default nextConfig;