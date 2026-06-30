import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wyjazdy-do-chin",
        destination: "/pl/zespol-w-chinach#wyjazdy",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
