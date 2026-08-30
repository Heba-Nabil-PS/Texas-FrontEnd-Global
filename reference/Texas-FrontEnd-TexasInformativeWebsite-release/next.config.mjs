import createNextIntlPlugin from "next-intl/plugin";

/** @type {import('next').NextConfig} */
const nextConfig = {
  // logging: {
  //   fetches: { fullUrl: true },
  // },
  // Pin the workspace root so Turbopack doesn't infer it from a stray
  // lockfile elsewhere on the drive (Next 16 made Turbopack the default).
  // turbopack: {
  //   root: import.meta.dirname,
  // },
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  images: {
    remotePatterns: [
      {
        hostname: "texas-informative-tx-imagerepository.paradigmegypt.com",
        protocol: "https",
      },
      {
        hostname: "texas-informative-node-imagerepository.paradigmegypt.com",
        protocol: "https",
      },
      {
        hostname: "church-informative-tx-imagerepository.paradigmegypt.com",
        protocol: "https",
      },
      {
        hostname: "church-informative-node-imagerepository.paradigmegypt.com",
        protocol: "https",
      },
      {
        hostname: "lvinf-tx-imgrepo.psdigital.me",
        protocol: "https",
      },
      {
        hostname: "lvinf-tx-node-imgrepo.psdigital.me",
        protocol: "https",
      },
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/contact-us",
        destination: "/contact",
        permanent: true,
      },
      {
        source: "/location",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/coupon",
        destination: "/coupons",
        permanent: true,
      },
      {
        source: "/location/:path*",
        destination: "/locations",
        permanent: true,
      },
      {
        source: "/Halal.pdf",
        destination: "/halal",
        permanent: true,
      },
      {
        source: "/menu/:path/:slug+",
        destination: "/menu/:path",
        permanent: false,
      },
    ];
  },
  poweredByHeader: false,
};

// Point at the explicit request-config file. In next-intl v4 + Turbopack the
// plugin sets a `resolveAlias` for `next-intl/config`, and Turbopack does not
// auto-resolve a directory's index file — so a file path is required.
const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");
export default withNextIntl(nextConfig);
