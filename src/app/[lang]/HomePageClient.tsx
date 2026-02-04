"use client";
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { useCategories } from "@/context/CategoriesContext";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import { wooCategoriesToSliderItems } from "@/domains/categories/adapter";

interface HomePageClientProps {
  locale: Locale;
}

const HomePageClient = ({ locale }: HomePageClientProps) => {
  const categories = useCategories();
  const topLevelCategories = categories.filter((c) => c.parent === 0);

  const homeSliderItems = useMemo(
    () => wooCategoriesToSliderItems(topLevelCategories, locale),
    [topLevelCategories, locale],
  );

  return (
    <CategorySliderSection
      locale={locale}
      bottomWave="green"
      title="All Categories"
      items={homeSliderItems}
    />
  );
};

export default HomePageClient;
