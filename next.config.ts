import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  trailingSlash: true,
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    useCache: true,
  },
};

export default nextConfig;
