import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProducts } from "@/lib/wooClient";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
import BreadcrumbsNav, {
  type BreadcrumbItem,
} from "@/components/BreadcrumbsNav";
import CategoryGrid from "@/components/CategoryGrid";
import ProductGrid from "@/components/ProductGrid";
import ProductsFilterSidebarClient from "@/components/ProductsFilterSidebarClient";
import { shuffleArray, getStr, collectDescendantIds } from "@/utils/helpers";

type SearchParams = Record<string, string | string[] | undefined>;
interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async (props: CategoryPageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang, slug } = await params;

  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { lang, slug } = await params;
  const sp = await searchParams;
  
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);
  const parentCat = allCats.find((c) => c.id === category?.parent);
  if (!category) return notFound();

  const childCatgories = allCats.filter((c) => c.parent === category.id);

  const inStockFlag = getStr(sp.in_stock);
  const onSaleFlag = getStr(sp.on_sale);
  const minPrice = getStr(sp.min_price);
  const maxPrice = getStr(sp.max_price);
  const sort = getStr(sp.sort) ?? "new";
  const categorySlug = getStr(sp.category);
  const selectedCategory = categorySlug ? allCats.find((item) => item.slug === categorySlug) : null;

  const wooParams: Record<string, any> = {
    per_page: 50,
    status: "publish",
    category: category?.id
  };

// ✅ category
  const baseCategoryId = selectedCategory ? selectedCategory.id : category.id;
  const categoryIds = collectDescendantIds(allCats, baseCategoryId);
  wooParams.category = selectedCategory ? selectedCategory.id : category.id;

  // ✅ price
  if (minPrice) wooParams.min_price = minPrice;
  if (maxPrice) wooParams.max_price = maxPrice;

  // ✅ on sale
  if (onSaleFlag === "1") wooParams.on_sale = true;

  // ✅ stock
  if (inStockFlag === "1") {
    (wooParams as any).stock_status = "instock";
  }
  const products = await getProducts(wooParams);
  const hasAnyFilter =
      Boolean(categorySlug) ||
      inStockFlag === "1" ||
      onSaleFlag === "1" ||
      Boolean(minPrice) ||
      Boolean(maxPrice) ||
      sort !== "new";

  const finalProducts = hasAnyFilter ? products : shuffleArray(products);

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];

  if (parentCat){
    breadcrumbs.push({
      label: parentCat.name,
      href: `/${locale}/category/${parentCat.slug}`,
    });
  }

  breadcrumbs.push({ label: category.name });

  return (
    <Box>
      <BreadcrumbsNav items={breadcrumbs} />
      <Typography variant="h4" component="h1" gutterBottom>
        {category.name}
      </Typography>
      <Box mt={3}>
        {/* All Top Level Categories */}
        {childCatgories.length > 0 && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              {dict.common.categories}
            </Typography>
            <Grid container spacing={2}>
              {(childCatgories || []).map((cat) => <CategoryGrid key={cat.id} locale={locale} slug={cat.slug} image={cat?.image} name={cat.name} />)}
            </Grid>
          </>
        )}
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
            <ProductsFilterSidebarClient locale={locale} categories={childCatgories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))} common={dict.common} />
          </Grid>
          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((p) => <ProductGrid key={p.id} locale={locale} slug={p.slug} image={p?.images[0]} name={p.name} price={p.price} />)}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryPage;
