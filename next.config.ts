import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/backend/:path*',
        destination: process.env.NODE_ENV === 'production' 
          ? 'https://lanka-food-source.onrender.com/api/:path*' 
          : 'http://localhost:5000/api/:path*',
      },
    ];
  },
};


export default nextConfig;
