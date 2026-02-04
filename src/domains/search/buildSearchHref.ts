import type { Locale } from "@/i18n/config";

export type BuildSearchHrefArgs = {
  locale: Locale;
  q?: string;
  cat?: string; // "all" or category slug/id
  searchPath?: string; // override, e.g. `/${locale}/search`
};

export const buildSearchHref = ({
  locale,
  q = "",
  cat,
  searchPath,
}: BuildSearchHrefArgs) => {
  const base = searchPath ?? `/${locale}/search`;
  const url = new URL(base, `https://${locale}`);
  if (q.trim()) url.searchParams.set("q", q.trim());
  return url.pathname + url.search;
};
