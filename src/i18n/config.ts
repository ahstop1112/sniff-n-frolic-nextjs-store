export const locales = ["en", "zh"] as const;
export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const isValidLocale = (locale: string): locale is Locale =>
  locales.includes(locale as Locale);