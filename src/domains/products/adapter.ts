import type { CateogryProductSliderItem } from "@/components/CategoryProduct/types";
import type { Locale } from "@/i18n/config";
import type { WooProduct } from "@/lib/storeApi";

export const toCategoryProductSliderItems = (
  products: WooProduct[],
  locale: Locale,
): CateogryProductSliderItem[] => {
  return products.map((p) => ({
    id: p.id,
    slug: p.slug,
    locale,
    name: p.name,
    price: p.price,
    regular_price: p.regular_price,
    on_sale: p.on_sale,
    categories: p.categories ?? [],
    image: p.images ?? [],
  }));
};
