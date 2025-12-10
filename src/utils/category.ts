import type { WooCategory } from "@/lib/wooClient";

export const getTopLevelCategories = (cats: WooCategory[]) =>
  cats
    .filter((c) => Number(c.parent) === 0)
    .sort((a, b) => Number(a.id) - Number(b.id));