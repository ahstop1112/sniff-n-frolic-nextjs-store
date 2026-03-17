import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "./config";

export const requireLocale = async (
  params: Promise<{ lang: string }> | { lang: string }
): Promise<Locale> => {
  const resolved = await params;
  const { lang } = resolved;

  if (!isValidLocale(lang)) notFound();
  return lang;
};