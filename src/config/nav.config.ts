import type { Locale } from "@/i18n/config";
import type { WooCategory } from "@/lib/wooClient";

export const NAV_ITEMS = (locale: Locale, categories?: WooCategory[]) => {
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
          label: ch.name.replace(/&amp;/g, "&"),
          href: `/${locale}/category/${ch.slug}`,
        }));
      return {
        label: t.name.replace(/&amp;/g, "&"),
        href: `/${locale}/category/${t.slug}`,
        ...(children.length ? { children } : {}),
      };
    });
  };

  return [
    { label: "home", href: `/${locale}` },
    {
      label: "collection",
      mega:
        categories && categories.length > 0
          ? buildMegaFromCategories(categories)
          : defaultMega,
    },
    { label: "ourStory", href: `/${locale}/about` },
    { label: "howToBuy", href: `/${locale}/how-to-buy` },
    { label: "faq", href: `/${locale}/faq` },
  ];
};
