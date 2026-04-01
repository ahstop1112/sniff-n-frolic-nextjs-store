import "server-only";
import { apiFetch } from "@/lib/apiClient";
import { wooFetchServer } from "@/lib/woo/server";
import { CACHE_CONFIG } from "@/lib/cache";

// ─── Types (unchanged so components need no changes) ─────────────────────────

export interface YoastOgImage {
  url: string;
  width?: number;
  height?: number;
  type?: string;
}

export interface YoastHeadJson {
  title?: string;
  description?: string;
  canonical?: string;
  og_title?: string;
  og_description?: string;
  og_url?: string;
  og_site_name?: string;
  og_type?: string;
  og_locale?: string;
  og_image?: YoastOgImage[];
  twitter_card?: string;
}

export interface WooImage {
  id: number;
  src: string;
  alt: string;
  sizes?: string;
  thumbnail?: string;
}

export interface WooProductCategory {
  id: number;
  name: string;
  slug: string;
}

export interface WooProduct {
  categories?: WooProductCategory[];
  id: number;
  name: string;
  slug: string;
  permalink: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  images: WooImage[];
  short_description: string;
  description: string;
  sku: string;
  type: string;
  attributes?: WooProductAttribute[];
  variations?: number[];
  yoast_head?: string;
  yoast_head_json?: YoastHeadJson;
}

export interface WooProductAttribute {
  id: number;
  name: string;
  slug: string;
  position: number;
  visible: boolean;
  variation: boolean;
  options: string[];
}

export interface WooCategoryImage {
  id: number;
  src: string;
  alt?: string;
  name?: string;
}

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: string;
  count: number;
  image?: WooCategoryImage | null;
}

// ─── Internal API types (from NestJS) ────────────────────────────────────────

interface ApiProduct {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  sku: string | null;
  product_type: string;
  regular_price: number;   // cents
  sale_price: number | null;
  effective_price: number;
  currency: string;
  featured_image_url: string | null;
  status: string;
  stock_status: string | null;
  featured: boolean;
  category_id: string | null;
  category_name: string | null;
  category_slug: string | null;
  images: { url: string; alt_text: string | null; sort_order: number; is_featured: boolean }[];
}

interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  parent_slug: string | null;
  image_url: string | null;
  count: number;
}

// ─── Adapters: API → WooProduct/WooCategory shape ────────────────────────────

const centsToString = (cents: number): string => (cents / 100).toFixed(2);

const apiProductToWoo = (p: ApiProduct): WooProduct => ({
  id: 0,                         // uuid — set to 0, components should use slug
  name: p.name,
  slug: p.slug,
  permalink: "",
  price: centsToString(p.effective_price),
  regular_price: centsToString(p.regular_price),
  sale_price: p.sale_price ? centsToString(p.sale_price) : "",
  on_sale: p.sale_price !== null,
  short_description: p.short_description ?? "",
  description: p.description ?? "",
  sku: p.sku ?? "",
  type: p.product_type,
  images: (p.images ?? []).map((img, i) => ({
    id: i,
    src: img.url,
    alt: img.alt_text ?? "",
  })),
  categories: p.category_slug
    ? [{ id: 0, name: p.category_name ?? "", slug: p.category_slug }]
    : [],
});

const apiCategoryToWoo = (c: ApiCategory, index: number): WooCategory & { parentSlug: string | null } => ({
  id: index + 1,
  name: c.name,
  slug: c.slug,
  parent: c.parent_id ?? "0",
  count: c.count,
  image: c.image_url && c.image_url !== 'false'
    ? { id: 0, src: c.image_url, alt: c.name }
    : null,
  parentSlug: c.parent_slug ?? null,
});

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

  return products.map(apiProductToWoo);
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

// ─── WooCommerce-only calls (kept for features not yet migrated) ──────────────

export const wooFetch = wooFetchServer;

export const getProductVariations = async (productId: number) =>
  wooFetchServer(`products/${productId}/variations`, {
    searchParams: { per_page: 100 },
    next: { revalidate: CACHE_CONFIG.PRODUCT_DETAIL },
  });

export const getCategoryById = async (id: string) => {
  const category = await wooFetchServer(`categories/${id}`, {
    next: { revalidate: CACHE_CONFIG.CATEGORIES },
  });
  return Array.isArray(category) ? category : null;
};