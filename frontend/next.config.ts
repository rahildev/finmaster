import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
    // Development üçün local IP icazəsi
    dangerouslyAllowSVG: true,
    // Local development üçün unoptimized mode
    unoptimized: process.env.NODE_ENV === 'development',
  },
};

export default nextConfig;
