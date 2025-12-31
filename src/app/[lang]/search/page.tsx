// src/app/[lang]/search/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { buildSearchMetadata } from "@/seo/buildSearchMetaTag";
import ProductGrid from "@/components/ProductGrid";

interface SearchPageProps {
  params: { lang: string };
  searchParams: { q?: string | string[] };
}

export const generateMetadata = async (
  props: SearchPageProps
): Promise<Metadata> => {
  const { params, searchParams } = props;
  const { lang } = params;
  const { q: qRaw } = searchParams;
  const q = Array.isArray(qRaw) ? qRaw[0] : (qRaw ?? "");

  return buildSearchMetadata({ lang, query: q });
};

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
  const { lang } = params;
  const sp = searchParams;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const raw = typeof sp.q === "string" ? sp.q : Array.isArray(sp.q) ? sp.q[0] : "";
  const search = raw.trim();

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

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {dict.search.searchResultFor}
      </Typography>

      <Box mt={3}>
        {products.length === 0 ? (
          <Typography variant="body1">
            {dict.search.noProductFound}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {(products || []).map((p) => <ProductGrid key={p.id} locale={locale} slug={p.slug} image={p?.images[0]} name={p.name} price={p.price} />)}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
