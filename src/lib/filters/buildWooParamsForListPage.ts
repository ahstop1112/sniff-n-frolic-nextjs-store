import {
  buildWooParamsFromSearchParams,
  type SimpleCategory,
  type WooQueryParams,
} from "./buildWooParams";
import { Term, SearchParamsObj, MaybePromise } from "@/types/next";

const getParamString = (sp: SearchParamsObj, key: string): string => {
  const v = sp[key];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? "";
  return "";
};

const toBoolFlag = (v: string) => v === "1" || v === "true";

const isTruthyParam = (sp: SearchParamsObj, key: string) => {
  const v = getParamString(sp, key).trim();
  return Boolean(v);
};

export const buildWooParamsForListPage = async (args: {
  searchParams: MaybePromise<SearchParamsObj> | SearchParamsObj;
  baseCategoryId?: number;
  categories?: SimpleCategory[];
  perPage?: number;
  searchKey?: "q" | "search"; // default "q"
  color?: { attribute: string; terms: Term[] }; // e.g. { attribute: "pa_color", terms: [...] }
}) => {
  const sp: SearchParamsObj =
    typeof (args.searchParams as any)?.then === "function"
      ? await (args.searchParams as Promise<SearchParamsObj>)
      : (args.searchParams as SearchParamsObj);

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
