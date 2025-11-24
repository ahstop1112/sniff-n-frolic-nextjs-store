// src/app/[lang]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getProducts, getCategories } from "@/lib/wooClient";

interface HomePageProps {
  params: { lang: string };
}

const HomePage = async ({ params }: HomePageProps) => {
  if (!isValidLocale(params.lang)) return notFound();
  const locale: Locale = params.lang;
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
          {products.map((p) => (
            <Grid item xs={12} sm={6} md={3} key={p.id}>
              <Card variant="outlined">
                <CardContent>
                  <Typography
                    component={Link}
                    href={`/${locale}/products/${p.slug}`}
                    variant="subtitle1"
                    sx={{ textDecoration: "none" }}
                  >
                    {p.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    ${p.price}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      <Box mt={4}>
        <Typography
          component={Link}
          href={`/${locale}/products`}
          sx={{ textDecoration: "underline" }}
        >
          {dict.common.viewAll} →
        </Typography>
      </Box>

      {categories.length > 0 && (
        <Box mt={6}>
          <Typography variant="h5" gutterBottom>
            {dict.common.shopByCategory}
          </Typography>
          <Grid container spacing={2}>
            {categories.map((cat) => (
              <Grid item xs={6} sm={4} md={3} key={cat.id}>
                <Card
                  variant="outlined"
                  component={Link}
                  href={`/${locale}/category/${cat.slug}`}
                  sx={{ textDecoration: "none", cursor: "pointer" }}
                >
                  {cat.image?.src && (
                    <Box
                      component="img"
                      src={cat.image.src}
                      alt={cat.image.alt || cat.name}
                      sx={{
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
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </>
  );
};

export default HomePage;