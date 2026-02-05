import type { SearchParamsObj, Term, MaybePromise } from "@/types/next";
import { getCategoryIdBySlug } from "../categories/getCategoryIdBySlug";

export type SimpleCategory = {
  id: number;
  slug: string;
  parent?: number;
};

export type WooQueryParams = Record<
  string,
  string | number | boolean | undefined
>;

const getParamString = (sp: SearchParamsObj, key: string): string => {
  const v = sp[key];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? "";
  return "";
};

const getParamNumber = (
  sp: SearchParamsObj,
  key: string,
): number | undefined => {
  const raw = getParamString(sp, key).trim();
  if (!raw) return undefined;
  const n = Number(raw);
  return Number.isFinite(n) ? n : undefined;
};

const clampMinMax = (min?: number, max?: number) => {
  if (min === undefined && max === undefined)
    return { min: undefined, max: undefined };
  if (min !== undefined && max !== undefined && min > max) {
    return { min: max, max: min }; // swap
  }
  return { min, max };
};

const mapSortToWoo = (sort: string) => {
  // Woo orderby: date | title | price | popularity | rating
  // order: asc | desc
  switch (sort) {
    case "new":
      return { orderby: "date", order: "desc" };
    case "popularity":
      return { orderby: "popularity", order: "desc" };
    case "rating":
      return { orderby: "rating", order: "desc" };
    case "price_asc":
      return { orderby: "price", order: "asc" };
    case "price_desc":
      return { orderby: "price", order: "desc" };
    default:
      return { orderby: "date", order: "desc" };
  }
};

export const buildWooParamsFromSearchParams = async (args: {
  searchParams: MaybePromise<SearchParamsObj>;
  baseCategoryId?: number; // category page default
  categories?: SimpleCategory[]; // 用 slug → id
  perPage?: number;
  // optional: color attribute support
  color?: { attribute: string; terms: Term[] }; // attribute="pa_color"
}): Promise<WooQueryParams> => {
  const sp = await args.searchParams;
  const { baseCategoryId, categories = [], perPage = 50, color } = args;

  const categorySlug = getParamString(sp, "category");
  const inStockFlag = getParamString(sp, "in_stock");
  const onSaleFlag = getParamString(sp, "on_sale");
  const sort = getParamString(sp, "sort") || "new";

  const minRaw = getParamNumber(sp, "min_price");
  const maxRaw = getParamNumber(sp, "max_price");
  const { min, max } = clampMinMax(minRaw, maxRaw);

  const params: WooQueryParams = {
    per_page: perPage,
    status: "publish",
  };

  // category: slug → id
  let resolvedCategoryId: number | undefined;

  if (categorySlug) {
    // 1) local lookup (fast)
    const local = categories.find((c) => c.slug === categorySlug);
    if (local?.id) {
      resolvedCategoryId = local.id;
    } else {
      // 2) remote lookup fallback (guaranteed)
      resolvedCategoryId = await getCategoryIdBySlug(categorySlug);
    }
  }

  // Prefer query category, fallback to baseCategoryId
  const categoryId = resolvedCategoryId ?? baseCategoryId;
  if (typeof categoryId === "number") {
    params.category = categoryId;
  }

  const toBool = (v: string) => v === "1" || v === "true";

  if (toBool(inStockFlag)) params.stock_status = "instock";
  if (toBool(onSaleFlag)) params.on_sale = true;

  if (min !== undefined) params.min_price = min;
  if (max !== undefined) params.max_price = max;

  const { orderby, order } = mapSortToWoo(sort);
  params.orderby = orderby;
  params.order = order;

  // color filter：attribute + term id
  const colorSlug = getParamString(sp, "color");
  if (color && colorSlug) {
    const term = color.terms.find((t) => t.slug === colorSlug);
    if (term) {
      params.attribute = color.attribute; // e.g. "pa_color"
      params.attribute_term = term.id;
    }
  }

  return params;
};
