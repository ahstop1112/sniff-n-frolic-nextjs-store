import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Box, Grid, Divider } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import {
  getProductBySlug,
  getProductVariations,
  getProducts
} from "@/lib/wooClient";
import type { WooProduct, WooProductVariation } from "@/lib/wooClient/types";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import ProductImageGallery from "@/components/Product/ProductImageGallery";
import { buildProductMetadata } from "@/seo/buildProductMetaTag";
import ProductsDetailsTop from "@/components/ProductDetails";
import CategoryProductSliderSection from "@/components/CategoryProduct"; // You may also like
// Add To Cart
import ProductPurchasePanel from "@/components/ProductPurchasePanel";
import { toCategoryProductSliderItems } from "@/domains/products/adapter";
import type { AddToCartInput } from "@/lib/cartTypes";
import type { PageProps, LangSlugParamsObj } from "@/types/next";
import { unwrap, unwrapSearchParams } from "@/types/next";

type ProductPageProps = PageProps<LangSlugParamsObj>;

interface VariantOptionGroup {
  name: string; // "Color"
  slug: string; // "pa_color"
  values: string[]; // ["Red", "Blue"]
}

export const generateMetadata = async ({
  params,
  searchParams,
}: ProductPageProps): Promise<Metadata> => {
  const { lang, slug } = await unwrap(params);

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

const ProductPage = async ({ params, searchParams }: ProductPageProps) => {
  const { lang, slug } = await unwrap(params);
  const sp = await unwrapSearchParams(searchParams);

  if (!isValidLocale(lang)) notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const product = await getProductBySlug(slug);
  if (!product) notFound();

  // Breadcrumbs
  const mainCategory = product.categories?.[0];

  // Related Products (You may also like)
   const productRelated = await getProducts({
    category: mainCategory?.slug,
    per_page: 12,
    orderby: "random",
   } as any);
  
  let relatedProducts = productRelated
    .filter((p: any) => p.slug !== product.slug)
    .slice(0, 12);
  const formattedRelated = toCategoryProductSliderItems(
    relatedProducts,
    locale,
  );

  if (relatedProducts.length === 0) {
    const fallback = await getProducts({ per_page: 12 } as any);
    relatedProducts = fallback;
  }


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

  // if (product.type === "variable") {
  //   const variations = await getProductVariations(product.id);
  //   variantOptions = buildVariantOptions(product, variations);
  // }

  const addToCartInput: AddToCartInput = {
    id: product.uuid,
    slug: product.slug,
    name: product.name,
    price: Number(product.price || product.regular_price || 0),
    imageUrl: product.images?.[0]?.src,
  };

  // Currency
  const price = Number(product.price || product.regular_price || 0);

  return (
    <>
    <Section tone="white" bottomWave="teal">
      <BreadcrumbsNav items={breadcrumbs} isProduct={true} />
      <Grid container spacing={4}>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 5 }}>
          <ProductImageGallery images={images} productName={product.name} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 6, lg: 7 }}>
          <ProductsDetailsTop
            title={product.name}
            price={price}
            onSale={product.on_sale}
            shortDesc={product.short_description}
            variantOptions={variantOptions}
          />
          <Box mt={4} display="flex" gap={2}>
            {/* Add To Cart */}
            <ProductPurchasePanel product={addToCartInput} />
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
    <CategoryProductSliderSection
      title={dict.common.youMayAlsoLike}
      items={formattedRelated}
      tone="teal"
      bottomWave="cream"
    />
    </>
  );
};

export default ProductPage;
