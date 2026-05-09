"use client";

import { useState } from "react";
import { Box, Grid, Divider } from "@mui/material";
import type { WooProduct, ApiProductVariation } from "@/lib/wooClient/types";
import type { Locale } from "@/i18n/config";
import ProductDetails from "@/components/ProductDetails";
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import type { AddToCartInput } from "@/lib/cartTypes";

interface VariantOptionGroup {
  name: string;
  slug: string;
  values: string[];
}

interface ProductsProps {
  slug: string;
  locale: Locale;
  products: WooProduct;
  initialVariantOptions: VariantOptionGroup[];
}

const ProductPageClient = ({
  products,
  initialVariantOptions,
}: ProductsProps) => {
  const variations = products.variations ?? [];
  const [selectedVariation, setSelectedVariation] = useState<ApiProductVariation | null>(
    variations.length > 0 ? variations[0] : null
  );

  const price = selectedVariation
    ? (selectedVariation.effective_price || selectedVariation.regular_price) / 100
    : Number(products.price || products.regular_price || 0);

  const addToCartInput: AddToCartInput = {
    id: selectedVariation?.id ?? products.uuid,
    slug: selectedVariation?.slug ?? products.slug,
    name: products.name,
    price,
    imageUrl: selectedVariation?.featured_image_url ?? products.images?.[0]?.src,
  };

  const handleSelectVariant = (attrSlug: string, value: string) => {
    const matched = variations.find((v) =>
      v.attributes?.some((a) => a.slug === attrSlug && a.option === value)
    );
    if (matched) setSelectedVariation(matched);
  };

  const selectedAttributes = selectedVariation
    ? Object.fromEntries(
        selectedVariation.attributes?.map((a) => [a.slug, a.option]) ?? []
      )
    : {};

  return (
    <>
      <Grid size={{ xs: 12, sm: 12, md: 12, lg: 12 }}>
        <ProductDetails
          title={products.name}
          price={price}
          onSale={products.on_sale}
          shortDesc={products.short_description}
          variantOptions={initialVariantOptions}
          selectedAttributes={selectedAttributes}
          onSelectVariant={handleSelectVariant}
        />
        <Box mt={4} display="flex" gap={2}>
          <ProductPurchasePanel product={addToCartInput} />
        </Box>
      </Grid>
    </>
  );
};

export default ProductPageClient;