// src/i18n/dictionaries.ts
import type { Locale } from "./config";
import { enDictionary } from "./en";
import { zhDictionary } from "./zh";

export type Dictionary = typeof enDictionary; // en / zh

export const getDictionary = async (locale: Locale): Promise<Dictionary> => {
  if (locale === "zh") return zhDictionary;
  return enDictionary;
};