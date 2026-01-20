"use client";

import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import type { Locale } from "./config";
import type { Dictionary } from "./type";

export const initClientI18n = (
  locale: Locale,
  dict: Dictionary
) => {
  if (!i18n.isInitialized) {
    i18n
      .use(initReactI18next)
      .init({
        lng: locale,
        fallbackLng: "en",
        resources: {
          [locale]: {
            common: dict.common,
            nav: dict.nav,
            search: dict.search,
            checkout: dict.checkout,
          },
        },
        interpolation: {
          escapeValue: false,
        },
      });
  } else {
    i18n.changeLanguage(locale);
  }

  return i18n;
};