import { Locale } from "@/i18n/config";
import type { RawNavNode } from "./types";
import type { WooCategory } from "@/lib/wooClient";

export const topLevelFromWooCategories = (
  categories: WooCategory[],
  locale: Locale,
) => {
  // group by parent
  const byParent = new Map<number, WooCategory[]>();
  for (const c of categories) {
    const arr = byParent.get(c.parent) ?? [];
    arr.push(c);
    byParent.set(c.parent, arr);
  }

  const build = (parentId: number): RawNavNode[] => {
    const kids = byParent.get(parentId) ?? [];

    kids.sort((a, b) => a.name.localeCompare(b.name));

    return kids.map((c) => ({
      label: c.name,
      href: `/${locale}/category/${c.slug}`,
      children: build(c.id),
    }));
  };

  // top-level = parent 0
  return build(0);
};
