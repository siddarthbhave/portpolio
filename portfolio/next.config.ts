import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 2592000, // 30 days
  },
  experimental: {
    optimizePackageImports: ['@react-three/drei'],
  },
};

export default nextConfig;
