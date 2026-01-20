export type NavItem = { label: string; href: string };

export type CategoryGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

export type MobileMenuProps = {
  locale: "en" | "zh";
  /** top-level nav links */
  links?: NavItem[];
  /** category tree for menu */
  categories?: CategoryGroup[];
};