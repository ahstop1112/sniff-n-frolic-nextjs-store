"use client";

import { useCategories } from "@/context/CategoriesContext";
import CategorySliderSection from "@/components/Category/CategorySliderSection";

interface HomePageClientProps {
  lang: string;
}

const HomePageClient = ({ lang }: HomePageClientProps) => {
  const categories = useCategories();
  const topLevelCategories = categories.filter((c) => c.parent === 0);

  return (
    <CategorySliderSection
      lang={lang}
      bottomWave="green"
      title="All Categories"
      items={topLevelCategories}
    />
  );
};

export default HomePageClient;
