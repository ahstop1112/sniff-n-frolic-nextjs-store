import { notFound } from "next/navigation";
import { Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import Section from "@/components/Section/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import { PageProps, LangParamsObj } from "@/types/next";

type AboutPageProps = PageProps<LangParamsObj>;

const AboutPage = async ({ params }: AboutPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];
  breadcrumbs.push({
    label: dict.nav.ourStory,
  });

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={false} items={breadcrumbs} />
        <h1>{dict.nav.ourStory}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
        <Typography variant="body1" mt={2}>
          This is a headless demo storefront built with Next.js and WooCommerce
          for portfolio and job applications.
        </Typography>
      </Section>
    </>
  );
};

export default AboutPage;
