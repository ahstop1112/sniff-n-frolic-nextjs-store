// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getProducts } from "@/lib/wooClient";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
import MainBanner from "@/components/Home/MainBanner";
import CategoryProductSliderSection from "@/components/CategoryProduct/CategoryProductSliderSection";
import { toCategoryProductSliderItems } from "@/domains/products/adapter";
import type { PageProps, LangParamsObj } from "@/types/next";
import HomePageClient from "./HomePageClient";

type HomePageProps = PageProps<LangParamsObj>;

export const generateMetadata = async ({
  params,
}: HomePageProps): Promise<Metadata> => {
  const { lang } = await params;
  return buildHomeMetadata({ lang });
};

const HomePage = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;


  const fetchProducts = async () => {
    const res = await fetch("http://localhost:3002/products");
    const data = await res.json();
    return data;
  };
  // Treats
  const productTreats = await fetchProducts();
  const productTreatsItems = toCategoryProductSliderItems(
    productTreats,
    locale,
  );

  const treatsTitle =
    productTreats.length > 0 && productTreats[0]?.categories
      ? productTreats[0]?.categories[0].name
      : ``;

  // Bowl & Feeders
  const productFeeder = await getProducts({
    category: 82,
    per_page: 12,
  } as any);
  const productFeederItems = toCategoryProductSliderItems(
    productFeeder,
    locale,
  );

  const feederTitle =
    productFeeder.length > 0 && productFeeder[0]?.categories
      ? productFeeder[0]?.categories[0].name
      : ``;
  // ✅ Categories are fetched once in layout, accessed via useCategories() hook

  return (
    <>
      <MainBanner />
      <HomePageClient />
      {/* Pet Treats */}
      <CategoryProductSliderSection
        title={treatsTitle}
        desc="Everyday treats handpicked for mindful feeding, slow rewards, and daily routines."
        items={productTreatsItems}
        tone="white"
        topWave="green"
        bottomWave="yellow"
      />
      {/* Pet Bowls & Feeders */}
      <CategoryProductSliderSection
        title={feederTitle}
        desc="Bowls, feeders and drinking accessories designed for everyday feeding and hydration."
        items={productFeederItems}
        tone="yellow"
        bottomWave="cream"
      />
    </>
  );
};

export default HomePage;
