import type { WooImage } from "@/lib/storeApi";

export interface ProductGridProps {
  slug: string;
  image: WooImage | null;
  name: string;
  categoryName?: string; // "Pet Treats"
  onSale?: boolean;
  price?: string; // sale or current price (Woo often string)
  regularPrice?: string; // original
  currency?: string; // "CAD"
}
