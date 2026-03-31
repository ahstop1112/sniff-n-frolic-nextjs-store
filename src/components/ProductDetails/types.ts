export interface ProductDetailsProps {
  title: string;
  shortDesc: string;
  price: number;
  onSale: boolean;
  variantOptions: VariantOptionGroup[];
}

export interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}
