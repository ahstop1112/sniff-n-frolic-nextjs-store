import type { WooCategoryImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
import type { SectionTone } from "../Section/types";
import { NavNode } from "@/domains/nav/types";

export type CategorySliderItem = {
  id: string | number;
  slug: string;
  image?: WooCategoryImage | null;
  imageSrc?: string;
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
};

export type CategorySliderProps = {
  items: CategorySliderItem[];
};

export interface CategoryPageClientProps {
  slug?: string | ``;
  dict: any;
  finalProducts: any[];
}
