export interface CartItem {
  id: number; // Woo product ID
  slug: string;
  name: string;
  price: number;
  imageUrl?: string;
  quantity: number;

  // optional：將來可以加 variant key（color/size）等
  variantKey?: string;
}

export interface CartState {
  items: CartItem[];
}

export interface AddToCartInput {
  id: number;
  slug: string;
  name: string;
  price: number;
  imageUrl?: string;
  variantKey?: string;
}
