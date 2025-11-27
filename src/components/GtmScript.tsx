"use client";

import Script from "next/script";

interface GtmScriptProps {
  gtmId: string;
}

const GtmScript = ({ gtmId }: GtmScriptProps) => {
  if (!gtmId) return null;

  return (
    <>
      {/* GTM head script */}
      <Script id="gtm-base" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');
        `}
      </Script>

      {/* GTM noscript（body 部份）要喺 layout 裏面手動插一個 <noscript>，見下面 RootLayout */}
    </>
  );
};

export default GtmScript;
