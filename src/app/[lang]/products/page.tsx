// src/app/[lang]/products/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import BreadcrumbsNav, {
  type BreadcrumbItem,
} from "@/components/BreadcrumbsNav";
import ProductImageBox from "@/components/ProductImageBox";
import { shuffleArray } from "@/utils/helpers";
interface ProductsPageProps {
  params: Promise<{ lang: string; slug: string }>;
}

const ProductsPage = async ({ params }: ProductsPageProps) => {
  const { lang, slug } = await params;
  if (!isValidLocale(lang)) return notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  // Show the first level of Categoryes
  const allCats = await getCategories();
  const topLevelCategories = allCats
    .filter((c) => c.parent === 0)
    .sort((a, b) => a.id - b.id);

  const products = await getProducts({ per_page: 50 });
  const randomProducts = shuffleArray(products);

  // Breadcrumbs
  const collectionHref = `/${locale}/products`;

  const breadcrumbs: BreadcrumbItem[] = [
    { label: locale === "zh" ? "首頁" : "Home", href: `/${locale}` },
    {
      label: locale === "zh" ? "全部商品" : "Collection",
      href: collectionHref,
    },
  ];

  return (
    <>
      <Box mt={3}>
        <BreadcrumbsNav items={breadcrumbs} />
        {/* All Top Level Categories */}
        <Typography variant="h4" component="h1" gutterBottom>
          Categories
        </Typography>
        <Grid container spacing={2}>
          {topLevelCategories.map((cat) => (
            <Grid size={{ xs: 12, sm: 6, md: 2 }} key={cat.id}>
              <Card variant="outlined">
                <CardContent>
                  <Link href={`/${locale}/category/${cat.slug}`}>
                    <Box
                      component="img"
                      src={cat?.image.src}
                      alt={cat?.image.alt || cat.name}
                      style={{ maxWidth: `100%` }}
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
        {/* All Product */}
        <Typography
          variant="h4"
          component="h1"
          style={{ marginTop: 24 }}
          gutterBottom
        >
          {dict.nav.products}
        </Typography>
        <Grid container spacing={2}>
          {(randomProducts || []).map((p) => (
            <Grid size={{ xs: 6, sm: 6, md: 3 }} key={p.id}>
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
      </Box>
    </>
  );
};

export default ProductsPage;
