import type { WooCategoryImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
import type { SectionTone } from "../Section/types";
import { NavNode } from "@/domains/nav/types";

export type CategorySliderItem = {
  id: string | number;
  slug: string;
  image?: WooCategoryImage | null;
  name: string;
  parent?: number;
  count: number;
  href: string;
};

export type CategorySliderSectionProps = {
  title?: string;
  items: CategorySliderItem[];
  circleSize?: { xs: number; md: number };
  tone?: SectionTone;
  topWave?: SectionTone;
  bottomWave?: SectionTone;
  locale: Locale;
};

export type CategorySliderProps = {
  items: CategorySliderItem[];
  locale: Locale;
};

export interface CategoryPageClientProps {
  locale: Locale;
  slug?: string | ``;
  dict: any;
  finalProducts: any[];
}
