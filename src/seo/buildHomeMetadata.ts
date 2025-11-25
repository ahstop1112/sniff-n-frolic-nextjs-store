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

  const title =
    locale === "zh"
      ? `${dict.common.siteTitle}｜健康寵物零食・戶外冒險用品`
      : `Dog Gear, Toys & Pet Essentials in Canada - ${dict.common.siteTitle}`;

  const description =
    locale === "zh"
      ? "Sniff & Frolic 為狗狗同人類準備健康 Canadian-made 寵物零食、露營野餐裝備同生活小物，陪你同毛孩一齊出發冒險。"
      : "Shop Sniff & Frolic for quality dog gear, toys, and pet essentials. From outdoor adventures to cozy home moments, Fei Fei curates the best for happy pups.";

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