import type { Locale } from "@/i18n/config";

export interface CheckoutPageClientProps {
  locale: Locale;
}

export type ShippingPayload = {
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
