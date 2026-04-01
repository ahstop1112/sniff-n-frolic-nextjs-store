import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getProductBySlug } from "@/lib/wooClient";
import { seoConfig } from "./seoConfig";

interface BuildProductMetadataArgs {
  lang: string;
  slug: string;
}

export const buildProductMetadata = async (
  args: BuildProductMetadataArgs,
): Promise<Metadata> => {
  const { lang, slug } = args;

  if (!isValidLocale(lang)) {
    return {
      title: `Product not found - ${seoConfig.siteName}`,
      description: "The requested product could not be found.",
    };
  }

  const locale: Locale = lang;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: `Product not found - ${seoConfig.siteName}`,
      description: "The requested product could not be found.",
    };
  }

  const title = `${product.name} - ${seoConfig.siteName}`;
  const description =
    product.short_description?.replace(/<[^>]*>/g, "").trim() ||
    "Healthy Canadian-made treats & adventure-ready goodies for pets and their humans.";
  const canonical = `${seoConfig.siteUrl}/${locale}/products/${slug}`;
  const ogImage = product.images?.[0]?.src;

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: seoConfig.siteName,
      type: "website",
      images: ogImage ? [{ url: ogImage }] : [],
    },
  };
};