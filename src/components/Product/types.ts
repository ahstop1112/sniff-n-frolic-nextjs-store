export interface ProductGridProps {
    locale: Locale;
    slug: string;
    image?: { thumbnail: string; alt?: string };
    name: string;
    categoryName?: string; // "Pet Treats"
    onSale?: boolean;
    price?: string;        // sale or current price (Woo often string)
    regularPrice?: string; // original
    currency?: string;     // "CAD"
  }
  