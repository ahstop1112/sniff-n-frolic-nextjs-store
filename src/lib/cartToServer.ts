import type { CartItem } from "@/lib/cartTypes";

export type ServerCartItem = {
  slug: string;
  quantity: number;
  variationId?: number;
};

export const parseVariationIdFromVariantKey = (variantKey?: string) => {
  if (!variantKey) return undefined;

  // examples supported:
  // "vid:123"
  // "variation:123"
  // "variationId=123"
  // "123" (pure number)
  const raw = String(variantKey).trim();

  const m =
    raw.match(/vid[:=]\s*(\d+)/i) ||
    raw.match(/variation[:=]\s*(\d+)/i) ||
    raw.match(/variationId[:=]\s*(\d+)/i) ||
    raw.match(/^(\d+)$/);

  if (!m) return undefined;

  const n = Number(m[1]);
  return Number.isFinite(n) && n > 0 ? n : undefined;
};

export const cartItemsToServerItems = (items: CartItem[]): ServerCartItem[] => {
  return items.map((it) => ({
    slug: it.slug,
    quantity: Math.max(1, Math.min(99, Number(it.quantity) || 1)),
    variationId: parseVariationIdFromVariantKey(it.variantKey),
  }));
};
