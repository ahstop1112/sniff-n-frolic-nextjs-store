// src/app/[lang]/about/page.tsx
import { notFound } from "next/navigation";
import { Typography, Box } from "@mui/material";
import { isValidLocale, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/dictionaries";

interface AboutPageProps {
  params: { lang: string };
}

const AboutPage = async ({ params }: AboutPageProps) => {
  if (!isValidLocale(params.lang)) return notFound();
  const locale: Locale = params.lang;
  const dict = await getDictionary(locale);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        {dict.nav.about}
      </Typography>
      <Typography variant="body1" mt={2}>
        This is a headless demo storefront built with Next.js and WooCommerce
        for portfolio and job applications.
      </Typography>
    </Box>
  );
};

export default AboutPage;