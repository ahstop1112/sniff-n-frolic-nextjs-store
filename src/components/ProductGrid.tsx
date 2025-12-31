// src/components/ProductGrid.tsx
"use client";
import Link from "next/link";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import type { WooImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
// Currency
import { formatPrice } from "@/lib/currency";

interface ProductGridProps {
  slug: string;
  locale: Locale;
  image: WooImage;
  name: string;
  price: string;
}

const ProductGrid = ({ slug, locale, image, name, price }: ProductGridProps) => {
  return (
    <Grid size={{ xs: 6, sm: 4, md: 3, lg: 3, xl: 3 }}>
      <Card variant="outlined">
        <CardContent>
          <Link href={`/${locale}/products/${slug}`}>
            <Box
              component="img"
              src={image.src}
              alt={image.alt || name}
              style={{ maxWidth: `100%` }}
            />
            {name}
          </Link>
          <Typography variant="body2" color="text.secondary">
            {formatPrice(+price)}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ProductGrid;