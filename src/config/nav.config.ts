import type { Locale } from "@/i18n/config";

type CategoryNavInput = {
  key?: string;
  label: string;
  href?: string;
  children?: CategoryNavInput[];
};

export const NAV_ITEMS = (
  locale: Locale,
  categories?: CategoryNavInput[],
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
        {
          label: "lickMats",
          href: `/${locale}/category/lick-mats`,
        },
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
        {
          label: "seatBelts",
          href: `/${locale}/category/seat-belt`,
        },
      ],
    },
    {
      label: "everydayCare",
      href: `/${locale}/category/everyday-care`,
    },
  ];

  const buildMegaFromCategories = (
    cats: CategoryNavInput[],
  ): CategoryNavInput[] => {
    return cats
      .filter(
        (c) =>
          !c.href?.toLowerCase().includes("uncategor") &&
          (!!c.href || !!c.children?.length),
      )
      .map((c, index) => ({
        key: c.key ?? c.href ?? `category-group-${index}`,
        label: c.label.replace(/&amp;/g, "&"),
        ...(c.href ? { href: c.href } : {}),
        ...(c.children?.length
          ? { children: buildMegaFromCategories(c.children) }
          : {}),
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
    {
      key: "ourStory",
      label: "ourStory",
      href: `/${locale}/sniff-frolic-story`,
    },
    {
      key: "howToBuy",
      label: "howToBuy",
      href: `/${locale}/how-to-buy`,
    },
    {
      key: "faq",
      label: "faq",
      href: `/${locale}/faq`,
    },
  ];
};