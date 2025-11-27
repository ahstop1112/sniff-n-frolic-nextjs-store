/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      // --- English: 靚 URL → /en/... ---

      // Home
      {
        source: "/",
        destination: "/en",
      },
      // Products list
      {
        source: "/products",
        destination: "/en/products",
      },
      // Product detail：/product/rocketman-chew-toy-sodapup → /en/products/rocketman-chew-toy-sodapup
      {
        source: "/product/:slug",
        destination: "/en/products/:slug",
      },
      // Cart
      {
        source: "/cart",
        destination: "/en/cart",
      },
      // Search
      {
        source: "/search",
        destination: "/en/search",
      },

      // --- 中文直接用 /zh 作 lang segment ---

      {
        source: "/zh",
        destination: "/zh",
      },
      {
        source: "/zh/products",
        destination: "/zh/products",
      },
      {
        source: "/zh/product/:slug",
        destination: "/zh/products/:slug",
      },
      {
        source: "/zh/cart",
        destination: "/zh/cart",
      },
      {
        source: "/zh/search",
        destination: "/zh/search",
      },
    ];
  },

  async redirects() {
    return [
      // 舊 /en → 新結構（SEO 友善 301）

      {
        source: "/en",
        destination: "/",
        permanent: true,
      },
      {
        source: "/en/products",
        destination: "/products",
        permanent: true,
      },
      {
        source: "/en/products/:slug",
        destination: "/product/:slug",
        permanent: true,
      },
      {
        source: "/en/cart",
        destination: "/cart",
        permanent: true,
      },
      {
        source: "/en/search",
        destination: "/search",
        permanent: true,
      },

      // 特例：你之前講嘅 rocketman 舊 URL → 新 URL
      {
        source: "/en/rocketman-:path*",
        destination: "/product/rocketman-chew-toy-sodapup",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
