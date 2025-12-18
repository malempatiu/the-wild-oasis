import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  // Configure image domains for Next.js Image component
  // Allows loading images from external sources like Supabase storage
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gncbebcvnnqwegegndoj.supabase.co',
        pathname: '/storage/v1/object/public/cabins/**',
      },
    ],
  },
  // Enable static(SSG) export for deployment to static hosting
  // output: 'export',
};

export default nextConfig;
