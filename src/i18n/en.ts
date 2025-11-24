export const enDictionary = {
    common: {
      siteTitle: "Sniff & Frolic Storefront",
      latestArrivals: "Latest arrivals",
      viewAll: "View all products",
      backToAll: "Back to all products",
      relatedProducts: "Related products",
      viewOnSniff: "View on Sniff & Frolic",
      shopByCategory: "Shop by category",
    },
    nav: {
      home: "Home",
      products: "Products",
      about: "About",
    },
  } as const;
  
  export type EnDictionary = typeof enDictionary;