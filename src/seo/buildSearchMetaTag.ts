import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { seoConfig } from "./seoConfig";
import { getDictionary } from "@/i18n/dictionaries";

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
  const dict = await getDictionary(locale);
  
  const keyword = (query || "").trim();
  const titleBase = `${dict.search.searchProducts} – ${seoConfig.siteName}`;
  const title = keyword ? `${dict.search.title} – ${seoConfig.siteName}` : titleBase;
  const description = keyword
      ? dict.search.descriptionKeyword.replace("{{keyword}}", keyword)
      : dict.search.descriptionDefault;
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
      }
    };
  
    return metadata;
  };