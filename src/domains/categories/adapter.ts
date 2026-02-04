import type { WooCategory } from "@/lib/wooClient";
import type { NavNode } from "@/domains/nav/types";
import type { Locale } from "@/i18n/config";
import type { CategorySliderItem } from "@/components/Category/types";

type CategoryLikeNode = {
  id?: number;
  slug?: string;
  name?: string;
  label: string;
  href?: string;
  count?: number;
  imageSrc?: string;
};

const normalizeCategoryNode = (n: NavNode): CategoryLikeNode => {
  return {
    id: (n as any).id,
    slug: (n as any).slug,
    name: (n as any).name,
    label: n.label,
    href: n.href,
    count: (n as any).count,
    imageSrc: (n as any).imageSrc,
  };
};

export const wooCategoriesToSliderItems = (
  categories: WooCategory[],
  locale: Locale,
): CategorySliderItem[] => {
  return categories
    .filter((c) => (c.count ?? 0) > 0) // optional: hide empty
    .map((c) => ({
      id: c.id,
      slug: c.slug,
      name: c.name,
      locale,
      href: `/${locale}/category/${c.slug}`,
      imageSrc: c.image?.src ?? "",
      count: c.count ?? 0,
    }));
};

type BuildHrefArgs = { locale: Locale; slug: string };

const buildCategoryHref = ({ locale, slug }: BuildHrefArgs) =>
  `/${locale}/category/${slug}`;

const slugFromHref = (href: string) => {
  // e.g. /en/category/pet-treats -> pet-treats
  const parts = href.split("/").filter(Boolean);
  return parts[parts.length - 1] ?? "";
};

export const toCategorySliderItems = ({
  nodes,
  locale,
}: {
  nodes: NavNode[];
  locale: Locale;
}): CategorySliderItem[] => {
  return nodes.map((node) => {
    const n = normalizeCategoryNode(node);
    const slug = n.slug ?? slugFromHref(n.href ?? "");
    const href = n.href ?? buildCategoryHref({ locale, slug });

    return {
      id: n.id ?? 0,
      locale,
      name: n.name ?? n.label,
      slug,
      label: n.label,
      href,
      count: n.count ?? 0,
      imageSrc: n.imageSrc ?? "",
    };
  });
};
