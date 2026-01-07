import { Dictionary } from "./type";

export const zhDictionary: Dictionary = {
  common: {
    siteTitle: "Sniff & Frolic 網店示範",
    latestArrivals: "最新上架",
    viewAll: "睇晒全部產品",
    backToAll: "返回所有產品",
    relatedProducts: "相關產品",
    viewOnSniff: "去 Sniff & Frolic 落單",
    shopByCategory: "按分類揀貨",
    categories: "Categories",
    filters: "Filters",
    clearFilter: "Clear filters",
    category: "Category",
    all: "All",
    min: "Min",
    max: "Max",
    sort: "Sort",
    newest: "Newest",
    popularity: "Popularity",
    rating: "Rating",
    priceLowHigh: "Price: Low → High",
    priceHighLow: "Price: High → Low",
    color: "Color",
    inStockOnly: "In stock only",
    onSale: "On Sale",
    onSaleOnly: "On sale only",
  },
  nav: {
    home: "主頁",
    products: "全部產品",
    about: "關於我們",
  },
  search: {
    searchProducts: "搜尋產品",
    typeProductKeyword: "請喺上面搜尋欄輸入產品關鍵字。",
    searchResultFor: "搜尋結果: ",
    noProductFound: "未搵到相關產品。試試其他關鍵字？",
  },
  checkout: {
    title: "結帳 – Sniff & Frolic",
    desc: "輸入送貨及付款資料，完成 Sniff & Frolic 的訂單。",
    completeYourPurchase: "",
  },
} as const;

export type ZhDictionary = typeof zhDictionary;
