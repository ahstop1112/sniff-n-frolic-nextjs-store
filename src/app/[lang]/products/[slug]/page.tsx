import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Button, Divider } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getProductBySlug,
  getProductVariations,
  WooProduct,
  WooProductVariation,
} from "@/lib/wooClient";
import Section from "@/components/Section/Section";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import ProductImageGallery from "@/components/Product/ProductImageGallery";
import { buildProductMetadata } from "@/seo/buildProductMetaTag";
import ProductDetails from "@/components/ProductDetails/ProductsDetails";
// Add To Cart
import ProductPurchasePanel from "@/components/ProductPurchasePanel/ProductPurchasePanel";
import type { AddToCartInput } from "@/lib/cartTypes";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}

export const generateMetadata = async (
  props: ProductPageProps,
): Promise<Metadata> => {
  const { params } = props;
  const { lang, slug } = await params;

  return buildProductMetadata({ lang, slug });
};

const buildVariantOptions = (
  product: WooProduct,
  variations: WooProductVariation[],
): VariantOptionGroup[] => {
  const attrs = product.attributes ?? [];
  const variationAttrs = attrs.filter((a) => a.variation);

  const groups: VariantOptionGroup[] = [];

  variationAttrs.forEach((attr) => {
    const valueSet = new Set<string>();

    attr.options?.forEach((opt) => {
      if (opt) valueSet.add(opt);
    });

    variations.forEach((v) => {
      v.attributes.forEach((va) => {
        if (va.name === attr.name || va.name === attr.slug) {
          if (va.option) valueSet.add(va.option);
        }
      });
    });

    if (valueSet.size > 0) {
      groups.push({
        name: attr.name,
        slug: attr.slug,
        values: Array.from(valueSet),
      });
    }
  });

  return groups;
};

const ProductPage = async ({ params }: ProductPageProps) => {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Breadcrumbs
  const mainCategory = product.categories?.[0];

  const breadcrumbs: BreadcrumbItem[] = [];

  if (mainCategory) {
    breadcrumbs.push({
      label: mainCategory.name,
      href: `/${locale}/category/${mainCategory.slug}`,
    });
  }

  breadcrumbs.push({ label: product.name });

  // Products Details
  const images = product.images ?? [];

  let variantOptions: VariantOptionGroup[] = [];

  if (product.type === "variable") {
    const variations = await getProductVariations(product.id);
    variantOptions = buildVariantOptions(product, variations);
  }

  const addToCartInput: AddToCartInput = {
    id: product.id,
    slug: product.slug,
    name: product.name,
    price: Number(product.price || product.regular_price || 0),
    imageUrl: product.images?.[0]?.src,
  };

  // Currency
  const price = Number(product.price || product.regular_price || 0);

  return (
    <Section tone="white" bottomWave="cream">
      <BreadcrumbsNav items={breadcrumbs} locale={locale} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5 }}>
          <ProductImageGallery images={images} productName={product.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7 }}>
          <ProductDetails
            title={product.name}
            price={price}
            onSale={product.on_sale}
            shortDesc={product.short_description}
            variantOptions={variantOptions}
            locale={locale}
          />
          <Box mt={4} display="flex" gap={2}>
            {/* Add To Cart */}
            <ProductPurchasePanel product={addToCartInput} locale={locale} />
          </Box>
        </Grid>
        {product.description && (
          <Box mt={6}>
            <Divider />
            <Box mt={3}>
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            </Box>
          </Box>
        )}
      </Grid>
    </Section>
  );
};

export default ProductPage;
