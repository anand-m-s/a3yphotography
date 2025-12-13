// // next.config.ts
// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ["res.cloudinary.com"],
//   },
//   eslint: {
//     ignoreDuringBuilds: true,
//   },
//   typescript: {
//     ignoreBuildErrors: true, // <-- ignore TS errors during build
//   },
// };

// export default nextConfig;


// next.config.ts
import type { NextConfig } from "next";
import withPWA from "next-pwa";

const nextConfig: NextConfig = {
  images: {
    domains: ["res.cloudinary.com"],
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPWA({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
})(nextConfig);
