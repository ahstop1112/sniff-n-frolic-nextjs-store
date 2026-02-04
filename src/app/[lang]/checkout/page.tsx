import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import PageLayout from "@/components/PageLayout/PageLayout";
import CheckoutPageClient from "@/components/Checkout/CheckoutPageClient";
import { PageProps, LangParamsObj } from "@/types/next";

type CheckoutPageProps = PageProps<LangParamsObj>;

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

  return (
    <PageLayout>
      {/* <BreadcrumbsNav locale={locale} items={breadcrumbs} /> */}
      <CheckoutPageClient locale={locale} />
    </PageLayout>
  );
};

export default CheckoutPage;
