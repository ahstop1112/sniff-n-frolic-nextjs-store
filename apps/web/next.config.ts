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
};


export default nextConfig;
