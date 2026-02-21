import type { WooImage, WooProductCategoryLite } from "@/lib/wooClient";
import type { SectionTone } from "../Section/types";

export type CateogryProductSliderItem = {
  regular_price: string | undefined;
  on_sale: boolean | undefined;
  id: number;
  slug: string;
  image?: WooImage[];
  imageSrc?: string;
  name: string;
  price: string;
  categories: WooProductCategoryLite[];
};

export type CateogryProductSliderProps = {
  title?: string;
  desc?: string;
  items: CateogryProductSliderItem[];
  tone?: SectionTone;
  topWave?: SectionTone;
  bottomWave?: SectionTone;
};
