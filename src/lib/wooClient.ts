import "server-only";
import { wooFetchServer } from "@/lib/woo/server";

const baseUrl = process.env.WOO_API_BASE_URL!.replace(/\/$/, "");

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
  thumbnail: string;
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
  short_description: string; // HTML
  description: string; // HTML
  sku: string;
  type: string;
  attributes?: WooProductAttribute[];
  variations?: number[];
  yoast_head?: string;
  yoast_head_json?: YoastHeadJson;
}

export interface WooProductAttribute {
  id: number;
  name: string; // e.g. "Color"
  slug: string; // e.g. "pa_color"
  position: number;
  visible: boolean;
  variation: boolean; // true = (color / size）
  options: string[]; // e.g. ["Red", "Blue"]
}

export interface WooVariationAttribute {
  id: number;
  name: string; // e.g. "Color"
  option: string; // e.g. "Red"
}

export interface WooProductVariation {
  id: number;
  sku: string;
  price: string;
  regular_price: string;
  sale_price: string;
  on_sale: boolean;
  stock_status: "instock" | "outofstock" | "onbackorder";
  attributes: WooVariationAttribute[];
  image?: WooImage;
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
  parent: number;
  image?: WooCategoryImage | null;
}

interface WooFetchOptions {
  searchParams?: Record<string, any>;
  method?: "GET" | "POST" | "PUT" | "DELETE";
  bodyJson?: any;
}

export const wooFetch = wooFetchServer;

export const getProducts = async (options?: {
  page?: number;
  per_page?: number;
  category?: number;
  search?: string;
  orderby?: "date" | "title" | "price";
  order?: "asc" | "desc";
  min_price?: string;
  max_price?: string;
  on_sale?: boolean;
  status?: "publish" | "draft" | "pending" | "private";
  stock_status?: "instock" | "outofstock" | "onbackorder";
  attribute?: string; // e.g. "pa_color"
  attribute_term?: number;
}): Promise<WooProduct[]> => {
  return wooFetch<WooProduct[]>("/products", {
    per_page: options?.per_page ?? 20,
    page: options?.page ?? 1,
    category: options?.category,
    search: options?.search,
    orderby: options?.orderby,
    order: options?.order,
    min_price: options?.min_price,
    max_price: options?.max_price,
    on_sale: options?.on_sale,
    status: options?.status ?? "publish",
    stock_status: options?.stock_status,
    attribute: options?.attribute,
    attribute_term: options?.attribute_term,
  });
};

export const getProductBySlug = async (
  slug: string
): Promise<WooProduct | null> => {
  const products = await wooFetch<WooProduct[]>("/products", {
    slug,
    per_page: 1,
    status: "publish",
  });

  if (!Array.isArray(products) || products.length === 0) return null;
  return products[0] ?? null;
};

export const getProductVariations = async (
  productId: number
): Promise<WooProductVariation[]> =>
  wooFetch<WooProductVariation[]>(`products/${productId}/variations`, {
    per_page: 100,
  });

export const getCategories = async (options?: {
  parent?: number;
  hide_empty?: boolean;
}): Promise<WooCategory[]> => {
  return wooFetch<WooCategory[]>("/products/categories", {
    per_page: 100,
    parent: options?.parent,
    hide_empty: options?.hide_empty ?? true,
  });
};

export const getCategoryById = async (id: string) => {
  const category = await wooFetch(`products/categories/${id}`, {
    cache: "no-store",
  });

  return Array.isArray(category) ? category : null;
};
