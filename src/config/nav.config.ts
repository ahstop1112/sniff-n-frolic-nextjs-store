import type { Locale } from "@/i18n/config";

export const NAV_ITEMS = (locale: Locale) => [
  { label: "Home", href: `/${locale}` },
  {
    label: "Collection",
    mega: [
      { label: "Pet Treats", href: `/${locale}/category/pet-treats` },
      {
        label: "Bowls Feeders",
        href: `/${locale}/category/bowls-feeder`,
        children: [
          { label: "Slow Feeders", href: `/${locale}/category/slow-feeders` },
          { label: "Lick Mats", href: `/${locale}/category/lick-mats` },
          { label: "Water Bottles", href: `/${locale}/category/water-bottles` },
        ],
      },
      { label: "Pet Toys", href: `/${locale}/category/pet-toys` },
      { label: "Pet Clothing", href: `/${locale}/category/pet-clothing` },
      {
        label: "Travel Gear",
        href: `/${locale}/category/travel-gear`,
        children: [
          { label: "Car Seat Covers", href: `/${locale}/category/car-seat` },
          { label: "Seat Belts", href: `/${locale}/category/seat-belt` },
        ],
      },
      { label: "Everyday Care", href: `/${locale}/category/everyday-care` },
    ],
  },
  { label: "Our Story", href: `/${locale}/about` },
  { label: "How To Buy", href: `/${locale}/how-to-buy` },
  { label: "FAQ", href: `/${locale}/faq` },
];