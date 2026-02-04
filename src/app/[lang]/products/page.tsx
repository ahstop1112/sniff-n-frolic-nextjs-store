// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import ProductsFilterSidebarClient from "@/components/ProductFilter/ProductsFilterSidebarClient";
import Section from "@/components/Section/Section";
import ProductGrid from "@/components/Product/ProductGrid";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import { shuffleArray } from "@/utils/helpers";
import { wooCategoriesToSliderItems } from "@/domains/categories/adapter";
import { PageProps, LangSlugParamsObj } from "@/types/next";

type ProductsPageProps = PageProps<LangSlugParamsObj>;

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const sliderItems = wooCategoriesToSliderItems(allCats, locale);

  console.log(sliderItems);

  const topLevelCategories = sliderItems
    .filter((c) => c.parent === 0)
    .sort((a, b) => a.id - b.id);

  // Show the first level of Categoryes
  const { sp, wooParams } = await buildWooParamsForListPage({
    searchParams: sp,
    perPage: 50,
  });
  const categorySlug =
    typeof sp.category === "string" ? sp.category : undefined;
  const inStockFlag = typeof sp.in_stock === "string" ? sp.in_stock : undefined;

  let selectedCategory = undefined as any;
  selectedCategory = categorySlug
    ? topLevelCategories.find((item) => item.slug === categorySlug)
    : null;

  if (selectedCategory?.id) {
    wooParams.category = selectedCategory.id;
  }

  if (inStockFlag === "1") {
    (wooParams as any).stock_status = "instock";
  }

  const products = await getProducts(wooParams);
  const finalProducts =
    categorySlug || inStockFlag ? products : shuffleArray(products);

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav locale={locale} isProduct={true} items={breadcrumbs} />
        <h1>{dict.nav.collection}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="green">
        {/* All Product */}
        <Grid container spacing={3}>
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient
              locale={locale}
              categories={topLevelCategories.map((c) => ({
                id: c.id,
                name: c.name,
                slug: c.slug,
              }))}
              common={dict.common}
            />
          </Grid>
          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((p) => (
              <Grid
                container
                size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }}
                key={p.slug}
              >
                <ProductGrid
                  locale={locale}
                  slug={p.slug}
                  image={p?.images[0]}
                  name={p.name}
                  onSale={p?.on_sale}
                  price={p.price}
                  regularPrice={p?.regular_price}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Section>
      <CategorySliderSection
        lang={lang}
        title={dict.search.allCategories}
        items={topLevelCategories}
        bottomWave="cream"
      />
    </>
  );
};

export default ProductsPage;
