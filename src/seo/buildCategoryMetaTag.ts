import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getCategories } from "@/lib/wooClient";
import { getDictionary } from "@/i18n/dictionaries";
import { seoConfig } from "./seoConfig";

interface BuildCategoryMetadataArgs {
  lang: string;
  slug?: string | ``;
}

export const buildCategoryMetadata = async (
  args: BuildCategoryMetadataArgs,
): Promise<Metadata> => {
  const { lang, slug } = args;

  if (!isValidLocale(lang)) {
    return {
      title: `Category not found - ${seoConfig.siteName}`,
      description: "The requested category could not be found.",
    };
  }

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: `Category not found - ${seoConfig.siteName}`,
      description: "The requested category could not be found.",
    };
  }

  const baseTitle = `${category.name} – ${seoConfig.siteName}`;
  const baseDescription = dict.common.metaDescription.replace("{{category}}", category.name).replace("{{siteName}}", seoConfig.siteName);

  // 假設 Woo 用預設 product category URL 結構：
  const canonical = `${seoConfig.siteUrl}/${lang}/category/${category.slug}`;

  const metadata: Metadata = {
    title: baseTitle,
    description: baseDescription,
    alternates: {
      canonical,
    },
    openGraph: {
      title: baseTitle,
      description: baseDescription,
      url: canonical,
      siteName: "${seoConfig.siteName}",
      type: "website",
      images: category.image?.src
        ? [
            {
              url: category.image.src,
            },
          ]
        : [],
    },
    // twitter: {
    //   card: "summary_large_image",
    //   title: baseTitle,
    //   description: baseDescription,
    //   images: category.image?.src ? [category.image.src] : [],
    // },
  };

  return metadata;
};
