import Link from "next/link";
import type { Metadata } from "next";
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
import { getProductBySlug, getProductVariations } from "@/lib/wooClient";
import ProductImageGallery from "@/components/ProductImageGallery";
import { buildProductMetadata } from "@/seo/buildProductMetaTag";

interface ProductPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

interface VariantOptionGroup {
    name: string;    // "Color"
    slug: string;    // "pa_color"
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
  
      // 1) product 層 options
      attr.options?.forEach((opt) => {
        if (opt) valueSet.add(opt);
      });
  
      // 2) variation 層 attributes（保險再收集一次）
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
    if (!product) return notFound();

    const images = product.images ?? [];

    let variantOptions: VariantOptionGroup[] = [];

    if (product.type === "variable") {
        const variations = await getProductVariations(product.id);
        variantOptions = buildVariantOptions(product, variations);
    }

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
                CAD${product.price}
            </Typography>

            {product.on_sale && (
            <Typography variant="body2" color="secondary">
                {locale === "zh" ? "優惠中" : "On Sale"}
            </Typography>
            )}

            {variantOptions.length > 0 && (
            <Box mt={3}>
              {variantOptions.map((group) => (
                <Box key={group.slug} mb={2}>
                  <Typography variant="subtitle2" gutterBottom>
                    {locale === "zh" ? group.name : group.name}
                    {/* 之後你可以喺度做中英文 map，例如 Color → 顏色 */}
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

          {product.short_description && (
            <Box mt={2}>
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