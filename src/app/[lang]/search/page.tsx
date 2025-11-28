// src/app/[lang]/search/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";
import { buildSearchMetadata } from "@/seo/buildSearchMetaTag";

interface SearchPageProps {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ q?: string }>;
}

export const generateMetadata = async (
  props: SearchPageProps
): Promise<Metadata> => {
  const { params, searchParams } = props;
  const { lang } = await params;
  const { q } = await searchParams;

  return buildSearchMetadata({ lang, query: q });
};

const SearchPage = async ({ params, searchParams }: SearchPageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) return notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const raw = searchParams?.search ?? "";
  const search = raw.trim();

  if (!search) {
    return (
      <Box>
        <Typography variant="h4" gutterBottom>
          {locale === "zh" ? "搜尋產品" : "Search products"}
        </Typography>
        <Typography variant="body1" mt={2}>
          {locale === "zh"
            ? "請喺上面搜尋欄輸入產品關鍵字。"
            : "Please type a product keyword in the search bar above."}
        </Typography>
      </Box>
    );
  }

  const products = await getProducts({ per_page: 24, search });

  const title =
    locale === "zh"
      ? `搜尋結果：「${search}」`
      : `Search results for: "${search}"`;

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {title}
      </Typography>

      <Box mt={3}>
        {products.length === 0 ? (
          <Typography variant="body1">
            {locale === "zh"
              ? "未搵到相關產品。試試其他關鍵字？"
              : "No products found. Try a different keyword?"}
          </Typography>
        ) : (
          <Grid container spacing={2}>
            {products.map((p) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Link href={`/${locale}/products/${p.slug}`}>{p.name}</Link>
                    <Typography variant="body2" color="text.secondary">
                      ${p.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Box>
  );
};

export default SearchPage;
