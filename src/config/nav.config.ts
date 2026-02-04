import type { Locale } from "@/i18n/config";
import type { WooCategory } from "@/lib/wooClient";
import type { NavNode } from "@/domains/nav/types";

export const NAV_ITEMS = (
  locale: Locale,
  nodes: NavNode[],
  categories?: WooCategory[],
) => {
  const defaultMega = [
    { label: "petTreats", href: `/${locale}/category/pet-treats` },
    {
      label: "bowlsFeeders",
      href: `/${locale}/category/bowls-feeder`,
      children: [
        {
          label: "slowFeeders",
          href: `/${locale}/category/slow-feeders`,
        },
        { label: "lickMats", href: `/${locale}/category/lick-mats` },
        {
          label: "waterBottles",
          href: `/${locale}/category/water-bottles`,
        },
      ],
    },
    { label: "petToys", href: `/${locale}/category/pet-toys` },
    { label: "petClothing", href: `/${locale}/category/pet-clothing` },
    {
      label: "travelGear",
      href: `/${locale}/category/travel-gear`,
      children: [
        {
          label: "carSeatCovers",
          href: `/${locale}/category/car-seat`,
        },
        { label: "seatBelts", href: `/${locale}/category/seat-belt` },
      ],
    },
    {
      label: "everydayCare",
      href: `/${locale}/category/everyday-care`,
    },
  ];

  const buildMegaFromCategories = (cats: WooCategory[]) => {
    const top = cats.filter((c) => c.parent === 0);
    return top.map((t) => {
      const children = cats
        .filter((c) => c.parent === t.id)
        .map((ch) => ({
          key: ch.slug,
          label: ch.name.replace(/&amp;/g, "&"),
          href: `/${locale}/category/${ch.slug}`,
        }));
      return {
        key: t.slug,
        label: t.name.replace(/&amp;/g, "&"),
        href: `/${locale}/category/${t.slug}`,
        ...(children.length ? { children } : {}),
      };
    });
  };

  return [
    { key: "home", label: "home", href: `/${locale}` },
    {
      key: "collection",
      label: "collection",
      children:
        categories && categories.length > 0
          ? buildMegaFromCategories(categories)
          : defaultMega,
    },
    { key: "ourStory", label: "ourStory", href: `/${locale}/about` },
    { key: "howToBuy", label: "howToBuy", href: `/${locale}/how-to-buy` },
    { key: "faq", label: "faq", href: `/${locale}/faq` },
  ];
};
