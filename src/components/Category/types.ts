
import type { WooCategoryImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";

export type CategorySliderItem = {
    id: string | number;
    slug: string;
    locale: Locale;
    image?: WooCategoryImage | null;
    name: string;
  };
  
export type CategorySliderProps = {
    title?: string;
    items: CategorySliderItem[];
    circleSize?: { xs: number; md: number };
    lang: string;
  };