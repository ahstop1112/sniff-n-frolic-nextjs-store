"use client";

import { I18nextProvider } from "react-i18next";
import { initClientI18n } from "@/i18n/client";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/type";
import { useRef } from "react";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
  children: React.ReactNode;
};

const I18nProvider = ({ locale, dictionary, children }: Props) => {
  const i18nRef = useRef(initClientI18n(locale, dictionary));
  return <I18nextProvider i18n={i18nRef.current}>{children}</I18nextProvider>;
};

export default I18nProvider;