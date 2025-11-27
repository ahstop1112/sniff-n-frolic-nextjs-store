import type { ReactNode } from "react";
import type { Metadata } from "next";
import Script from "next/script";
import AppProviders from "./providers";

const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

interface RootLayoutProps{
  children: ReactNode
}

export const metadata: Metadata = {
  title: "Sniff & Frolic Headless Storefront",
  description: "Next.js + WooCommerce headless demo for portfolio.",
};

const RootLayout = ({ children }: RootLayoutProps) => (
  <html lang="en">
    <head>
        {gtmId && (
          <Script id="gtm-base" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        )}
    </head>
    <body>
      <AppProviders>
        {/* 🟧 GTM noscript */}
        {gtmId && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
              height="0"
              width="0"
              style={{ display: "none", visibility: "hidden" }}
            />
          </noscript>
        )}
        {children}
      </AppProviders>
    </body>
  </html>
);

export default RootLayout;