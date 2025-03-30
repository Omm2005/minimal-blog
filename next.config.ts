import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['us-east-1.tixte.net']
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
