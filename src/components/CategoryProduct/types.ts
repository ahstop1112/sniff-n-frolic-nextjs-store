import type { WooImage, WooProductCategoryLite } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
import type { SectionTone } from "../Section/types";

export type CateogryProductSliderItem = {
  regular_price: string | undefined;
  on_sale: boolean | undefined;
  id: string | ``;
  slug: string;
  locale: Locale;
  image: WooImage[];
  name: string;
  price: string;
  categories: WooProductCategoryLite[];
};

export type CateogryProductSliderProps = {
  title?: string;
  desc?: string;
  items: CateogryProductSliderItem[];
  tone?: SectionTone;
  locale: Locale;
  topWave?: SectionTone;
  bottomWave?: SectionTone;
};
