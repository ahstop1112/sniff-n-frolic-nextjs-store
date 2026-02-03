import { NavNode } from "./types";

export type LegacyNavNode = {
  key: string;
  label: string;
  href?: string;
  children?: LegacyNavNode[];
};

export type LegacyTopNavItem = {
  key: string;
  label: string;
  href?: string;
  children?: LegacyNavNode[];
};

export const toNavKey = (label: string, href?: string) => {
  return href ?? label;
};

export const mapLegacyNode = (n: LegacyNavNode): NavNode => {
  return {
    key: n.key ?? toNavKey(n.label, n.href),
    label: n.label,
    href: n.href,
    children: (n.children ?? []).map(mapLegacyNode),
  };
};

export const adaptTopNavItems = (items: LegacyTopNavItem[]): NavNode[] => {
  return items.map((x) => {
    const children = (x.children ?? []).map(mapLegacyNode);

    return {
      key: toNavKey(x.label, x.href),
      label: x.label,
      href: x.href,
      children,
    };
  });
};
