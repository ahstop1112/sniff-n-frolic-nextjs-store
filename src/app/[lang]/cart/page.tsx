import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import CartPageClient from "@/components/CartPageClient";

interface CartPageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (props: CartPageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {
      title: "Cart - Sniff & Frolic",
      description: "Review items in your cart.",
    };
  }

  const locale: Locale = lang;

  return {
    title:
      locale === "zh"
        ? "購物車 – Sniff & Frolic"
        : "Shopping Cart – Sniff & Frolic",
    description:
      locale === "zh"
        ? "檢視 Sniff & Frolic 購物車內的所有狗狗零食、玩具和裝備。"
        : "Review all Sniff & Frolic treats, toys and gear in your cart.",
  };
};

const CartPage = async ({ params }: CartPageProps) => {
  const { lang } = await params;

  const locale = isValidLocale(lang) ? (lang as Locale) : ("en" as Locale);

  return <CartPageClient locale={locale} />;
};

export default CartPage;