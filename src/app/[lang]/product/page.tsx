// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts } from "@/lib/wooClient";

interface ProductsPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const products = await getProducts({ per_page: 20 });

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {dict.nav.products}
      </Typography>

      <Box mt={3}>
        <Grid container spacing={2}>
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card variant="outlined">
                <CardContent>
                  <Link href={`/${locale}/products/${p.slug}`}>
                    {p.name}
                  </Link>
                  <Typography variant="body2" color="text.secondary">
                    ${p.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
};

export default ProductsPage;