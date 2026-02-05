import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { shuffleArray } from "@/utils/helpers";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
// components
import CategoryPageClient from "@/components/Category/CategoryPageClient";
import { getCategoryIdBySlug } from "@/lib/categories/getCategoryIdBySlug";
import type { PageProps, LangSlugParamsObj } from "@/types/next";
import { unwrap, unwrapSearchParams } from "@/types/next";

type CategoryPageProps = PageProps<LangSlugParamsObj>;

export const generateMetadata = async ({
  params,
}: CategoryPageProps): Promise<Metadata> => {
  const { lang, slug } = await unwrap(params);
  if (!isValidLocale(lang)) return {};
  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { lang, slug } = await unwrap(params);
  const sp = await unwrapSearchParams(searchParams);

  if (!isValidLocale(lang)) notFound();
  const locale = lang as Locale;
  const dict = await getDictionary(locale);

  const baseCategoryId = await getCategoryIdBySlug(slug);

  const { wooParams, hasAnyFilter } = await buildWooParamsForListPage({
    searchParams: sp,
    perPage: 50,
    baseCategoryId,
  });

  const products = await getProducts(wooParams as any);
  const finalProducts = hasAnyFilter ? products : shuffleArray(products);

  return (
    <CategoryPageClient
      locale={locale}
      slug={slug}
      dict={dict}
      finalProducts={finalProducts}
    />
  );
};

export default CategoryPage;
