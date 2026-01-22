// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Typography } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { shuffleArray } from "@/utils/helpers";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
import MainBanner from "@/components/Home/MainBanner";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import CategoryProductSliderSection from "@/components/CategoryProduct/CategoryProductSliderSection";


interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (props: HomePageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  return buildHomeMetadata({ lang });
}

const HomePage = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const products = await getProducts({ per_page: 100, orderby: "date" });
  const finalProducts = shuffleArray(products);

  const categories = await getCategories({ parent: 0, hide_empty: true });

  // Treats
  const productTreats = await getProducts({ category: 139, per_page: 20 } as any);
  const treatsTitle = productTreats.length > 0 && productTreats[0]?.categories ?
    productTreats[0]?.categories[0].name : ``;
  
  // Bowl & Feeders
  const productFeeder = await getProducts({ category: 82, per_page: 20 } as any);
  const feederTitle = productFeeder.length > 0 && productFeeder[0]?.categories ?
  productFeeder[0]?.categories[0].name : ``;
  
  return (
    <>
      <MainBanner />
      <CategorySliderSection lang={lang} bottomWave="green" title="All Categories" includeSale items={categories} />
      {/* Pet Treats */}
      <CategoryProductSliderSection
        title={treatsTitle} desc="Everyday treats handpicked for mindful feeding, slow rewards, and daily routines."
        style="white"
        locale={locale}
        items={productTreats}
        tone="white"
        topWave="green"
        bottomWave="orange"
      />
      {/* Pet Bowls & Feeders */}
      <CategoryProductSliderSection
        title={feederTitle} desc="Bowls, feeders and drinking accessories designed for everyday feeding and hydration."
        style="orange"
        locale={locale}
        items={productFeeder}
        tone="orange"
        bottomWave="cream"
      />
    </>
  );
};

export default HomePage;
