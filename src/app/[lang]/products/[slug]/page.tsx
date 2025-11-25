// src/app/[lang]/products/[slug]/page.tsx
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  Button,
  Divider,
} from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProductBySlug } from "@/lib/wooClient";
import ProductImageGallery from "@/components/ProductImageGallery";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const ProductPage = async ({ params }: ProductPageProps) => {
    const { lang, slug } = await params;
    if (!isValidLocale(lang)) return notFound();

    const locale: Locale = lang;
    const dict = await getDictionary(locale);

    const product = await getProductBySlug(slug);
    if (!product) return notFound();

    const images = product.images ?? [];

  return (
    <Box>
      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <ProductImageGallery images={images} productName={product.name} />
        </Grid>

        <Grid item xs={12} md={6}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h6" color="primary" gutterBottom>
            ${product.price}
          </Typography>

          {product.on_sale && (
            <Typography variant="body2" color="secondary">
              On Sale
            </Typography>
          )}

          {product.short_description && (
            <Box mt={2}>
              <Typography variant="subtitle1" gutterBottom>
                {locale === "zh" ? "產品重點" : "Highlights"}
              </Typography>
              <div
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            </Box>
          )}

          <Box mt={4} display="flex" gap={2}>
            <Link href={product.permalink}  target="_blank">
                <Button variant="contained" color="primary">
                    {dict.common.viewOnSniff}
                </Button>
            </Link>
            <Link href={`/${locale}/products`}  target="_blank">
                <Button variant="outlined" color="primary">
                    {dict.common.backToAll}
                </Button>
            </Link>
          </Box>
        </Grid>
      </Grid>

      {product.description && (
        <Box mt={6}>
          <Divider />
          <Box mt={3}>
            <Typography variant="h6" gutterBottom>
              {locale === "zh" ? "產品詳情" : "Product details"}
            </Typography>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default ProductPage;