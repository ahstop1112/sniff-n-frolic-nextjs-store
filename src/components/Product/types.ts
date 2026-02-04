import type { Locale } from "@/i18n/config";
import type { WooImage } from "@/lib/wooClient";

export interface ProductGridProps {
  locale: Locale;
  slug: string;
  image: WooImage | null;
  name: string;
  categoryName?: string; // "Pet Treats"
  onSale?: boolean;
  price?: string; // sale or current price (Woo often string)
  regularPrice?: string; // original
  currency?: string; // "CAD"
}
