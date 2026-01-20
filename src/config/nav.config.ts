import type { Locale } from "@/i18n/config";

export const NAV_ITEMS = (locale: Locale) => [
  { label: "Home", href: `/${locale}` },
  {
    label: "Collection",
    mega: [
      { label: "Pet Treats", href: `/${locale}/c/pet-treats` },
      {
        label: "Bowls Feeders",
        href: `/${locale}/c/bowls-feeders`,
        children: [
          { label: "Slow Feeders", href: `/${locale}/category/slow-feeders` },
          { label: "Lick Mats", href: `/${locale}/category/lick-mats` },
          { label: "Water Bottles", href: `/${locale}/category/water-bottles` },
        ],
      },
      { label: "Pet Toys", href: `/${locale}/c/pet-toys` },
      { label: "Pet Clothing", href: `/${locale}/c/pet-clothing` },
      {
        label: "Travel Gear",
        href: `/${locale}/c/travel-gear`,
        children: [
          { label: "Car Seat Covers", href: `/${locale}/c/car-seat` },
          { label: "Seat Belts", href: `/${locale}/c/seat-belt` },
        ],
      },
      { label: "Everyday Care", href: `/${locale}/c/everyday-care` },
    ],
  },
  { label: "Our Story", href: `/${locale}/about` },
  { label: "How To Buy", href: `/${locale}/how-to-buy` },
  { label: "FAQ", href: `/${locale}/faq` },
];