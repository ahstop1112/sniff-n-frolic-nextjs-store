type SearchParams = Record<string, string | string[] | undefined>;

export type SimpleCategory = {
  id: number;
  slug: string;
  parent?: number;
};

export type WooQueryParams = Record<
  string,
  string | number | boolean | undefined
>;

const getParamString = (sp: SearchParams, key: string): string => {
  const v = sp[key];
  if (typeof v === "string") return v;
  if (Array.isArray(v)) return v[0] ?? "";
  return "";
};

const getParamNumber = (sp: SearchParams, key: string): number | undefined => {
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

export type Term = { id: number; slug: string };

export const buildWooParamsFromSearchParams = (args: {
  sp: SearchParams;
  baseCategoryId?: number; // category page default
  categories?: SimpleCategory[]; // 用 slug → id
  perPage?: number;
  // optional: color attribute support
  color?: { attribute: string; terms: Term[] }; // attribute="pa_color"
}): WooQueryParams => {
  const { sp, baseCategoryId, categories = [], perPage = 50, color } = args;

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

  // category: slug → id（如果無 slug，就用 baseCategoryId）
  const selectedCategory = categorySlug
    ? categories.find((c) => c.slug === categorySlug)
    : undefined;

  const categoryId = selectedCategory?.id ?? baseCategoryId;
  if (typeof categoryId === "number") {
    params.category = categoryId;
  }

  if (inStockFlag === "1") {
    params.stock_status = "instock";
  }

  if (onSaleFlag === "1") {
    params.on_sale = true;
  }

  if (min !== undefined) params.min_price = min;
  if (max !== undefined) params.max_price = max;

  const { orderby, order } = mapSortToWoo(sort);
  params.orderby = orderby;
  params.order = order;

  // color filter
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
