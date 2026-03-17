import { wooFetch } from "@/lib/wooClient";

type WooCategoryLite = { id: number; slug: string };

export const getCategoryIdBySlug = async (slug: string) => {
  const s = slug.trim();
  if (!s) return undefined;

  const res = await wooFetch("products/categories", {
    slug: s,
    per_page: 1,
  });

  if (!Array.isArray(res)) return undefined;

  const first = res[0] as Partial<WooCategoryLite> | undefined;
  const id = first?.id;

  return typeof id === "number" ? id : undefined;
};
