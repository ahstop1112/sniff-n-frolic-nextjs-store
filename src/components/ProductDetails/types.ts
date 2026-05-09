export interface ProductDetailsProps {
  title: string;
  shortDesc: string;
  price: number;
  onSale: boolean;
  variantOptions: VariantOptionGroup[];
  selectedAttributes?: Record<string, string>;
  onSelectVariant?: (attrSlug: string, value: string) => void;
}

export interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}
