import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { shuffleArray } from "@/utils/helpers";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
import CategoryPageClient from "@/components/Category/CategoryPageClient";
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

  const search = typeof sp.q === "string" ? sp.q.trim() : undefined;

  const products = await getProducts({
    category: slug,
    search: search || undefined,
    per_page: 50,
  });

  const hasAnyFilter = Boolean(search);
  const finalProducts = hasAnyFilter ? products : shuffleArray(products);

  return (
    <CategoryPageClient
      slug={slug}
      dict={dict}
      finalProducts={finalProducts}
    />
  );
};

export default CategoryPage;