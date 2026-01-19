
import type { AddToCartInput } from "@/lib/cartTypes";
import type { Locale } from "@/i18n/config";

export interface ProductPurchasePanelProps {
    locale: Locale;
    product: AddToCartInput;
  }