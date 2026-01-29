"use client";

import { useState } from "react";
import { Box, Divider } from "@mui/material";
import type { WooProduct, WooProductVariation } from "@/lib/wooClient";
import type { Locale } from "@/i18n/config";
import ProductDetails from "@/components/ProductDetails/ProductsDetails";
import ProductPurchasePanel from "@/components/ProductPurchasePanel/ProductPurchasePanel";
import type { AddToCartInput } from "@/lib/cartTypes";
import { useProducts } from "@/context/ProductsContext";

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
  initialVariations?: WooProductVariation[];
}

const ProductPageClient = ({
  slug,
  locale,
  products,
  initialVariantOptions,
}: ProductsProps) => {
  // Use local state initialized with the server-provided product.
  // If you want live client-side revalidation later, we can add a fetch or SWR here.
  const { fetchProducts } = useProducts();
  console.log("Initial Product:", products);
  const [product, setProduct] = useState<WooProduct>(products);

  const price = Number(product.price || product.regular_price || 0);

  const addToCartInput: AddToCartInput = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price || product.regular_price || 0),
    imageUrl: product.images?.[0]?.src,
  };

  return (
    <>
      <ProductDetails
        title={product.name}
        price={price}
        onSale={product.on_sale}
        shortDesc={product.short_description}
        variantOptions={initialVariantOptions}
        locale={locale}
      />
      <Box mt={4} display="flex" gap={2}>
        <ProductPurchasePanel product={addToCartInput} locale={locale} />
      </Box>

      {product.description && (
        <Box mt={6}>
          <Divider />
          <Box mt={3}>
            <div dangerouslySetInnerHTML={{ __html: product.description }} />
          </Box>
        </Box>
      )}
    </>
  );
};

export default ProductPageClient;
