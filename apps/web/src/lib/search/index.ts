import type { Locale } from "@/i18n/config";
export const buildSearchHref = (
  locale: Locale,
  q: string,
  cat?: string,
  searchPath?: string,
) => {
  const base = searchPath ?? `/${locale}/search`;
  const url = new URL(base, "http:local");
  if (q.trim()) url.searchParams.set("q", q.trim());
  if (cat && cat !== "all") url.searchParams.set("cat", cat);
  return url.pathname + url.search;
};
