import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section";
import CheckoutPageClient from "@/components/Checkout/CheckoutPageClient";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
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

const CheckoutPage = async (props: CheckoutPageProps) => {
  const { params } = props;
  const { lang } = await params;
  const locale: Locale = isValidLocale(lang) ? lang : "en";
  const dict = await getDictionary(locale);

 // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [{
      label: dict.checkout.title,
  }];

  return (
    <Section bottomWave="cream">
      <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
      <CheckoutPageClient />
    </Section>
  );
};

export default CheckoutPage;
