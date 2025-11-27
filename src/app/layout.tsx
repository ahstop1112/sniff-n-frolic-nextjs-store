import type { Metadata } from "next";
import AppProviders from "./providers";
import GtmScript from "@/components/GtmScript";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: "Sniff & Frolic Headless Storefront",
  description: "Next.js + WooCommerce headless demo for portfolio.",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => (
  <html lang="en">
    <head>{GTM_ID && <GtmScript gtmId={GTM_ID} />}</head>
    <body>
      {GTM_ID && (
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
      )}
      <AppProviders>{children}</AppProviders>
    </body>
  </html>
);

export default RootLayout;
