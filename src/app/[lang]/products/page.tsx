// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import BreadcrumbsNav, { type BreadcrumbItem } from "@/components/BreadcrumbsNav";
import ProductsFilterSidebarClient from "@/components/ProductsFilterSidebarClient";
import CategoryGrid from "@/components/Category/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
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
    <Box mt={3}>
      <BreadcrumbsNav locale={locale} items={breadcrumbs} />
      {/* All Top Level Categories */}
      <Typography variant="h4" component="h1" gutterBottom>
        {dict.common.categories}
      </Typography>
      <Grid container spacing={2}>
        {(topLevelCategories || []).map((cat) => <CategoryGrid key={cat.id} locale={locale} slug={cat.slug} image={cat.image} name={cat.name} />)}
      </Grid>
      {/* All Product */}
      <Typography
        variant="h4"
        component="h1"
        style={{ marginTop: 24 }}
        gutterBottom
      >
        {dict.nav.products}
      </Typography>
      <Grid container spacing={2}>
        <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
          <ProductsFilterSidebarClient locale={locale} categories={topLevelCategories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))}  common={dict.common} />
        </Grid>
        <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
          {(finalProducts || []).map((p) => <ProductGrid key={p.id} locale={locale} slug={p.slug} image={p?.images[0]} name={p.name} price={p.price} />)}
        </Grid>
      </Grid>
    </Box>
  );
};

export default ProductsPage;
