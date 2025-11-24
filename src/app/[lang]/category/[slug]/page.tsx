import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";
import { getCategories, getProducts } from "@/lib/wooClient";

interface CategoryPageProps {
  params: { lang: string; slug: string };
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { lang, slug } = params;

  if (!isValidLocale(lang)) return notFound();
  const locale: Locale = lang;
  const dict = await getDictionary(locale);

  const allCats = await getCategories();
  const category = allCats.find((c) => c.slug === slug);
  if (!category) return notFound();

  const products = await getProducts({ category: category.id, per_page: 40 });

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        {category.name}
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
    </Box>
  );
};

export default CategoryPage;