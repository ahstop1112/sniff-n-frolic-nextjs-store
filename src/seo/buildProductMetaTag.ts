import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getProductBySlug } from "@/lib/wooClient";
import { seoConfig } from "./seoConfig";

interface BuildProductMetadataArgs {
    lang: string;
    slug: string;
}

export const buildProductMetadata = async ( args: BuildProductMetadataArgs ): Promise<Metadata> => {
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
  
    const yoast = product.yoast_head_json;
    const baseTitle = yoast?.title || `${product.name} - ${seoConfig.siteName}`;
    const baseDescription =
      yoast?.description ||
      "Healthy Canadian-made treats & adventure-ready goodies for pets and their humans.";
    const canonical = yoast?.canonical || product.permalink;
  
    // Open Graph image：優先用 Yoast，其次用 Woo 第一張圖
    const ogImageFromYoast = yoast?.og_image?.[0]?.url;
    const ogImageFromWoo = product.images?.[0]?.src;
    const ogImage = ogImageFromYoast || ogImageFromWoo;
  
    const siteName = yoast?.og_site_name || seoConfig.siteName;
  
    const metadata: Metadata = {
      title: baseTitle,
      description: baseDescription,
      alternates: {
        canonical,
      },
      openGraph: {
        title: yoast?.og_title || baseTitle,
        description: yoast?.og_description || baseDescription,
        url: yoast?.og_url || canonical,
        siteName,
        type: (yoast?.og_type as any) || "product",
        images: ogImage
          ? [
              {
                url: ogImage,
              },
            ]
          : [],
      },
      // twitter: {
      //   card: yoast?.twitter_card || "summary_large_image",
      //   title: baseTitle,
      //   description: baseDescription,
      //   images: ogImage ? [ogImage] : [],
      // },
    };
  
    return metadata;
  };