"use client";
import { useMemo } from "react";
import type { Locale } from "@/i18n/config";
import { useCategories } from "@/context/CategoriesContext";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import { topLevelFromWooCategories } from "@/domains/nav/fromWooCategories";
import { normalizeNavTree } from "@/domains/nav/normalize";
import type { CategorySliderItem } from "@/components/Category/types";

interface HomePageClientProps {
  locale: Locale;
}

const HomePageClient = ({ locale }: HomePageClientProps) => {
  const categories = useCategories();
  const categoryNavItems = useMemo(() => {
    if (!categories?.length) return [];
    const raw = topLevelFromWooCategories(categories, locale);
    return normalizeNavTree(raw, "wooCats");
  }, [categories, locale]);

  return (
    <CategorySliderSection
      locale={locale}
      bottomWave="green"
      title="All Categories"
      items={categoryNavItems}
    />
  );
};

export default HomePageClient;
