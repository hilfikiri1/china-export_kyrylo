import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/wyjazdy-do-chin",
        destination: "/pl/dzialamy-w-chinach#wyjazdy",
        permanent: true,
      },
      { source: "/o-nas", destination: "/pl/o-nas", permanent: true },
      { source: "/proces", destination: "/pl/proces", permanent: true },
      { source: "/realizacje", destination: "/pl/realizacje", permanent: true },
      { source: "/uslugi", destination: "/pl/uslugi", permanent: true },
      {
        source: "/uslugi/wyszukiwanie-dostawcow",
        destination: "/pl/uslugi/wyszukiwanie-dostawcow",
        permanent: true,
      },
      {
        source: "/uslugi/audyty-fabryk",
        destination: "/pl/uslugi/audyty-fabryk",
        permanent: true,
      },
      {
        source: "/uslugi/kontrola-jakosci",
        destination: "/pl/uslugi/kontrola-jakosci",
        permanent: true,
      },
      {
        source: "/uslugi/spedycja-i-logistyka",
        destination: "/pl/uslugi/spedycja-i-logistyka",
        permanent: true,
      },
      { source: "/kalkulator", destination: "/pl/kalkulator", permanent: true },
      { source: "/konsultacja", destination: "/pl/konsultacja", permanent: true },
      { source: "/kontakt", destination: "/pl/kontakt", permanent: true },
      {
        source: "/zespol-w-chinach",
        destination: "/pl/dzialamy-w-chinach",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
