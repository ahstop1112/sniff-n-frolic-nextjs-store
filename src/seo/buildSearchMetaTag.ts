import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { seoConfig } from "./seoConfig";

interface BuildSearchMetadataArgs {
    lang: string;
    query: string | undefined;
}

export const buildSearchMetadata = async ( args: BuildSearchMetadataArgs ): Promise<Metadata> => {
    const { lang, query } = args;
  
    if (!isValidLocale(lang)) {
      return {
        title: `Search not found - ${seoConfig.siteName}`,
        description: "The requested product could not be found.",
      };
    }

    const locale: Locale = lang;
    const keyword = (query || "").trim();

    const titleBase = locale === "zh"
      ? `搜尋產品 – ${seoConfig.siteName}`
      : `Search Products – ${seoConfig.siteName}`;

    const title = keyword ? locale === "zh"
        ? `搜尋「${keyword}」 – ${seoConfig.siteName}`
        : `Search "${keyword}" – ${seoConfig.siteName}`
      : titleBase;

    const description = keyword
      ? locale === "zh"
        ? `為你搵到同「${keyword}」相關嘅狗狗零食、玩具同裝備，幫毛孩發掘更多心頭好。`
        : `Find treats, toys and adventure-ready gear matching "${keyword}" from Sniff & Frolic.`
      : locale === "zh"
      ? "搜尋 Sniff & Frolic 嘅狗狗零食、玩具同戶外裝備，幫你家毛孩搵到最啱心水。"
      : "Search Sniff & Frolic's treats, toys and outdoor gear to find the perfect pick for your pet.";
  
    // Canonical 指返 Woo 預設 search URL（如有需要可以改）
    const baseUrl = seoConfig.siteUrl;
    const canonical = keyword
      ? `${baseUrl}/?s=${encodeURIComponent(keyword)}`
      : `${baseUrl}/`;
  
    const metadata: Metadata = {
      title,
      description,
      alternates: {
        canonical,
      },
      openGraph: {
        title,
        description,
        url: canonical,
        siteName: seoConfig.siteName,
        type: "website",
        images: [
          {
            url: seoConfig.defaultOgImage,
          },
        ],
      },
      // twitter: {
      //   card: "summary_large_image",
      //   title,
      //   description,
      //   images: [seoConfig.defaultOgImage],
      // },
    };
  
    return metadata;
  };