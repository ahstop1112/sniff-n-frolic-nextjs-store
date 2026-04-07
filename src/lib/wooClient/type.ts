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
  parent: string | null;
  parentSlug: string | null;
  count: number;
  image?: WooCategoryImage | null;
}

// ─── Internal API types (from NestJS) ────────────────────────────────────────

export interface ApiProduct {
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

export interface ApiCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  parent_slug: string | null;
  image_url: string | null;
  count: number;
}