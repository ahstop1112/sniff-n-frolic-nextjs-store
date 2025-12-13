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
import BreadcrumbsNav, {
  type BreadcrumbItem,
} from "@/components/BreadcrumbsNav";
import ProductImageGallery from "@/components/ProductImageGallery";
import { buildProductMetadata } from "@/seo/buildProductMetaTag";
// Add To Cart
import { ProductPurchasePanel } from "@/components/ProductPurchasePanel";
import type { AddToCartInput } from "@/lib/cartTypes";
// Currency
import { formatPrice } from "@/lib/currency";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}

export const generateMetadata = async (
  props: ProductPageProps
): Promise<Metadata> => {
  const { params } = props;
  const { lang, slug } = await params;

  return buildProductMetadata({ lang, slug });
};

const buildVariantOptions = (
  product: WooProduct,
  variations: WooProductVariation[]
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
  if (!isValidLocale(lang)) return notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const product = await getProductBySlug(slug);
  console.log(product);
  if (!product) return notFound();

  // Breadcrumbs
  const collectionHref = `/${locale}/products`;
  const mainCategory =
    product && product.categories ? product.categories?.[0] : {};

  const breadcrumbs: BreadcrumbItem[] = [
    { label: locale === "zh" ? "首頁" : "Home", href: `${locale}` },
    {
      label: locale === "zh" ? "全部商品" : "Collection",
      href: collectionHref,
    },
  ];

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
  const displayPrice = formatPrice(price);

  return (
    <Box>
      <BreadcrumbsNav items={breadcrumbs} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <ProductImageGallery images={images} productName={product.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {product.name}
          </Typography>

          <Typography variant="h5" color="primary" gutterBottom>
            {displayPrice}
          </Typography>

          {product.on_sale && (
            <Typography variant="body2" color="secondary">
              {locale === "zh" ? "優惠中" : "On Sale"}
            </Typography>
          )}

          {variantOptions.length > 0 ? (
            <Box mt={3}>
              {variantOptions.length > 0 && (
                <Box mt={3}>
                  {variantOptions.map((group) => (
                    <Box key={group.slug} mb={2}>
                      <Typography variant="subtitle2" gutterBottom>
                        {locale === "zh" ? group.name : group.name}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexWrap: "wrap",
                          gap: 1,
                        }}
                      >
                        {group.values.map((value) => (
                          <Box
                            key={value}
                            sx={{
                              borderRadius: 1,
                              border: "1px solid",
                              borderColor: "divider",
                              px: 1.2,
                              py: 0.4,
                              fontSize: 14,
                            }}
                          >
                            {value}
                          </Box>
                        ))}
                      </Box>
                    </Box>
                  ))}
                </Box>
              )}
            </Box>
          ) : null}

          {product.short_description && (
            <Box mt={2}>
              <div
                dangerouslySetInnerHTML={{ __html: product.short_description }}
              />
            </Box>
          )}
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
    </Box>
  );
};

export default ProductPage;
