"use client";

import { useMemo } from "react";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { useLocale } from "@/i18n/LocaleProvider";
import { useCategories } from "@/context/CategoriesContext";
import Section from "@/components/Section";
import BreadcrumbsNav from "@/components/Breadcrumb";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductsFilterSidebarClient from "@/components/ProductFilter";
import { wooCategoriesToSliderItems } from "@/domains/categories/adapter";

import { CategoryPageClientProps } from "./types";

const CategoryPageClient = ({
  slug,
  dict,
  finalProducts,
}: CategoryPageClientProps) => {
  const locale = useLocale();
  const allCats = useCategories();

  if (!allCats?.length) return null;

  const category = allCats.find((c) => c.slug === slug);
  if (!category) return notFound();

  const parentCat = allCats.find((c) => c.id === category.parent);

  const childCategories = useMemo(
    () => allCats.filter((c) => c.parent === category.id),
    [allCats, category.id],
  );

  const childSliderItems = useMemo(
    () => wooCategoriesToSliderItems(childCategories, locale),
    [childCategories, locale],
  );

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [];

  if (parentCat) {
    breadcrumbs.push({
      label: parentCat.name,
      href: `/${locale}/category/${parentCat.slug}`,
    });
  }

  breadcrumbs.push({ label: category.name });

  return (
    <>
      <Section tone="teal" className="pageHeader">
        <BreadcrumbsNav isProduct={true} items={breadcrumbs} />
        <h1>{category.name}</h1>
      </Section>

      <Section tone="white" topWave="teal" bottomWave="cream">
        <Grid container spacing={2}>
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient
              categories={childSliderItems}
              common={dict.common}
            />
          </Grid>

          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((p) => (
              <Grid
                container
                size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }}
                key={p.slug}
              >
                <ProductGrid
                  slug={p.slug}
                  image={p?.images[0]}
                  name={p.name}
                  onSale={p?.on_sale}
                  price={p.price}
                  regularPrice={p?.regular_price}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Section>

      {childSliderItems.length > 0 ? (
        <CategorySliderSection
          title={category.name}
          items={childSliderItems}
        />
      ) : null}
    </>
  );
};

export default CategoryPageClient;
