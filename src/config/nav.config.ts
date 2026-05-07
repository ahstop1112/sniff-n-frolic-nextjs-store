import type { Locale } from "@/i18n/config";

type categoryNav = {
  label: string;
  href: string;
  children?: categoryNav[];
}

export const NAV_ITEMS = (
  locale: Locale,
  categories?: categoryNav[],
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

  const buildMegaFromCategories = (cats: categoryNav[]) => {
    return cats
      .filter((c) => !c.href.includes("uncategor"))
      .map((t) => ({
        key: t.href,
        label: t.label.replace(/&amp;/g, "&"),
        href: t.href,
        ...(t.children && t.children.length ? {
          children: t.children.map((ch) => ({
            key: ch.href,
            label: ch.label.replace(/&amp;/g, "&"),
            href: ch.href,
          }))
        } : {}),
      }));
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
    { key: "ourStory", label: "ourStory", href: `/${locale}/sniff-frolic-story` },
    { key: "howToBuy", label: "howToBuy", href: `/${locale}/how-to-buy` },
    { key: "faq", label: "faq", href: `/${locale}/faq` },
  ];
};
