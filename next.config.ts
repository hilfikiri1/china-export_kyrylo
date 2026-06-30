import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Root redirect to default locale
      {
        source: "/",
        destination: "/pl",
        permanent: false,
      },
      // Legacy Polish URLs → /pl/...
      {
        source: "/uslugi",
        destination: "/pl/uslugi",
        permanent: true,
      },
      {
        source: "/uslugi/:slug",
        destination: "/pl/uslugi/:slug",
        permanent: true,
      },
      {
        source: "/proces",
        destination: "/pl/proces",
        permanent: true,
      },
      {
        source: "/realizacje",
        destination: "/pl/realizacje",
        permanent: true,
      },
      {
        source: "/o-nas",
        destination: "/pl/o-nas",
        permanent: true,
      },
      {
        source: "/zespol-w-chinach",
        destination: "/pl/zespol-w-chinach",
        permanent: true,
      },
      {
        source: "/kalkulator",
        destination: "/pl/kalkulator",
        permanent: true,
      },
      {
        source: "/konsultacja",
        destination: "/pl/konsultacja",
        permanent: true,
      },
      {
        source: "/kontakt",
        destination: "/pl/kontakt",
        permanent: true,
      },
      {
        source: "/wyjazdy-do-chin",
        destination: "/pl/zespol-w-chinach#wyjazdy",
        permanent: true,
      },
    ];
  },
};

export default withNextIntl(nextConfig);
