import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProducts } from "@/lib/wooClient";
import { formatPrice } from "@/lib/currency";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
import BreadcrumbsNav, {
  type BreadcrumbItem,
} from "@/components/BreadcrumbsNav";
import ProductImageBox from "@/components/ProductImageBox";
import ProductsFilterSidebarClient from "@/components/ProductsFilterSidebarClient";
import { shuffleArray } from "@/utils/helpers";

type SearchParams = Record<string, string | string[] | undefined>;
interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
  searchParams: Promise<SearchParams>;
}

export const generateMetadata = async (props: CategoryPageProps): Promise<Metadata> => {
  const { params } = props;
  const { lang, slug } = await params;

  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params, searchParams }: CategoryPageProps) => {
  const { lang, slug } = await params;
  const sp = await searchParams;
  
  if (!isValidLocale(lang)) return notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);
  if (!category) return notFound();

  const childCatgories = allCats.filter((c) => c.parent === category.id);

  const collectionHref = `/${locale}/products`;

  const wooParams: Record<string, string | number> = {
    per_page: 50,
    status: "publish",
    category: category?.id
  };

  // Breadcrumbs
  const breadcrumbs: BreadcrumbItem[] = [
    { label: locale === "zh" ? "首頁" : "Home", href: `${locale}` },
    {
      label: locale === "zh" ? "全部商品" : "Collection",
      href: collectionHref,
    },
  ];

  breadcrumbs.push({
    label: category.name,
    href: `/${locale}/category/${category.slug}`,
  });

  breadcrumbs.push({ label: category.name });

  const inStockFlag = typeof sp.in_stock === "string" ? sp.in_stock : undefined;
  const categorySlug = typeof sp.category === "string" ? sp.category : undefined;

  let selectedCategory = undefined as any;
  selectedCategory = categorySlug ? allCats.find(item => item.slug === categorySlug) : null;

  wooParams.category = selectedCategory ? selectedCategory.id : category.id;

  if (inStockFlag === "1") {
    (wooParams as any).stock_status = "instock";
  }
  const products = await getProducts(wooParams);
  const finalProducts = slug || inStockFlag ? products : shuffleArray(products);

  return (
    <Box>
      <BreadcrumbsNav items={breadcrumbs} />
      <Typography variant="h4" component="h1" gutterBottom>
        {category.name}
      </Typography>
      <Box mt={3}>
        {/* All Top Level Categories */}
        {childCatgories.length > 0 && (
          <>
            <Typography variant="h4" component="h1" gutterBottom>
              Categories
            </Typography>
            <Grid container spacing={2}>
              {(childCatgories || []).map((cat) => (
                <Grid size={{ xs: 6, sm: 6, md: 2 }} key={cat.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Link href={`/${locale}/category/${cat.slug}`}>
                        {cat && cat.image ? (
                          <Box
                            component="img"
                            src={cat?.image.src}
                            alt={cat?.image.alt || cat.name}
                            style={{ maxWidth: `100%` }}
                          />
                        ) : null}
                        <Typography variant="body2" color="text.secondary">
                          {cat.name}
                        </Typography>
                      </Link>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
        <Grid container spacing={2}>
          {childCatgories && childCatgories.length > 0 ? <Grid size={{ lg: 3, xl: 3, md: 3, sm: 12, xs: 12 }}>
            <ProductsFilterSidebarClient locale={locale} categories={childCatgories.map(c => ({ id: c.id, name: c.name, slug: c.slug }))} />
          </Grid> : null}
          <Grid container size={childCatgories && childCatgories.length > 0 ? { lg: 9, xl: 9, md: 9, sm: 12, xs: 12 } : { lg: 12, xl: 12, md: 12, sm: 12, xs: 12 }}>
            {(finalProducts || []).map((p) => (
              <Grid size={{ xs: 6, sm: 6, md: 4, lg: 3, xl: 3 }} key={p.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Link href={`/${locale}/products/${p.slug}`}>
                      <Box
                        component="img"
                        src={p?.images[0].src}
                        alt={p?.images[0].alt || p.name}
                        style={{ maxWidth: `100%` }}
                      />
                      {p.name}
                    </Link>
                    <Typography variant="body2" color="text.secondary">
                      ${p.price}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default CategoryPage;
