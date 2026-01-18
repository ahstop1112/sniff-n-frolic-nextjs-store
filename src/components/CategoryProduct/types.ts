
import type { WooImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";

export type CateogryProductSliderItem = {
    slug: string;
    locale: Locale;
    image: WooImage;
    name: string;
    price: string;
};

type SectionStyle = "teal" | "white" | "yellow" | "orange";
  
export type CateogryProductSliderProps = {
    title?: string;
    desc?: string;
    items: CateogryProductSliderItem[];
    tone?: SectionStyle
    locale: Locale;
    topWave?: SectionStyle;
    bottomWave?: SectionStyle;
  };