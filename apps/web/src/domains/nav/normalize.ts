import type { NavNode, RawNavNode } from "./types";

const buildKey = (parentKey: string, label: string, href?: string) => {
  const base = href && href !== "#" ? href : label;
  return `${parentKey}::${base}`;
};

export const normalizeNavTree = (
  raw: RawNavNode[],
  rootKey = "root",
): NavNode[] => {
  const walk = (node: RawNavNode, parentKey: string): NavNode => {
    const key = buildKey(parentKey, node.label, node.href);

    return {
      key,
      label: node.label,
      href: node.href,
      children: (node.children ?? []).map((c) => walk(c, key)),
    };
  };

  return raw.map((n) => walk(n, rootKey));
};
