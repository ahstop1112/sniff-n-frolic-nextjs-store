import { buildWooParamsFromSearchParams, type SimpleCategory, type WooQueryParams } from "./buildWooParams";

type SearchParams = Record<string, string | string[] | undefined>;
type Term = { id: number; slug: string };

const getParamString = (sp: SearchParams, key: string): string => {
    const v = sp[key];
    if (typeof v === "string") return v;
    if (Array.isArray(v)) return v[0] ?? "";
    return "";
};

const toBoolFlag = (v: string) => v === "1" || v === "true";

const isTruthyParam = (sp: SearchParams, key: string) => {
    const v = getParamString(sp, key).trim();
    return Boolean(v);
};

export const buildWooParamsForListPage = async (args: {
  searchParams: Promise<SearchParams> | SearchParams;
  // default category context (e.g. category page base id)
  baseCategoryId?: number;
  // allow ?category=<slug> to override baseCategoryId
  categories?: SimpleCategory[];
  // paging
  perPage?: number;
  // search alias (for /search page)
  // if you pass this, it will set wooParams.search
  searchKey?: "q" | "search"; // default "q"
  // optional color attribute support
  color?: { attribute: string; terms: Term[] }; // e.g. { attribute: "pa_color", terms: [...] }
}) => {
  const sp: SearchParams =
    typeof (args.searchParams as any)?.then === "function"
      ? await (args.searchParams as Promise<SearchParams>)
      : (args.searchParams as SearchParams);

  const perPage = args.perPage ?? 50;

  const wooParams = buildWooParamsFromSearchParams({
    sp,
    baseCategoryId: args.baseCategoryId,
    categories: args.categories ?? [],
    perPage,
    color: args.color,
  }) as WooQueryParams;

  // Search alias: /search?q=xxx  -> wooParams.search
  const key = args.searchKey ?? "q";
  const rawSearch = getParamString(sp, key).trim();
  if (rawSearch) {
    wooParams.search = rawSearch;
  }

  const sort = getParamString(sp, "sort").trim();
  const hasSort = sort !== "" && sort !== "new";

  const hasAnyFilter =
    isTruthyParam(sp, "category") ||
    toBoolFlag(getParamString(sp, "in_stock")) ||
    toBoolFlag(getParamString(sp, "on_sale")) ||
    isTruthyParam(sp, "min_price") ||
    isTruthyParam(sp, "max_price") ||
    isTruthyParam(sp, "color") ||
    hasSort ||
    rawSearch !== "";

  const hasQuery = rawSearch !== "";

  return { sp, wooParams, hasAnyFilter, hasQuery };
};