import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import CheckoutPageClient from "@/components/CheckoutPageClient";

interface CheckoutPageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (
  props: CheckoutPageProps
): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  if (!isValidLocale(lang)) {
    return {
      title: "Checkout – Sniff & Frolic",
      description: "Complete your purchase.",
    };
  }

  const locale: Locale = lang;

  return {
    title:
      locale === "zh"
        ? "結帳 – Sniff & Frolic"
        : "Checkout – Sniff & Frolic",
    description:
      locale === "zh"
        ? "輸入送貨及付款資料，完成 Sniff & Frolic 的訂單。"
        : "Enter your details to complete your Sniff & Frolic order.",
  };
};

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? (lang as Locale) : ("en" as Locale);

  return <CheckoutPageClient locale={locale} />;
};

export default CheckoutPage;