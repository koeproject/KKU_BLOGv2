import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'nbbje4zkz5.ufs.sh',
        pathname: '**',
      },
    ],
  },
};

export default nextConfig;

