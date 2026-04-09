import type { WooCategory } from "@/lib/wooClient/types";

export const getTopLevelCategories = (cats: WooCategory[]) =>
  cats
    .filter((c) => c.parent === `0` && !c.slug.includes("uncategor"))
    .sort((a, b) => Number(a.id) - Number(b.id));