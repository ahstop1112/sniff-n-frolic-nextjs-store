import { normalizePath } from "./normalizePath";
import { stripLocalePrefix } from "./match";
import { NavNode } from "./types";

export const debugNavMatch = (
  items: NavNode[],
  pathname: string,
  locales: string[] = [],
) => {
  const p = normalizePath(stripLocalePrefix(pathname, locales));
  console.log("pathname(raw):", pathname);
  console.log("pathname(norm):", p);

  for (const l1 of items) {
    const l1p = l1.href
      ? normalizePath(stripLocalePrefix(l1.href, locales))
      : "";
    if (l1.href) console.log("L1", l1.label, "->", l1p, "match", p === l1p);

    for (const l2 of l1.children ?? []) {
      const l2p = l2.href
        ? normalizePath(stripLocalePrefix(l2.href, locales))
        : "";
      if (l2.href)
        console.log(
          "  L2",
          l2.label,
          "->",
          l2p,
          "exact",
          p === l2p,
          "prefix",
          p.startsWith(`${l2p}/`) || p === l2p,
        );

      for (const l3 of l2.children ?? []) {
        const l3p = l3.href
          ? normalizePath(stripLocalePrefix(l3.href, locales))
          : "";
        if (l3.href)
          console.log("    L3", l3.label, "->", l3p, "exact", p === l3p);
      }
    }
  }
};
