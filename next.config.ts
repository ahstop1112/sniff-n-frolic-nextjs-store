import type { NextConfig } from "next";
const path = require("path");

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  sassOptions: {
    includePaths: [path.join(__dirname, "src")],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sniffnfrolic.com",
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
    ],
  },
  experimental: {
    serverComponentsHmrCache: false,
  },
  async redirects() {
    return [
      {
        source: '/product/:slug',
        destination: '/en/products/:slug',
        permanent: true,
      },
      {
        source: '/category/:parent/:slug',
        destination: '/en/category/:slug',
        permanent: true,
      },
      {
        source: '/category/:slug',
        destination: '/en/category/:slug',
        permanent: true,
      },
    ];
  },
};


export default nextConfig;
