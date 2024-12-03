import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fakestoreapi.com',
        pathname: '/img/**', // This allows all images under the /img path
      },
    ],
  },
};

export default nextConfig;
