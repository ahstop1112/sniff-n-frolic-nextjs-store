import { NavActiveState, NavNode, NavOpenState } from "./types";
import { normalizePath } from "./normalizePath";

export const stripLocalePrefix = (pathname: string, locales: string[]) => {
  const p = normalizePath(pathname);
  if (p === "/") return "/";

  const lower = p.toLowerCase();

  for (const loc of locales) {
    const locLower = `/${loc.toLowerCase()}`;
    if (lower === locLower) return "/";
    if (lower.startsWith(`${locLower}/`)) {
      // slice using original length (keep original case slicing safe)
      return p.slice(locLower.length) || "/";
    }
  }
  return p;
};

export const isPathMatch = (
  pathname: string,
  href?: string,
  locales: string[] = [],
  mode: "exact" | "prefix" = "exact",
) => {
  if (!href) return false;

  const a0 = stripLocalePrefix(pathname, locales);
  const b0 = stripLocalePrefix(href, locales);

  const a = normalizePath(a0);
  const b = normalizePath(b0);

  if (mode === "exact") return a === b;

  // prefix match: "/a/b/c" should match "/a/b"
  if (b === "/") return a === "/";
  return a === b || a.startsWith(`${b}/`);
};

export const findNavStateByPath = (
  items: NavNode[],
  pathname: string,
  opts?: { locales?: string[] },
): { open: NavOpenState; active: NavActiveState } => {
  const locales = opts?.locales ?? [];

  for (const l1 of items) {
    // L1 exact is usually enough
    if (isPathMatch(pathname, l1.href, locales, "exact")) {
      return {
        open: { openL2: null, openL3: null },
        active: { activeL1: l1.key, activeL2: null, activeL3: null },
      };
    }

    for (const l2 of l1.children ?? []) {
      // L2: prefix match helps
      if (isPathMatch(pathname, l2.href, locales, "prefix")) {
        return {
          open: { openL2: l2.key, openL3: null },
          active: { activeL1: l1.key, activeL2: l2.key, activeL3: null },
        };
      }

      for (const l3 of l2.children ?? []) {
        // L3: exact first, then prefix (optional)
        if (
          isPathMatch(pathname, l3.href, locales, "exact") ||
          isPathMatch(pathname, l3.href, locales, "prefix")
        ) {
          return {
            open: { openL2: l2.key, openL3: l3.key },
            active: { activeL1: l1.key, activeL2: l2.key, activeL3: l3.key },
          };
        }
      }
    }
  }

  return {
    open: { openL2: null, openL3: null },
    active: { activeL1: null, activeL2: null, activeL3: null },
  };
};
