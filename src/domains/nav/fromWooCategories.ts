import { Locale } from "@/i18n/config";
import type { RawNavNode } from "./types";
import type { WooCategory } from "@/lib/storeApi";

type CategoryWithParentSlug = WooCategory & { parentSlug?: string | null };

export const topLevelFromWooCategories = (
  categories: WooCategory[],
  locale: Locale,
) => {
  const cats = categories as CategoryWithParentSlug[];

  // Group by parentSlug (null/undefined = top-level)
  const byParentSlug = new Map<string | null, CategoryWithParentSlug[]>();

  for (const c of cats) {
    const key = c.parentSlug ?? null;
    const arr = byParentSlug.get(key) ?? [];
    arr.push(c);
    byParentSlug.set(key, arr);
  }

  const build = (parentSlug: string | null, depth = 0): RawNavNode[] => {
    // Guard against infinite recursion
    if (depth > 5) return [];

    const kids = byParentSlug.get(parentSlug) ?? [];
    kids.sort((a, b) => a.name.localeCompare(b.name));

    return kids.map((c) => ({
      label: c.name,
      href: `/${locale}/category/${c.slug}`,
      children: build(c.slug, depth + 1),
    }));
  };

  // Top-level = parentSlug is null
  return build(null);
};