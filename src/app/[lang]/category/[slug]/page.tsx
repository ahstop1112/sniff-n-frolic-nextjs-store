// src/app/[lang]/category/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/storeApi";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
import CategoryPageClient from "@/components/Category";
import type { PageProps, LangSlugParamsObj } from "@/types/next";
import { unwrap, unwrapSearchParams } from "@/types/next";

const PAGE_SIZE = 20;

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

  // First page only — client handles the rest
  const initialProducts = await getProducts({
    category: slug,
    search: search || undefined,
    per_page: PAGE_SIZE,
    page: 1,
  });

  return (
    <CategoryPageClient
      slug={slug}
      dict={dict}
      finalProducts={initialProducts}
      search={search}
    />
  );
};

export default CategoryPage;