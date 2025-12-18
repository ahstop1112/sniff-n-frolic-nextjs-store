// src/components/CategoryGrid.tsx
"use client";
import Link from "next/link";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import type { WooImage } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
// Currency
import { formatPrice } from "@/lib/currency";

interface CategoryGridProps {
  slug: string;
  locale: Locale;
  image: WooImage;
  name: string;
  price: number;
}

const CategoryGrid = ({ slug, locale, image, name, price }: CategoryGridProps) => {
  return (
    <Grid size={{ xs: 6, sm: 6, md: 2 }}>
      <Card variant="outlined">
        <CardContent>
          <Link href={`/${locale}/category/${slug}`}>
            <Box
              component="img"
              src={image.src}
              alt={image.alt || name}
              style={{ maxWidth: `100%` }}
            />
            {name}
          </Link>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CategoryGrid;