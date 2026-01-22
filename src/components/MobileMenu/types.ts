import { Locale } from "@/i18n/config";

export type NavItem = { label: string; href: string };

export type CategoryGroup = {
  label: string;
  href?: string;
  items?: NavItem[];
};

export type MobileMenuProps = {
    locale: Locale;
    open: Boolean;
    onClose: () => void;
};