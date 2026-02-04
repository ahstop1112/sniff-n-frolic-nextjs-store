import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Typography, Box, Grid } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { buildWooParamsForListPage } from "@/lib/filters/buildWooParamsForListPage";
import { buildSearchMetadata } from "@/seo/buildSearchMetaTag";
import Section from "@/components/Section/Section";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import ProductGrid from "@/components/Product/ProductGrid";

interface SearchPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<{ q?: string | string[] }>;
}

export const generateMetadata = async ({
  params,
  searchParams,
}: SearchPageProps): Promise<Metadata> => {
  const { lang } = await params;
  const sp = await searchParams;
  const qRaw = sp.q;
  const q =
    typeof qRaw === "string" ? qRaw : Array.isArray(qRaw) ? qRaw[0] : "";

  return buildSearchMetadata({ lang, query: q });
};

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const { wooParams, hasQuery } = await buildWooParamsForListPage({
    searchParams,
    perPage: 50,
    searchKey: "q",
  });

  const search = (
    typeof wooParams.search === "string" ? wooParams.search : ""
  ).trim();

  if (!search) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {dict.search.searchProducts}
        </Typography>
        <Typography variant="body1" mt={2}>
          {dict.search.typeProductKeyword}
        </Typography>
      </Box>
    );
  }

  const products = await getProducts({ per_page: 24, search });

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    {
      label: dict.search.searchResults,
    },
  ];

  return (
    <Section>
      <BreadcrumbsNav isProduct={false} locale={locale} items={breadcrumbs} />
      <h2>
        {dict.search.searchResultFor}
        <b style={{ fontWeight: 900 }}>{search}</b> ({products.length})
      </h2>

      <Box mt={3}>
        {products.length === 0 ? (
          <Typography variant="body1">{dict.search.noProductFound}</Typography>
        ) : (
          <Grid
            container
            size={{ lg: 2, xl: 2, md: 3, sm: 6, xs: 6 }}
            spacing={2}
          >
            {(products || []).map((p) => (
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
        )}
      </Box>
    </Section>
  );
};

export default SearchPage;
