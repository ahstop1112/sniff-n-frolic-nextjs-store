// LEGACY WOOCLIENT (to be removed after migration to new API is complete - updated 2026-05-18)
import "server-only";
import { apiFetch } from "@/lib/apiClient";
import { CACHE_CONFIG } from "@/lib/cache";
import type { ApiProduct, ApiCategory, WooProduct, WooCategory } from "./types"

// ─── Adapters: API → WooProduct/WooCategory shape ────────────────────────────
const centsToString = (cents: number): string => (cents / 100).toFixed(2);

const apiProductToWoo = (p: ApiProduct): WooProduct => ({
  id: 0,
  uuid: p.id,                         // uuid — set to 0, components should use slug
  name: p.name,
  slug: p.slug,
  permalink: "",
  price: centsToString(p.effective_price || p.regular_price || p.min_variation_price || 0),
  regular_price: centsToString(p.regular_price),
  sale_price: p.sale_price ? centsToString(p.sale_price) : "",
  on_sale: p.sale_price !== null,
  short_description: p.short_description ?? "",
  description: p.description ?? "",
  sku: p.sku ?? "",
  type: p.product_type,
  images: (p.images ?? []).map((img, i) => ({
    id: String(i),
    src: img.url,
    alt: img.alt_text ?? "",
  })),
  categories: p.category_slug
    ? [{ id: p.category_id ?? "", name: p.category_name ?? "", slug: p.category_slug }]
    : [],
  variations: p.variations ?? [],
});

const apiCategoryToWoo = (c: ApiCategory): WooCategory & { parentSlug: string | null } => {
  return {
    id: c.id ?? "0", // UUID as id, components should use slug
    name: c.name,
    slug: c.slug,
    parent: c.parent_id ?? "0",
    parentSlug: c.parent_slug,
    count: c.count,
    image: c.image_url && c.image_url !== 'false'
      ? { id: "0", src: c.image_url, alt: c.name }
      : null,
  }
};

// ─── Public fetch functions (same signature as before) ───────────────────────
export const getProducts = async (options?: {
  page?: number;
  per_page?: number;
  category?: string;   // now slug instead of numeric id
  search?: string;
  status?: string;
  stock_status?: string;
}): Promise<WooProduct[]> => {
  const products = await apiFetch<ApiProduct[]>("/products", {
    searchParams: {
      page: options?.page ?? 1,
      limit: options?.per_page ?? 20,
      category: options?.category,
      search: options?.search,
    },
    next: { revalidate: CACHE_CONFIG.PRODUCTS },
  });

  return products
    .filter((p) => p.product_type !== 'variation')
    .map(apiProductToWoo);
};

export const getProductBySlug = async (
  slug: string,
): Promise<WooProduct | null> => {
  try {
    const product = await apiFetch<ApiProduct>(`/products/${slug}`, {
      next: { revalidate: CACHE_CONFIG.PRODUCT_DETAIL },
    });
    return apiProductToWoo(product);
  } catch {
    return null;
  }
};

export const getCategories = async (options?: {
  parent?: number;
  hide_empty?: boolean;
}): Promise<WooCategory[]> => {
  const categories = await apiFetch<ApiCategory[]>("/categories", {
    next: { revalidate: CACHE_CONFIG.CATEGORIES },
  });

  return categories
    .filter((c) => !options?.hide_empty || c.count > 0)
    .map(apiCategoryToWoo);
};