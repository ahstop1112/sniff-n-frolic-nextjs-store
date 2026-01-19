// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import BreadcrumbsNav, { type BreadcrumbItem } from "@/components/Breadcrumb/BreadcrumbsNav";
import ProductsFilterSidebarClient from "@/components/Product/ProductsFilterSidebarClient";
import Section from "@/components/Section/Section";
import ProductGrid from "@/components/Product/ProductGrid";
import CategorytSliderSection from "@/components/Category/CategorySliderSection";
import { shuffleArray } from "@/utils/helpers";

type SearchParams = Record<string, string | string[] | undefined>;
interface ProductsPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<SearchParams>;
}

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const topLevelCategories = allCats
    .filter((c) => c.parent === 0)
    .sort((a, b) => a.id - b.id);

  // Show the first level of Categoryes
  const { sp, wooParams } = await buildWooParamsForListPage({
    searchParams,
    perPage: 50,
  });
  const categorySlug = typeof sp.category === "string" ? sp.category : undefined;
  const inStockFlag = typeof sp.in_stock === "string" ? sp.in_stock : undefined;

  let selectedCategory = undefined as any;
  selectedCategory = categorySlug ? topLevelCategories.find(item => item.slug === categorySlug) : null;

  if (selectedCategory?.id) {
    wooParams.category = selectedCategory.id;
  }

  if (inStockFlag === "1") {
    (wooParams as any).stock_status = "instock";
  }

  const products = await getProducts(wooParams);
  const finalProducts = categorySlug || inStockFlag ? products : shuffleArray(products);

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];

  return (
    <Box>
      <CategorytSliderSection lang={lang} title="Collections" items={topLevelCategories} />
      <Section tone="white" topWave="teal"  bottomWave="cream">
        <BreadcrumbsNav locale={locale} items={breadcrumbs} />
        {/* All Product */}
        <Grid container spacing={2}>
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient locale={locale} categories={topLevelCategories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}  common={dict.common} />
          </Grid>
          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((item) =>
              <Grid container size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }} key={item.id}>
                <ProductGrid locale={locale} categoryName={item?.categories[0].name || ``} slug={item.slug} image={item?.images[0]} name={item.name} onSale={item?.on_sale} price={item.price} regularPrice={item?.regular_price} />
              </Grid>)}
          </Grid>
          </Grid>
        </Section>
    </Box>
  );
};

export default ProductsPage;
