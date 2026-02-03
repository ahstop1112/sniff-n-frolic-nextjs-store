import { Locale } from "@/i18n/config";

export type NavNode = {
  key: string;
  label: string;
  href?: string;
  children?: NavNode[];
};

export type NavOpenState = {
  openL2: string | null;
  openL3: string | null;
};

export type NavActiveState = {
  activeL1: string | null;
  activeL2: string | null;
  activeL3: string | null;
};

export type TopNavItem = {
  label: string;
  href?: string;
  children?: NavNode[];
};

export type HeaderNavProps = {
  locale: Locale;
  items: TopNavItem[];
};
