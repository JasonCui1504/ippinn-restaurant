import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "website-cdn.menusifu.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
