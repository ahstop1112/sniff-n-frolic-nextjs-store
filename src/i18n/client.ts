"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Locale } from "./config";
import type { Dictionary } from "./type";

export const initClientI18n = (locale: Locale, dict: Dictionary) => {
  if (!i18n.isInitialized) {
    i18n.use(initReactI18next).init({
      lng: locale,
      fallbackLng: 'en',
      resources: {
        [locale]: {
          common: dict.common,
          footer: dict.footer,
          nav: dict.nav,
          search: dict.search,
          checkout: dict.checkout,
          cart: dict.cart,
          cookie: dict.cookie,
        },
      },
      interpolation: { escapeValue: false },
    });
  }

  return i18n;
};