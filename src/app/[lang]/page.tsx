// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Typography, Box, Grid, Card, CardContent } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";
import { buildHomeMetadata } from "@/seo/buildHomeMetadata";
interface HomePageProps {
  params: Promise<{ lang: string }>;
}

export const generateMetadata = async (
  props: HomePageProps
): Promise<Metadata> => {
  const { params } = props;
  const { lang } = await params;

  return buildHomeMetadata({ lang });
};

const HomePage = async ({ params }: HomePageProps) => {
  const { lang } = await params;
  if (!isValidLocale(lang)) return notFound();

  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const products = await getProducts({ per_page: 8, orderby: "date" });
  const categories = await getCategories({ parent: 0, hide_empty: true });

  return (
    <>
      <Typography variant="h4" component="h1" gutterBottom>
        {dict.common.siteTitle}
      </Typography>

      <Typography variant="subtitle1" gutterBottom>
        {dict.common.latestArrivals}
      </Typography>

        <Box mt={3}>
            <Grid container spacing={2}>
                {products.map((p) => {
                    const firstImg = p.images[0] || null;
                    return(
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={p.id}>
                            <Card variant="outlined">
                                <CardContent>
                                    <Link href={`/${locale}/products/${p.slug}`} >
                                        <Box
                                            component="img"
                                            src={firstImg ? firstImg.thumbnail : ``}
                                            alt={firstImg ? firstImg.alt : p.name}
                                            sx={{
                                            width: "100%",
                                            maxHeight: 400,
                                            objectFit: "cover",
                                            borderRadius: 2,
                                            }}
                                        />
                                        {p.name}
                                    </Link>
                                    <Typography variant="body2" color="text.secondary">
                                        ${p.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Box>

      <Box mt={4}>
        <Link href={`/${locale}/products`}>{dict.common.viewAll} →</Link>
      </Box>

        {categories.length > 0 && (
            <Box mt={6}>
            <Typography variant="h5" gutterBottom>
                {dict.common.shopByCategory}
            </Typography>
            <Grid container spacing={2}>
                {categories.map((cat) => (
                <Grid size={{ xs: 6, sm: 4, md: 3 }} key={cat.id}>
                    <Link href={`/${locale}/category/${cat.slug}`}>
                        <Card variant="outlined">
                            {cat.image?.src && (
                                <img
                                    src={cat.image.src}
                                    alt={cat.image.alt || cat.name}
                                    style={{
                                        width: "100%",
                                        height: 120,
                                        objectFit: "cover",
                                    }}
                                />
                            )}
                            <CardContent>
                                <Typography variant="subtitle1">{cat.name}</Typography>
                            </CardContent>
                        </Card>
                    </Link>
                </Grid>
                ))}
            </Grid>
            </Box>
        )}
        </>
    );
};

export default HomePage;
