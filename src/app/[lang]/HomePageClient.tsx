"use client";
import type { Locale } from "@/i18n/config";
import { useCategories } from "@/context/CategoriesContext";
import CategorySliderSection from "@/components/Category/CategorySliderSection";

interface HomePageClientProps {
  locale: Locale;
}

const HomePageClient = ({ locale }: HomePageClientProps) => {
  const categories = useCategories();
  const topLevelCategories = categories.filter((c) => c.parent === 0);

  return (
    <CategorySliderSection
      locale={locale}
      bottomWave="green"
      title="All Categories"
      items={topLevelCategories}
    />
  );
};

export default HomePageClient;
