// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/storeApi";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import ProductsFilterSidebarClient from "@/components/ProductFilter";
import Section from "@/components/Section";
import ProductsGridClient from "@/components/Product/ProductsGridClient"
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import { wooCategoriesToSliderItems } from "@/domains/categories/adapter";
import {
  PageProps,
  LangSlugParamsObj,
  unwrap,
  unwrapSearchParams,
} from "@/types/next";

const PAGE_SIZE = 20;

type ProductsPageProps = PageProps<LangSlugParamsObj>;

const ProductsPage = async ({ params, searchParams }: ProductsPageProps) => {
  const { lang } = await unwrap(params);
  const sp = await unwrapSearchParams(searchParams);

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();

  const topLevelCategories = allCats
    .filter((c) => c.parent === "0")
    .sort((a, b) => a.name.localeCompare(b.name));

  const topLevelSliderItems = wooCategoriesToSliderItems(topLevelCategories, locale);

  const categorySlug = typeof sp.category === "string" ? sp.category : undefined;
  const search = typeof sp.search === "string" ? sp.search : undefined;

  // First page — server side
  const initialProducts = await getProducts({
    page: 1,
    per_page: PAGE_SIZE,
    category: categorySlug,
    search,
  });

  const breadcrumbs: BreadcrumbItem[] = [];

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={true} items={breadcrumbs} />
        <h1>{dict.nav.collection}</h1>
      </Section>

      <Section tone="white" topWave="teal" bottomWave="green">
        <Grid container spacing={3}>
          {/* Sidebar */}
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient
              categories={topLevelSliderItems}
              common={dict.common}
            />
          </Grid>

          {/* Products — client handles infinite scroll */}
          <ProductsGridClient
            initialProducts={initialProducts}
            categorySlug={categorySlug}
            search={search}
            pageSize={PAGE_SIZE}
          />
        </Grid>
      </Section>

      <CategorySliderSection
        title={dict.search.allCategories}
        items={topLevelSliderItems}
        bottomWave="cream"
      />
    </>
  );
};

export default ProductsPage;