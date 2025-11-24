export const zhDictionary = {
    common: {
      siteTitle: "Sniff & Frolic 網店示範",
      latestArrivals: "最新上架",
      viewAll: "睇晒全部產品",
      backToAll: "返回所有產品",
      relatedProducts: "相關產品",
      viewOnSniff: "去 Sniff & Frolic 落單",
      shopByCategory: "按分類揀貨",
    },
    nav: {
      home: "主頁",
      products: "全部產品",
      about: "關於我們",
    },
  } as const;
  
  export type ZhDictionary = typeof zhDictionary;