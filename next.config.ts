import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* other config options */
  eslint: {
    ignoreDuringBuilds: true, // <-- add this
  },
};

export default nextConfig;
