import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import CartPageClient from "@/components/Cart/CartPageClient";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import Section from "@/components/Section/Section";
import { LangParamsObj, PageProps } from "@/types/next";
import { getDictionary } from "@/i18n/dictionaries";

type CartPageProps = PageProps<LangParamsObj>;

export const generateMetadata = async (
  props: CartPageProps,
): Promise<Metadata> => {
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
  const dict = await getDictionary(locale);
  
  const breadcrumbs: BreadcrumbItem[] = [{
    label: dict.cart.title,
  }];

  return (
    <Section bottomWave="cream">
      <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
      <CartPageClient />
    </Section>
  );
};

export default CartPage;
