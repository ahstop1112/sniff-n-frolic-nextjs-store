import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import PageLayout from "@/components/PageLayout/PageLayout";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import CheckoutPageClient from "@/components/Checkout/CheckoutPageClient";

interface CheckoutPageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (
  props: CheckoutPageProps,
): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

  if (!isValidLocale(lang)) {
    return {
      title: dict.checkout.title,
      description: dict.checkout.completeYourPurchase,
    };
  }

  return {
    title: dict.checkout.title,
    description: dict.checkout.desc,
  };
};

const CheckoutPage = async ({ params }: CheckoutPageProps) => {
  const { lang } = await params;
  const locale = isValidLocale(lang) ? (lang as Locale) : ("en" as Locale);

  const breadcrumbs: BreadcrumbItem[] = [];

  return (
    <PageLayout>
      <BreadcrumbsNav locale={locale} items={breadcrumbs} />
      <CheckoutPageClient locale={locale} />
    </PageLayout>
  );
};

export default CheckoutPage;
