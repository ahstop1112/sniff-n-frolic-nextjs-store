const baseUrlEnv = process.env.WC_API_BASE_URL!;
const consumerKey = process.env.WC_CONSUMER_KEY!;
const consumerSecret = process.env.WC_CONSUMER_SECRET!;

if (!baseUrlEnv || !consumerKey || !consumerSecret) {
  throw new Error("WooCommerce API env vars are missing");
}

const baseUrl = baseUrlEnv.replace(/\/$/, "");

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

export interface WooProduct {
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
    name: string;       // e.g. "Color"
    slug: string;       // e.g. "pa_color"
    position: number;
    visible: boolean;
    variation: boolean; // true = (color / size）
    options: string[];  // e.g. ["Red", "Blue"]
}

export interface WooVariationAttribute {
    id: number;
    name: string;   // e.g. "Color"
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

export interface WooCategory {
  id: number;
  name: string;
  slug: string;
  parent: number;
  image?: {
    id: number;
    src: string;
    alt: string;
  } | null;
}

const wooFetch = async <T>(
  path: string,
  params?: Record<string, string | number | boolean | undefined>
): Promise<T> => {
    const cleanPath = path.replace(/^\//, "");
    const url = new URL(`${baseUrl}/${cleanPath}`);

  url.searchParams.set("consumer_key", consumerKey);
  url.searchParams.set("consumer_secret", consumerSecret);

  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (value === undefined) return;
      url.searchParams.set(key, String(value));
    });
  }

  const res = await fetch(url.toString(), {
    cache: "no-store", 
  });

  if (!res.ok) {
    console.error("Woo API error:", res.status, res.statusText, url.toString());
    throw new Error(`Woo API error: ${res.status}`);
  }

  return res.json();
};

export const getProducts = async (options?: {
  page?: number;
  per_page?: number;
  category?: number;
  search?: string;
  orderby?: "date" | "title" | "price";
  status?: "publish" | "draft" | "pending" | "private";
  stock_status?: "instock" | "outofstock" | "onbackorder";
}): Promise<WooProduct[]> => {
  return wooFetch<WooProduct[]>("/products", {
    per_page: options?.per_page ?? 20,
    page: options?.page ?? 1,
    category: options?.category,
    search: options?.search,
    orderby: options?.orderby,
    status: options?.status ?? "publish",
    stock_status: options?.stock_status,
  });
};

export const getProductBySlug = async (slug: string): Promise<WooProduct | null> => {
    const products = await wooFetch<WooProduct[]>("/products", {
        slug,
        per_page: 1,
    });

    if (!products.length) return null;
    return products[0];
};

export const getProductVariations = async (productId: number): Promise<WooProductVariation[]> =>
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