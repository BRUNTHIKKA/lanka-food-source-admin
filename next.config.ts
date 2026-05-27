import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: 'https://lanka-food-source.onrender.com/api/:path*',
      },
    ];
  },
};


export default nextConfig;
