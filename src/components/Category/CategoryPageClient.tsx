"use client";
import { notFound } from "next/navigation";
import { Grid } from "@mui/material";
import { useCategories } from "@/context/CategoriesContext";
import Section from "@/components/Section/Section";
import BreadcrumbsNav from "@/components/Breadcrumb/BreadcrumbsNav";
import { BreadcrumbItem } from "@/components/Breadcrumb/types";
import CategorySliderSection from "@/components/Category/CategorySliderSection";
import ProductGrid from "@/components/Product/ProductGrid";
import ProductsFilterSidebarClient from "@/components/ProductFilter/ProductsFilterSidebarClient";
import { CategoryPageClientProps } from "./types";

const CategoryPageClient = ({
  lang,
  locale,
  slug,
  dict,
  finalProducts,
}: CategoryPageClientProps) => {
  const allCats = useCategories();
  const category = allCats.find((c) => c.slug === slug);

  if (!category) notFound();

  const parentCat = allCats.find((c) => c.id === category.parent);
  const childCategories = allCats.filter((c) => c.parent === category.id);

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
        <BreadcrumbsNav locale={locale} items={breadcrumbs} />
        <h1>{category.name}</h1>
      </Section>
      <Section tone="white" topWave="teal" bottomWave="cream">
        {/* All Product */}
        <Grid container spacing={2}>
          <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient
              locale={locale}
              categories={childCategories}
              common={dict.common}
            />
          </Grid>
          <Grid container size={{ lg: 9, xl: 9, md: 9, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((item) => (
              <Grid
                container
                size={{ lg: 3, xl: 2, md: 4, sm: 6, xs: 6 }}
                key={item.id}
              >
                <ProductGrid
                  locale={locale}
                  categoryName={item?.categories[0]?.name || ""}
                  slug={item.slug}
                  image={item?.images[0]}
                  name={item.name}
                  onSale={item?.on_sale}
                  price={item.price}
                  regularPrice={item?.regular_price}
                />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Section>
      {childCategories && childCategories.length > 0 ? (
        <CategorySliderSection
          lang={lang}
          title={category.name}
          items={childCategories}
        />
      ) : null}
    </>
  );
};

export default CategoryPageClient;
