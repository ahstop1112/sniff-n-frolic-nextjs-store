import { Dictionary } from "./type";

export const enDictionary: Dictionary = {
    common: {
      siteTitle: "Sniff & Frolic",
      latestArrivals: "Latest arrivals",
      viewAll: "View all products",
      backToAll: "Back to all products",
      relatedProducts: "Related products",
      viewOnSniff: "View on Sniff & Frolic",
      shopByCategory: "Shop by category",
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
      home: "Home",
      products: "Products",
      about: "About",
    },
    search:{
      searchProducts:"Search products",
      typeProductKeyword: "Please type a product keyword in the search bar above.",
      searchResultFor: "Search results for: ",
      noProductFound: "No products found. Try a different keyword?"
    },
    checkout: {
      title: "Checkout – Sniff & Frolic",
      desc: "Enter your details to complete your Sniff & Frolic order.",
      completeYourPurchase: "Complete Your Purchase."
    }
  } as const;
  
  export type EnDictionary = typeof enDictionary;