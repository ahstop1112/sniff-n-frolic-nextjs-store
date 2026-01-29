import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { shuffleArray, getStr, collectDescendantIds } from "@/utils/helpers";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
// components
import CategoryPageClient from "@/components/Category/CategoryPageClient";

type SearchParams = Record<string, string | string[] | undefined>;
interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { lang, slug } = await params;
  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { lang, slug } = await params;

  if (!isValidLocale(lang)) notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const { sp, wooParams, hasAnyFilter } = await buildWooParamsForListPage({
    searchParams,
    perPage: 50,
  });

  const products = await getProducts(wooParams as any);
  const finalProducts = hasAnyFilter ? products : shuffleArray(products);

  return (
    <CategoryPageClient
      lang={lang}
      locale={locale}
      slug={slug}
      dict={dict}
      finalProducts={finalProducts}
    />
  );
};

export default CategoryPage;
