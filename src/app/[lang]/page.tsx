// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getProducts } from "@/lib/storeApi";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
import MainBanner from "@/components/Home/MainBanner";
import CategoryProductSliderSection from "@/components/CategoryProduct";
import ParallaxBgSection from "@/components/ParallaxBgSection";
import MeetFeiFeiSection from "@/components/MeetFeiFeiSection";
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
  
  // Treats
  const productTreats = await getProducts({
    category: `pet-treats`,
    per_page: 12,
  } as any);
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
    category: `bowls-feeder`,
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
      <ParallaxBgSection
        title="Walk & Travel"
        subtitle="Walk and travel essentials including jackets, walk gear and on-the-go accessories."
        buttonText="Explore Gear"
        buttonHref={`${locale}/category/walk-gear`}
        imageSrc="images/banner_feifei.webp"
      />
      {/* Pet Treats */}
      <CategoryProductSliderSection
        title={treatsTitle}
        desc="Everyday treats handpicked for mindful feeding, slow rewards, and daily routines."
        items={productTreatsItems}
        tone="white"
      />
      <ParallaxBgSection
        title="Sniff & Bites"
        subtitle="Natural Single-Ingredient Treats for Dogs & Cats
        Chicken • Kangaroo • Sardines"
        buttonText="Shop Now"
        buttonHref={`${locale}/category/sniff-n-bites`}
        imageSrc="/images/banner_snb_v2.webp"
        position="right"
      />
      {/* Pet Bowls & Feeders */}
      <CategoryProductSliderSection
        title={feederTitle}
        desc="Bowls, feeders and drinking accessories designed for everyday feeding and hydration."
        items={productFeederItems}
        tone="orange"
      />
      <MeetFeiFeiSection />
    </>
  );
};

export default HomePage;
