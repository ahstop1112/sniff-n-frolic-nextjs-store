import type { Metadata } from "next";
import AppProviders from "./providers";

export const metadata: Metadata = {
  title: "Sniff & Frolic Headless Storefront",
  description: "Next.js + WooCommerce headless demo for portfolio.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <body>
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;