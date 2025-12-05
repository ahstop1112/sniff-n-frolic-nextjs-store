import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProducts } from "@/lib/wooClient";
import { buildCategoryMetadata } from "@/seo/buildCategoryMetaTag";
import BreadcrumbsNav, { type BreadcrumbItem } from "@/components/BreadcrumbsNav";
import ProductImageBox from "@/components/ProductImageBox";
import { shuffleArray } from "@/utils/helpers";
interface CategoryPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

export const generateMetadata = async (
  props: CategoryPageProps
): Promise<Metadata> => {
  const { params } = props;
  const { lang, slug } = await params;

  return buildCategoryMetadata({ lang, slug });
};

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);
  if (!category) return notFound();

  const childCatgories = allCats.filter(c => c.parent === category.id);

  const products = await getProducts({ category: category.id, per_page: 40 });
  const randomProducts = shuffleArray(products);

  // Breadcrumbs
  const collectionHref = `/${locale}/products`;
  const parentCategory = allCats.find((c) => c.id === category.parent);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: locale === "zh" ? "首頁" : "Home", href: `${locale}` },
    { label: locale === "zh"  ? "全部商品" : "Collection", href: collectionHref },
  ];

  if (parentCategory) {
    breadcrumbs.push({
      label: parentCategory.name,
      href: `/${locale}/category/${parentCategory.slug}`,
    });
  }

  breadcrumbs.push({ label: category.name });

  return (
    <Box>
      <BreadcrumbsNav items={breadcrumbs} />
      <Typography variant="h4" component="h1" gutterBottom>
        {category.name}
      </Typography>
      <Box mt={3}>
        {/* All Top Level Categories */}
        {childCatgories.length > 0 && <>
          <Typography variant="h6" component="h6" gutterBottom>
              Categories
            </Typography>
          <Grid container spacing={2}>
            {(childCatgories || []).map((cat) => (
              <Grid size={{ xs: 6, sm: 3, md: 2 }} key={cat.id}>
                <Card variant="outlined">
                  <CardContent>
                    <Link href={`/${locale}/category/${cat.slug}`}>
                        <Box
                          component="img"
                          src={cat?.image.src}
                          alt={cat?.image.alt || cat.name}
                          style={{ maxWidth: `100%`}}
                        />
                        <Typography variant="body2" color="text.secondary">
                          {cat.name}
                        </Typography>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>}
        <Grid container spacing={2} mt={3}>
          <Typography variant="h6" component="h6" gutterBottom>
            Products
          </Typography>
          <Grid container spacing={2}>
            {(randomProducts || []).map((p) => (
              <Grid size={{ xs: 6, sm: 3, md: 3 }} key={p.id}>
                  <Card variant="outlined">
                    <CardContent>
                      <Link href={`/${locale}/products/${p.slug}`} >
                          
                      <Box
                        component="img"
                        src={p?.images[0].src}
                        alt={p?.images[0].alt || p.name}
                        style={{ maxWidth: `100%`}}
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
