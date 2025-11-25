import type { Metadata } from "next";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getCategories } from "@/lib/wooClient";
import { seoConfig } from "./seoConfig";

interface BuildCategoryMetadataArgs {
  lang: string;
  slug: string;
}

export const buildCategoryMetadata = async (args: BuildCategoryMetadataArgs): Promise<Metadata> => {
  const { lang, slug } = args;

  if (!isValidLocale(lang)) {
    return {
      title: `Category not found - ${seoConfig.siteName}`,
      description: "The requested category could not be found.",
    };
  }

  const locale: Locale = lang;

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);

  if (!category) {
    return {
      title: `Category not found - ${seoConfig.siteName}`,
      description: "The requested category could not be found.",
    };
  }

  const baseTitle = `${category.name} – ${seoConfig.siteName}`;

  const baseDescription =
    locale === "zh"
      ? `發現更多「${category.name}」相關狗狗用品、零食同冒險小物，為毛孩準備下一次出遊。`
      : `Discover more "${category.name}" goodies from ${seoConfig.siteName} – treats, toys and adventure-ready gear for happy pets.`;

  // 假設 Woo 用預設 product category URL 結構：
  const canonical = `https://sniffnfrolic.com/product-category/${category.slug}/`;

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