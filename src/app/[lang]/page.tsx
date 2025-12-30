// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { shuffleArray } from "@/utils/helpers";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (props: HomePageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  return buildHomeMetadata({ lang });
};

const HomePage = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) return notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const products = await getProducts({ per_page: 8, orderby: "date" });
  const finalProducts = shuffleArray(products);

  const categories = await getCategories({ parent: 0, hide_empty: true });

  return (
    <>
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

      {categories.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>
            {dict.common.shopByCategory}
          </Typography>
          <Grid container spacing={2}>
            {(categories || []).map((cat) => <CategoryGrid key={cat.id} locale={locale} slug={cat.slug} image={cat?.image} name={cat.name} />)}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomePage;
