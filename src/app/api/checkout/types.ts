import { CartItem } from "@/lib/cartTypes";

export type CheckoutPayload = {
  locale: "en" | "zh";
  email: string;
  shipping: {
    first_name: string;
    last_name: string;
    address_1: string;
    address_2?: string;
    city: string;
    state: string;
    postcode: string;
    country: string;
    phone?: string;
  };
  cartItems: CartItem[];
  shipping_method: "flat_rate";
};