import type { WooCategory } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
import type { CategorySliderItem } from "@/components/Category/types";

export const wooCategoriesToSliderItems = (
  categories: WooCategory[],
  locale: Locale,
): CategorySliderItem[] => {
  return categories
    .filter((c) => (c.count ?? 0) > 0) // optional: hide empty
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      locale,
      href: `/${locale}/category/${c.slug}`,
      imageSrc: c.image?.src ?? "",
      count: c.count ?? 0,
    }));
};
