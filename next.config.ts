import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  async redirects() {
    return [
      {
        source: "/wyjazdy-do-chin",
        destination: "/pl/zespol-w-chinach",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
