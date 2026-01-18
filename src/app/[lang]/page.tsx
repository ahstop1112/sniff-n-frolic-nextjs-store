// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Typography, Box, Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { shuffleArray } from "@/utils/helpers";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
import CategoryGrid from "@/components/Category/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import MainBanner from "@/components/Home/MainBanner";
import CategorySliderSection from "@/components/Category/CategorySliderSection";


interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (props: HomePageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  return buildHomeMetadata({ lang });c
};

const HomePage = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const products = await getProducts({ per_page: 8, orderby: "date" });
  const finalProducts = shuffleArray(products);

  const categories = await getCategories({ parent: 0, hide_empty: true });

  return (
    <>
      <MainBanner />
      <CategorySliderSection lang={lang} title="All Categories" includeSale items={categories} />
      <Typography variant="subtitle1" gutterBottom>
        {dict.common.latestArrivals}
      </Typography>
      
      <Box mt={3}>
        <Grid container spacing={2}>
          {(finalProducts || []).map((p) => <ProductGrid key={p.id} locale={locale} slug={p.slug} image={p?.images[0]} name={p.name} price={p.price} />)}
        </Grid>
      </Box>
      
      <Box mt={4}>
        <Link href={`/${locale}/products`}>{dict.common.viewAll} →</Link>
      </Box>
    </>
  );
};

export default HomePage;
