"use client";
import { useMemo } from "react";
import { useCategories } from "@/context/CategoriesContext";
import { useLocale } from "@/i18n/LocaleProvider";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import { wooCategoriesToSliderItems } from "@/domains/categories/adapter";

const HomePageClient = () => {
  const locale = useLocale();
  const categories = useCategories();
  const topLevelCategories = categories.filter((c) => c.parent === `0`);

  const homeSliderItems = useMemo(
    () => wooCategoriesToSliderItems(topLevelCategories, locale),
    [topLevelCategories, locale],
  );

  return (
    <CategorySliderSection
      bottomWave="green"
      title="All Categories"
      items={homeSliderItems}
    />
  );
};

export default HomePageClient;
