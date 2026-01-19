import { type Locale } from "@/i18n/config";

export interface ProductDetailsProps {
  title: string;
  desc: string;
  shortDesc: string;
  price: number;
  onSale: boolean;
  variantOptions: VariantOptionGroup[],
  locale: Locale
}

export interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}