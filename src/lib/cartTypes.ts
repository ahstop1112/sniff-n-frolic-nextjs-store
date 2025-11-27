export interface CartItem{
    id: number;
    slug: string;
    name: string;
    price: number;
    imageUrl?: string;
    quantity: number;
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