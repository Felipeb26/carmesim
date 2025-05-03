import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
