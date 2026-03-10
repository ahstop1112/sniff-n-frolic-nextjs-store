import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { seoConfig } from "./seoConfig";

interface BuildHomeMetadataArgs {
  lang: string;
}

export const buildHomeMetadata = async (
  args: BuildHomeMetadataArgs
): Promise<Metadata> => {
  const { lang } = args;

  if (!isValidLocale(lang)) {
    return {
      title: `${seoConfig.siteName}`,
      description:
        "Shop Sniff & Frolic for quality dog gear, toys, and pet essentials. From outdoor adventures to cozy home moments, Fei Fei curates the best for happy pups.",
    };
  }

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const title = `${dict.common.metaDescription} - ${seoConfig.siteName}`;
  const description = dict.common.metaDescription.replace("{{category}}", "all").replace("{{siteName}}", seoConfig.siteName);

  const canonical =
    locale === "zh"
      ? `${seoConfig.siteUrl}/zh/`
      : `${seoConfig.siteUrl}/`;

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