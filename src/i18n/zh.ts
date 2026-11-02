
import type { Dictionary } from "./type";
import { enDictionary } from "./en";

export const zhDictionary: Dictionary = {
  ...enDictionary,
  common: {
    siteTitle: "Sniff & Frolic",
    latestArrivals: "最新上架",
    viewAll: "查看所有商品",
    backToAll: "返回所有商品",
    relatedProducts: "相關商品",
    viewOnSniff: "在 Sniff & Frolic 查看",
    shopByCategory: "按分類選購",
    categories: "商品分類",
    filters: "篩選",
    clearFilter: "清除篩選",
    clear: "清除",
    category: "分類",
    all: "全部",
    min: "最低",
    max: "最高",
    sort: "排序",
    newest: "最新上架",
    popularity: "熱門程度",
    rating: "評分",
    priceLowHigh: "價格：由低至高",
    priceHighLow: "價格：由高至低",
    color: "顏色",
    inStockOnly: "只顯示有現貨商品",
    onSale: "特價",
    onSaleOnly: "只顯示特價商品",
    noResult: "找不到相關商品",
    freeShipping: "訂單超過 $75 即享免運費",

    metaTitle: "Sniff & Frolic｜寵物生活用品",
    metaDescription:
      "探索 Sniff & Frolic 精選寵物用品，為毛孩挑選玩具、外出用品及日常生活好物。",
    youMayAlsoLike: "你可能也喜歡",
  },

  nav: {
    home: "首頁",
    collection: "商品系列",
    ourStory: "品牌故事",
    howToBuy: "購物指南",
    faq: "常見問題",
    petTreats: "寵物零食",
    bowlsFeeders: "食碗及餵食用品",
    slowFeeders: "慢食碗",
    lickMats: "舔食墊",
    waterBottles: "外出水樽",
    petToys: "寵物玩具",
    petClothing: "寵物服飾",
    travelGear: "外出用品",
    carSeatCovers: "汽車座椅保護墊",
    seatBelts: "寵物安全帶",
    everydayCare: "日常護理",
    searchPlaceholder: "搜尋商品",

    shoppingCart: "購物車",
    checkout: "結帳",
    orderStatus: "訂單狀態",
  },

  search: {
    title: "搜尋",
    whatAreYouLookingFor: "想搵啲咩？",
    allCategories: "所有分類",
    popularCategories: "熱門分類",
    viewAllProduct: "查看所有商品",
    searchProducts: "搜尋商品",
    typeProductKeyword: "請在上方搜尋欄輸入商品關鍵字。",
    searchResults: "搜尋結果 ",
    searchResultFor: "搜尋結果：",
    noProductFound: "找不到相關商品，試試其他關鍵字？",

    descriptionKeyword: "商品搜尋結果",
    descriptionDefault: "探索 Sniff & Frolic 精選寵物用品。",
  },

  checkout: {
    title: "結帳｜Sniff & Frolic",
    desc: "填寫以下資料，完成你的 Sniff & Frolic 訂單。",
    completeYourPurchase: "完成購物",
    heading: "結帳",
    preparingPayment: "正在準備付款……",
    cartEmpty: "你的購物車目前沒有商品。",
    createOrderError:
      "建立訂單時發生問題，請稍後再試。",

    shippingInformation: "收貨資料",
    firstName: "名字",
    lastName: "姓氏",
    email: "電郵地址",
    phone: "聯絡電話",
    address1: "地址第一行",
    address2Optional: "地址第二行（選填）",
    city: "城市",
    stateProvince: "省份／州",
    postalCode: "郵政編碼",
    country: "國家／地區",

    preparePayment: "準備付款",
    readyPay: "準備就緒，請在右方付款",
    paymentMethodsReady: "付款方式已準備就緒，請在右方選擇。",
    payment: "付款",

    fillFormInstruction:
      "請先填寫左方資料，然後按「準備付款」。",
    paymentOptionsAfterPreparing:
      "完成準備後，信用卡及 Apple Pay 等付款方式會顯示於此。",

    paymentError: "付款時發生錯誤。",
    processingPayment: "正在處理付款……",
    payNow: "立即付款",

    yourOrder: "你的訂單",
    couponPlaceholder: "優惠碼",
    apply: "套用",
    subtotal: "商品小計",
    shipping: "運費",
    gst: "商品及服務稅（GST）",
    pst: "省銷售稅（PST）",
    totalLabel: "訂單總額",

    paymentSuccess: "付款成功",
    thankyou: "多謝你選購 Sniff & Frolic！",
    orderId: "訂單編號",
    continueShopping: "繼續購物",

    viewOrders: "查看訂單",
    confirmingTitle: "正在確認訂單",
    confirmingDesc: "正在確認你的付款及訂單資料，請稍候……",
    confirmedTitle: "訂單已確認",
    orderNumber: "訂單編號",
    status: "訂單狀態",
    items: "商品明細",
    total: "總金額"
  },
};
