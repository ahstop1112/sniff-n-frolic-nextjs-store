import type { CateogryProductSliderItem } from "@/components/CategoryProduct/types";
import type { Locale } from "@/i18n/config";
import type { WooProduct } from "@/lib/wooClient";

export const toCategoryProductSliderItems = (
  products: WooProduct[],
  locale: Locale,
): CateogryProductSliderItem[] => {
  return products.map((p) => ({
    ...p,
    locale,
    image: p.images?.[0]?.src ?? null,
  }));
};
