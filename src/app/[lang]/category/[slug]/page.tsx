import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProducts } from "@/lib/wooClient";
import { shuffleArray, getStr, collectDescendantIds } from "@/utils/helpers";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
// components
import Section from "@/components/Section/Section";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductsFilterSidebarClient from "@/components/ProductFilter/ProductsFilterSidebarClient";

type SearchParams = Record<string, string | string[] | undefined>;
interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async ({ params }: CategoryPageProps): Promise<Metadata> => {
  const { lang, slug } = await params;
  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { lang, slug } = await params;
  
  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);
  if (!category) notFound();

  const parentCat = allCats.find((c) => c.id === category.parent);
  const childCategories = allCats.filter((c) => c.parent === category.id);

  const { sp, wooParams, hasAnyFilter } = await buildWooParamsForListPage({
    searchParams,
    baseCategoryId: category.id,
    categories: allCats.map(c => ({ id: c.id, slug: c.slug, parent: c.parent })),
    perPage: 50,
  });

  const categorySlug = getStr(sp.category);const selectedCategory = categorySlug
  ? allCats.find((c) => c.slug === categorySlug)
  : null;
  const baseCategoryId = selectedCategory ? selectedCategory.id : category.id;
  const categoryIds = collectDescendantIds(allCats, baseCategoryId);

  wooParams.category = categoryIds.join(",");

  const products = await getProducts(wooParams as any);
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
    <>
      <CategorySliderSection lang={lang} title={category.name} items={childCategories} />
      <Section tone="white" topWave="teal"  bottomWave="cream">
        <BreadcrumbsNav locale={locale} items={breadcrumbs} />
        {/* All Product */}
        <Grid container spacing={2}>
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
              <ProductsFilterSidebarClient locale={locale} categories={childCategories} common={dict.common} />
          </Grid>
          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((item) =>
              <Grid container size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }} key={item.id}>
                <ProductGrid locale={locale} categoryName={item?.categories[0].name || ``} slug={item.slug} image={item?.images[0]} name={item.name} onSale={item?.on_sale} price={item.price} regularPrice={item?.regular_price} />
              </Grid>)}
          </Grid>
        </Grid>
      </Section>
    </>
  );
};

export default CategoryPage;