export interface Dictionary{
    common: {
      siteTitle: string,
      latestArrivals: string,
      viewAll: string,
      backToAll: string,
      relatedProducts: string,
      viewOnSniff: string,
      shopByCategory: string,
      categories: string,
      filters: string,
      clearFilter: string,
      category: string,
      all: string,
      min: string,
      max: string,
      sort: string,
      newest: string,
      popularity: string,
      rating: string,
      priceLowHigh: string,
      priceHighLow: string,
      color: string,
      inStockOnly: string,
      onSale: string,
      onSaleOnly: string,
    },
    nav: {
      home: string,
      products: string,
      about: string,
    },
    search:{
      searchProducts: string,
      typeProductKeyword: string,
      searchResultFor: string,
      noProductFound: string
    },
    checkout: {
      title: string,
      desc: string,
      completeYourPurchase: string
    }
};